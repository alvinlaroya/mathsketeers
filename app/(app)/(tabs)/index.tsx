import { StyleSheet, Text, ScrollView, View, Image, Dimensions, Pressable } from 'react-native'
import React from 'react'
import { router } from 'expo-router';
import Animated, { FadeInRight } from 'react-native-reanimated';

import { useSession } from '@/lib/ctx'

const windowWidth = Dimensions.get('window').width;

const authBgImg = require('@/assets/images/auth-bg.png');
const gmBg = require('@/assets/images/quarter/measurement-and-geometry.jpg');
const naBg = require('@/assets/images/quarter/numbers-and-algebra.jpg');

export default function Home() {
    const { signOut } = useSession();
    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Image source={authBgImg} style={{ objectFit: 'cover', width: windowWidth, height: windowWidth - 120, marginTop: -25 }} />
            </View>
            <ScrollView style={styles.contentContainerStyle} showsHorizontalScrollIndicator={false}>
                <Pressable onPress={() => router.push({ pathname: '/(screens)/quarter/(measurement-and-geometry)' })}>
                    <Animated.View entering={FadeInRight.duration(200).delay(300)} >
                        <View style={styles.card}>
                            <Image source={gmBg} style={{ objectFit: 'cover', width: '100%', height: 150, backgroundColor: 'red', borderRadius: 15 }} />
                        </View>
                        <View style={{ padding: 10 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Measurement And Geometry (MG)</Text>
                        </View>
                    </Animated.View>
                </Pressable>
                <Pressable onPress={() => router.push({ pathname: '/(screens)/quarter/(numbers-and-algebra)' })}>
                    <Animated.View entering={FadeInRight.duration(200).delay(300)} style={{ marginTop: 20 }} >
                        <View style={styles.card}>
                            <Image source={naBg} style={{ objectFit: 'cover', width: '100%', height: 150, backgroundColor: 'red', borderRadius: 15 }} />
                        </View>
                        <View style={{ padding: 10 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Number and Algebra (NA)</Text>
                        </View>
                    </Animated.View>
                </Pressable>
            </ScrollView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 'auto',
    },
    card: {
        backgroundColor: 'white',
        objectFit: 'cover',
        marginHorizontal: 8,
        borderRadius: 15
    },
    contentContainerStyle: {
        marginTop: 10,
        padding: 10
    }
})