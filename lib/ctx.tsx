import React, { useEffect } from 'react';
import { useStorageState } from './useStorageStage';

import { supabase } from './supabase';
import { router } from 'expo-router';

const AuthContext = React.createContext<{
    signIn: (email: string, password: string) => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
}>({
    signIn: () => null,
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

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(JSON.stringify(session?.access_token))
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(JSON.stringify(session?.access_token))
        })
    }, [])

    return (
        <AuthContext.Provider
            value={{
                signIn: async (email, password) => {
                    try {
                        const { data, error } = await supabase.auth.signInWithPassword({
                            email: email,
                            password: password,
                        })
                        setSession(JSON.stringify(data.session?.access_token));
                    } catch (error) {
                        console.error("Logging In Error", error)
                    }
                },
                signOut: async () => {
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
