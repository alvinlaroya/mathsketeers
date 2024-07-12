import React from 'react'
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function index() {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 19 }}>Measurement of lenght and distance using non-standard units.</Text>
            </View>
            <ScrollView>
                <Pressable onPress={() => router.push('/(screens)/quarter/(measurement-and-geometry)/module1')}>
                    <LinearGradient
                        colors={['#7CB342', '#7CB342', '#689F38']}
                        style={{ padding: 25, backgroundColor: 'green', borderRadius: 15, marginHorizontal: 20 }}
                    >
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Module 1</Text>
                        <Text style={{ fontSize: 17, marginTop: 5, color: 'white' }}>
                            Measure the length of an object and the distance between two objects using non-standard-units.
                        </Text>
                    </LinearGradient>
                </Pressable>
                <Pressable onPress={() => router.push('/(screens)/quarter/(measurement-and-geometry)/module2')}>
                    <LinearGradient
                        colors={['#03A9F4', '#039BE5', '#0288D1']}
                        style={{ padding: 25, backgroundColor: 'green', borderRadius: 15, marginHorizontal: 20, marginTop: 25 }}
                    >
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Module 2</Text>
                        <Text style={{ fontSize: 17, marginTop: 5, color: 'white' }}>
                            Compare lengths and distances using non-standard units.
                        </Text>
                    </LinearGradient>
                </Pressable>
                <Pressable onPress={() => router.push('/(screens)/quarter/(measurement-and-geometry)/module3')}>
                    <LinearGradient
                        colors={['#E57373', '#F44336', '#E53935']}
                        style={{ padding: 25, backgroundColor: 'green', borderRadius: 15, marginHorizontal: 20, marginTop: 25 }}
                    >
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Module 3</Text>
                        <Text style={{ fontSize: 17, marginTop: 5, color: 'white' }}>
                            Solve problems involving lengths and distances using non-standard units.
                        </Text>
                    </LinearGradient>
                </Pressable>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({})