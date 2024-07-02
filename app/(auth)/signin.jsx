import { useState } from 'react';
import { Alert, View, Image, StyleSheet, Text, SafeAreaView } from 'react-native';

import { useSession } from '../../lib/ctx';

// expo router
import { Link, router } from 'expo-router';

// react native pape
import { TextInput, Button } from 'react-native-paper';

const authBgImg = require('@/assets/images/auth-bg.png');

const LoginScreen = () => {
  const { signIn } = useSession();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function signInWithEmail() {
    //setLoading(true)
    signIn(email, password);

    router.replace('/')
    //setLoading(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: '100%', padding: 30 }}>
        <View style={{ alignItems: 'center' }}>
          <Image source={authBgImg} style={styles.authBgImg} />
        </View>
        <View>
          <Text style={{ color: 'black', textAlign: 'center', fontSize: 23, fontWeight: 'bold', marginVertical: 9 }}>
            Sign-in Mathsketeerss!
          </Text>
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
            right={(<TextInput.Icon icon="eye" />)}
            onChangeText={setPassword}
          />
          <Button mode="contained" style={styles.button} labelStyle={{ fontSize: 15, fontWeight: 'bold' }} uppercase onPress={signInWithEmail}>
            Log in
          </Button>
          <View style={{ marginTop: 10 }}>
            <Text>Dont have an account? <Link href='/signup' style={{ color: 'red' }}>Create Account</Link></Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
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
  authBgImg: {
    width: 290,
    height: 290,
    objectFit: 'contain'
  },
  button: {
    marginTop: 30,
    height: 50,
    justifyContent: 'center'
  }
});


export default LoginScreen;