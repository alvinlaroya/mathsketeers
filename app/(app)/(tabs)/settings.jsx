import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import { router } from 'expo-router'

export default function settings() {
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={{ marginBottom: 10, fontSize: 24, fontWeight: 'bold' }}>Measurement & Geometry</Text>
                <View style={{ flexDirection: 'column', gap: 10 }}>
                    <View style={{ backgroundColor: 'white', borderRadius: 15, padding: 10, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Pressable onPress={() => router.push({
                            pathname: "/(screens)/activity",
                            params: { module: 'quarter-1-module-1', module_description: 'Measure the length of an object and the distance between two objects using non-standard-units.' }
                        })} style={{ width: '50%', padding: 15 }}>
                            <Text style={{ fontWeight: 'bold' }}>
                                Measure the length of an object and the distance between two objects using non-standard-units.
                            </Text>
                        </Pressable>
                        <View style={{ width: '50%', padding: 15, alignItems: 'center' }}>
                            <Text style={{ fontSize: 40, fontWeight: 'bold' }}>
                                15
                            </Text>
                            <Text>Students take this</Text>
                        </View>
                    </View>

                    <View style={{ backgroundColor: 'white', borderRadius: 15, padding: 10, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Pressable onPress={() => router.push({
                            pathname: "/(screens)/activity",
                            params: { module: 'quarter-1-module-2', module_description: 'Compare lengths and distances using non-standard units.' }
                        })} style={{ width: '50%', padding: 15 }}>
                            <Text style={{ fontWeight: 'bold' }}>
                                Compare lengths and distances using non-standard units.
                            </Text>
                        </Pressable>
                        <View style={{ width: '50%', padding: 15, alignItems: 'center' }}>
                            <Text style={{ fontSize: 40, fontWeight: 'bold' }}>
                                15
                            </Text>
                            <Text>Students take this</Text>
                        </View>
                    </View>

                    <View style={{ backgroundColor: 'white', borderRadius: 15, padding: 10, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Pressable onPress={() => router.push({
                            pathname: "/(screens)/activity",
                            params: { module: 'quarter-1-module-3', module_description: 'Solve problems involving lengths and distances using non-standard units.' }
                        })} style={{ width: '50%', padding: 15 }}>
                            <Text style={{ fontWeight: 'bold' }}>
                                Solve problems involving lengths and distances using non-standard units.
                            </Text>
                        </Pressable>
                        <View style={{ width: '50%', padding: 15, alignItems: 'center' }}>
                            <Text style={{ fontSize: 40, fontWeight: 'bold' }}>
                                15
                            </Text>
                            <Text>Students take this</Text>
                        </View>
                    </View>
                </View>

                <Text style={{ marginBottom: 10, marginTop: 20, fontSize: 24, fontWeight: 'bold' }}>Measurement & Geometry</Text>
                <View style={{ flexDirection: 'column', gap: 10 }}>
                    <View style={{ backgroundColor: 'white', borderRadius: 15, padding: 10, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Pressable onPress={() => router.push({
                            pathname: "/(screens)/activity",
                            params: { module: 'quarter-2-module-1', module_description: 'Place value in any 2 digit numbers' }
                        })} style={{ width: '50%', padding: 15 }}>
                            <Text style={{ fontWeight: 'bold' }}>
                                1. Place value in any 2 digit numbers
                            </Text>
                            <Text style={{ fontWeight: 'bold' }}>
                                2. Addition of numbers with sums up to 20
                            </Text>
                        </Pressable>
                        <View style={{ width: '50%', padding: 15, alignItems: 'center' }}>
                            <Text style={{ fontSize: 40, fontWeight: 'bold' }}>
                                15
                            </Text>
                            <Text>Students take this</Text>
                        </View>
                    </View>

                    <View style={{ backgroundColor: 'white', borderRadius: 15, padding: 10, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Pressable onPress={() => router.push({
                            pathname: "/(screens)/activity",
                            params: { module: 'quarter-2-module-2', module_description: 'Order numbers up to 10 from smallest to largest' }
                        })} style={{ width: '50%', padding: 15 }}>
                            <Text style={{ fontWeight: 'bold' }}>
                                Order numbers up to 10 from smallest to largest
                            </Text>
                        </Pressable>
                        <View style={{ width: '50%', padding: 15, alignItems: 'center' }}>
                            <Text style={{ fontSize: 40, fontWeight: 'bold' }}>
                                15
                            </Text>
                            <Text>Students take this</Text>
                        </View>
                    </View>

                    <View style={{ backgroundColor: 'white', borderRadius: 15, padding: 10, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Pressable onPress={() => router.push({
                            pathname: "/(screens)/activity",
                            params: { module: 'quarter-2-module-3', module_description: 'Counts by 2s, 5s, 10s up to 50' }
                        })} style={{ width: '50%', padding: 15 }}>
                            <Text style={{ fontWeight: 'bold' }}>
                                Counts by 2s, 5s, 10s up to 50
                            </Text>
                        </Pressable>
                        <View style={{ width: '50%', padding: 15, alignItems: 'center' }}>
                            <Text style={{ fontSize: 40, fontWeight: 'bold' }}>
                                15
                            </Text>
                            <Text>Students take this</Text>
                        </View>
                    </View>

                    <View style={{ backgroundColor: 'white', borderRadius: 15, padding: 10, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Pressable onPress={() => router.push({
                            pathname: "/(screens)/activity",
                            params: { module: 'quarter-2-module-4', module_description: 'Determine the place value of a digit in a 2-digit number' }
                        })} style={{ width: '50%', padding: 15 }}>
                            <Text style={{ fontWeight: 'bold' }}>
                                Determine the place value of a digit in a 2-digit number
                            </Text>
                        </Pressable>
                        <View style={{ width: '50%', padding: 15, alignItems: 'center' }}>
                            <Text style={{ fontSize: 40, fontWeight: 'bold' }}>
                                15
                            </Text>
                            <Text>Students take this</Text>
                        </View>
                    </View>

                    <View style={{ backgroundColor: 'white', borderRadius: 15, padding: 10, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Pressable onPress={() => router.push({
                            pathname: "/(screens)/activity",
                            params: { module: 'quarter-2-module-5', module_description: 'Determine the digit of a number, given its place value.' }
                        })} style={{ width: '50%', padding: 15 }}>
                            <Text style={{ fontWeight: 'bold' }}>
                                Determine the digit of a number, given its place value.
                            </Text>
                        </Pressable>
                        <View style={{ width: '50%', padding: 15, alignItems: 'center' }}>
                            <Text style={{ fontSize: 40, fontWeight: 'bold' }}>
                                15
                            </Text>
                            <Text>Students take this</Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        gap: 10,
        padding: 30
    }
})