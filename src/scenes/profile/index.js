import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableHighlight, View, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDarkMode } from 'react-native-dynamic';

import { HeaderBar, LoadingScreen } from "../../components/organisms";
import { Colors } from '../../styles';
import UserDB from '../../utils/database/userdb';

const ProfileScreen = ({ navigation }) => {
    const isDarkMode = useDarkMode();
    var FOREGROUND_COLOR = Colors.LIGHT_SECONDARY_BACKGROUND
    var BACKGROUND_COLOR = Colors.LIGHT_THIRD_BACKGROUND
    var INPUT_COLOR = Colors.LIGHT_PRIMARY_BACKGROUND
    var TEXT_COLOR = Colors.LIGHT_PRIMARY_TEXT
    var PRIMARY_BUTTON = Colors.LIGHT_PRIMARY_BUTTON
    var DANGER_BUTTON = Colors.LIGHT_DANGER_BUTTON
    if (isDarkMode) {
        BACKGROUND_COLOR = Colors.DARK_FOURTH_BACKGROUND
        FOREGROUND_COLOR = Colors.DARK_THIRD_BACKGROUND
        TEXT_COLOR = Colors.DARK_PRIMARY_TEXT
        INPUT_COLOR = Colors.DARK_FOURTH_BACKGROUND
        PRIMARY_BUTTON = Colors.DARK_PRIMARY_BUTTON
        DANGER_BUTTON = Colors.DARK_DANGER_BUTTON
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
        inputColor: {
            backgroundColor: INPUT_COLOR,
            color: TEXT_COLOR,
        },
        primaryScreenButton: {
            backgroundColor: PRIMARY_BUTTON,
        },
        dangerScreenButton: {
            backgroundColor: DANGER_BUTTON,
        }
    })

    const _width = Dimensions.get('screen').width * 0.4;

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [face, setFace] = useState(false);

    const [request, setRequest] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);

    const getUser = async () => {
        if (request == false) {
            setRequest(true);

            await AsyncStorage.getItem('user')
            .then(email => {
                setEmail(email);

                UserDB.getUser(email).then((result) => {
                    if(result != undefined) {
                        setUsername(result[0][1]);
                        setContact(result[0][4]);
                        setAddress(result[0][5]);
                        setFace(result[0][6]);
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

    async function logout() {
        try {
            await AsyncStorage.removeItem("user");
            await AsyncStorage.removeItem("userToken");
            navigation.navigate('Login');
        }
        catch(exception) {
            console.log("LOGOUT FAILED");
            console.log(exception);
        }
    };

    getUser();

    async function resetFaceVeri() {
        await AsyncStorage.getItem('user')
        .then(email => {
            UserDB.getUser(email).then((result) => {
                if(result.length != 0) {
                    UserDB.updateUserFace(email, "", 0);
                    setFace(false);
                    return;
                }
                else {
                    console.log("USER NOT FOUND");
                    return;
                }
            });
        });
    }

    async function addFaceVeri() {
        navigation.navigate("faceVerification");
        return;
    }

    return (
        <View style={[styles.container, schemeStyle.backgroundColor]}>
            {
                pageLoading == false?
                <View style={{flex: 1, width:Dimensions.get('screen').width, height:Dimensions.get('screen').height }}>
                    <LoadingScreen/>
                </View>
                :
                <View style={{flex: 1}}>
                    <HeaderBar navigation={navigation}/>

                    <View style={{flex: 1}}>
                        <TouchableHighlight
                            style={{padding: 10}}
                            onPress={() => navigation.navigate('Main')}>
                                <Text style={[schemeStyle.textColor, {fontWeight: "bold"}]}>Go back to home</Text>
                        </TouchableHighlight>

                        <ScrollView showsVerticalScrollIndicator={false} style={[styles.innerContainer, schemeStyle.foregroundColor]} contentInsetAdjustmentBehavior="automatic">
                            <Image
                                style={{ height: _width, width: _width, alignSelf: "center" }}
                                source={require("../../assets/images/favicon.png")} />

                            <Text style={[styles.information, schemeStyle.textColor]}>Username:</Text>
                            <Text style={[styles.details, schemeStyle.textColor, schemeStyle.inputColor]}>{username}</Text>

                            <Text style={[styles.information, schemeStyle.textColor]}>Email:</Text>
                            <Text style={[styles.details, schemeStyle.textColor, schemeStyle.inputColor]}>{email}</Text>

                            {contact != ''? (<View>
                                <Text style={[styles.information, schemeStyle.textColor]}>Contact:</Text>
                                <Text style={[styles.details, schemeStyle.textColor, schemeStyle.inputColor]}>{contact}</Text>
                                </View>)
                                : null }

                            {address != ''? (<View>
                                <Text style={[styles.information, schemeStyle.textColor]}>Address:</Text>
                                <Text style={[styles.details, schemeStyle.textColor, schemeStyle.inputColor]}>{address}</Text>
                                </View>)
                                : null }
                            
                            {face == true? (<View style={styles.row}>
                                <Text style={[styles.information, schemeStyle.textColor]}>Face Verification Status:</Text>
                                <Text style={[styles.faceVeriDetails, schemeStyle.textColor]}>Up and working</Text>
                                <TouchableOpacity
                                    style={[styles.faceVeriButton, schemeStyle.primaryScreenButton]}
                                    onPress={resetFaceVeri}
                                    underlayColor='#fff'>
                                    <Text style={[styles.logoutButtonText, schemeStyle.textColor]}>Reset face verification</Text>
                                </TouchableOpacity>
                                </View>)
                                : (<View style={styles.row}>
                                    <Text style={[styles.information, schemeStyle.textColor]}>Face Verification Status:</Text>
                                    <Text style={[styles.faceVeriDetails, schemeStyle.textColor]}>Not set up</Text>
                                    <TouchableOpacity
                                        style={[styles.faceVeriButton, schemeStyle.primaryScreenButton]}
                                        onPress={addFaceVeri}
                                        underlayColor='#fff'>
                                        <Text style={[styles.buttonText, schemeStyle.textColor]}>Add face verification</Text>
                                    </TouchableOpacity>
                                    </View>)
                                    }

                            <View style={styles.buttonRow}>
                                <TouchableOpacity
                                    style={[styles.editButton, schemeStyle.primaryScreenButton]}
                                    onPress={() => navigation.navigate("editProfile")}
                                    underlayColor='#fff'>
                                    <Text style={[styles.buttonText, schemeStyle.textColor]}>Edit Profile</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.editButton, schemeStyle.primaryScreenButton]}
                                    onPress={() => navigation.navigate("editPassword")}
                                    underlayColor='#fff'>
                                    <Text style={[styles.buttonText, schemeStyle.textColor]}>Change Password</Text>
                                </TouchableOpacity>
                            </View>
                            
                            <SafeAreaView>
                                <TouchableOpacity
                                    style={[styles.logoutButton, schemeStyle.dangerScreenButton]}
                                    onPress={() => logout()}
                                    underlayColor='#fff'>
                                    <Text style={[styles.buttonText, schemeStyle.textColor]}>Log Out</Text>
                                </TouchableOpacity>
                            </SafeAreaView>
                        </ScrollView>
                    </View>
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        marginLeft: "5%",
        marginRight: "5%",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: "5%",
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 5
    },
    information: {
        margin: "2%",
    },
    details: {
        width: "100%",
        padding: "2%",
        margin: "2%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5
    },
    logoutButton: {
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: Colors.RED_BUTTON,
        borderRadius: 20,
        width: "100%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5
    },
    buttonText: {
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
    row: {
        flexDirection: "row",
        marginBottom: "5%",
        marginTop: "5%",
        flexWrap: "wrap"
    },
    buttonRow: {
        flex: 1,
        flexDirection: "row",
        marginBottom: "5%",
        marginTop: "5%",
        flexWrap: "nowrap"
    },
    faceVeriDetails: {
        margin: "2%",
    },
    faceVeriButton: {
        padding: 10,
        width: "40%",
        backgroundColor: Colors.GREEN_BUTTON,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5
    },
    editButton: {
        marginTop: 10,
        marginLeft: "2%",
        marginRight: "2%",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: Colors.GREEN_BUTTON,
        borderRadius: 20,
        width: "46%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5
    }
});

export default ProfileScreen;