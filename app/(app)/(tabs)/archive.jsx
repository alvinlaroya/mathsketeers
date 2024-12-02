import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { router } from 'expo-router'
import { supabase } from '@/lib/supabase';


export default function settings() {
    const [module1, setModule1] = useState(0);
    const [module2, setModule2] = useState(0);
    const [module3, setModule3] = useState(0);
    const [module4, setModule4] = useState(0);
    const [module5, setModule5] = useState(0);
    const [module6, setModule6] = useState(0);
    const [module7, setModule7] = useState(0);


    useEffect(() => {
        const fetchStudentTakersModule1 = async () => {
            const { count, error } = await supabase
                .from('scores')
                .select('*', { count: 'exact', head: true })
                .eq('module', 'quarter-1-module-1')
            setModule1(count)
        }
        const fetchStudentTakersModule2 = async () => {
            const { count, error } = await supabase
                .from('scores')
                .select('*', { count: 'exact', head: true })
                .eq('module', 'quarter-1-module-2')
            setModule2(count)
        }
        const fetchStudentTakersModule3 = async () => {
            const { count, error } = await supabase
                .from('scores')
                .select('*', { count: 'exact', head: true })
                .eq('module', 'quarter-1-module-3')
            setModule3(count)
        }
        const fetchStudentTakersModule4 = async () => {
            const { count, error } = await supabase
                .from('scores')
                .select('*', { count: 'exact', head: true })
                .eq('module', 'quarter-2-module-1')
            setModule4(count)
        }
        const fetchStudentTakersModule5 = async () => {
            const { count, error } = await supabase
                .from('scores')
                .select('*', { count: 'exact', head: true })
                .eq('module', 'quarter-2-module-2')
            setModule5(count)
        }
        const fetchStudentTakersModule6 = async () => {
            const { count, error } = await supabase
                .from('scores')
                .select('*', { count: 'exact', head: true })
                .eq('module', 'quarter-2-module-3')
            setModule6(count)
        }
        const fetchStudentTakersModule7 = async () => {
            const { count, error } = await supabase
                .from('scores')
                .select('*', { count: 'exact', head: true })
                .eq('module', 'quarter-2-module-4')
            setModule7(count)
        }


        fetchStudentTakersModule1();
        fetchStudentTakersModule2();
        fetchStudentTakersModule3();
        fetchStudentTakersModule4();
        fetchStudentTakersModule5();
        fetchStudentTakersModule6();
        fetchStudentTakersModule7();
    }, [])

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={{ marginBottom: 10, fontSize: 24, fontWeight: 'bold' }}>Measurement & Geometry</Text>
                <View style={{ flexDirection: 'column', gap: 10 }}>
                    <View style={{ backgroundColor: 'white', borderRadius: 15, padding: 10, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Pressable onPress={() => router.push({
                            pathname: "/(screens)/archive",
                            params: { module: 'quarter-1-module-1', module_description: 'Measure the length of an object and the distance between two objects using non-standard-units.' }
                        })} style={{ width: '50%', padding: 15 }}>
                            <Text style={{ fontWeight: 'bold' }}>
                                Measure the length of an object and the distance between two objects using non-standard-units.
                            </Text>
                        </Pressable>
                        <View style={{ width: '50%', padding: 15, alignItems: 'center' }}>
                            <Text style={{ fontSize: 40, fontWeight: 'bold' }}>
                                {module1}
                            </Text>
                            <Text>Number of takes</Text>
                        </View>
                    </View>

                    <View style={{ backgroundColor: 'white', borderRadius: 15, padding: 10, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Pressable onPress={() => router.push({
                            pathname: "/(screens)/archive",
                            params: { module: 'quarter-1-module-2', module_description: 'Compare lengths and distances using non-standard units.' }
                        })} style={{ width: '50%', padding: 15 }}>
                            <Text style={{ fontWeight: 'bold' }}>
                                Compare lengths and distances using non-standard units.
                            </Text>
                        </Pressable>
                        <View style={{ width: '50%', padding: 15, alignItems: 'center' }}>
                            <Text style={{ fontSize: 40, fontWeight: 'bold' }}>
                                {module2}
                            </Text>
                            <Text>Number of takes</Text>
                        </View>
                    </View>

                    <View style={{ backgroundColor: 'white', borderRadius: 15, padding: 10, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Pressable onPress={() => router.push({
                            pathname: "/(screens)/archive",
                            params: { module: 'quarter-1-module-3', module_description: 'Solve problems involving lengths and distances using non-standard units.' }
                        })} style={{ width: '50%', padding: 15 }}>
                            <Text style={{ fontWeight: 'bold' }}>
                                Solve problems involving lengths and distances using non-standard units.
                            </Text>
                        </Pressable>
                        <View style={{ width: '50%', padding: 15, alignItems: 'center' }}>
                            <Text style={{ fontSize: 40, fontWeight: 'bold' }}>
                                {module3}
                            </Text>
                            <Text>Number of takes</Text>
                        </View>
                    </View>
                </View>

                <Text style={{ marginBottom: 10, marginTop: 20, fontSize: 24, fontWeight: 'bold' }}>Numbers & Algebra</Text>
                <View style={{ flexDirection: 'column', gap: 10 }}>
                    <View style={{ backgroundColor: 'white', borderRadius: 15, padding: 10, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Pressable onPress={() => router.push({
                            pathname: "/(screens)/archive",
                            params: { module: 'quarter-2-module-1', module_description: 'Place value in any 2 digit numbers' }
                        })} style={{ width: '50%', padding: 15 }}>
                            <Text style={{ fontWeight: 'bold' }}>
                                Order numbers up to 10 from smallest to largest
                            </Text>
                        </Pressable>
                        <View style={{ width: '50%', padding: 15, alignItems: 'center' }}>
                            <Text style={{ fontSize: 40, fontWeight: 'bold' }}>
                                {module4}
                            </Text>
                            <Text>Number of takes</Text>
                        </View>
                    </View>

                    <View style={{ backgroundColor: 'white', borderRadius: 15, padding: 10, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Pressable onPress={() => router.push({
                            pathname: "/(screens)/archive",
                            params: { module: 'quarter-2-module-2', module_description: 'Order numbers up to 10 from smallest to largest' }
                        })} style={{ width: '50%', padding: 15 }}>
                            <Text style={{ fontWeight: 'bold' }}>
                                Counts by 2s, 5s, 10s up to 50
                            </Text>
                        </Pressable>
                        <View style={{ width: '50%', padding: 15, alignItems: 'center' }}>
                            <Text style={{ fontSize: 40, fontWeight: 'bold' }}>
                                {module5}
                            </Text>
                            <Text>Number of takes</Text>
                        </View>
                    </View>

                    <View style={{ backgroundColor: 'white', borderRadius: 15, padding: 10, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Pressable onPress={() => router.push({
                            pathname: "/(screens)/archive",
                            params: { module: 'quarter-2-module-3', module_description: 'Counts by 2s, 5s, 10s up to 50' }
                        })} style={{ width: '50%', padding: 15 }}>
                            <Text style={{ fontWeight: 'bold' }}>
                                Determine the place value of a digit in a 2-digit number
                            </Text>
                        </Pressable>
                        <View style={{ width: '50%', padding: 15, alignItems: 'center' }}>
                            <Text style={{ fontSize: 40, fontWeight: 'bold' }}>
                                {module6}
                            </Text>
                            <Text>Number of takes</Text>
                        </View>
                    </View>

                    <View style={{ backgroundColor: 'white', borderRadius: 15, padding: 10, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Pressable onPress={() => router.push({
                            pathname: "/(screens)/archive",
                            params: { module: 'quarter-2-module-4', module_description: 'Determine the place value of a digit in a 2-digit number' }
                        })} style={{ width: '50%', padding: 15 }}>
                            <Text style={{ fontWeight: 'bold' }}>
                                Determine the digit of a number, given its place value
                            </Text>
                        </Pressable>
                        <View style={{ width: '50%', padding: 15, alignItems: 'center' }}>
                            <Text style={{ fontSize: 40, fontWeight: 'bold' }}>
                                {module7}
                            </Text>
                            <Text>Number of takes</Text>
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