import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TextInput } from 'react-native'
import { Button } from 'react-native-paper';
import { router } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

import { supabase } from '@/lib/supabase';

import { useProfileStore } from '@/hooks/store';

const activity = require('@/assets/images/quarter/activity.jpg');
const clip = require('@/assets/images/quarter/clips.png');
const q1 = require('@/assets/images/question/spaceship-clipart-red-17.png');
const q2 = require('@/assets/images/question/9iz6B679T.png');
const q3 = require('@/assets/images/question/th.jpg');
const q4 = require('@/assets/images/question/8T68RMeac.png');
const q5 = require('@/assets/images/question/spaceship-clipart-ufo-abduction-9.png');


export default function module1() {
    const profile = useProfileStore(((state: any) => state.profile))

    const [isLoading, setIsLoading] = useState(false);
    const [questions, setQuestions] = useState([
        {
            description: 'How many clips is this spaceship? fill those clips',
            image: q1,
            keyAnswer: 5
        },
        {
            description: 'How many clips is this spaceship? fill those clips',
            image: q2,
            keyAnswer: 5
        },
        {
            description: 'How many clips is this spaceship? fill those clips',
            image: q3,
            keyAnswer: 5
        },
        {
            description: 'How many clips is this spaceship? fill those clips',
            image: q4,
            keyAnswer: 4
        },
        {
            description: 'How many clips is this spaceship? fill those clips',
            image: q5,
            keyAnswer: 4
        }
    ])
    const [answers, setAnswers] = useState([]);
    const [answer, setAnswer] = useState(['clip']);
    const [score, setScore] = useState(0);


    const removeClipHandler = () => {
        let tempArr = [...answer]
        if (answer.length <= 1) return;
        tempArr.pop()
        setAnswer(tempArr)
    }
    const addClipHandler = () => {
        if (answer.length >= 8) return;
        setAnswer(oldAnswer => [...oldAnswer, 'clip'])
    }

    const nextQuestionHandler = () => {
        if (answers.length <= 3) {
            setAnswers(oldArray => [...oldArray, answer.length]);
            setAnswer(['clip'])


            if (questions[answers.length].keyAnswer === answer.length) {
                setScore(oldScore => oldScore + 1)
            }

        } else {
            setAnswers(oldArray => [...oldArray, answer.length]);
            setAnswer(['clip'])

            if (questions[answers.length].keyAnswer === answer.length) {
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
            module: "quarter-1-module-1",
            module_description: "Measure the length of an object and the distance between two objects using none-standart units",
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
                            <Text style={{ fontSize: 16 }}>{question.description}</Text>
                            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                    <Animated.Image entering={FadeInDown.duration(500).delay(400)} source={question.image} style={{ width: 220, height: 220, objectFit: 'contain' }} />
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3, width: 'auto' }}>
                                        {answer.map((_, idx) => (
                                            <Animated.Image key={idx} entering={FadeInUp.duration(200).delay(70)} source={clip} style={{ width: 40, height: 15 }} />
                                        ))}
                                    </View>
                                    <Text style={{ fontSize: 19, marginTop: 15 }}>{answer.length} {answer.length <= 1 ? 'Clip' : 'Clips'}</Text>
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
                {answers.length <= 4 && (
                    <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button icon="minus" mode="contained" style={styles.btnRemove} labelStyle={{ fontSize: 15, fontWeight: 'bold' }} disabled={isLoading} uppercase onPress={removeClipHandler}>
                            Remove Clip
                        </Button>
                        <Button icon="plus" mode="contained" style={styles.btnAdd} labelStyle={{ fontSize: 15, fontWeight: 'bold' }} disabled={isLoading} uppercase onPress={addClipHandler}>
                            Add Clip
                        </Button>
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
    btnRemove: {
        height: 50,
        width: '50%',
        justifyContent: 'center',
        backgroundColor: '#D32F2F',
        borderRadius: 0,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    btnAdd: {
        height: 50,
        width: '50%',
        justifyContent: 'center',
        backgroundColor: '#1976D2',
        borderRadius: 0,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    btnNext: {
        height: 50,
        justifyContent: 'center',
        backgroundColor: '#7CB342',
        borderRadius: 10,
        marginTop: 20
    }
})