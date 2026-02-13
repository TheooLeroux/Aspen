import React from "react";
import { Stack, SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';

const Layout = () => {
    const [loaded, error] = useFonts({
        'Hiatus': require('../assets/Megiday.ttf'),
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

return (
    <Stack
        screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#fff' },
        }}
    >
        <Stack.Screen name="index" />
        <Stack.Screen name="home" />
        <Stack.Screen name="[id]" />
        <Stack.Screen name="map" />
    </Stack>
);
}

export default Layout;