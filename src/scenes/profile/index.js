import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableHighlight, View, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { HeaderBar } from "../../components/organisms";
import { Colors } from '../../styles';
import UserDB from '../../utils/database/userdb';

const ProfileScreen = ({ navigation }) => {
    const _width = Dimensions.get('screen').width * 0.4;

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [face, setFace] = useState(false);

    const [request, setRequest] = useState(false);

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
        <View style={styles.container}>
            <HeaderBar navigation={navigation}/>

            <View style={{flex: 1}}>
                <TouchableHighlight
                    style={{padding: 10}}
                    onPress={() => navigation.navigate('Main')}>
                        <Text style={{fontWeight: "bold"}}>Go back to home</Text>
                </TouchableHighlight>

                <ScrollView showsVerticalScrollIndicator={false} style={styles.innerContainer} contentInsetAdjustmentBehavior="automatic">
                    <Image
                        style={{ height: _width, width: _width, alignSelf: "center" }}
                        source={require("../../assets/images/favicon.png")} />

                    <Text style={styles.information}>Username:</Text>
                    <Text style={styles.details}>{username}</Text>

                    <Text style={styles.information}>Email:</Text>
                    <Text style={styles.details}>{email}</Text>

                    {contact != ''? (<View>
                        <Text style={styles.information}>Contact:</Text>
                        <Text style={styles.details}>{contact}</Text>
                        </View>)
                        : null }

                    {address != ''? (<View>
                        <Text style={styles.information}>Address:</Text>
                        <Text style={styles.details}>{address}</Text>
                        </View>)
                        : null }
                    
                    {face == true? (<View style={styles.row}>
                        <Text style={styles.information}>Face Verification Status:</Text>
                        <Text style={styles.faceVeriDetails}>Up and working</Text>
                        <TouchableOpacity
                            style={styles.faceVeriButton}
                            onPress={resetFaceVeri}
                            underlayColor='#fff'>
                            <Text style={styles.logoutButtonText}>Reset face verification</Text>
                        </TouchableOpacity>
                        </View>)
                        : (<View style={styles.row}>
                            <Text style={styles.information}>Face Verification Status:</Text>
                            <Text style={styles.faceVeriDetails}>Not set up</Text>
                            <TouchableOpacity
                                style={styles.faceVeriButton}
                                onPress={addFaceVeri}
                                underlayColor='#fff'>
                                <Text style={styles.buttonText}>Add face verification</Text>
                            </TouchableOpacity>
                            </View>)
                            }

                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={styles.editButton}
                            onPress={() => navigation.navigate("editProfile")}
                            underlayColor='#fff'>
                            <Text style={styles.buttonText}>Edit Profile</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.editButton}
                            onPress={() => navigation.navigate("editPassword")}
                            underlayColor='#fff'>
                            <Text style={styles.buttonText}>Change Password</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <SafeAreaView>
                        <TouchableOpacity
                            style={styles.logoutButton}
                            onPress={() => logout()}
                            underlayColor='#fff'>
                            <Text style={styles.buttonText}>Log Out</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.GREY_BACKGROUND
    },
    innerContainer: {
        flex: 1,
        marginLeft: "5%",
        marginRight: "5%",
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: "5%",
        backgroundColor: "white"
    },
    information: {
        margin: "2%",
    },
    details: {
        width: "100%",
        borderWidth: 1,
        padding: "2%",
        margin: "2%"
    },
    logoutButton: {
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: Colors.RED_BUTTON,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
        width: "100%",
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
        borderWidth: 1,
        borderColor: '#fff',
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
        borderWidth: 1,
        borderColor: '#fff',
        width: "46%",
    }
});

export default ProfileScreen;