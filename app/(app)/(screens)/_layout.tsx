import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'

export default function ScreenLayout() {
    const params = useLocalSearchParams();
    return (
        <Stack screenOptions={{}}>
            <Stack.Screen
                name='details/index'
                options={{
                    animation: 'fade',
                    headerShown: true,
                    title: `${params.fname} ${params.mname} ${params.lname}`
                }}
            />
        </Stack>
    )
}

const styles = StyleSheet.create({})