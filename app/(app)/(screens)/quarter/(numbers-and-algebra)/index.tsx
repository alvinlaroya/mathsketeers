import React from 'react'
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function index() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 19 }}>2. Place value in any 2 digit numbers</Text>
        <Text style={{ fontSize: 19 }}>3. Addition of numbers with sums up to 20</Text>
      </View>
      <ScrollView>
        <Pressable onPress={() => router.push('/(screens)/quarter/(numbers-and-algebra)/module1')}>
          <LinearGradient
            colors={['#7CB342', '#7CB342', '#689F38']}
            style={{ padding: 25, backgroundColor: 'green', borderRadius: 15, marginHorizontal: 20 }}
          >
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Module 1</Text>
            <Text style={{ fontSize: 17, marginTop: 5, color: 'white' }}>
              Order numbers up to 10 from smallest to largest
            </Text>
          </LinearGradient>
        </Pressable>
        <Pressable onPress={() => router.push('/(screens)/quarter/(numbers-and-algebra)/module2')}>
          <LinearGradient
            colors={['#03A9F4', '#039BE5', '#0288D1']}
            style={{ padding: 25, backgroundColor: 'green', borderRadius: 15, marginHorizontal: 20, marginTop: 25 }}
          >
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Module 2</Text>
            <Text style={{ fontSize: 17, marginTop: 5, color: 'white' }}>
              Counts by 2s, 5s, 10s up to 50
            </Text>
          </LinearGradient>
        </Pressable>
        <Pressable onPress={() => router.push('/(screens)/quarter/(numbers-and-algebra)/module3')}>
          <LinearGradient
            colors={['#E57373', '#F44336', '#E53935']}
            style={{ padding: 25, backgroundColor: 'green', borderRadius: 15, marginHorizontal: 20, marginTop: 25 }}
          >
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Module 3</Text>
            <Text style={{ fontSize: 17, marginTop: 5, color: 'white' }}>
              Determine the place value of a digit in a 2-digit number
            </Text>
          </LinearGradient>
        </Pressable>
        <Pressable onPress={() => router.push('/(screens)/quarter/(numbers-and-algebra)/module4')}>
          <LinearGradient
            colors={['#1982c4', '#4267ac', '#6a4c93']}
            style={{ padding: 25, backgroundColor: 'green', borderRadius: 15, marginHorizontal: 20, marginTop: 25 }}
          >
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Module 4</Text>
            <Text style={{ fontSize: 17, marginTop: 5, color: 'white' }}>
              Determine the digit of a number, given its place value.
            </Text>
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({})