import { Tabs } from 'expo-router';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Appbar, Avatar } from 'react-native-paper';

import { useProfileStore } from '@/hooks/store';

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


export default function TabLayout() {
  const profile = useProfileStore((state: any) => state.profile)
  const profiles = useProfileStore((state: any) => state.profiles)

  const routeCofig = (route: string, focused: boolean) => {
    let iconName: string = '';
    let appbarTitle: string = '';

    if (route === 'index') {
      iconName = focused
        ? 'apps'
        : 'apps-outline';
      appbarTitle = 'Home'
    } else if (route === 'user-management') {
      iconName = focused ? 'people-circle' : 'people-circle-outline';
      appbarTitle = 'User Management'
    } else if (route === 'settings') {
      iconName = focused ? 'settings' : 'settings-outline';
      appbarTitle = 'Settings'
    } else if (route === 'create-account') {
      iconName = focused ? 'people-circle' : 'people-circle-outline';
      appbarTitle = 'Create Account'
    } else if (route === 'archive') {
      iconName = focused ? 'settings' : 'settings-outline';
      appbarTitle = 'Archive'
    }else {
      iconName = focused ? 'person' : 'person-outline';
      appbarTitle = 'Profile'
    }

    return {
      iconName,
      appbarTitle
    }
  }

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: true,
        header: (() => {
          const { appbarTitle } = routeCofig(route.name, false)

          return (
            <Appbar.Header>
              <Appbar.Content title={appbarTitle} />
              <Appbar.Action icon={() => <Ionicons name="notifications-outline" size={25} color="gray" />} onPress={_handleSearch} />
            </Appbar.Header>
          )
        }),
        tabBarIcon: ({ focused, color, size }) => {
          const { iconName } = routeCofig(route.name, focused)

          if (route.name === 'profile') {
            return (<Avatar.Image size={size} source={profile?.isAdmin ? adminAvatar[profile?.gender] : userAvatar[profile?.gender]} />)
          } else {
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: '#e47f1a',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="user-management"
        options={{
          title: 'User Management',
          href: profile?.isAdmin ? '/user-management' : null,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Activities',
          href: profile?.isAdmin ? '/settings' : null
        }}
      />
      <Tabs.Screen
        name="create-account"
        options={{
          title: 'Create Account',
          href: profile?.isAdmin ? '/create-account' : null
        }}
      />
       <Tabs.Screen
        name="archive"
        options={{
          title: 'Archive',
          href: profile?.isAdmin ? '/archive' : null
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
      />
    </Tabs>
  );
}
