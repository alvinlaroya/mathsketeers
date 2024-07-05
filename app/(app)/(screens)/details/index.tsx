import React, { useState, useEffect } from 'react'
import { StyleSheet, StatusBar, Text, View, Image, Pressable } from 'react-native'
import { Avatar, TextInput } from 'react-native-paper';

import Animated, { FadeInDown } from 'react-native-reanimated';

import { useLocalSearchParams, router } from 'expo-router';

const male = require(`@/assets/images/male-avatar.png`);
const female = require(`@/assets/images/female-avatar.png`);
const maleAdmin = require(`@/assets/images/male-admin-avatar.png`);
const femaleAdmin = require(`@/assets/images/female-admin-avatar.png`);

const userAvatar: any = {
  male,
  female,
}
const adminAvatar: any = {
  male: maleAdmin,
  female: femaleAdmin
}


export default function UserProfile() {

  const params = useLocalSearchParams();
  const { id, fname, mname, lname, gender, address, isAdmin, email } = params;

  return (
    <Animated.View entering={FadeInDown.duration(400).delay(200)} style={styles.container}>
      <Animated.Image source={isAdmin === 'true' ? adminAvatar[`${gender}`] : userAvatar[`${gender}`]} style={{ width: 150, height: 150 }} />
      <Text style={{ fontWeight: 'bold', marginTop: 9 }}>{isAdmin === 'true' ? 'Administrator' : 'Student'}</Text>
      <View style={{ padding: 30, width: '100%' }}>
        <TextInput
          style={{ width: '100%', marginVertical: 4, backgroundColor: '#eee' }}
          mode="flat"
          label="First Name"
          placeholder="Type something"
          value={fname}
        />
        <TextInput
          style={{ width: '100%', marginVertical: 4, backgroundColor: '#eee' }}
          mode="flat"
          label="Middle Name"
          placeholder="Type something"
          value={mname}
        />
        <TextInput
          style={{ width: '100%', marginVertical: 4, backgroundColor: '#eee' }}
          mode="flat"
          label="Last Name"
          placeholder="Type something"
          value={lname}
        />
        <TextInput
          style={{ width: '100%', marginVertical: 4, backgroundColor: '#eee' }}
          mode="flat"
          label="Address"
          placeholder="Type something"
          value={address}
        />
        <TextInput
          style={{ width: '100%', marginVertical: 4, backgroundColor: '#eee' }}
          mode="flat"
          label="Gender"
          placeholder="Type something"
          value={gender}
        />
        <TextInput
          style={{ width: '100%', marginVertical: 4, backgroundColor: '#eee' }}
          mode="flat"
          label="Email"
          placeholder="Type something"
          value={email}
        />
      </View>
    </Animated.View >
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 5, marginTop: 15 /* marginTop: StatusBar.currentHeight */ }
})