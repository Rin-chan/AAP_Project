import React, {useEffect, useState} from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, TextInput, View, ScrollView, Modal } from 'react-native';
import CryptoJS from 'crypto-js';
import { useDarkMode } from 'react-native-dynamic';

import '../../translations/i18n';
import {useTranslation} from 'react-i18next';

import UserDB from '../../utils/database/userdb'
import { Colors } from '../../styles';

const RegisterScreen = ({ navigation }) => {
    const {t, i18n} = useTranslation();

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

        let lowerEmail = email.toLowerCase();
        UserDB.getUser(lowerEmail).then((result) => {
            if (result.length == 0) {
                var hashedPassword = CryptoJS.SHA256(password).toString()

                UserDB.addUser(username, lowerEmail, hashedPassword);
                UserDB.addEmailVerification(lowerEmail);
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
                    <Text style={[styles.title, schemeStyle.textColor]}>{t('scenes:register_index:title')}</Text>

                    <Text style={schemeStyle.textColor}>{t('scenes:register_index:username')}</Text>
                    <TextInput
                        style={[styles.inputText, schemeStyle.inputColor]}
                        onChangeText={onChangeUsername}
                        value={username}
                        placeholder={t('scenes:register_index:usernameInput')}
                    />

                    <Text style={schemeStyle.textColor}>{t('scenes:register_index:email')}</Text>
                    <TextInput
                        style={[styles.inputText, schemeStyle.inputColor]}
                        onChangeText={onChangeEmail}
                        value={email}
                        placeholder={t('scenes:register_index:emailInput')}
                    />

                    <Text style={schemeStyle.textColor}>{t('scenes:register_index:password')}</Text>
                    <TextInput
                        style={[styles.inputText, schemeStyle.inputColor]}
                        onChangeText={onChangePassword}
                        secureTextEntry={true}
                        value={password}
                        placeholder={t('scenes:register_index:passwordInput')}
                    />

                    <Text style={schemeStyle.textColor}>{t('scenes:register_index:rePassword')}</Text>
                    <TextInput
                        style={[styles.inputText, schemeStyle.inputColor]}
                        onChangeText={onChangeRePassword}
                        secureTextEntry={true}
                        value={repassword}
                        placeholder={t('scenes:register_index:rePasswordInput')}
                    />

                    <View style={styles.row}>
                        <TouchableOpacity
                            style={[styles.registerScreenButton, schemeStyle.registerScreenButton]}
                            onPress={() => registerClick()}
                            underlayColor='#fff'>
                            <Text style={[styles.registerButtonText, schemeStyle.textColor]}>{t('scenes:register_index:register')}</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={warning1?[styles.warning, {display: 'flex'}]:styles.warning}>{t('scenes:register_index:warning1')}</Text>
                    <Text style={warning2?[styles.warning, {display: 'flex'}]:styles.warning}>{t('scenes:register_index:warning2')}</Text>
                    <Text style={warning3?[styles.warning, {display: 'flex'}]:styles.warning}>{t('scenes:register_index:warning3')}</Text>
                    <Text style={warning4?[styles.warning, {display: 'flex'}]:styles.warning}>{t('scenes:register_index:warning4')}</Text>
                    <Text style={warning5?[styles.warning, {display: 'flex'}]:styles.warning}>{t('scenes:register_index:warning5')}</Text>
                    
                    <Text onPress={() => navigation.navigate('Login')} style={[styles.redirectText, schemeStyle.textColor]}>{t('scenes:register_index:redirect')}</Text>
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
                        <Text style={[styles.modalSubtitle, schemeStyle.textColor]}>{t('scenes:register_index:modalSubtitle')}</Text>
                        <Text style={[styles.modalInnertext, schemeStyle.textColor]}>{t('scenes:register_index:modalText')}</Text>

                        <TouchableOpacity
                            style={[styles.modalButton, schemeStyle.registerScreenButton]}
                            onPress={() => {setModalVisible(!modalVisible);
                                navigation.navigate("Login");}} >
                            <Text style={styles.textStyle}>{t('scenes:register_index:done')}</Text>
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