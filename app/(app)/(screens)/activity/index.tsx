import React, { useState, useEffect } from 'react'
import { StyleSheet, StatusBar, Text, View, Image, Pressable, FlatList } from 'react-native'
import { Avatar, TextInput } from 'react-native-paper';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { useLocalSearchParams, router } from 'expo-router';

import { supabase } from '@/lib/supabase';

const male = require(`@/assets/images/male-avatar.png`);

export default function UserProfile() {
    const params = useLocalSearchParams();
    const { module, module_description } = params;
    const [activityScores, setActivityScores] = useState([])

    useEffect(() => {
        const fetchActivityScores = async () => {
            let { data: scores, error } = await supabase
                .from('scores')
                .select("*")
                .eq('module', module)

            setActivityScores(scores)
        }

        fetchActivityScores()
    }, [])

    return (
        <Animated.View entering={FadeInDown.duration(400).delay(200)} style={styles.container}>
            <Text style={{ fontWeight: 'bold', marginTop: 9, marginLeft: 10, fontSize: 15 }}>{module_description}</Text>
            <View style={{ padding: 0, width: '100%' }}>
                <FlatList
                    style={{ marginTop: 15 }}
                    data={activityScores}
                    renderItem={({ item }) => (
                        <Animated.View style={styles.item} entering={FadeInDown.duration(200).delay(40)}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ width: '80%', flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
                                    <Animated.Image source={male} style={{ width: 45, height: 45, objectFit: 'contain' }} />
                                    <View>
                                        <Text style={styles.title}>{item.fname} {item.mname} {item.lname}</Text>
                                    </View>
                                </View>
                                <View style={{ width: '20%', alignContent: 'flex-end', alignItems: 'flex-end', paddingRight: 10 }}>
                                    <Text style={{ fontSize: 25, fontWeight: 'bold ' }}>{item?.score}</Text>
                                </View>
                            </View>

                        </Animated.View>)}
                    keyExtractor={item => item.id}
                />
            </View>
        </Animated.View >
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, marginTop: 15 /* marginTop: StatusBar.currentHeight */ },
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
        fontSize: 17,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    subtitle: { fontSize: 10, marginLeft: 10 }
});
