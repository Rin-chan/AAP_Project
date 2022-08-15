import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableHighlight, View, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { useDarkMode } from 'react-native-dynamic';

import { HeaderBar } from "../../components/organisms";
import { Colors } from '../../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserDB from '../../utils/database/userdb';

const RedeemHistoryScreen = ({ navigation }) => {
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
        },
        usedboxcolor: {
            backgroundColor: "#D7D8D4"
        }
    })

    const _imgwidth = Dimensions.get('screen').width * 0.1;
    const _width = Dimensions.get('screen').width * 0.2;


    const [points, setPoints] = useState(0);
    const [request, setRequest] = useState(false);

    const [useditemArr, setuseditemArr] = useState(null);
    const [unuseditemArr, setunuseditemArr] = useState(null);

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


    const getAllItems = async () => {
        if (request == false) {
            setRequest(true);

            await AsyncStorage.getItem('user')
                .then(email => {
                    setPageLoading(true);
                    console.log(email);
                    UserDB.getUsedRedeemItems(email).then((result) => {
                        if (result.length != 0) {
                            setuseditemArr(result);
                            console.log("Used Items:" + result);
                        }
                        else {
                            console.log("No Used Items");
                            return;
                        }
                    });
                    UserDB.getUnusedRedeemItems(email).then((result) => {
                        if (result.length != 0) {
                            setunuseditemArr(result);
                            console.log("Unused Items:" + result);
                        }
                        else {
                            console.log("No Unused Items");
                            return;
                        }
                    });

                });
        }
    };


    getAllItems();


    const displayItems = () => {
        if (unuseditemArr == null && useditemArr == null) {
            return (
                <View>
                    <Text style={[schemeStyle.textColor, styles.tabtext]}> No Items</Text>
                </View>
               );  
        } else {
            return (
                <View>
                    {unuseditemArr && unuseditemArr.map(item => 
                        <TouchableHighlight
                            style={[styles.outterBox, schemeStyle.boxColor]}
                            onPress={() => navigation.navigate('RHItemDesc', { code: item[8] })}>
                            <View style={styles.row}>
                                <View style={{ width: '30%' }}>
                                    <Image
                                        style={{ height: _width, width: _width, margin: "10%" }}
                                        source={require("../../assets/images/grabfood.png")} />
                                </View >
                                <View style={{ width: '60%' }}>
                                    <Text style={[schemeStyle.textColor, styles.productTitle]}>{item[2]}</Text>
                                    <Text style={[schemeStyle.textColor]}>{item[5]}</Text>
                                </View>

                            </View>
                        </TouchableHighlight>
                    )}
                    {useditemArr && useditemArr.map(item =>
                        <TouchableHighlight
                            style={[styles.outterBox, schemeStyle.usedboxcolor]}
                            onPress={() => navigation.navigate('RedeemHistory')}>
                            <View style={styles.row}>
                                <View style={{ width: '30%' }}>
                                    <Image
                                        style={{ height: _width, width: _width, margin: "10%" }}
                                        source={require("../../assets/images/grabfood.png")} />
                                </View >
                                <View style={{ width: '60%' }}>
                                    <Text style={[schemeStyle.textColor, styles.productTitle]}>{item[2]}</Text>
                                    <Text style={[schemeStyle.textColor]}>{item[5]} CO2 Points</Text>
                                </View>

                            </View>
                        </TouchableHighlight>
                    )}

                </View>
            );
        }
    }

    return (
        <View style={[styles.container, schemeStyle.backgroundColor]}>
            <HeaderBar navigation={navigation} />

            {/* Page Content */}
            <SafeAreaView style={{ flex: 1 }}>
                {/* h1 - Redeem History */}
                <View style={styles.row}>
                    <Text style={[styles.h1, schemeStyle.textColor]}>Redeem History</Text>
                </View>

                {/* h2 - Reward list */}
                {/* <Text style={[styles.h2, schemeStyle.textColor]}>Reward list</Text> */}

                {/* List of Rewards */}
                <ScrollView showsVerticalScrollIndicator={false} style={[styles.innerContainer, schemeStyle.foregroundColor]}>
                    {displayItems()}
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

export default RedeemHistoryScreen;