import React, { useEffect } from 'react';
import { ToastAndroid } from 'react-native';
import { useStorageState } from './useStorageStage';
import { useProfileStore } from '@/hooks/store';

import { router } from 'expo-router';

import { getProfileQuery } from '@/queries/profiles';
import { Profiles } from '@/interfaces/IProfiles';

import { supabase } from './supabase';

const AuthContext = React.createContext<{
    signIn: (email: string, password: string) => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
}>({
    signIn: (email: string, password: string) => null,
    signOut: () => null,
    session: null,
    isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
    const value = React.useContext(AuthContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useSession must be wrapped in a <SessionProvider />');
        }
    }

    return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('session');
    const profileState: any = useProfileStore();

    const fetchProfile = async (uid: string | any) => {
        const { data, error } = await getProfileQuery(uid);
        if (error) throw error;
        const profile: Profiles = data
        profileState.setProfile(profile[0])
    }

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            console.log("GET SESSION", session?.user.id)
            fetchProfile(session?.user.id);
            setSession(JSON.stringify({ access_token: session?.access_token }));
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            console.log("AUTH STATE CHANGE", session?.user.id)
            fetchProfile(session?.user.id);
            setSession(JSON.stringify({ access_token: session?.access_token }));
        })
    }, [])

    return (
        <AuthContext.Provider
            value={{
                signIn: async (email, password) => {
                    ToastAndroid.show('Signing In', ToastAndroid.SHORT);
                    try {
                        const { data, error } = await supabase.auth.signInWithPassword({
                            email: email,
                            password: password,
                        })

                        if (error) {
                            ToastAndroid.show(error.message, ToastAndroid.SHORT);
                            return;
                        }
                        setSession(JSON.stringify({ access_token: data?.session?.access_token }))
                        router.replace('/')
                    } catch (error) {
                        console.error("Logging In Error", error)
                    }
                },
                signOut: async () => {
                    ToastAndroid.show('Logging Out', ToastAndroid.SHORT);
                    try {
                        await supabase.auth.signOut()
                        setSession(null);
                    } catch (error) {
                        console.error("Logging Out Error", error)
                    }
                },
                session,
                isLoading,
            }}>
            {props.children}
        </AuthContext.Provider>
    );
}
