import React from "react";
import { View, Text, StyleSheet, Image, Pressable, ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function HotelDetails() {
    return (
        <SafeAreaView style={styles.safe} edges={["top"]}>
            <StatusBar barStyle="dark-content" />
            <ScrollView contentContainerStyle={styles.page} showsVerticalScrollIndicator={false}>
                <View style={styles.card}>
                    {/* Image */}
                    <View style={styles.imageWrap}>
                        <Image source={require("../assets/radison.jpg")} style={styles.image} />

                        <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={10}>
                            <Ionicons name="chevron-back" size={18} color="#6b7280" />
                        </Pressable>

                        <Pressable style={styles.heartBtn} hitSlop={10}>
                            <Ionicons name="heart" size={18} color="#ff3b30" />
                        </Pressable>
                    </View>

                    <View style={styles.content}>
                        {/* Title + Show map */}
                        <View style={styles.titleRow}>
                            <Text style={styles.title}>Radisson Blue</Text>
                            <Pressable>
                                <Text style={styles.showMap}>Show map</Text>
                            </Pressable>
                        </View>

                        {/* Rating */}
                        <View style={styles.ratingRow}>
                            <Ionicons name="star" size={14} color="#F4B400" />
                            <Text style={styles.ratingText}>4.5 (355 Reviews)</Text>
                        </View>

                        {/* Desc */}
                        <Text style={styles.desc}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam...
                        </Text>

                        {/* Read more */}
                        <Pressable style={styles.readMore}>
                            <Text style={styles.readMoreText}>Read more</Text>
                            <Ionicons name="chevron-down" size={16} color="#2b6cff" />
                        </Pressable>

                        {/* Facilities */}
                        <Text style={styles.sectionTitle}>Facilities</Text>

                        <View style={styles.facilitiesRow}>
                            <Facility icon="wifi" label={"1 Heater"} />
                            <Facility icon="silverware-fork-knife" label="Dinner" />
                            <Facility icon="bathtub-outline" label={"1 Tub"} />
                            <Facility icon="pool" label="Pool" />
                        </View>

                        {/* Bottom */}
                        <View style={styles.bottomRow}>
                            <View>
                                <Text style={styles.priceLabel}>Price</Text>
                                <Text style={styles.priceValue}>$199</Text>
                            </View>

                            <Pressable style={styles.bookBtn}>
                                <Text style={styles.bookBtnText}>Book Now</Text>
                                <Ionicons name="arrow-forward" size={16} color="#fff" />
                            </Pressable>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

function Facility({ icon, label }) {
    return (
        <View style={styles.facilityItem}>
            <MaterialCommunityIcons name={icon} size={24} color="rgba(107,114,128,0.75)" />
            <Text style={styles.facilityText}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: "#EEF2F7" },
    page: { padding: 16, paddingBottom: 24 },

    card: {
        backgroundColor: "#fff",
        borderRadius: 24,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 10 },
        elevation: 6,
    },

    imageWrap: { position: "relative" },
    image: { width: "100%", height: 210, resizeMode: "cover" },

    backBtn: {
        position: "absolute",
        top: 14,
        left: 14,
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: "rgba(255,255,255,0.95)",
        alignItems: "center",
        justifyContent: "center",
    },

    heartBtn: {
        position: "absolute",
        right: 16,
        bottom: 16,
        width: 52,
        height: 52,
        borderRadius: 16,
        backgroundColor: "rgba(255,255,255,0.95)",
        alignItems: "center",
        justifyContent: "center",
    },

    content: { padding: 16 },

    titleRow: {
        flexDirection: "row",
        alignItems: "baseline",
        justifyContent: "space-between",
    },

    title: {
        fontSize: 28,
        fontWeight: "900",
        color: "#0f172a",
        letterSpacing: -0.3,
    },

    showMap: {
        fontSize: 16,
        fontWeight: "800",
        color: "#2b6cff",
    },

    ratingRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },
    ratingText: { marginLeft: 6, fontSize: 16, color: "rgba(15,23,42,0.55)", fontWeight: "700" },

    desc: {
        marginTop: 14,
        fontSize: 16,
        lineHeight: 24,
        color: "rgba(15,23,42,0.42)",
    },

    readMore: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 14 },
    readMoreText: { color: "#2b6cff", fontWeight: "900", fontSize: 18 },

    sectionTitle: { marginTop: 22, fontSize: 26, fontWeight: "900", color: "#0f172a" },

    facilitiesRow: { flexDirection: "row", gap: 8, marginTop: 12 },

    facilityItem: {
        flex: 1,
        backgroundColor: "#F4F7FB",
        borderRadius: 22,
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "rgba(15,23,42,0.06)",
    },

    facilityText: {
        marginTop: 10,
        fontSize: 12,
        lineHeight: 16,
        textAlign: "center",
        color: "rgba(107,114,128,0.8)",
        fontWeight: "700",
    },

    bottomRow: {
        marginTop: 22,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    priceLabel: { color: "rgba(15,23,42,0.55)", fontWeight: "800", fontSize: 16 },
    priceValue: { marginTop: 8, color: "#16b8a6", fontSize: 28, fontWeight: "900" },

    bookBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        paddingHorizontal: 22,
        height: 56,
        minWidth: 190,
        borderRadius: 18,
        backgroundColor: "#2b6cff",
    },

    bookBtnText: { color: "#fff", fontWeight: "900", fontSize: 18 },
});
