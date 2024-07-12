import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Stack } from 'expo-router'

export default function _layout() {
    return (<Stack screenOptions={{ headerShown: false }} />)
}

const styles = StyleSheet.create({})