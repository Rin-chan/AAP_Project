import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableHighlight, TextInput, View, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';

import { HeaderBar } from "../../components/organisms";
import { Colors } from '../../styles';
import UserDB from '../../utils/database/userdb';

const editPasswordScreen = ({ navigation }) => {
    const [curPassword, setCurPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [reNewPassword, setReNewPassword] = useState("");

    const [warning1, onWarning1] = useState(false);
    const [warning2, onWarning2] = useState(false);
    const [warning3, onWarning3] = useState(false);
    const [warning4, onWarning4] = useState(false);

    let check = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

    const updateClick = async () => {
        onWarning1(false);
        onWarning2(false);
        onWarning3(false);
        onWarning4(false);

        if (newPassword === ''){
            onWarning4(true);
            return;
        }

        if (reNewPassword === ''){
            onWarning4(true);
            return;
        }

        if (!newPassword.match(check)) { 
            onWarning3(true)
            return;
        }

        if (newPassword != reNewPassword) {
            onWarning2(true);
            return;
        }

        await AsyncStorage.getItem('user')
        .then(email => {
            UserDB.getUser(email).then((result) => {
                if(result.length < 1) {
                    console.log("USER NOT FOUND");
                    return;
                }
                else {
                    var curHashedPassword = CryptoJS.SHA256(curPassword).toString()

                    if (result['0']['password'] != curHashedPassword) {
                        onWarning1(true);
                        return;
                    }

                    var newHashedPassword = CryptoJS.SHA256(newPassword).toString()

                    UserDB.updateUserPassword(email, newHashedPassword);
                    navigation.push("Profile");
                    return;
                }
            });
        });
    }

    return (
        <View style={styles.container}>
            <HeaderBar navigation={navigation}/>

            <View style={{flex: 1}}>
                <TouchableHighlight
                    style={{padding: 10}}
                    onPress={() => navigation.navigate('Profile')}>
                        <Text style={{fontWeight: "bold"}}>Go back to profile page</Text>
                </TouchableHighlight>

                <ScrollView showsVerticalScrollIndicator={false} style={styles.innerContainer}>
                <Text style={{fontSize: 35, fontWeight: "bold"}}>Change Password</Text>

                    <View style={styles.row}>
                        <Text style={styles.information}>Current Password:</Text>
                        <TextInput
                            style={styles.inputText}
                            onChangeText={(text) => {setCurPassword(text)}}
                            value={curPassword}
                            secureTextEntry={true}
                        />
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.information}>New Password:</Text>
                        <TextInput
                            style={styles.inputText}
                            onChangeText={(text) => {setNewPassword(text)}}
                            value={newPassword}
                            secureTextEntry={true}
                        />
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.information}>Retype New Password:</Text>
                        <TextInput
                            style={styles.inputText}
                            onChangeText={(text) => {setReNewPassword(text)}}
                            value={reNewPassword}
                            secureTextEntry={true}
                        />
                    </View>

                    <Text style={warning1?[styles.warning, {display: 'flex'}]:styles.warning}>Current password is incorrect</Text>
                    <Text style={warning2?[styles.warning, {display: 'flex'}]:styles.warning}>Passwords are not the same</Text>
                    <Text style={warning3?[styles.warning, {display: 'flex'}]:styles.warning}>Password must have at least 8 characters, inclusive of one uppercase, one lowercase and numerical number.</Text>
                    <Text style={warning4?[styles.warning, {display: 'flex'}]:styles.warning}>Fill in all the blanks</Text>

                    <View style={styles.row}>
                        <TouchableOpacity
                            style={styles.cancelScreenButton}
                            onPress={() => navigation.navigate('Profile')}
                            underlayColor='#fff'>
                            <Text style={styles.updateButtonText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.updateScreenButton}
                            onPress={() => updateClick()}
                            underlayColor='#fff'>
                            <Text style={styles.updateButtonText}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.GREY_BACKGROUND,
        flex: 1,
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
    row: {
        flexDirection: "row",
    },
    inputText: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: "100%",
        flex: 1,
    },
    information: {
        flexDirection: "column",
        alignSelf: "center"
    },
    warning: {
        color: "red",
        display: 'none'
    },
    updateScreenButton: {
        marginRight: 10,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: Colors.GREEN_BUTTON,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff'
    },
    updateButtonText: {
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
    cancelScreenButton: {
        marginRight: 10,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: Colors.RED_BUTTON,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
    },
});

export default editPasswordScreen;