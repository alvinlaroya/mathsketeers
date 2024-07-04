import { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, AppState, ScrollView } from 'react-native';
// react native paper
import { TextInput, Button, HelperText } from 'react-native-paper';

import { useStorageState } from '../../lib/useStorageStage';
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

  const [profile, setProfile] = useState({
    fname: '',
    mname: '',
    lname: '',
    address: '',
    gender: 'male'
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

      setSession(JSON.stringify({ access_token: responseSignupData?.session?.access_token }))

      let { data: responseData, error } = await supabase
        .from('profiles')
        .insert([{
          ...profile,
          authId: responseSignupData.session?.user.id
        }])
        .select()

      if(error) return;

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
            <Text style={{ color: 'black', textAlign: 'center', fontSize: 23, fontWeight: 'bold', marginVertical: 9 }}>
              Create Your Account Mathsketeers!
            </Text>
            <Text>Profile {profile.address}</Text>
            <TextInput
              style={{ width: '100%', marginVertical: 4, backgroundColor: '#eee' }}
              mode="outlined"
              label="First name"
              placeholder="Type something"
              left={(<TextInput.Icon icon="email" />)}
              onChangeText={(text) => onChangeTextHandler('fname', text)}
            />
            <TextInput
              style={{ width: '100%', marginVertical: 4, backgroundColor: '#eee' }}
              mode="outlined"
              label="Middle name"
              placeholder="Type something"
              left={(<TextInput.Icon icon="email" />)}
              onChangeText={(text) => onChangeTextHandler('mname', text)}
            />
            <TextInput
              style={{ width: '100%', marginVertical: 4, backgroundColor: '#eee' }}
              mode="outlined"
              label="Last name"
              placeholder="Type something"
              left={(<TextInput.Icon icon="email" />)}
              onChangeText={(text) => onChangeTextHandler('lname', text)}
            />
            <TextInput
              style={{ width: '100%', marginVertical: 4, backgroundColor: '#eee' }}
              mode="outlined"
              label="Address"
              placeholder="Type something"
              left={(<TextInput.Icon icon="email" />)}
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
              left={(<TextInput.Icon icon="email" />)}
              onChangeText={setEmail}
            />
            <TextInput
              style={{ width: '100%', marginVertical: 4, backgroundColor: '#eee' }}
              mode="outlined"
              label="Password"
              placeholder="Type something"
              left={(<TextInput.Icon icon="lock" />)}
              right={(<TextInput.Icon icon="eye" onPress={() => setShowPassword(!showPassword)} />)}
              secureTextEntry={!showPassword}
              onChangeText={setPassword}
            />
            <TextInput
              style={{ width: '100%', marginVertical: 4, backgroundColor: '#eee' }}
              mode="outlined"
              label="Password"
              placeholder="Type something"
              left={(<TextInput.Icon icon="lock" />)}
              right={(<TextInput.Icon icon="eye" onPress={() => setShowConfirmPassword(!showConfirmPassword)} />)}
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
  button: {
    marginTop: 30,
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#e47f1a'
  }
});


export default RegisterScreen;