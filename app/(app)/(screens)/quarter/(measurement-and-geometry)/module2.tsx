import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { Button } from 'react-native-paper';
import { router } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

import { supabase } from '@/lib/supabase';

import { useProfileStore } from '@/hooks/store';

const activity = require('@/assets/images/quarter/activity.jpg');
const q1 = require('@/assets/images/question/compare-len-1.png');
const q2 = require('@/assets/images/question/compare-len-2.png');
const q3 = require('@/assets/images/question/compare-len-3.png');


export default function module1() {
  const profile = useProfileStore(((state: any) => state.profile))

  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([
    {
      image: q1,
      keyAnswer: 1
    },
    {
      image: q2,
      keyAnswer: 2
    },
    {
      image: q3,
      keyAnswer: 2
    }
  ])
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState(0);
  const [score, setScore] = useState(0);

  const nextQuestionHandler = async () => {
    console.log("ANSWER", answer)
    if (answers.length <= 2) {
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

  const getSchoolyear = () => {
    const d = new Date();
    let month = d.getMonth();
    let year = d.getFullYear();
    let sy1 = null;
    let sy2 = null;

    console.log("YEAR", year)

    console.log("MONTH", month)

    if (month <= 12 && month > 6) {
      sy1 = year;
      sy2 = year + 1;
    } else {
      sy1 = year - 1
      sy2 = year
    }

    return `${sy1}-${sy2}`
  }

  const finish = async () => {
    const { error } = await supabase
      .from('scores')
      .insert({
        fname: profile?.fname,
        mname: profile?.mname,
        lname: profile?.lname,
        module: "quarter-1-module-2",
        module_description: "Compare lengths and distance using non standard",
        score: `${score}/3`,
        userId: profile?.id,
        score_value: score,
        school_year: getSchoolyear()
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
                    <Pressable onPress={() => setAnswer(1)} style={{ borderRadius: 20, borderColor: answer === 1 ? 'black' : 'transparent', borderWidth: 4, backgroundColor: '#1976D2', width: 70, height: 70, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>1</Text>
                    </Pressable>
                    <Pressable onPress={() => setAnswer(2)} style={{ borderRadius: 20, borderColor: answer === 2 ? 'black' : 'transparent', borderWidth: 4, backgroundColor: '#1976D2', width: 70, height: 70, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>2</Text>
                    </Pressable>
                    <Pressable onPress={() => setAnswer(3)} style={{ borderRadius: 20, borderColor: answer === 3 ? 'black' : 'transparent', borderWidth: 4, backgroundColor: '#1976D2', width: 70, height: 70, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>3</Text>
                    </Pressable>
                    <Pressable onPress={() => setAnswer(4)} style={{ borderRadius: 20, borderColor: answer === 4 ? 'black' : 'transparent', borderWidth: 4, backgroundColor: '#1976D2', width: 70, height: 70, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>4</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          )
        }
      })}


      <View style={{ width: '100%', height: 'auto', paddingBottom: 20, paddingHorizontal: 20 }}>
        {answers.length > 2 && (
          <View style={{ justifyContent: 'center', alignItems: 'center', height: 300, width: '100%' }}>
            <Text style={{ fontSize: 45 }}>Your Score</Text>
            <Text style={{ fontSize: 65, fontWeight: 'bold' }}>{score}/3</Text>
          </View>
        )}
        {answers.length <= 2 ? (
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