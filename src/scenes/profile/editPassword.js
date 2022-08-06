import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableHighlight, TextInput, View, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';
import { useDarkMode } from 'react-native-dynamic';

import '../../translations/i18n';
import {useTranslation} from 'react-i18next';

import { HeaderBar } from "../../components/organisms";
import { Colors } from '../../styles';
import UserDB from '../../utils/database/userdb';

const editPasswordScreen = ({ navigation }) => {
    const {t, i18n} = useTranslation();

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
                if(result.length != 0) {
                    var curHashedPassword = CryptoJS.SHA256(curPassword).toString()

                    if (result[0][3] != curHashedPassword) {
                        onWarning1(true);
                        return;
                    }

                    var newHashedPassword = CryptoJS.SHA256(newPassword).toString()

                    UserDB.updateUserPassword(email, newHashedPassword);
                    navigation.navigate("Profile");
                    return;
                }
                else {
                    console.log("USER NOT FOUND");
                    return;
                }
            });
        });
    }

    return (
        <View style={[styles.container, schemeStyle.backgroundColor]}>
            <HeaderBar navigation={navigation}/>

            <View style={{flex: 1}}>
                <TouchableHighlight
                    style={{padding: 10}}
                    onPress={() => navigation.navigate('Profile')}>
                        <Text style={[schemeStyle.textColor, {fontWeight: "bold"}]}>{t('scenes:profile_editPassword:goBack')}</Text>
                </TouchableHighlight>

                <ScrollView showsVerticalScrollIndicator={false} style={[styles.innerContainer, schemeStyle.foregroundColor]} keyboardShouldPersistTaps='handled'>
                    <Text style={[schemeStyle.textColor, {fontSize: 35, fontWeight: "bold"}]}>{t('scenes:profile_editPassword:changePassword')}</Text>

                    <View style={styles.row}>
                        <Text style={[styles.information, schemeStyle.textColor]}>{t('scenes:profile_editPassword:currentPassword')}</Text>
                        <TextInput
                            style={[styles.inputText, schemeStyle.inputColor]}
                            onChangeText={(text) => {setCurPassword(text)}}
                            value={curPassword}
                            secureTextEntry={true}
                        />
                    </View>

                    <View style={styles.row}>
                        <Text style={[styles.information, schemeStyle.textColor]}>{t('scenes:profile_editPassword:newPassword')}</Text>
                        <TextInput
                            style={[styles.inputText, schemeStyle.inputColor]}
                            onChangeText={(text) => {setNewPassword(text)}}
                            value={newPassword}
                            secureTextEntry={true}
                        />
                    </View>

                    <View style={styles.row}>
                        <Text style={[styles.information, schemeStyle.textColor]}>{t('scenes:profile_editPassword:retypePassword')}</Text>
                        <TextInput
                            style={[styles.inputText, schemeStyle.inputColor]}
                            onChangeText={(text) => {setReNewPassword(text)}}
                            value={reNewPassword}
                            secureTextEntry={true}
                        />
                    </View>

                    <Text style={warning1?[styles.warning, {display: 'flex'}]:styles.warning}>{t('scenes:profile_editPassword:warning1')}</Text>
                    <Text style={warning2?[styles.warning, {display: 'flex'}]:styles.warning}>{t('scenes:profile_editPassword:warning2')}</Text>
                    <Text style={warning3?[styles.warning, {display: 'flex'}]:styles.warning}>{t('scenes:profile_editPassword:warning3')}</Text>
                    <Text style={warning4?[styles.warning, {display: 'flex'}]:styles.warning}>{t('scenes:profile_editPassword:warning4')}</Text>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={[styles.cancelScreenButton, schemeStyle.dangerScreenButton]}
                            onPress={() => navigation.navigate('Profile')}
                            underlayColor='#fff'>
                            <Text style={[styles.updateButtonText, schemeStyle.textColor]}>{t('scenes:profile_editPassword:cancel')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.updateScreenButton, schemeStyle.primaryScreenButton]}
                            onPress={() => updateClick()}
                            underlayColor='#fff'>
                            <Text style={[styles.updateButtonText, schemeStyle.textColor]}>{t('scenes:profile_editPassword:update')}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
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
        shadowRadius: 3,
        elevation: 5
    },
    row: {
        flexDirection: "row",
    },
    inputText: {
        height: 40,
        margin: 12,
        padding: 10,
        width: "100%",
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5
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
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 5
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
});

export default editPasswordScreen;