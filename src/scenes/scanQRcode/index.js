import React, { useState, useEffect } from 'react';
// Style Related
import { StyleSheet, SafeAreaView, Text, TouchableHighlight, View, Image, Dimensions, ScrollView, TouchableOpacity, TouchableHighlightBase } from 'react-native';
import { useDarkMode } from 'react-native-dynamic';
import { HeaderBar } from "../../components/organisms";
import { Colors } from '../../styles';
// Camera Scanner Related
import { BarCodeScanner } from 'expo-barcode-scanner';
// DB Related
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserDB from '../../utils/database/userdb';


const ScanQRCodeScreen = ({ navigation }) => {

    // Style Settings
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

    // Camera
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    // User State
    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = async ({ type, data }) => {
        setScanned(true);
        await AsyncStorage.getItem('user')
        .then(email => {
            console.log(email);
            UserDB.getUserPoints(email).then((result) => {
                if(result.length != 0) {
                    // '{"customID": unique_id, "Points": points }'
                    console.log(data)
                    var dict_input = JSON.parse(data);
                    var collected_pts = dict_input['Points']
                    console.log(collected_pts)
                    new_pts = parseInt(result) + parseInt(collected_pts)
                    console.log(typeof new_pts)
                    UserDB.updateUserPoints(email, new_pts);
                    navigation.navigate("displayCollectedPoints", {collectedPoints: collected_pts});
                    return;
                }
                else {
                    console.log("USER NOT FOUND");
                    return;
                }
            });
        });
    };

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={[styles.container, schemeStyle.backgroundColor]}>
            <HeaderBar navigation={navigation} />

            {/* Page Content */}
            <SafeAreaView style={{ flex: 1 }}>

                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
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
        margin: 30,
        padding: "4%",
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
        marginBottom: '5%'
    },

    productTitle: {
        fontWeight: "bold",
        fontSize: 20,
    },

    tabs: {
        width: 100,
        height: 40,
        borderRadius: 10,
        fontSize: 15,
        paddingLeft: 20,
        paddingRight: 20,
        padding: 0,
        marginTop: 15,
        marginRight: 5,
        textAlign: "center",
        backgroundColor: 'green',
    },

    camera: {
        wdith: '100%',
        height: '100%'
    }


});

export default ScanQRCodeScreen;