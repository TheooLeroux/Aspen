import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";

// Données statiques pour reproduire la maquette
const CATEGORIES = ['Location', 'Hotels', 'Food', 'Adventure'];

const POPULAR_DATA = [
    {
        id: '1',
        title: 'Gros Horloge',
        rating: '4.1',
        image: require('../assets/gros-horloge.png'),
        isFavorite: true,
    },
    {
        id: '2',
        title: 'Radisson Blu',
        rating: '4.5',
        image: require('../assets/radisson.png'),
        isFavorite: false,
    },
];

const RECOMMENDED_DATA = [
    {
        id: '1',
        title: 'Aître saint maclou',
        rating: '3.9',
        tag: 'Mts76',
        image: require('../assets/saint-maclou.png'),
    },
    {
        id: '2',
        title: 'La Couronne',
        rating: '3.9',
        tag: null,
        image: require('../assets/restaux-couronne.png'),
    }
];

const Home = () => {
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState('Location');

    const renderPopularItem = ({ item }) => (
        <View style={styles.cardPopular}>
            <Image
                source={item.image.uri ? item.image : item.image} // Gestion uri vs require
                style={styles.cardPopularImage}
                resizeMode="cover"
            />

            <View style={styles.heartContainer}>
                <Ionicons
                    name={item.isFavorite ? "heart" : "heart-outline"}
                    size={18}
                    color={item.isFavorite ? "red" : "gray"}
                />
            </View>

            {/* Infos en bas de la carte */}
            <View style={styles.cardOverlay}>
                <View style={styles.badgeDark}>
                    <Text style={styles.cardTitlePopular}>{item.title}</Text>
                </View>
                <View style={styles.badgeDarkRating}>
                    <FontAwesome name="star" size={12} color="#FFD700" style={{marginRight: 4}} />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
            </View>
        </View>
    );

    // Rendu d'une carte "Recommended"
    const renderRecommendedItem = ({ item }) => (
        <View style={styles.cardRecommended}>
            <View style={styles.imageContainerRec}>
                <Image
                    source={item.image}
                    style={styles.cardRecommendedImage}
                />

                {/* Tag Vert (ex: Mts76) */}
                {item.tag && (
                    <View style={styles.tagBadge}>
                        <Text style={styles.tagText}>{item.tag}</Text>
                    </View>
                )}

                {/* Note overlapping */}
                <View style={styles.ratingBadgeSmall}>
                    <Text style={styles.ratingTextSmall}>{item.rating}</Text>
                    <FontAwesome name="star" size={10} color="#FFD700" style={{marginLeft: 2}} />
                </View>
            </View>
            <Text style={styles.recTitle}>{item.title}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <SafeAreaProvider>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

                        {/* Header */}
                        <View style={styles.header}>
                            <View>
                                <Text style={styles.headerLabel}>Explore</Text>
                                <Text style={styles.headerTitle}>Rouen</Text>
                            </View>
                            <View style={styles.locationRow}>
                                <Ionicons name="location-sharp" size={16} color="#176FF2" />
                                <Text style={styles.locationText}>Rouen, FR</Text>
                                <Ionicons name="chevron-down" size={16} color="#176FF2" />
                            </View>
                        </View>

                        {/* Search Bar */}
                        <View style={styles.searchContainer}>
                            <Ionicons name="search" size={20} color="#B8B8B8" style={{ marginRight: 10 }} />
                            <TextInput
                                placeholder="Find things to do"
                                placeholderTextColor="#B8B8B8"
                                style={styles.searchInput}
                            />
                        </View>

                        {/* Categories */}
                        <View style={styles.categoriesContainer}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingLeft: 20 }}>
                                {CATEGORIES.map((cat, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={[
                                            styles.categoryItem,
                                            activeCategory === cat && styles.categoryItemActive
                                        ]}
                                        onPress={() => setActiveCategory(cat)}
                                    >
                                        <Text style={[
                                            styles.categoryText,
                                            activeCategory === cat && styles.categoryTextActive
                                        ]}>
                                            {cat}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                                {/* Juste pour le padding à droite */}
                                <View style={{ width: 40 }} />
                            </ScrollView>
                        </View>

                        {/* Section Popular */}
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Popular</Text>
                            <TouchableOpacity>
                                <Text style={styles.seeAllText}>See all</Text>
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            data={POPULAR_DATA}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={item => item.id}
                            renderItem={renderPopularItem}
                            contentContainerStyle={{ paddingLeft: 20, paddingRight: 20 }}
                        />

                        {/* Section Recommended */}
                        <View style={[styles.sectionHeader, { marginTop: 25 }]}>
                            <Text style={styles.sectionTitle}>Recommended</Text>
                        </View>

                        <FlatList
                            data={RECOMMENDED_DATA}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={item => item.id}
                            renderItem={renderRecommendedItem}
                            contentContainerStyle={{ paddingLeft: 20, paddingRight: 20 }}
                        />

                    </ScrollView>
                </SafeAreaProvider>
            </SafeAreaView>

            {/* Bottom Navigation Bar */}
            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.bottomTab}>
                    <Ionicons name="home" size={24} color="#176FF2" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomTab}>
                    <MaterialIcons name="confirmation-number" size={24} color="#B8B8B8" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomTab}>
                    <Ionicons name="heart-outline" size={24} color="#B8B8B8" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomTab}>
                    <Ionicons name="person-outline" size={24} color="#B8B8B8" />
                </TouchableOpacity>
            </View>

        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    // HEADER
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        marginTop: 10,
    },
    headerLabel: {
        fontSize: 14,
        color: '#333',
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'black',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    locationText: {
        color: '#888',
        marginHorizontal: 4,
        fontSize: 14,
    },

    // SEARCH
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F8FE',
        marginHorizontal: 20,
        marginTop: 25,
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 30,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
    },

    // CATEGORIES
    categoriesContainer: {
        marginTop: 25,
    },
    categoryItem: {
        marginRight: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: 'transparent',
    },
    categoryItemActive: {
        backgroundColor: '#F3F8FE',
    },
    categoryText: {
        color: '#B8B8B8',
        fontSize: 16,
        fontWeight: '500',
    },
    categoryTextActive: {
        color: '#176FF2',
        fontWeight: 'bold',
    },

    // SECTION HEADERS
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        marginTop: 25,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    seeAllText: {
        color: '#176FF2',
        fontSize: 12,
    },

    // POPULAR CARDS
    cardPopular: {
        width: 180,
        height: 240,
        marginRight: 15,
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
    },
    cardPopularImage: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    heartContainer: {
        position: 'absolute',
        bottom: 15,
        right: 15,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 6,
        zIndex: 10,
    },
    cardOverlay: {
        position: 'absolute',
        bottom: 15,
        left: 15,
        right: 60, // Laisse la place pour le coeur
        alignItems: 'flex-start',
    },
    badgeDark: {
        backgroundColor: 'rgba(60, 60, 60, 0.8)',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 12,
        marginBottom: 5,
    },
    badgeDarkRating: {
        backgroundColor: 'rgba(60, 60, 60, 0.8)',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardTitlePopular: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
    },
    ratingText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },

    // RECOMMENDED CARDS
    cardRecommended: {
        width: 160,
        marginRight: 15,
    },
    imageContainerRec: {
        width: 160,
        height: 100,
        borderRadius: 12,
        overflow: 'hidden',
        position: 'relative',
        marginBottom: 8,
    },
    cardRecommendedImage: {
        width: '100%',
        height: '100%',
    },
    tagBadge: {
        position: 'absolute',
        top: 8,
        left: 8,
        backgroundColor: '#34A853', // Vert
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    tagText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    ratingBadgeSmall: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: 'rgba(60,60,60,0.9)',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderWidth: 1,
        borderColor: 'white',
    },
    ratingTextSmall: {
        color: 'white',
        fontSize: 8,
        fontWeight: 'bold',
        marginRight: 2,
    },
    recTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },

    // BOTTOM BAR
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 15,
        paddingBottom: 25, // Pour les écrans type iPhone X
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    bottomTab: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});