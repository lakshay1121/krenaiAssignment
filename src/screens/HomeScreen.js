import { ScrollView, StyleSheet, Text, View, Image, Dimensions, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiLink from '../.env';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const HomeScreen = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const configurationObject = {
                method: 'get',
                url: apiLink,
            };

            try {
                const response = await axios(configurationObject);
                setData(response?.data?.object);
            } catch (error) {
                console.log('Error', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const calculateCardWidth = () => {
        const cardWidth = screenWidth / 2 - 20;
        return cardWidth;
    };

    return (
        <ScrollView>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color='black' />
                </View>
            ) : (
                <View style={styles.cardsContainer}>
                    {data?.map((item, index) => (
                        <View style={[styles.card, { width: calculateCardWidth() }]} key={index}>
                            <Image source={{ uri: item?.mediaUrl }} style={styles.cardImage} />
                            <View style={styles.cardDetails}>
                                <Text style={styles.name}>{item?.name}</Text>
                                <Text style={styles.category}>{item?.category[0]?.name}</Text>
                                <Text>₹{item?.variants[0]?.sellingPrice}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            )}
        </ScrollView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        margin: 10,
    },
    card: {
        padding: 5,
        marginVertical: 5,
        alignItems: 'center',
    },
    cardImage: {
        width: '95%',
        height: 180,
        resizeMode: 'cover',
        borderRadius: 10
    },
    cardDetails: {
        marginTop: 10,
    },
    category: {
        fontSize: 14,
        color: 'black',
    },
    name: {
        fontSize: 14,
        fontWeight: '700',
        color: 'black'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: screenHeight
    },
});
