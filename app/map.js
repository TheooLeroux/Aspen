import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, TextInput, StyleSheet, Pressable, Platform, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const DEFAULT_REGION = {
    latitude: 49.4431, // Rouen approx (comme ta capture)
    longitude: 1.0993,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
};

export default function MapScreen() {
    const mapRef = useRef(null);

    const [query, setQuery] = useState("");
    const [region, setRegion] = useState(DEFAULT_REGION);
    const [userCoords, setUserCoords] = useState(null); // { latitude, longitude }
    const [activeTab, setActiveTab] = useState("home"); // home | grid | heart | user

    useEffect(() => {
        let mounted = true;

        (async () => {
            // Permission
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") return;

            // Position actuelle
            const pos = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            });

            const coords = {
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
            };

            if (!mounted) return;

            setUserCoords(coords);

            const nextRegion = {
                ...coords,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            };

            setRegion(nextRegion);

            // Anime vers la position utilisateur
            mapRef.current?.animateToRegion(nextRegion, 600);
        })();

        return () => {
            mounted = false;
        };
    }, []);

    const activeColor = useMemo(() => "#2563eb", []);
    const inactiveColor = useMemo(() => "rgba(15,23,42,0.35)", []);

    return (
        <SafeAreaView style={styles.safe} edges={["top"]}>
            <View style={styles.container}>
                {/* MAP */}
                <MapView
                    ref={mapRef}
                    style={StyleSheet.absoluteFill}
                    initialRegion={DEFAULT_REGION}
                    region={region}
                    onRegionChangeComplete={setRegion}
                    showsUserLocation={false} // on met notre marker pour ressembler au point bleu
                    showsMyLocationButton={false}
                    toolbarEnabled={false}
                >
                    {/* Point bleu (style proche) */}
                    {userCoords && (
                        <Marker coordinate={userCoords} anchor={{ x: 0.5, y: 0.5 }}>
                            <View style={styles.userDotOuter}>
                                <View style={styles.userDotInner} />
                            </View>
                        </Marker>
                    )}
                </MapView>

                <Pressable
                    onPress={() => router.back('/[id]')}
                    style={styles.backBtn}
                    hitSlop={12}
                >
                    <Ionicons name="chevron-back" size={20} color="#6b7280" />
                </Pressable>

                {/* Search bar overlay */}
                <View style={styles.searchWrap}>
                    <Ionicons name="search" size={18} color="rgba(15,23,42,0.35)" />
                    <TextInput
                        value={query}
                        onChangeText={setQuery}
                        placeholder="Find things to do"
                        placeholderTextColor="rgba(15,23,42,0.35)"
                        style={styles.searchInput}
                        returnKeyType="search"
                    />
                </View>

                {/* Bottom bar */}
                <View style={styles.bottomBar}>
                    <TabIcon
                        icon="home"
                        active={activeTab === "home"}
                        onPress={() => setActiveTab("home")}
                        activeColor={activeColor}
                        inactiveColor={inactiveColor}
                    />
                    <TabIcon
                        icon="grid"
                        active={activeTab === "grid"}
                        onPress={() => setActiveTab("grid")}
                        activeColor={activeColor}
                        inactiveColor={inactiveColor}
                    />
                    <TabIcon
                        icon="heart"
                        active={activeTab === "heart"}
                        onPress={() => setActiveTab("heart")}
                        activeColor={activeColor}
                        inactiveColor={inactiveColor}
                    />
                    <TabIcon
                        icon="person"
                        active={activeTab === "user"}
                        onPress={() => setActiveTab("user")}
                        activeColor={activeColor}
                        inactiveColor={inactiveColor}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

function TabIcon({ icon, active, onPress, activeColor, inactiveColor }) {
    return (
        <Pressable onPress={onPress} style={styles.tabBtn} hitSlop={10}>
            <Ionicons
                name={active ? icon : `${icon}-outline`}
                size={22}
                color={active ? activeColor : inactiveColor}
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: "#fff" },
    container: { flex: 1 },

    // Search
    searchWrap: {
        position: "absolute",
        left: 16,
        right: 16,
        top: 65,
        height: 54,
        borderRadius: 50,
        backgroundColor: "rgba(255,255,255,0.95)",
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 8 },
        elevation: 6,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: "#0f172a",
    },

    // User blue dot
    userDotOuter: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: "rgba(37,99,235,0.20)",
        alignItems: "center",
        justifyContent: "center",
    },
    userDotInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#2563eb",
        borderWidth: 2,
        borderColor: "white",
    },

    // Bottom bar
    bottomBar: {
        position: "absolute",
        left: 16,
        right: 16,
        bottom: 30,
        height: 70,
        borderRadius: 24,
        backgroundColor: "rgba(255,255,255,0.96)",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 10 },
        elevation: 8,
        paddingHorizontal: 6,
    },
    tabBtn: {
        width: 54,
        height: 54,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
    },

    backBtn: {
        position: "absolute",
        top: 10,
        left: 16,
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: "rgba(255,255,255,0.95)",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 6 },
        elevation: 6,
    },

});
