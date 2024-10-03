import { StyleSheet, Text, View, ScrollView, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router'
import { Button, TextInput } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'

import { supabase } from '@/lib/supabase';

import { useProfileStore } from '@/hooks/store';


export default function module1() {
    const profile = useProfileStore(((state: any) => state.profile))

    const [q1_ans1, setQ1_Ans1] = useState(undefined);
    const [q1_ans2, setQ1_Ans2] = useState(undefined);
    const [q1_ans3, setQ1_Ans3] = useState(undefined);
    const [q1_ans4, setQ1_Ans4] = useState(undefined);
    const [q1_ans5, setQ1_Ans5] = useState(undefined);

    const [q2_ans1, setQ2_Ans1] = useState(undefined);
    const [q2_ans2, setQ2_Ans2] = useState(undefined);
    const [q2_ans3, setQ2_Ans3] = useState(undefined);
    const [q2_ans4, setQ2_Ans4] = useState(undefined);
    const [q2_ans5, setQ2_Ans5] = useState(undefined);

    const [q3_ans1, setQ3_Ans1] = useState(undefined);
    const [q3_ans2, setQ3_Ans2] = useState(undefined);
    const [q3_ans3, setQ3_Ans3] = useState(undefined);
    const [q3_ans4, setQ3_Ans4] = useState(undefined);
    const [q3_ans5, setQ3_Ans5] = useState(undefined);

    const finish = async () => {
        let score = 0;

        if (q1_ans1 == '2' && q1_ans2 == '4' && q1_ans3 == '6' && q1_ans4 == '8' && q1_ans5 == '10') {
            score++;
        }
        if (q2_ans1 === '5' && q2_ans2 === '10' && q2_ans3 === '15' && q2_ans4 === '20' && q2_ans5 === '25') {
            score++;
        }
        if (q3_ans1 === '10' && q3_ans2 === '20' && q3_ans3 === '30' && q3_ans4 === '40' && q3_ans5 === '50') {
            score++;
        }

        console.log("SCORE", score)

        const { error } = await supabase
            .from('scores')
            .insert({
                fname: profile?.fname,
                mname: profile?.mname,
                lname: profile?.lname,
                module: "quarter-2-module-2",
                module_description: "Count by 2s, 5s, 10s up to 100",
                score: `${score}/3`
            })

        router.back()
    }

    return (
        <ScrollView>
            <View style={{ flex: 1 }}>
                <View style={{ width: '100%', height: 50, padding: 15, backgroundColor: '#1982c4' }}>
                    <Text style={{ fontSize: 24, color: 'white' }}>Count by 2s up to 10</Text>
                </View>
                <View style={{ padding: 10, display: 'flex', flexDirection: 'column', gap: 15 }}>
                    <View>
                        <TextInput placeholder='Enter Number (1 - 10 numbers only)' keyboardType='numeric' onChangeText={(value) => {
                            if (Number(value) > 10) {
                                alert("Input from 1-10 numbers only!")
                            } else {
                                setQ1_Ans1(value)
                            }
                        }} />
                        <Text>{q1_ans1}</Text>
                    </View>
                    <View>
                        <TextInput placeholder='Enter Number (1 - 10 numbers only)' keyboardType='numeric' onChangeText={(value) => {
                            if (Number(value) > 10) {
                                alert("Input from 1-10 numbers only!")
                            } else {
                                setQ1_Ans2(value)
                            }
                        }} />
                    </View>
                    <View>
                        <TextInput placeholder='Enter Number (1 - 10 numbers only)' keyboardType='numeric' onChangeText={(value) => {
                            if (Number(value) > 10) {
                                alert("Input from 1-10 numbers only!")
                            } else {
                                setQ1_Ans3(value)
                            }
                        }} />
                    </View>
                    <View>
                        <TextInput placeholder='Enter Number (1 - 10 numbers only)' keyboardType='numeric' onChangeText={(value) => {
                            if (Number(value) > 10) {
                                alert("Input from 1-10 numbers only!")
                            } else {
                                setQ1_Ans4(value)
                            }
                        }} />
                    </View>
                    <View>
                        <TextInput placeholder='Enter Number (1 - 10 numbers only)' keyboardType='numeric' onChangeText={(value) => {
                            if (Number(value) > 10) {
                                alert("Input from 1-10 numbers only!")
                            } else {
                                setQ1_Ans5(value)
                            }
                        }} />
                    </View>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ width: '100%', height: 50, padding: 15, backgroundColor: '#52a675', marginTop: 20 }}>
                    <Text style={{ fontSize: 24, color: 'white' }}>Count by 5s up to 25</Text>
                </View>
                <View style={{ padding: 10, display: 'flex', flexDirection: 'column', gap: 15 }}>
                    <View>
                        <TextInput placeholder='Enter Number (1 - 25 numbers only)' keyboardType='numeric' onChangeText={(value) => {
                            if (Number(value) > 25) {
                                alert("Input from 1-25 numbers only!")
                            } else {
                                setQ2_Ans1(value)
                            }
                        }} />
                    </View>
                    <View>
                        <TextInput placeholder='Enter Number (1 - 25 numbers only)' keyboardType='numeric' onChangeText={(value) => {
                            if (Number(value) > 25) {
                                alert("Input from 1-25 numbers only!")
                            } else {
                                setQ2_Ans2(value)
                            }
                        }} />
                    </View>
                    <View>
                        <TextInput placeholder='Enter Number (1 - 25 numbers only)' keyboardType='numeric' onChangeText={(value) => {
                            if (Number(value) > 25) {
                                alert("Input from 1-25 numbers only!")
                            } else {
                                setQ2_Ans3(value)
                            }
                        }} />
                    </View>
                    <View>
                        <TextInput placeholder='Enter Number (1 - 25 numbers only)' keyboardType='numeric' onChangeText={(value) => {
                            if (Number(value) > 25) {
                                alert("Input from 1-25 numbers only!")
                            } else {
                                setQ2_Ans4(value)
                            }
                        }} />
                    </View>
                    <View>
                        <TextInput placeholder='Enter Number (1 - 25 numbers only)' keyboardType='numeric' onChangeText={(value) => {
                            if (Number(value) > 25) {
                                alert("Input from 1-25 numbers only!")
                            } else {
                                setQ2_Ans5(value)
                            }
                        }} />
                    </View>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ width: '100%', height: 50, padding: 15, backgroundColor: '#ff595e', marginTop: 20 }}>
                    <Text style={{ fontSize: 24, color: 'white' }}>Count by 10s up to 50</Text>
                </View>
                <View style={{ padding: 10, display: 'flex', flexDirection: 'column', gap: 15 }}>
                    <View>
                        <TextInput placeholder='Enter Number (1 - 50 numbers only)' keyboardType='numeric' onChangeText={(value) => {
                            if (Number(value) > 50) {
                                alert("Input from 1-50 numbers only!")
                            } else {
                                setQ3_Ans1(value)
                            }
                        }} />
                    </View>
                    <View>
                        <TextInput placeholder='Enter Number (1 - 50 numbers only)' keyboardType='numeric' onChangeText={(value) => {
                            if (Number(value) > 50) {
                                alert("Input from 1-50 numbers only!")
                            } else {
                                setQ3_Ans2(value)
                            }
                        }} />
                    </View>
                    <View>
                        <TextInput placeholder='Enter Number (1 - 50 numbers only)' keyboardType='numeric' onChangeText={(value) => {
                            if (Number(value) > 50) {
                                alert("Input from 1-50 numbers only!")
                            } else {
                                setQ3_Ans3(value)
                            }
                        }} />
                    </View>
                    <View>
                        <TextInput placeholder='Enter Number (1 - 50 numbers only)' keyboardType='numeric' onChangeText={(value) => {
                            if (Number(value) > 50) {
                                alert("Input from 1-50 numbers only!")
                            } else {
                                setQ3_Ans4(value)
                            }
                        }} />
                    </View>
                    <View>
                        <TextInput placeholder='Enter Number (1 - 50 numbers only)' keyboardType='numeric' onChangeText={(value) => {
                            if (Number(value) > 50) {
                                alert("Input from 1-50 numbers only!")
                            } else {
                                setQ3_Ans5(value)
                            }
                        }} />
                    </View>
                </View>
            </View>
            <Button icon="close" mode="contained" style={styles.btnNext} labelStyle={{ fontSize: 15, fontWeight: 'bold' }} uppercase
                onPress={finish}>
                Finish
            </Button>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    btnNext: {
        height: 50,
        justifyContent: 'center',
        backgroundColor: '#7CB342',
        borderRadius: 0,
        marginTop: 20
    }
})