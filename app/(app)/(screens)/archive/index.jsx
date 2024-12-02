import React, { useState, useEffect } from 'react'
import { StyleSheet, StatusBar, Text, View, Image, Pressable, FlatList, Dimensions, ScrollView } from 'react-native'
import { Avatar, Button, Modal, Portal, PaperProvider, TextInput } from 'react-native-paper';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useLocalSearchParams, router } from 'expo-router';
import SelectDropdown from 'react-native-select-dropdown'
import Ionicons from 'react-native-vector-icons/Ionicons';

import { supabase } from '@/lib/supabase';

const male = require(`@/assets/images/male-avatar.png`);

export default function UserProfile() {
    const params = useLocalSearchParams();
    const { module, module_description } = params;
    const [activities, setActivityScores] = useState([])
    const [school_years, setSchollYears] = useState([])
    const [currentSy, setCurrentSy] = useState('')
    const [selectedItem, setSelectedItem] = useState('');
    const [visible, setVisible] = useState(false);
    const [archiveSy, setArchiveSy] = useState('')

    const fetchSchoolYear = async (userId) => {
        let { data: syData, error } = await supabase
            .from('school_year')
            .select("*")
            .order('sy', { ascending: true })

        if (error) {
            console.error("Error fetching sy")
            return;
        }

        syData.push({
            id: 0,
            sy: getSchoolyear()
        })

        console.log('sy', syData)
        setSchollYears(syData)
    }

    useEffect(() => {
        fetchSchoolYear()
        setCurrentSy(getSchoolyear())
    }, [])


    const fetchActivityScores = async (userId) => {
        let { data: scores, error } = await supabase
            .from('scores')
            .select("*")
            .eq('module', module)
            .eq('school_year', getSchoolyear())


        if (error) {
            console.error("Error fetching activity")
            return;
        }

        console.log('activities', scores)
        setActivityScores(scores)
    }

    useEffect(() => {
        fetchActivityScores()
    }, [])


    const fetchActivityScoresArchived = async (sy) => {
        if (sy === getSchoolyear()) {
            fetchActivityScores()
        } else {
            let { data: scores, error } = await supabase
                .from('scores')
                .select("*")
                .eq('module', module)
                .eq('archived_at', sy)


            if (error) {
                console.error("Error fetching activity")
                return;
            }

            console.log('activities filter', scores)
            setActivityScores(scores)
        }

    }

    const archiveHandler = () => {
        setVisible(true)
    }

    const confirmArchive = async () => {
        const { data, error } = await supabase
            .from('scores')
            .upsert(activities.map(item => ({
                ...item,
                archived_at: archiveSy
            })))

        setVisible(false)

        if (error) {
            console.error("Error archiving data", error)
        }
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


    return (
        <PaperProvider>
            <ScrollView>
                <Animated.View entering={FadeInDown.duration(400).delay(200)} style={styles.container}>
                    <Portal>
                        <Modal visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={{ backgroundColor: 'white', padding: 20 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>Archive</Text>
                            <TextInput
                                style={{ width: '100%', marginVertical: 4 }}
                                mode="outlined"
                                label="School-Year"
                                value={getSchoolyear()}
                            />
                            <View>
                                <Button onPress={confirmArchive}>
                                    Confirm
                                </Button>
                                <Button textColor='red' onPress={() => setVisible(false)}>
                                    Cancel
                                </Button>
                            </View>
                        </Modal>
                    </Portal>
                    <Text style={{ fontWeight: 'bold', marginTop: 9, marginLeft: 10, fontSize: 15 }}>{module_description}</Text>
                    <SelectDropdown
                        data={school_years}
                        onSelect={(selectedItem, index) => {
                            setCurrentSy(selectedItem?.sy)
                            fetchActivityScoresArchived(selectedItem?.sy)
                        }}
                        renderButton={(selectedItem, isOpened) => {
                            return (
                                <View style={styles.dropdownButtonStyle}>
                                    <Text style={styles.dropdownButtonTxtStyle}>
                                        {(selectedItem && selectedItem.sy) || 'Select school year'}
                                    </Text>
                                    <Ionicons name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                                </View>
                            );
                        }}
                        renderItem={(item, index, isSelected) => {
                            return (
                                <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                                    <Text style={styles.dropdownItemTxtStyle}>{item.sy}</Text>
                                </View>
                            );
                        }}
                        showsVerticalScrollIndicator={false}
                        dropdownStyle={styles.dropdownMenuStyle}
                    />
                    <Button onPress={archiveHandler}>
                        Archive
                    </Button>
                    <View style={{ padding: 0, width: '100%', padding: 10 }}>
                        <Text style={{ marginTop: 15 }}>List of students</Text>
                        {activities?.length > 0 && (
                            activities.map(item => (
                                <Animated.View key={item.id} style={styles.item} entering={FadeInDown.duration(200).delay(40)}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <View style={{ width: '80%', flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
                                            <Animated.Image source={male} style={{ width: 45, height: 45, objectFit: 'contain' }} />

                                            <View>
                                                <Text style={styles.title}>{item?.fname} {item?.mname} {item?.lname}</Text>
                                            </View>
                                        </View>
                                        <View style={{ alignItems: 'flex-end', width: '20%' }}>
                                            <Text style={{ fontSize: 12, marginRight: 5 }}>{item?.score}</Text>
                                        </View>
                                    </View>

                                </Animated.View>
                            ))
                        )}
                    </View>
                </Animated.View >
            </ScrollView>
        </PaperProvider >
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
        fontSize: 12,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    subtitle: { fontSize: 10, marginLeft: 10 },
    dropdownButtonStyle: {
        width: '100%',
        height: 50,
        marginTop: 5,
        backgroundColor: '#E9ECEF',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownButtonArrowStyle: {
        fontSize: 20,
    },
    dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownItemIconStyle: {
        fontSize: 18,
        marginRight: 8,
    },
});
