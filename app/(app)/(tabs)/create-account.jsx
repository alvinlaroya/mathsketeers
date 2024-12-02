import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, SafeAreaView, AppState, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
// react native paper
import { TextInput, Button, HelperText } from 'react-native-paper';
import AvatarUpload from "../components/AvatarUpload";

import { useStorageState } from '@/lib/useStorageStage';
import { useProfileStore } from '@/hooks/store';

import { supabase } from '@/lib/supabase'

// expo router
import { Link, router } from 'expo-router';

import { Picker } from '@react-native-picker/picker';

AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        supabase.auth.startAutoRefresh()
    } else {
        supabase.auth.stopAutoRefresh()
    }
})

const RegisterScreen = () => {
    const [[_, session], setSession] = useStorageState('session');
    const [signupLoading, setSignupLoading] = useState(false);
    const profileState = useProfileStore();
    const [avatarUrl, setAvatarUrl] = useState(null)

    const [profile, setProfile] = useState({
        fname: 'Alvin',
        mname: 'Prenda',
        lname: 'Laroya',
        address: 'Agoo',
        gender: 'male'
    });

    const [email, setEmail] = useState('alvinreggaelaroya@gmail.com');
    const [password, setPassword] = useState('password');
    const [confirmPassword, setConfirmPassword] = useState('password');

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const onChangeTextHandler = (key, value) => {
        var newState = profile;
        newState[key] = value;
        setProfile(newState);
    };

    const signup = async () => {
        if (password !== confirmPassword) {
            console.log("NOT MATCH")
            return
        };

        setSignupLoading(true);
        try {
            let { data: responseSignupData } = await supabase.auth.signUp({
                email,
                password,
            })

            console.log("RESPONSE SIGNUP", responseSignupData)

            setSession(JSON.stringify({ access_token: responseSignupData?.session?.access_token }))

            console.log("CREATE PROFILE DATA", {
                ...profile,
                avatar: avatarUrl,
                authId: responseSignupData.session?.user.id
            })

            let { data: responseData, error } = await supabase
                .from('profiles')
                .insert([{
                    ...profile,
                    avatar: avatarUrl,
                    authId: responseSignupData.session?.user.id
                }])
                .select()


            console.error("ERROR", error)
            console.log("CREATED PROFILE", responseData)

            if (error) return;

            profileState.setProfile(responseData[0])

            setSignupLoading(false);
            router.replace('/');
        } catch (error) {
            console.error("Creating Account Error", error)
        }
    }

    const notMatch = () => {
        return password !== confirmPassword;
    };

    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <SafeAreaView style={styles.container}>
                <View style={{ width: '100%', padding: 30 }}>
                    <View>
                        <View style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <AvatarUpload
                                size={200}
                                url={avatarUrl}
                                onUpload={(url) => {
                                    setAvatarUrl(url)
                                }}
                            />
                        </View>
                        <Text>Profile {profile.address} {avatarUrl}</Text>
                        <TextInput
                            style={{ width: '100%', marginVertical: 4, backgroundColor: '#eee' }}
                            mode="outlined"
                            label="First name"
                            placeholder="Type something"
                            onChangeText={(text) => onChangeTextHandler('fname', text)}
                        />
                        <TextInput
                            style={{ width: '100%', marginVertical: 4, backgroundColor: '#eee' }}
                            mode="outlined"
                            label="Middle name"
                            placeholder="Type something"
                            onChangeText={(text) => onChangeTextHandler('mname', text)}
                        />
                        <TextInput
                            style={{ width: '100%', marginVertical: 4, backgroundColor: '#eee' }}
                            mode="outlined"
                            label="Last name"
                            placeholder="Type something"
                            onChangeText={(text) => onChangeTextHandler('lname', text)}
                        />
                        <TextInput
                            style={{ width: '100%', marginVertical: 4, backgroundColor: '#eee' }}
                            mode="outlined"
                            label="Address"
                            placeholder="Type something"
                            onChangeText={(text) => onChangeTextHandler('address', text)}
                        />
                        <Text style={{ marginTop: 9 }}>Gender:</Text>
                        <Picker
                            selectedValue={profile.gender}
                            onValueChange={(itemValue, itemIndex) => {
                                const updatedValue = { gender: itemValue }
                                setProfile(prevState => ({
                                    ...prevState,
                                    ...updatedValue
                                }))
                            }}
                            style={{ backgroundColor: '#eee', height: 50 }}
                        >
                            <Picker.Item label="Male" value="male" />
                            <Picker.Item label="Female" value="female" />
                        </Picker>
                        <Text style={{ marginTop: 20 }}>Account:</Text>
                        <TextInput
                            style={{ width: '100%', marginVertical: 4, backgroundColor: '#eee' }}
                            mode="outlined"
                            label="Email"
                            placeholder="Type something"
                            onChangeText={setEmail}
                        />
                        <TextInput
                            style={{ width: '100%', marginVertical: 4, backgroundColor: '#eee' }}
                            mode="outlined"
                            label="Password"
                            placeholder="Type something"
                            secureTextEntry={!showPassword}
                            onChangeText={setPassword}
                        />
                        <TextInput
                            style={{ width: '100%', marginVertical: 4, backgroundColor: '#eee' }}
                            mode="outlined"
                            label="Password"
                            placeholder="Type something"
                            secureTextEntry={!showConfirmPassword}
                            onChangeText={setConfirmPassword}
                            activeOutlineColor={notMatch() ? 'red' : 'black'}
                            outlineColor={notMatch() ? 'red' : 'black'}
                        />
                        <HelperText type="error" visible={notMatch()}>
                            Password does not match!
                        </HelperText>
                        <Button mode="contained" loading={signupLoading} style={styles.button} labelStyle={{ fontSize: 15, fontWeight: 'bold' }} uppercase onPress={signup}>
                            Create Account
                        </Button>
                        <View style={{ marginTop: 10 }}>
                            <Text>Already have account? <Link href={'/signin'} style={{ color: 'red' }}>Sign in</Link></Text>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        margin: 0,
        width: '100%',
        height: 'auto',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        borderRadius: 5,
        overflow: 'hidden',
        maxWidth: '100%',
    },
    image: {
        objectFit: 'cover',
        paddingTop: 0,
    },
    noImage: {
        backgroundColor: '#333',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgb(200, 200, 200)',
        borderRadius: 5,
    },
    button: {
        marginTop: 30,
        height: 50,
        justifyContent: 'center',
        backgroundColor: '#e47f1a'
    }
});


export default RegisterScreen;