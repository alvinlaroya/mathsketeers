import { StyleSheet, Text, ScrollView, View, Image, Dimensions } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper';
import Animated, { FadeInRight } from 'react-native-reanimated';

import { useSession } from '@/lib/ctx'

const windowWidth = Dimensions.get('window').width;

const authBgImg = require('@/assets/images/auth-bg.png');

export default function Home() {
    const { signOut } = useSession();
    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Image source={authBgImg} style={{ objectFit: 'contain', width: windowWidth, height: windowWidth, marginTop: -25 }} />
            </View>
            <ScrollView horizontal={true} style={styles.contentContainerStyle} showsHorizontalScrollIndicator={false}>
                {[1, 2, 3, 4, 5].map((item, idx) => (
                    <Animated.View entering={FadeInRight.duration(200).delay(300)} key={idx} style={styles.card}>
                        <View style={{ padding: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>Day {item}</Text>
                        </View>
                        <View style={{ justifyContent: 'center' }}>
                            <Image source={authBgImg} style={{ objectFit: 'cover', width: '100%', height: 120, backgroundColor: 'red' }} />
                        </View>
                    </Animated.View>
                ))}
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
        width: 150,
        height: 170,
        marginHorizontal: 8,
        borderRadius: 15
    },
    contentContainerStyle: {
        marginTop: -10,
        paddingLeft: 8
    }
})