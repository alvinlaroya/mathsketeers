import React, { useState, useEffect } from 'react'
import { StyleSheet, StatusBar, Text, View, Image, Pressable, FlatList, Dimensions, ScrollView } from 'react-native'
import { Avatar, Button, TextInput } from 'react-native-paper';
import UserAvatar from '../../components/Avatar';
import Animated, { FadeInDown } from 'react-native-reanimated';
import {
    LineChart
} from "react-native-chart-kit";

import { useLocalSearchParams, router } from 'expo-router';

import { supabase } from '@/lib/supabase';

const male = require(`@/assets/images/male-avatar.png`);

export default function UserProfile() {
    const params = useLocalSearchParams();
    const { module, module_description } = params;
    const [loadingActivity, setLoadingActivity] = useState(false)
    const [activityScores, setActivityScores] = useState([])
    const [searchUsers, setSearchUsers] = useState([])
    const [search, setSearch] = useState('')
    const [userDetails, setUserDetails] = useState(null)
    const [currentModule, setCurrentModule] = useState([])
    const [chartLabels, setChartLabels] = useState([]);
    const [chartData, setChartData] = useState([])
    const [displayChart, setDisplayChart] = useState(false)

    const fetchActivityScores = async (userId) => {
        setLoadingActivity(true)
        let { data: scores, error } = await supabase
            .from('scores')
            .select("*")
            .eq('module', module)
            .eq('userId', userId)


        if (error) {
            console.error("Error searching activity")
            return;
        }

        console.log('activities', scores)
        setActivityScores(scores)
        const clabels = scores?.map(item => `SY: ${item?.school_year ?? 'SY'}`) ?? []
        const cdata = scores?.map(item => Number(item?.score_value)) ?? []
        setChartLabels(clabels)
        setChartData(cdata)
        setCurrentModule(scores?.length > 0 ? scores.filter(item => item.school_year === getSchoolyear()) : null)
        setLoadingActivity(false)
        setTimeout(() => {
            setDisplayChart(true)
        }, 2000)
    }

    const getSchoolyear = () => {
        const d = new Date();
        let month = d.getMonth();
        let year = d.getFullYear();
        let sy1 = null;
        let sy2 = null;

        if (month <= 12 && month > 6) {
            sy1 = year;
            sy2 = year + 1;
        } else {
            sy1 = year - 1
            sy2 = year
        }

        return `${sy1}-${sy2}`
    }


    useEffect(() => {
        const fetchUsers = async () => {
            let { data: users, error } = await supabase
                .from('profiles')
                .select("*")
                .is('isAdmin', null)
                .ilike('fname', `%${search}%`)


            if (error) {
                console.error("Error searching student")
                return;
            }
            setSearchUsers(users)
        }

        fetchUsers()
    }, [search])



    return (
        <ScrollView>
            <Animated.View entering={FadeInDown.duration(400).delay(200)} style={styles.container}>
                <Text style={{ fontWeight: 'bold', marginTop: 9, marginLeft: 10, fontSize: 15 }}>{module_description}</Text>
                <TextInput
                    style={{ width: '100%', marginVertical: 4 }}
                    mode="outlined"
                    label="Search Name"
                    placeholder="Type something"
                    onChangeText={setSearch}
                />
                <View style={{ padding: 0, width: '100%' }}>
                    <Text style={{ marginTop: 15 }}>List of students</Text>
                    {searchUsers?.length > 0 && (
                        searchUsers.map(item => (
                            <Pressable key={item.id} onPress={() => {
                                setUserDetails(item);
                                fetchActivityScores(item?.id);
                            }}>
                                <Animated.View style={styles.item} entering={FadeInDown.duration(200).delay(40)}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <View style={{ width: '80%', flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
                                            {item?.avatar ? (
                                                <UserAvatar
                                                    size={50}
                                                    url={item?.avatar}

                                                />
                                            ) : (
                                                <Animated.Image source={male} style={{ width: 45, height: 45, objectFit: 'contain' }} />
                                            )}

                                            <View>
                                                <Text style={styles.title}>{item?.fname} {item?.mname} {item?.lname}</Text>
                                            </View>
                                        </View>
                                    </View>

                                </Animated.View>
                            </Pressable>
                        ))
                    )}

                    {loadingActivity && !displayChart ? (
                        <View style={{ display: 'flex', width: '100%', alignItems: 'center', marginTop: 20 }}>
                            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Fetching Activity</Text>
                        </View>
                    ) : activityScores?.length > 0 && searchUsers?.length > 0 ? (
                        <>
                            <View style={{ display: 'flex', width: '100%', marginTop: 20 }}>
                                <View style={{ display: 'flex', flexDirection: 'column', marginTop: 5 }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Name: </Text>
                                    <Text style={{ fontSize: 15, borderRadius: 5, backgroundColor: 'white', padding: 4, marginTop: 2 }}>{userDetails?.fname} {userDetails?.mname} {userDetails?.lname}</Text>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'column', marginTop: 5 }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Module: </Text>
                                    <Text style={{ fontSize: 15, borderRadius: 5, backgroundColor: 'white', padding: 4, marginTop: 2 }}>{module_description}</Text>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'column', marginTop: 5 }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>School Year: </Text>
                                    <Text style={{ fontSize: 15, borderRadius: 5, backgroundColor: 'white', padding: 4, marginTop: 2 }}>{getSchoolyear()}</Text>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'column', marginTop: 5 }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Score: </Text>
                                    <Text style={{ fontSize: 15, borderRadius: 5, backgroundColor: 'white', padding: 4, marginTop: 2 }}>{currentModule[0]?.score}</Text>
                                </View>
                            </View>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 25 }}>Scores Graph Every School Year</Text>
                            <View style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                <LineChart
                                    data={{
                                        labels: [...chartLabels],
                                        datasets: [
                                            {
                                                data: [...chartData]
                                            }
                                        ]
                                    }}
                                    width={350} // from react-native
                                    height={220}
                                    yAxisLabel="Score:"
                                    yAxisInterval={1} // optional, defaults to 1
                                    chartConfig={{
                                        backgroundColor: "#e26a00",
                                        backgroundGradientFrom: "#fb8c00",
                                        backgroundGradientTo: "#ffa726",
                                        decimalPlaces: 0, // optional, defaults to 2dp
                                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                        style: {
                                            borderRadius: 16
                                        },
                                        propsForDots: {
                                            r: "6",
                                            strokeWidth: "2",
                                            stroke: "#ffa726"
                                        }
                                    }}
                                    bezier
                                    style={{
                                        marginVertical: 8,
                                        borderRadius: 16,
                                        marginTop: 10
                                    }}
                                />
                            </View>
                        </>
                    ) : (
                        <View style={{ display: 'flex', width: '100%', alignItems: 'center', marginTop: 20 }}>
                            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>No Activities To Display</Text>
                        </View>
                    )}
                </View>
            </Animated.View >
        </ScrollView>
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
        marginHorizontal: 0,
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
