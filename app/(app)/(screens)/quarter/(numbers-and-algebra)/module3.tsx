import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { Button } from 'react-native-paper';
import { router } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

import { supabase } from '@/lib/supabase';

import { useProfileStore } from '@/hooks/store';

const activity = require('@/assets/images/quarter/activity.jpg');
const q1 = require('@/assets/images/question/numbers-place-1.png');
const q2 = require('@/assets/images/question/numbers-place-2.png');
const q3 = require('@/assets/images/question/numbers-place-3.png');
const q4 = require('@/assets/images/question/numbers-place-4.png');
const q5 = require('@/assets/images/question/numbers-place-5.png');


export default function module1() {
    const profile = useProfileStore(((state: any) => state.profile))

    const [isLoading, setIsLoading] = useState(false);
    const [questions, setQuestions] = useState([
        {
            image: q1,
            keyAnswer: 'ones'
        },
        {
            image: q2,
            keyAnswer: 'ones'
        },
        {
            image: q3,
            keyAnswer: 'tens'
        },
        {
            image: q4,
            keyAnswer: 'ones'
        },
        {
            image: q5,
            keyAnswer: 'ones'
        }
    ])
    const [answers, setAnswers] = useState([]);
    const [answer, setAnswer] = useState('');
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
            {questions.map((question, idx) => {
                if (idx === answers.length) {
                    return (
                        <View style={{ padding: 15, flex: 1 }} key={idx}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                    <Animated.Image entering={FadeInDown.duration(500).delay(400)} source={question.image} style={{ width: '100%', height: 400, objectFit: 'contain' }} />

                                    <View style={{ flexDirection: 'row', gap: 10 }}>
                                        <Pressable onPress={() => setAnswer('ones')} style={{ borderRadius: 20, borderColor: answer === 'ones' ? 'black' : 'transparent', borderWidth: 4, backgroundColor: '#1976D2', width: 90, height: 70, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>Ones</Text>
                                        </Pressable>
                                        <Pressable onPress={() => setAnswer('tens')} style={{ borderRadius: 20, borderColor: answer === 'tens' ? 'black' : 'transparent', borderWidth: 4, backgroundColor: '#ff595e', width: 90, height: 70, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>Tens</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )
                }
            })}


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
                        {answers.length <= 1 ? 'Next Question' : 'Show Result'}
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