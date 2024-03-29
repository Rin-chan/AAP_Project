import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableHighlight, View, Image, Dimensions, ScrollView, Modal } from 'react-native';
import { useDarkMode } from 'react-native-dynamic';

import { HeaderBar } from "../../components/organisms";
import { Colors } from '../../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserDB from '../../utils/database/userdb';

const RedeemListScreen = ({ navigation }) => {
    const isDarkMode = useDarkMode();
    var BACKGROUND_COLOR = Colors.LIGHT_THIRD_BACKGROUND
    var TEXT_COLOR = Colors.LIGHT_PRIMARY_TEXT
    var BOX_COLOR = Colors.LIGHT_SECONDARY_BACKGROUND
    var DANGER_BUTTON = Colors.LIGHT_DANGER_BUTTON
    var PRIMARY_BUTTON = Colors.LIGHT_PRIMARY_BUTTON
    if (isDarkMode) {
        BACKGROUND_COLOR = Colors.DARK_FOURTH_BACKGROUND
        TEXT_COLOR = Colors.DARK_PRIMARY_TEXT
        BOX_COLOR = Colors.DARK_SECONDARY_BACKGROUND
        DANGER_BUTTON = Colors.DARK_DANGER_BUTTON
        PRIMARY_BUTTON = Colors.DARK_PRIMARY_BUTTON
    }

    const schemeStyle = StyleSheet.create({
        backgroundColor: {
            backgroundColor: BACKGROUND_COLOR,
        },
        textColor: {
            color: TEXT_COLOR,
        },
        boxColor: {
            backgroundColor: BOX_COLOR,
        },
        usedboxcolor: {
            backgroundColor: "#DDDDDD"
        }
    })

    const _imgwidth = Dimensions.get('screen').width * 0.1;
    const _width = Dimensions.get('screen').width * 0.2;

    const [points, setPoints] = useState(0);
    const [request, setRequest] = useState(false);
    const [resultArr, setResultArr] = useState(null);
    const [pageLoading, setPageLoading] = useState(false);
    const [timer, setTimer] = useState(0);

    const [activeAll, setActiveAll] = useState(false);
    const [activeFood, setActiveFood] = useState(false);
    const [activeShop, setActiveShop] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => { setTimer(timer => timer + 1) }, 1000);
        if (pageLoading) {
            clearInterval(interval);
            setTimer(0);
        }
        return () => {
            clearInterval(interval);
        };
    }, [pageLoading]);


    const getAllGifts = async () => {
        await UserDB.getAllGifts(0, 10).then((result1) => {
            if (result1.length != 0) {
                setResultArr(result1);
                setActiveFood(false);
                setActiveAll(true);
                setActiveShop(false);
            }
            else {
                console.log("GIFTS NOT FOUND");
                return;
            }
        });

    }

    const images = {
        "Food": {
          uri: require('../../assets/images/grabfood.png')
        },
        "Shopping": { 
          uri: require('../../assets/images/popular.png')
        }
      }


    const getUser = async () => {
        if (request == false) {
            setRequest(true);

            await AsyncStorage.getItem('user')
                .then(email => {
                    UserDB.getUser(email).then((result) => {
                        if (result.length != 0) {
                            setPoints(result[0][8]);
                            getAllGifts();

                            setPageLoading(true);
                        }
                        else {
                            console.log("USER NOT FOUND");
                            return;
                        }
                    });

                });
        }
    };

    const filterGifts = async (filter) => {
        if (filter == 'Food') {
            setActiveFood(true);
            setActiveAll(false);
            setActiveShop(false);
        }
        else if (filter == "Shopping") {
            setActiveFood(false);
            setActiveAll(false);
            setActiveShop(true);
        }
        await UserDB.filterGifts(filter).then((result) => {
            if (result.length != 0) {
                setResultArr(result);
            }
            else {
                setResultArr(null);
                console.log("Filter: GIFTS NOT FOUND");
                return;
            }
        });
    }


    getUser();


    return (
        <View style={[styles.container, schemeStyle.backgroundColor]}>
            <HeaderBar navigation={navigation} />

            {/* Page Content */}
            <SafeAreaView style={{ flex: 1 }}>
                {/* h1 - You have xxx points */}
                <View style={styles.row}>
                    <Text style={[styles.h1, schemeStyle.textColor]}>You have {points} C02 Points! :D
                    </Text>
                </View>

                {/* h2 - Reward list */}
                <Text style={[styles.h2, schemeStyle.textColor]}>Reward list</Text>

                {/* tab bar */}
                <ScrollView horizontal={true} style={[styles.tabContainer, schemeStyle.foregroundColor]}>
                    <View style={styles.row}>
                        <TouchableHighlight
                            style={[styles.tabs,schemeStyle.boxColor, activeAll ? { opacity: 0.5 } : {}]}
                            onPress={() => getAllGifts()}>
                            <Text style={[schemeStyle.textColor, styles.tabtext]}>All</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={[styles.tabs,schemeStyle.boxColor,  activeFood ? { opacity: 0.5 } : {}]}
                            onPress={() => filterGifts('Food')}>
                            <Text style={[schemeStyle.textColor, styles.tabtext]}>Food</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={[styles.tabs,schemeStyle.boxColor,  activeShop ? { opacity: 0.5 } : {}]}
                            onPress={() => filterGifts('Shopping')}>
                            <Text style={[schemeStyle.textColor, styles.tabtext]}>Shopping</Text>
                        </TouchableHighlight>
                    </View>
                </ScrollView>


                {/* List of Rewards */}
                <ScrollView showsVerticalScrollIndicator={false} style={[styles.innerContainer, schemeStyle.foregroundColor]}>
                    <View>
                        {resultArr && resultArr.map(item =>
                            <TouchableHighlight
                                style={[styles.outterBox, schemeStyle.boxColor]}
                                onPress={() => navigation.navigate('ItemDesc', { code: item[5] })}>
                                <View style={styles.row}>
                                    <View style={{ width: '30%' }}>
                                        <Image
                                            style={{ height: _width, width: _width, margin: "10%" }}
                                            source={images[item[2]].uri} />
                                    </View >
                                    <View style={{ width: '60%' }}>
                                        <Text style={[schemeStyle.textColor, styles.productTitle]}>{item[0]}</Text>
                                        <Text style={[schemeStyle.textColor]}>{item[1]} CO2 Points</Text>
                                    </View>

                                </View>
                            </TouchableHighlight>
                        )}
                    </View>
                </ScrollView>

            </SafeAreaView>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    innerContainer: {
        padding: 10,
        height: '69%'
    },
    tabContainer: {
        padding: 0,
        margin: 0,
        paddingLeft: 10,
    },
    h1: {
        fontWeight: "bold",
        fontSize: 35,
        textAlign: "center",
        margin: 15
    },
    h2: {
        fontWeight: "bold",
        fontSize: 20,
        paddingLeft: '5%',
        backgroundColor: '#949292'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        // alignItems: 'center'
    },
    outterBox: {
        marginTop: 0,
        margin: 10,
        padding: "3%",
        width: '95%',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 10,
        overflow: 'hidden',
        marginBottom: '2%'
    },

    productTitle: {
        fontWeight: "bold",
        fontSize: 20,
    },

    tabtext: {
        fontSize: 18,
        textAlign: "center",
        paddingVertical: 2,
    },

    tabs: {
        width: 80,
        height: 35,
        borderRadius: 10,
        fontSize: 15,
        padding: 0,
        marginTop: 15,
        marginRight: 5,
        textAlign: "center"
    }


});

export default RedeemListScreen;