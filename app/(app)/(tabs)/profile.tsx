import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'

import { Picker } from '@react-native-picker/picker';
import { Avatar, TextInput, Button, ActivityIndicator } from 'react-native-paper';

import { useProfileStore } from '@/hooks/store'

import { useSession } from '@/lib/ctx';

const windowWidth = Dimensions.get('window').width;

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

export default function Profile() {
    const profile = useProfileStore(((state: any) => state.profile))
    const { signOut } = useSession();
    const [isLoading, setLoading] = useState(false)

    return (
        <>
            {isLoading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 'auto' }}>
                    <ActivityIndicator animating={true} color="#e47f1a" />
                </View>
            ) : (
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.avatar}>
                            <Avatar.Image size={180} source={profile?.isAdmin ? adminAvatar[profile?.gender] : userAvatar[profile?.gender]} />
                            <Text style={{ alignSelf: 'center', marginTop: 8 }}>{profile?.isAdmin ? 'Administrator' : 'Student'}</Text>
                        </View>
                        <Text style={{ fontSize: 21, fontWeight: 'bold' }}>Profile Details:</Text>
                        <View style={{ padding: 30, width: windowWidth }}>
                            <TextInput
                                style={{ width: '100%', marginVertical: 4, backgroundColor: '#eee' }}
                                mode="flat"
                                label="First Name"
                                placeholder="Type something"
                                value={profile?.fname}
                            />
                            <TextInput
                                style={{ width: '100%', marginVertical: 4, backgroundColor: '#eee' }}
                                mode="flat"
                                label="Middle Name"
                                placeholder="Type something"
                                value={profile?.mname}
                            />
                            <TextInput
                                style={{ width: '100%', marginVertical: 4, backgroundColor: '#eee' }}
                                mode="flat"
                                label="Last Name"
                                placeholder="Type something"
                                value={profile?.lname}
                            />
                            <TextInput
                                style={{ width: '100%', marginVertical: 4, backgroundColor: '#eee' }}
                                mode="flat"
                                label="Address"
                                placeholder="Type something"
                                value={profile?.address}
                            />
                            <Text style={{ marginTop: 10 }}>Gender:</Text>
                            <Picker
                                selectedValue={profile?.gender}
                                style={{ backgroundColor: '#eee', height: 50, marginTop: 3 }}
                            >
                                <Picker.Item label="Male" value="male" />
                                <Picker.Item label="Female" value="female" />
                            </Picker>
                            <Button mode="contained" style={styles.button} labelStyle={{ fontSize: 15, fontWeight: 'bold' }} uppercase onPress={() => console.log("pressed")}>
                                Update Profile
                            </Button>
                            <Button icon="logout" mode="contained" style={styles.logoutBtn} labelStyle={{ fontSize: 15, fontWeight: 'bold', color: 'black' }} uppercase onPress={signOut}>
                                Log out
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    avatar: {
        marginVertical: 10
    },
    button: {
        marginTop: 30,
        height: 50,
        justifyContent: 'center',
        backgroundColor: '#e47f1a'
    },
    logoutBtn: {
        marginTop: 5,
        marginBottom: 10,
        height: 50,
        justifyContent: 'center',
        backgroundColor: '#d8d6d6',
    },
})