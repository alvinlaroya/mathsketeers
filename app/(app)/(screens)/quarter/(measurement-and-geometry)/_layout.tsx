import React from 'react'
import { StyleSheet } from 'react-native'
import { Stack } from 'expo-router'

export default function _layout() {
    return <Stack screenOptions={{ headerShown: false }} />
}

const styles = StyleSheet.create({})