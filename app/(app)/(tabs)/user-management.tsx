import React, { useEffect, useState } from 'react'
import { StatusBar, SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native'

import UserCardList from '@/components/UserCardList';

import { Profiles } from '@/interfaces/IProfiles';
import { getProfilesQuery } from '@/queries/profiles';
import { useProfileStore } from '@/hooks/store';


export default function Settings() {
  const profileStore: any = useProfileStore();

  useEffect(() => {
    const getProfiles = async () => {
      const { data, error } = await getProfilesQuery;
      if (error) throw error;
      const profiles: Profiles = data;
      console.log("PROFILE", profiles)
      profileStore.setProfiles(profiles)
    }

    getProfiles();
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 15, paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 12 }}>List Of Users</Text>
        <Text style={{ fontSize: 12 }}>({profileStore.profiles.length}) Total users</Text>
      </View>
      <FlatList
        style={{ marginTop: 2 }}
        data={profileStore?.profiles}
        renderItem={({ item }) => <UserCardList {...item} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
