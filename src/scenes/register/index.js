import React, {useEffect, useState} from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, TextInput, View, ScrollView, Modal } from 'react-native';
import CryptoJS from 'crypto-js';
import { useDarkMode } from 'react-native-dynamic';

import UserDB from '../../utils/database/userdb'
import { Colors } from '../../styles';

const RegisterScreen = ({ navigation }) => {
    const isDarkMode = useDarkMode();
    var BACKGROUND_COLOR = Colors.LIGHT_SECONDARY_BACKGROUND
    var INPUT_COLOR = Colors.LIGHT_PRIMARY_BACKGROUND
    var TEXT_COLOR = Colors.LIGHT_PRIMARY_TEXT
    var PRIMARY_BUTTON = Colors.LIGHT_PRIMARY_BUTTON
    if (isDarkMode) {
        BACKGROUND_COLOR = Colors.DARK_SECONDARY_BACKGROUND
        TEXT_COLOR = Colors.DARK_PRIMARY_TEXT
        INPUT_COLOR = Colors.DARK_FOURTH_BACKGROUND
        PRIMARY_BUTTON = Colors.DARK_PRIMARY_BUTTON
    }

    const schemeStyle = StyleSheet.create({
        backgroundColor: {
            backgroundColor: BACKGROUND_COLOR,
        },
        textColor: {
            color: TEXT_COLOR,
        },
        inputColor: {
            backgroundColor: INPUT_COLOR,
            color: TEXT_COLOR,
        },
        registerScreenButton: {
            backgroundColor: PRIMARY_BUTTON
        }
    })

    const [username, onChangeUsername] = useState("");
    const [email, onChangeEmail] = useState("");
    const [password, onChangePassword] = useState("");
    const [repassword, onChangeRePassword] = useState("");
    
    const [warning1, onWarning1] = useState(false);
    const [warning2, onWarning2] = useState(false);
    const [warning3, onWarning3] = useState(false);
    const [warning4, onWarning4] = useState(false);
    const [warning5, onWarning5] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const registerClick = () => {
        let errors = [];
        onWarning1(false);
        onWarning2(false);
        onWarning3(false);
        onWarning4(false);
        onWarning5(false);

        if (username === ''){
            errors.push('username')
        }

        if (email === ''){
            errors.push('email')
        }

        if (password === ''){
            errors.push('password')
        }

        if (repassword === ''){
            errors.push('repassword')
        }

        if (errors.length) { 
            onWarning1(true)
            return;
        }

        let password_check = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
        if (!password.match(password_check)) { 
            onWarning4(true)
            return;
        }

        let email_check = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!email.match(email_check)) { 
            onWarning5(true)
            return;
        }

        if (password != repassword) { 
            onWarning2(true)
            return;
        }

        UserDB.getUser(email).then((result) => {
            if (result.length == 0) {
                var hashedPassword = CryptoJS.SHA256(password).toString()

                UserDB.addUser(username, email, hashedPassword);
                UserDB.addEmailVerification(email);
                setModalVisible(true);
                return;
            }
            else {
                onWarning3(true);
                return;
            }
        })
    }

    return (
        <View style={[schemeStyle.backgroundColor, {flex: 1}]}>
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={{flexGrow: 1}}
                    keyboardShouldPersistTaps='handled'>
                    <Text style={[styles.title, schemeStyle.textColor]}>Register</Text>

                    <Text style={schemeStyle.textColor}>Username</Text>
                    <TextInput
                        style={[styles.inputText, schemeStyle.inputColor]}
                        onChangeText={onChangeUsername}
                        value={username}
                        placeholder="Enter your username"
                    />

                    <Text style={schemeStyle.textColor}>Email</Text>
                    <TextInput
                        style={[styles.inputText, schemeStyle.inputColor]}
                        onChangeText={onChangeEmail}
                        value={email}
                        placeholder="Enter your email"
                    />

                    <Text style={schemeStyle.textColor}>Password</Text>
                    <TextInput
                        style={[styles.inputText, schemeStyle.inputColor]}
                        onChangeText={onChangePassword}
                        secureTextEntry={true}
                        value={password}
                        placeholder="Enter your password"
                    />

                    <Text style={schemeStyle.textColor}>Retype Your Password</Text>
                    <TextInput
                        style={[styles.inputText, schemeStyle.inputColor]}
                        onChangeText={onChangeRePassword}
                        secureTextEntry={true}
                        value={repassword}
                        placeholder="Enter your password again"
                    />

                    <View style={styles.row}>
                        <TouchableOpacity
                            style={[styles.registerScreenButton, schemeStyle.registerScreenButton]}
                            onPress={() => registerClick()}
                            underlayColor='#fff'>
                            <Text style={[styles.registerButtonText, schemeStyle.textColor]}>Register</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={warning1?[styles.warning, {display: 'flex'}]:styles.warning}>Fill in all the blanks</Text>
                    <Text style={warning2?[styles.warning, {display: 'flex'}]:styles.warning}>Passwords are not the same</Text>
                    <Text style={warning3?[styles.warning, {display: 'flex'}]:styles.warning}>This email is already in use</Text>
                    <Text style={warning4?[styles.warning, {display: 'flex'}]:styles.warning}>Password must have at least 8 characters, inclusive of one uppercase, one lowercase and numerical number.</Text>
                    <Text style={warning5?[styles.warning, {display: 'flex'}]:styles.warning}>This is not a valid email.</Text>
                    
                    <Text onPress={() => navigation.navigate('Login')} style={[styles.redirectText, schemeStyle.textColor]}>Already have an account?</Text>
                </ScrollView>
            </SafeAreaView>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
                >
                <View style={styles.centeredView}>
                    <View style={[styles.modalView, schemeStyle.backgroundColor]}>
                        <Text style={[styles.modalSubtitle, schemeStyle.textColor]}>Email Verification Required</Text>
                        <Text style={[styles.modalInnertext, schemeStyle.textColor]}>Please check your email to verify your email.</Text>

                        <TouchableOpacity
                            style={[styles.modalButton, schemeStyle.registerScreenButton]}
                            onPress={() => {setModalVisible(!modalVisible);
                                navigation.navigate("Login");}} >
                            <Text style={styles.textStyle}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: '10%',
        marginTop: '25%',
        flex: 1,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 20
    },
    inputText: {
        height: 40,
        margin: 12,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5
    },
    registerScreenButton: {
        marginRight: 10,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
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
    registerButtonText: {
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    redirectText: {
        textAlign: 'center',
        marginTop: 'auto',
        fontWeight: 'bold',
    },
    warning: {
        color: "red",
        display: 'none'
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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 5
    },
    textStyle: {
        fontWeight: "bold",
        textAlign: "center"
    },
    modalSubtitle: {
        fontWeight: "bold",
        fontSize: 25,
        marginBottom: 15,
        color: "red"
    },
    modalInnertext: {
        padding: 5,
    },
    modalButton: {
        marginTop: 15,
        padding: 10,
        borderRadius: 60,
    },
});

export default RegisterScreen;