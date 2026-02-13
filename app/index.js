// app/index.js
import React from "react";
import { View, Pressable, Text } from "react-native";
import { router } from "expo-router";

export default function Home() {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Pressable
                onPress={() => router.push("/123")}
                style={{ paddingHorizontal: 18, paddingVertical: 12, backgroundColor: "#2b6cff", borderRadius: 12 }}
            >
                <Text style={{ color: "#fff", fontWeight: "800" }}>Ouvrir la page hôtel</Text>
            </Pressable>
        </View>
    );
}
