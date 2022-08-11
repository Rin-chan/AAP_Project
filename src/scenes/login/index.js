import React, {useState} from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, TextInput, View, Image, Dimensions, ScrollView, Modal } from 'react-native';
import CryptoJS from 'crypto-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDarkMode } from 'react-native-dynamic';

// Language
import {useTranslation} from 'react-i18next';

import UserDB from '../../utils/database/userdb';
import { Colors } from '../../styles';

const LoginScreen = ({ navigation }) => {
    const isDarkMode = useDarkMode();
    var BACKGROUND_COLOR = Colors.LIGHT_SECONDARY_BACKGROUND;
    var INPUT_COLOR = Colors.LIGHT_PRIMARY_BACKGROUND;
    var TEXT_COLOR = Colors.LIGHT_PRIMARY_TEXT;
    var PRIMARY_BUTTON = Colors.LIGHT_PRIMARY_BUTTON;
    var IMAGE_COLOR = "#000000";
    if (isDarkMode) {
        BACKGROUND_COLOR = Colors.DARK_SECONDARY_BACKGROUND;
        TEXT_COLOR = Colors.DARK_PRIMARY_TEXT;
        INPUT_COLOR = Colors.DARK_FOURTH_BACKGROUND;
        PRIMARY_BUTTON = Colors.DARK_PRIMARY_BUTTON;
        IMAGE_COLOR = "#FFFFFF";
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
        loginScreenButton: {
            backgroundColor: PRIMARY_BUTTON
        },
        imageColor: {
            tintColor: IMAGE_COLOR
        }
    })

    const {t, i18n} = useTranslation();

    const _width = Dimensions.get('screen').width * 0.15;

    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");

    const [warning1, onWarning1] = useState(false);
    const [warning2, onWarning2] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const storeData = async (location, value) => {
        try {
          await AsyncStorage.setItem(location, value)
        } catch (e) {
          console.log("Error in storing userToken");
          console.log(e);
        }
      }

    const loginClick = () => {
        onWarning1(false);
        onWarning2(false);

        UserDB.getUser(email).then((result) => {
            if(result.length != 0) {
                if (email == result[0][2]) {
                    var hashedPassword = CryptoJS.SHA256(password).toString()

                    if (hashedPassword == result[0][3]){
                        if (result[0][9] == 1) {
                            setModalVisible(true);
                            return;
                        }
                        if (result[0][10] == 0) {
                            onWarning2(true);
                            return;
                        }

                        var randomNum = Math.floor(Math.random() * 999999) + 100000 // Generate a random number between 100000 and 999999
                        var userToken = CryptoJS.SHA256(email+randomNum.toString()).toString() // Generate a token

                        storeData('userToken', userToken);
                        storeData('user', email);

                        navigation.navigate('Home');
                        return;
                    }
                }
                onWarning1(true);
                return;
            }
            else {
                onWarning1(true);
                return;
            }
        })
    }

    return (
        <View style={[schemeStyle.backgroundColor, {flex: 1}]}>
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={{flexGrow: 1}}
                    keyboardShouldPersistTaps='handled'>
                    <Text style={[styles.title, schemeStyle.textColor]}>{t('scenes:login_index:login')}</Text>

                    <Text style={schemeStyle.textColor}>{t('scenes:login_index:email')}</Text>
                    <TextInput
                        style={[styles.inputText, schemeStyle.inputColor]}
                        onChangeText={onChangeEmail}
                        value={email}
                        placeholder={t('scenes:login_index:emailPlaceholder')}
                    />

                    <Text style={schemeStyle.textColor}>{t('scenes:login_index:password')}</Text>
                    <TextInput
                        style={[styles.inputText, schemeStyle.inputColor]}
                        onChangeText={onChangePassword}
                        secureTextEntry={true}
                        value={password}
                        placeholder={t('scenes:login_index:passwordPlaceholder')}
                    />

                    <View style={styles.row}>
                        <TouchableOpacity
                            style={{marginLeft: 10, marginTop: 5}}
                            onPress={() => navigation.navigate('LoginEmail')}
                            underlayColor='#fff'>
                            <Image 
                                style={[schemeStyle.imageColor, { height: _width, width: _width }]}
                                source={require("../../assets/images/face-scan.png")}/>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.loginScreenButton, schemeStyle.loginScreenButton]}
                            onPress={() => loginClick()}
                            underlayColor='#fff'>
                            <Text style={[styles.loginButtonText, schemeStyle.textColor]}>{t('scenes:login_index:login')}</Text>
                        </TouchableOpacity>
                    </View>

                    <Text onPress={() => navigation.navigate('ForgotPassword')} style={[styles.warning, {display: 'flex', fontWeight: "bold", margin: 10, alignSelf: "flex-end"}]}>{t('scenes:login_index:forgotPassword')}</Text>

                    <Text style={warning1?[styles.warning, {display: 'flex'}]:styles.warning}>{t('scenes:login_index:warning1')}</Text>
                    <Text style={warning2?[styles.warning, {display: 'flex'}]:styles.warning}>{t('scenes:login_index:warning2')}</Text>

                    <Text onPress={() => navigation.navigate('Register')} style={[styles.redirectText, schemeStyle.textColor]}>{t('scenes:login_index:createAnAccount')}</Text>
                </ScrollView>

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
                            <Text style={[styles.modalSubtitle, schemeStyle.textColor]}>{t('scenes:login_index:modalSubtitle')}</Text>
                            <Text style={[styles.modalInnertext, schemeStyle.textColor]}>{t('scenes:login_index:modalText')}</Text>

                            <TouchableOpacity
                                style={[styles.modalButton, schemeStyle.loginScreenButton]}
                                onPress={() => setModalVisible(!modalVisible)} >
                                <Text style={styles.textStyle}>{t('scenes:login_index:done')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: '10%',
        marginTop: "25%",
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
    loginScreenButton: {
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
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5
    },
    loginButtonText: {
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    redirectText: {
        textAlign: 'center',
        fontWeight: 'bold',
        margin: 10,
        marginTop: "auto"
    },
    warning: {
        color: "red",
        display: 'none',
        margin: 10
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

export default LoginScreen;