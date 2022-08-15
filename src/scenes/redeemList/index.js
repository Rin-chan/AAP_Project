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
    if (isDarkMode) {
        BACKGROUND_COLOR = Colors.DARK_FOURTH_BACKGROUND
        TEXT_COLOR = Colors.DARK_PRIMARY_TEXT
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
        }
    })

    const _imgwidth = Dimensions.get('screen').width * 0.1;
    const _width = Dimensions.get('screen').width * 0.2;


    const [points, setPoints] = useState(0);
    const [request, setRequest] = useState(false);
    const [request1, setRequest1] = useState(false);
    const [resultArr, setResultArr] = useState(null);
    const [pageLoading, setPageLoading] = useState(false);
    const [timer, setTimer] = useState(0);

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
        if (request1 == false) {
            setRequest1(true);
            await UserDB.getAllGifts(0, 10).then((result1) => {
                console.log("result1" + result1);
                if (result1.length != 0) {
                    setResultArr(result1);
                    console.log("result from db = " + resultArr);
                }
                else {
                    console.log("GIFTS NOT FOUND");
                    return;
                }
            });
        }

    }

    const getUser = async () => {
        if (request == false) {
            setRequest(true);

            await AsyncStorage.getItem('user')
                .then(email => {
                    console.log(email);
                    UserDB.getUser(email).then((result) => {
                        if (result.length != 0) {
                            console.log("user" + result);
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


    getUser();

    console.log("resultArr = " + resultArr);

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
                            style={[styles.tabs]}
                            onPress={() => navigation.navigate('RedeemMainList')}>
                            <Text style={[schemeStyle.textColor, styles.tabtext]}>All</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={[styles.tabs]}
                            onPress={() => navigation.navigate('RedeemMainList')}>
                            <Text style={[schemeStyle.textColor, styles.tabtext]}>Food</Text>
                        </TouchableHighlight>
                    </View>
                </ScrollView>


                {/* List of Rewards */}
                <ScrollView showsVerticalScrollIndicator={false} style={[styles.innerContainer, schemeStyle.foregroundColor]}>
                    <View>
                        {resultArr && resultArr.map(item =>
                            <TouchableHighlight
                                style={[styles.outterBox, schemeStyle.boxColor]}
                                onPress={() => navigation.navigate('ItemDesc', { code: item[4] })}>
                                <View style={styles.row}>
                                    <View style={{ width: '30%' }}>
                                        <Image
                                            style={{ height: _width, width: _width, margin: "10%" }}
                                            source={require("../../assets/images/grabfood.png")} />
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
        textAlign: "center",
        backgroundColor: 'white',
    }


});

export default RedeemListScreen;