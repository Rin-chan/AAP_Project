import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableHighlight, View, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDarkMode } from 'react-native-dynamic';
import { Avatar } from 'react-native-paper';

import '../../translations/i18n';
import { useTranslation } from 'react-i18next';

import { HeaderBar, LoadingScreen } from "../../components/organisms";
import { Colors } from '../../styles';
import UserDB from '../../utils/database/userdb';

const HomeScreen = ({ navigation }) => {
    const { t, i18n } = useTranslation();

    const isDarkMode = useDarkMode();
    var FOREGROUND_COLOR = Colors.LIGHT_PRIMARY_BACKGROUND
    var BACKGROUND_COLOR = Colors.LIGHT_THIRD_BACKGROUND
    var BOX_COLOR = Colors.LIGHT_SECONDARY_BACKGROUND
    var TEXT_COLOR = Colors.LIGHT_PRIMARY_TEXT
    var CARD_COLOR = '#399ED5'
    var ICON_COLOR = "black"
    if (isDarkMode) {
        BACKGROUND_COLOR = Colors.DARK_FOURTH_BACKGROUND
        FOREGROUND_COLOR = Colors.DARK_THIRD_BACKGROUND
        TEXT_COLOR = Colors.DARK_PRIMARY_TEXT
        BOX_COLOR = Colors.DARK_FOURTH_BACKGROUND
        CARD_COLOR = '#2682B5'
        ICON_COLOR = "white"
    }

    const schemeStyle = StyleSheet.create({
        backgroundColor: {
            backgroundColor: BACKGROUND_COLOR,
        },
        foregroundColor: {
            backgroundColor: FOREGROUND_COLOR,
        },
        textColor: {
            color: TEXT_COLOR,
        },
        boxColor: {
            backgroundColor: BOX_COLOR,
        },
        cardColor: {
            backgroundColor: CARD_COLOR,
        },
        iconColor: {
            tintColor: ICON_COLOR
        },
    })

    const _width = Dimensions.get('screen').width * 0.2;

    const [username, setUsername] = useState("");
    const [points, setPoints] = useState(0);
    const [image, setImage] = useState(null);

    const [request, setRequest] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const [timer, setTimer] = useState(0);

    async function logout() {
        try {
            await AsyncStorage.removeItem("user");
            await AsyncStorage.removeItem("userToken");
            navigation.navigate('Login');
        }
        catch (exception) {
            console.log("LOGOUT FAILED");
            console.log(exception);
        }
    };

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

    useEffect(() => {
        if (timer >= 10) {
            logout();
        }
    }, [timer]);

    const getUser = async () => {
        if (request == false) {
            setRequest(true);

            await AsyncStorage.getItem('user')
                .then(email => {
                    UserDB.getUser(email).then((result) => {
                        if (result.length != 0) {
                            setUsername(result[0][1]);
                            setPoints(result[0][8]);
                            setImage(result[0][11]);
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

    return (
        <View style={[styles.container, schemeStyle.backgroundColor]}>
            {
                pageLoading == false ?
                    <View style={{ flex: 1, width: Dimensions.get('screen').width, height: Dimensions.get('screen').height }}>
                        <LoadingScreen />
                    </View>
                    :
                    <View style={{ flex: 1 }}>
                        <HeaderBar navigation={navigation} />

                        <View style={{ flex: 1 }}>
                            <TouchableOpacity
                                style={[styles.userCard, schemeStyle.cardColor]}
                                onPress={() => navigation.navigate('Profile')}>
                                {
                                    image == null ?
                                        <Avatar.Text size={80} label={username[0]} />
                                        :
                                        <Avatar.Image size={80} source={{uri: `data:image/jpeg;base64,${image}`}} />
                                }
                                <View style={{ width: "60%" }}>
                                    <Text style={[schemeStyle.textColor, { fontWeight: "bold" }]}>{username}</Text>
                                    <Text style={schemeStyle.textColor}>{t('scenes:home_index:points')}: {points}</Text>

                                    <Text style={[schemeStyle.textColor, { fontSize: 10, marginTop: "auto" }]}>{t('scenes:home_index:profile')} &gt;</Text>
                                </View>
                            </TouchableOpacity>

                            <ScrollView showsVerticalScrollIndicator={false} style={[styles.innerContainer, schemeStyle.foregroundColor]}>
                                <View style={styles.row}>
                                    <View style={styles.outterBox}>
                                        <TouchableHighlight
                                            style={[styles.box, schemeStyle.boxColor]}
                                            onPress={() => navigation.navigate('ScanQRcode')}>
                                            <Image
                                                style={[schemeStyle.iconColor, { height: _width, width: _width }]}
                                                source={require("../../assets/images/scanqrcode.png")} />
                                        </TouchableHighlight>
                                        <Text style={[styles.textCenter, schemeStyle.textColor]}>{t('scenes:home_index:scanQrCode')}</Text>
                                    </View>

                                    <View style={styles.outterBox}>
                                        <TouchableHighlight
                                            style={[styles.box, schemeStyle.boxColor]}
                                            onPress={() => navigation.navigate('RedeemList')}>
                                            <Image
                                                style={[schemeStyle.iconColor, { height: _width, width: _width }]}
                                                source={require("../../assets/images/gift.png")} />
                                        </TouchableHighlight>
                                        <Text style={[styles.textCenter, schemeStyle.textColor]}>{t('scenes:home_index:redeemList')}</Text>
                                    </View>
                                </View>

                                <View style={styles.row}>
                                    <View style={styles.outterBox}>
                                        <TouchableHighlight
                                            style={[styles.box, schemeStyle.boxColor]}
                                            onPress={() => navigation.navigate('findNearestBin')}>
                                            <Image
                                                style={[schemeStyle.iconColor, { height: _width, width: _width }]}
                                                source={require("../../assets/images/mapbin.png")} />
                                        </TouchableHighlight>
                                        <Text style={[styles.textCenter, schemeStyle.textColor]}>{t('scenes:home_index:locateBins')}</Text>
                                    </View>

                                    <View style={styles.outterBox}>
                                        <TouchableHighlight
                                            style={[styles.box, schemeStyle.boxColor]}
                                            onPress={() => navigation.navigate('About')}>
                                            <Image
                                                style={[schemeStyle.iconColor, { height: _width, width: _width }]}
                                                source={require("../../assets/images/abtus.png")} />
                                        </TouchableHighlight>
                                        <Text style={[styles.textCenter, schemeStyle.textColor]}>{t('scenes:home_index:about')}</Text>
                                    </View>
                                </View>

                                <View style={styles.row}>
                                    <View style={styles.outterBox}>
                                        <TouchableHighlight
                                            style={[styles.box, schemeStyle.boxColor]}
                                            onPress={() => navigation.navigate('EWasteIt')}>
                                            <Image
                                                style={{ height: _width, width: _width }}
                                                source={require("../../assets/images/games/EWasteItIcon.png")} />
                                        </TouchableHighlight>
                                        <Text style={[styles.textCenter, schemeStyle.textColor]}>{t('scenes:home_index:eWasteItGame')}</Text>
                                    </View>

                                    <View style={styles.outterBox}>
                                        <TouchableHighlight
                                            style={[styles.box, schemeStyle.boxColor]}
                                            onPress={() => navigation.navigate('StepItUp')}>
                                            <Image
                                                style={{ height: _width, width: _width }}
                                                source={require("../../assets/images/games/StepItUpIcon.png")} />
                                        </TouchableHighlight>
                                        <Text style={[styles.textCenter, schemeStyle.textColor]}>{t('scenes:home_index:stepItUpGame')}</Text>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
            }
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userCard: {
        borderRadius: 20,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',
        left: '10%',
        right: '10%',
        top: '5%',
        zIndex: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.6,
        shadowRadius: 5,
        elevation: 5
    },
    innerContainer: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: 'absolute',
        bottom: 0,
        top: '14%',
        left: 0,
        right: 0,
        paddingTop: '10%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    outterBox: {
        margin: 20
    },
    box: {
        margin: 5,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5
    },
    textCenter: {
        textAlign: "center"
    },
});

export default HomeScreen;
