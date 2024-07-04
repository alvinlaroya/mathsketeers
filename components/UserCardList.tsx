import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-paper';

import { Button } from 'react-native-paper'

import { setAsAdminQuery } from '@/queries/profiles';
import { useProfileStore } from '@/hooks/store';

const male = require(`@/assets/images/male-avatar.png`);
const female = require(`@/assets/images/female-avatar.png`);

type ItemProps = {
    id: string;
    fname: string;
    mname: string;
    lname: string;
    gender: string;
    isAdmin: boolean
};

export default function UserCardList({ id, fname, mname, lname, gender, isAdmin }: ItemProps) {
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
        <View style={styles.item}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Avatar.Image size={30} source={gender === 'male' ? male : female} />
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
        </View>
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
