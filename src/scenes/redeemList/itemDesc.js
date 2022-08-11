import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableHighlight, View, Image, Dimensions, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useDarkMode } from 'react-native-dynamic';

import { HeaderBar } from "../../components/organisms";
import { Colors } from '../../styles';
import UserDB from '../../utils/database/userdb';

const ItemDescScreen = ({ navigation }) => {
    const isDarkMode = useDarkMode();
    var BACKGROUND_COLOR = Colors.LIGHT_THIRD_BACKGROUND
    var TEXT_COLOR = Colors.LIGHT_PRIMARY_TEXT
    var BOX_COLOR = Colors.LIGHT_PRIMARY_BUTTON
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

    const B = (props) => <Text style={{ fontWeight: 'bold' }}>{props.children}</Text>

    const _imgwidth = Dimensions.get('screen').width * 0.1;
    const _width = Dimensions.get('screen').width * 0.3;

    const [modalVisible, setModalVisible] = useState(false);

    const [points, setPoints] = useState(0);

    const [request, setRequest] = useState(false);
    const getUser = async () => {
        if (request == false) {
            setRequest(true);

            await AsyncStorage.getItem('user')
                .then(email => {
                    UserDB.getUser(email).then((result) => {
                        if (result.length != 0) {
                            setPoints(result[0][8]);
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
            <HeaderBar navigation={navigation} />

            {/* Back to main redeem list page */}
            <SafeAreaView style={{ flex: 1 }}>
                <TouchableHighlight
                    style={{ padding: 10 }}
                    onPress={() => navigation.navigate('RedeemList')}>
                    <Text style={[schemeStyle.textColor, { fontWeight: "bold" }]}>go back to redeemList</Text>
                </TouchableHighlight>

                {/* Page Content */}
                <ScrollView showsVerticalScrollIndicator={false} style={[styles.innerContainer, schemeStyle.foregroundColor]}>
                    {/* Item Name and Img */}
                    <View style={styles.row}>
                        <View style={{ width: '30%' }}>
                            <Image
                                style={{ height: _width, width: _width, margin: 0, backgroundColor: 'blue' }}
                                source={require("../../assets/images/favicon.png")} />
                        </View >
                        <View style={{ backgroundColor: 'green', width: '60%', paddingTop: '5%' }}>
                            <Text style={[schemeStyle.textColor, styles.productTitle]}>Reward Name</Text>
                            <Text style={[schemeStyle.textColor,styles.normaltext]}>20 CO2 Points</Text>
                        </View>

                    </View>

                    {/* Item description Title */}
                    <Text style={[schemeStyle.textColor]}></Text>
                    <Text style={[styles.h2, schemeStyle.textColor]}>Item details</Text>

                    {/* Item description content */}
                    <View style={{ margin: "5%" }}>
                        <Text style={[styles.normaltext, schemeStyle.textColor]}><B>Industry:</B> Food</Text>
                        <Text style={[styles.normaltext, schemeStyle.textColor]}><B>Company:</B> KFC</Text>
                        <Text style={[styles.normaltext, schemeStyle.textColor]}><B>Description</B> {'\n'} WOW </Text>
                    </View>

                    {/* Redeem Button*/}
                    <View style={styles.row}>
                        <TouchableHighlight
                            style={[styles.btn, schemeStyle.boxColor]}
                            onPress={() => setModalVisible(true)}>
                            <View style={styles.row}>
                                <Text style={[schemeStyle.textColor]}>Redeem?</Text>
                            </View>
                        </TouchableHighlight>

                    </View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Redemption process is irreversible. Are you sure you want to redeem item-name?</Text>
                                <View style={styles.row}>
                                    <TouchableHighlight
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => setModalVisible(!modalVisible)}
                                    >
                                        <Text style={styles.textStyle}>Yes</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => setModalVisible(!modalVisible)}
                                    >
                                        <Text style={styles.textStyle}>No</Text>
                                    </TouchableHighlight>
                                </View>

                            </View>
                        </View>
                    </Modal>


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
    normaltext: {
        fontSize: 18,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        // alignItems: 'center'
    },
    btn: {
        marginTop: 10,
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
        fontSize: 25,
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 12,
        padding: 10,
        paddingHorizontal: 20,
        elevation: 2,
        marginHorizontal: "2%"
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }


});

export default ItemDescScreen;