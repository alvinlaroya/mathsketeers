import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router'
import { Button } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'

import { supabase } from '@/lib/supabase';

import { useProfileStore } from '@/hooks/store';


export default function module1() {
  const profile = useProfileStore(((state: any) => state.profile))

  const [colors, setColors] = useState(['#ff595e', '#ff924c', '#ffca3a', '#c5ca30', '#8ac926', '#52a675', '#1982c4', '#4267ac', '#6a4c93', '#b5a6c9'])
  const [answer, setAnswer] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  const [numbers, setNumbers] = useState([1, 7, 8, 2, 9, 5, 3, 10, 4, 6])
  const [perfect, setPerfect] = useState(false)

  const moveNumber = (direction, idx) => {
    setNumbers(array => {
      let data = [...array];
      let temp = data[idx];
      data[idx] = data[direction === 'down' ? idx + 1 : idx - 1];
      data[direction === 'down' ? idx + 1 : idx - 1] = temp;
      return data;
    })
  }

  useEffect(() => {
    var is_same = (numbers.length == answer.length) && numbers.every(function (element, index) {
      return element === answer[index];
    });

    setPerfect(is_same)
  }, numbers)

  const finish = async () => {
    const { error } = await supabase
      .from('scores')
      .insert({
        fname: profile?.fname,
        mname: profile?.mname,
        lname: profile?.lname,
        module: "quarter-2-module-1",
        module_description: "Order Numbers up to 10 from smallest to largest",
        score: perfect ? '10/10' : '0/10'
      })

    router.back()
  }

  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <View style={{ width: '100%', height: 50, padding: 10 }}>
          <Text style={{ fontSize: 19 }}>Order numbers up to 10 from smallest to largest</Text>
        </View>
        <View style={{ flexDirection: 'column', gap: 10, padding: 20 }}>
          {numbers.map((item, i) => (
            <View key={i} style={{ alignItems: 'center', borderRadius: 15, borderWidth: 4, borderColor: perfect ? '#7CB342': 'transparent', backgroundColor: colors[i], padding: 15, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'white', marginLeft: 15 }}>{item}</Text>
              <View>
                <Pressable onPress={() => moveNumber('up', i)} style={{ borderColor: 'white', borderWidth: 2, backgroundColor: '#1976D2', borderRadius: 50, height: 38, width: 38, justifyContent: 'center', alignItems: 'center' }}>
                  <Ionicons name="caret-up-outline" size={25} color="white" />
                </Pressable>
                <Pressable onPress={() => moveNumber('down', i)} style={{ borderColor: 'white', borderWidth: 2, marginTop: 5, backgroundColor: '#1976D2', borderRadius: 50, height: 38, width: 38, justifyContent: 'center', alignItems: 'center' }}>
                  <Ionicons name="caret-down-outline" size={25} color="white" />
                </Pressable>
              </View>
            </View>
          ))}
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