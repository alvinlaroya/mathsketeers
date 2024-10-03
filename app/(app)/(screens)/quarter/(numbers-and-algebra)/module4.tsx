import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { Button } from 'react-native-paper';
import { router } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

import { supabase } from '@/lib/supabase';

import { useProfileStore } from '@/hooks/store';

const activity = require('@/assets/images/quarter/activity.jpg');
const q1 = require('@/assets/images/question/numbers-place2-1.png')
const q2 = require('@/assets/images/question/numbers-place2-2.png');
const q3 = require('@/assets/images/question/numbers-place2-3.png');
const q4 = require('@/assets/images/question/numbers-place2-4.png');
const q5 = require('@/assets/images/question/numbers-place2-5.png');


export default function module1() {
    const profile = useProfileStore(((state: any) => state.profile))

    const [isLoading, setIsLoading] = useState(false);
    const [questions, setQuestions] = useState([
        {
            image: q1,
            keyAnswer: 5
        },
        {
            image: q2,
            keyAnswer: 4
        },
        {
            image: q3,
            keyAnswer: 2
        },
        {
            image: q4,
            keyAnswer: 9
        },
        {
            image: q5,
            keyAnswer: 1
        }
    ])
    const [answers, setAnswers] = useState([]);
    const [answer, setAnswer] = useState(null);
    const [score, setScore] = useState(0);

    const nextQuestionHandler = async () => {
        console.log("ANSWER", answer)
        if (answers.length <= 4) {
            setAnswers(oldArray => [...oldArray, answer]);
            setAnswer(0)


            if (questions[answers.length].keyAnswer === answer) {
                setScore(oldScore => oldScore + 1)
            }

        } else {
            setAnswers(oldArray => [...oldArray, answer]);
            setAnswer(0)

            if (questions[answers.length].keyAnswer === answer) {
                setScore(oldScore => oldScore + 1)
            }
        }
    }

    const finish = async () => {
        const { error } = await supabase
            .from('scores')
            .insert({
                fname: profile?.fname,
                mname: profile?.mname,
                lname: profile?.lname,
                module: "quarter-2-module-3",
                module_description: "Determine the place value of a digit in a 2 digit number",
                score: `${score}/5`
            })

        router.back()
    }

    return (
        <View style={{ flex: 1 }}>
            <Image source={activity} style={{ width: '100%', height: 120, objectFit: 'cover' }} />
            {answers.length === 0 && (
                <View style={{ padding: 15, flex: 1 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <Animated.Image entering={FadeInDown.duration(500).delay(400)} source={questions[0].image} style={{ width: '100%', height: 400, objectFit: 'contain' }} />

                            <View style={{ flexDirection: 'row', gap: 10 }}>
                                <Pressable onPress={() => setAnswer(4)} style={{ borderRadius: 20, borderColor: answer === 4 ? 'black' : 'transparent', borderWidth: 4, backgroundColor: '#1976D2', width: 90, height: 70, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>4</Text>
                                </Pressable>
                                <Pressable onPress={() => setAnswer(5)} style={{ borderRadius: 20, borderColor: answer === 5 ? 'black' : 'transparent', borderWidth: 4, backgroundColor: '#ff595e', width: 90, height: 70, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>5</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            )}
            {answers.length === 1 && (
                <View style={{ padding: 15, flex: 1 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <Animated.Image entering={FadeInDown.duration(500).delay(400)} source={questions[1].image} style={{ width: '100%', height: 400, objectFit: 'contain' }} />

                            <View style={{ flexDirection: 'row', gap: 10 }}>
                                <Pressable onPress={() => setAnswer(4)} style={{ borderRadius: 20, borderColor: answer === 4 ? 'black' : 'transparent', borderWidth: 4, backgroundColor: '#1976D2', width: 90, height: 70, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>4</Text>
                                </Pressable>
                                <Pressable onPress={() => setAnswer(5)} style={{ borderRadius: 20, borderColor: answer === 5 ? 'black' : 'transparent', borderWidth: 4, backgroundColor: '#ff595e', width: 90, height: 70, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>5</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            )}
            {answers.length === 2 && (
                <View style={{ padding: 15, flex: 1 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <Animated.Image entering={FadeInDown.duration(500).delay(400)} source={questions[2].image} style={{ width: '100%', height: 400, objectFit: 'contain' }} />

                            <View style={{ flexDirection: 'row', gap: 10 }}>
                                <Pressable onPress={() => setAnswer(2)} style={{ borderRadius: 20, borderColor: answer === 2 ? 'black' : 'transparent', borderWidth: 4, backgroundColor: '#1976D2', width: 90, height: 70, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>2</Text>
                                </Pressable>
                                <Pressable onPress={() => setAnswer(8)} style={{ borderRadius: 20, borderColor: answer === 8 ? 'black' : 'transparent', borderWidth: 4, backgroundColor: '#ff595e', width: 90, height: 70, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>8</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            )}
            {answers.length === 3 && (
                <View style={{ padding: 15, flex: 1 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <Animated.Image entering={FadeInDown.duration(500).delay(400)} source={questions[3].image} style={{ width: '100%', height: 400, objectFit: 'contain' }} />

                            <View style={{ flexDirection: 'row', gap: 10 }}>
                                <Pressable onPress={() => setAnswer(9)} style={{ borderRadius: 20, borderColor: answer === 9 ? 'black' : 'transparent', borderWidth: 4, backgroundColor: '#1976D2', width: 90, height: 70, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>9</Text>
                                </Pressable>
                                <Pressable onPress={() => setAnswer(4)} style={{ borderRadius: 20, borderColor: answer === 4 ? 'black' : 'transparent', borderWidth: 4, backgroundColor: '#ff595e', width: 90, height: 70, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>4</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            )}
            {answers.length === 4 && (
                <View style={{ padding: 15, flex: 1 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <Animated.Image entering={FadeInDown.duration(500).delay(400)} source={questions[4].image} style={{ width: '100%', height: 400, objectFit: 'contain' }} />

                            <View style={{ flexDirection: 'row', gap: 10 }}>
                                <Pressable onPress={() => setAnswer(5)} style={{ borderRadius: 20, borderColor: answer === 5 ? 'black' : 'transparent', borderWidth: 4, backgroundColor: '#1976D2', width: 90, height: 70, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>5</Text>
                                </Pressable>
                                <Pressable onPress={() => setAnswer(1)} style={{ borderRadius: 20, borderColor: answer === 1 ? 'black' : 'transparent', borderWidth: 4, backgroundColor: '#ff595e', width: 90, height: 70, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>1</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            )}


            <View style={{ width: '100%', height: 'auto', paddingBottom: 20, paddingHorizontal: 20 }}>
                {answers.length > 4 && (
                    <View style={{ justifyContent: 'center', alignItems: 'center', height: 300, width: '100%' }}>
                        <Text style={{ fontSize: 45 }}>Your Score</Text>
                        <Text style={{ fontSize: 65, fontWeight: 'bold' }}>{score}/5</Text>
                    </View>
                )}
                {answers.length <= 4 ? (
                    <Button icon="check" mode="contained" loading={isLoading} style={styles.btnNext} labelStyle={{ fontSize: 15, fontWeight: 'bold' }} disabled={isLoading} uppercase
                        onPress={nextQuestionHandler}>
                        {answers.length <= 3 ? 'Next Question' : 'Show Result'}
                    </Button>
                ) : (
                    <Button icon="close" mode="contained" loading={isLoading} style={styles.btnNext} labelStyle={{ fontSize: 15, fontWeight: 'bold' }} disabled={isLoading} uppercase
                        onPress={finish}>
                        Finish
                    </Button>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    btnNext: {
        height: 50,
        justifyContent: 'center',
        backgroundColor: '#7CB342',
        borderRadius: 10,
        marginTop: 20
    }
})