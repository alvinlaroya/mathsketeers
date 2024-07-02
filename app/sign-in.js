import { Redirect, router } from 'expo-router';

export default function SignIn() {
    return (
        <Redirect href='/(auth)/signin' />
    );
}
