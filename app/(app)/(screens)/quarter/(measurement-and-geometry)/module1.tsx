import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TextInput } from 'react-native'
import { Button } from 'react-native-paper';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const activity = require('@/assets/images/quarter/activity.jpg');
const clip = require('@/assets/images/quarter/clips.png');

export default function module1() {
    const [isLoading, setIsLoading] = useState(false);
    const [questions, setQuestions] = useState([
        {
            description: 'How many clips is this spaceship? fill those clips',
            image: 'https://webstockreview.net/images/spaceship-clipart-red-17.png',
            keyAnswer: 3
        },
        {
            description: 'How many clips is this spaceship? fill those clips',
            image: 'http://www.clipartbest.com/cliparts/9iz/6B6/9iz6B679T.png',
            keyAnswer: 3
        },
        {
            description: 'How many clips is this spaceship? fill those clips',
            image: 'http://www.clipartbest.com/cliparts/9iz/6B6/9iz6B679T.png',
            keyAnswer: 3
        },
        {
            description: 'How many clips is this spaceship? fill those clips',
            image: 'http://cliparts.co/cliparts/8T6/8RM/8T68RMeac.png',
            keyAnswer: 3
        }
    ])
    const [answers, setAnswers] = useState([]);
    const [answer, setAnswer] = useState(['clip']);

    const removeClipHandler = () => {
        let tempArr = [...answer]
        if (answer.length <= 1) return;
        tempArr.pop()
        setAnswer(tempArr)
    }
    const addClipHandler = () => {
        let tempArr = [...answer]
        if (answer.length >= 8) return;
        tempArr.push('clip')
        setAnswer(tempArr)
    }

    const nextQuestionHandler = () => {
        {
            setIsLoading(true);
            let tempArr = [...answers]
            setTimeout(() => {
                tempArr.push(answer.length)
                setAnswers(tempArr)
                setAnswer(['clip'])
                setIsLoading(false);
            }, 2000)
        }
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
                                    <Animated.Image entering={FadeInDown.duration(500).delay(400)} source={{ uri: question.image }} style={{ width: 220, height: 220, objectFit: 'contain' }} />
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
                <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Button icon="minus" mode="contained" style={styles.btnRemove} labelStyle={{ fontSize: 15, fontWeight: 'bold' }} disabled={isLoading} uppercase onPress={removeClipHandler}>
                        Remove Clip
                    </Button>
                    <Button icon="plus" mode="contained" style={styles.btnAdd} labelStyle={{ fontSize: 15, fontWeight: 'bold' }} disabled={isLoading} uppercase onPress={addClipHandler}>
                        Add Clip
                    </Button>
                </View>
                <Button icon="check" mode="contained" loading={isLoading} style={styles.btnNext} labelStyle={{ fontSize: 15, fontWeight: 'bold' }} disabled={isLoading} uppercase
                    onPress={nextQuestionHandler}>
                    Next Question
                </Button>
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