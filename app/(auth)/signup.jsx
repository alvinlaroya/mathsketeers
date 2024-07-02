import { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, AppState, ScrollView } from 'react-native';

import { supabase } from '@/lib/supabase'

// expo router
import { Link } from 'expo-router';

// react native pape
import { TextInput, Button } from 'react-native-paper';

const authBgImg = require('@/assets/images/auth-bg.png')

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

const RegisterScreen = () => {
  const [profile, setProfile] = useState({
    fname: '',
    mname: '',
    lname: '',
    address: ''
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
    try {
      let { data } = await supabase.auth.signUp({
        email,
        password,
      })


      let { data: insertedProfile, error } = await supabase
        .from('profiles')
        .insert([{
          ...profile,
          authId: data.session?.user.id
        }])
        .select()
    } catch (error) {
      console.error("Creating Account Error", error)
    }
  }

  return (
    <ScrollView style={{ backgroundColor: 'white', paddingTop: 40 }}>
      <SafeAreaView style={styles.container}>
        <View style={{ width: '100%', padding: 30 }}>
          <View>
            <Text style={{ color: 'black', textAlign: 'center', fontSize: 23, fontWeight: 'bold', marginVertical: 9 }}>
              Create Your Account Mathsketeers!
            </Text>
            <Text>Profile {profile.address}</Text>
            <TextInput
              style={{ width: '100%', marginVertical: 4 }}
              mode="outlined"
              label="First name"
              placeholder="Type something"
              left={(<TextInput.Icon icon="email" />)}
              onChangeText={(text) => onChangeTextHandler('fname', text)}
            />
            <TextInput
              style={{ width: '100%', marginVertical: 4 }}
              mode="outlined"
              label="Middle name"
              placeholder="Type something"
              left={(<TextInput.Icon icon="email" />)}
              onChangeText={(text) => onChangeTextHandler('mname', text)}
            />
            <TextInput
              style={{ width: '100%', marginVertical: 4 }}
              mode="outlined"
              label="Last name"
              placeholder="Type something"
              left={(<TextInput.Icon icon="email" />)}
              onChangeText={(text) => onChangeTextHandler('lname', text)}
            />
            <TextInput
              style={{ width: '100%', marginVertical: 4 }}
              mode="outlined"
              label="Address"
              placeholder="Type something"
              left={(<TextInput.Icon icon="email" />)}
              onChangeText={(text) => onChangeTextHandler('address', text)}
            />
            <Text style={{ marginTop: 20 }}>Account:</Text>
            <TextInput
              style={{ width: '100%', marginVertical: 4 }}
              mode="outlined"
              label="Email"
              placeholder="Type something"
              left={(<TextInput.Icon icon="email" />)}
              onChangeText={setEmail}
            />
            <TextInput
              style={{ width: '100%', marginVertical: 4 }}
              mode="outlined"
              label="Password"
              placeholder="Type something"
              left={(<TextInput.Icon icon="lock" />)}
              right={(<TextInput.Icon icon="eye" onPress={() => setShowPassword(!showPassword)} />)}
              secureTextEntry={!showPassword}
              onChangeText={setPassword}
            />
            <TextInput
              style={{ width: '100%', marginVertical: 4 }}
              mode="outlined"
              label="Password"
              placeholder="Type something"
              left={(<TextInput.Icon icon="lock" />)}
              right={(<TextInput.Icon icon="eye" onPress={() => setShowConfirmPassword(!showConfirmPassword)} />)}
              secureTextEntry={!showConfirmPassword}
              onChangeText={setConfirmPassword}
            />
            <Button mode="contained" style={styles.button} labelStyle={{ fontSize: 15, fontWeight: 'bold' }} uppercase onPress={signup}>
              Create Account
            </Button>
            <View style={{ marginTop: 10 }}>
              <Text>Already have account? <Link href={'/signin'} style={{ color: 'red' }}>Sign in</Link></Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
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
    justifyContent: 'center'
  }
});


export default RegisterScreen;