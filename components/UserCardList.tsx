import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { Avatar } from 'react-native-paper';

import { Button } from 'react-native-paper'

import Animated, { FadeInDown } from 'react-native-reanimated';

import { router } from 'expo-router';

import { setAsAdminQuery } from '@/queries/profiles';
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

type ItemProps = {
    id: string;
    fname: string;
    mname: string;
    lname: string;
    gender: string;
    address: string;
    isAdmin: boolean;
    email: string;
};

export default function UserCardList({ id, fname, mname, lname, gender, address, isAdmin, email }: ItemProps) {
    const profileStore: any = useProfileStore();
    const [updating, setUpdating] = useState(false);

    const setRoleHandler = async (uid: string | any, role: boolean | any) => {
        setUpdating(true);
        const { data, error } = await setAsAdminQuery(uid, role);
        if (error) throw error;

        const profiles = profileStore.profiles.map((item: any) => item?.id === data[0]?.id ? ({ ...data[0] }) : ({ ...item }))
        profileStore.setProfiles(profiles)
        setUpdating(false);
    }


    return (
        <Pressable
            onPress={() => router.push({
                pathname: "/(screens)/details",
                params: { id: id, fname: fname, mname: mname, lname: lname, gender: gender, address: address, isAdmin: isAdmin, email }
            })}
        >
            <Animated.View style={styles.item} entering={FadeInDown.duration(200).delay(40)}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Animated.Image source={isAdmin ? adminAvatar[gender] : userAvatar[gender]} style={{ width: 45, height: 45, objectFit: 'contain' }} />
                    <View>
                        <Text style={styles.title}>{fname} {mname} {lname}</Text>
                        <Text style={styles.subtitle}>({isAdmin ? 'Admin' : 'Student'})</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Button
                        loading={updating}
                        style={{ marginLeft: 5 }}
                        onPress={() => setRoleHandler(id, isAdmin)}
                        labelStyle={{ fontSize: 12 }}
                    >
                        Set as {isAdmin ? 'Student' : 'Admin'}
                    </Button>
                </View>
            </Animated.View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 5,
        marginVertical: 3,
        marginHorizontal: 16,
        borderRadius: 5,
        alignItems: 'center'
    },
    title: {
        fontSize: 12,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    subtitle: { fontSize: 10, marginLeft: 10 }
});
