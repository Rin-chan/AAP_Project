import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableHighlight, TextInput, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDarkMode } from 'react-native-dynamic';

import '../../translations/i18n';
import {useTranslation} from 'react-i18next';

import { HeaderBar, LoadingScreen } from "../../components/organisms";
import { Colors } from '../../styles';
import UserDB from '../../utils/database/userdb';

const editProfileScreen = ({ navigation }) => {
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

    const [username, setUsername] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');

    const [warning1, onWarning1] = useState(false);
    const [warning2, onWarning2] = useState(false);
    const [noDB, setNoDB] = useState(false);

    const [request, setRequest] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);

    const getUser = async () => {
        if (request == false) {
            setRequest(true);

            await AsyncStorage.getItem('user')
            .then(email => {
                UserDB.getUser(email).then((result) => {
                    if(result != undefined) {
                        setUsername(result[0][1]);
                        setContact(result[0][4]);
                        setAddress(result[0][5]);
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

    if (noDB == false){
        getUser();
    }

    const updateClick = async () => {
        onWarning1(false);
        onWarning2(false);

        if (username === ''){
            onWarning1(true)
            return;
        }

        var re = /[^0-9]/g;

        if (re.test(contact) == true){
            if (!(contact != undefined)) {
                onWarning2(true);
                return;
            }
        }

        if (contact.length != 8) {
            onWarning2(true);
            return;
        }

        await AsyncStorage.getItem('user')
        .then(email => {
            UserDB.getUser(email).then((result) => {
                if(result.length != 0) {
                    UserDB.updateUserDetails(email, username, contact, address);
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
                            onPress={() => navigation.navigate('Profile')}>
                                <Text style={[schemeStyle.textColor, {fontWeight: "bold"}]}>{t('scenes:profile_editProfile:goBack')}</Text>
                        </TouchableHighlight>

                        <ScrollView showsVerticalScrollIndicator={false} style={[styles.innerContainer, schemeStyle.foregroundColor]} keyboardShouldPersistTaps='handled'>
                            <Text style={[schemeStyle.textColor, {fontSize: 35, fontWeight: "bold"}]}>{t('scenes:profile_editProfile:editProfile')}</Text>

                            <View style={styles.row}>
                                <Text style={[styles.information, schemeStyle.textColor]}>{t('scenes:profile_editProfile:username')}</Text>
                                <TextInput
                                    style={[styles.inputText, schemeStyle.inputColor]}
                                    onChangeText={(text) => {setUsername(text);
                                        setNoDB(true);}}
                                    value={username}
                                />
                            </View>

                            <View style={styles.row}>
                                <Text style={[styles.information, schemeStyle.textColor]}>{t('scenes:profile_editProfile:contact')}</Text>
                                <TextInput
                                    style={[styles.inputText, schemeStyle.inputColor]}
                                    keyboardType = 'numeric'
                                    onChangeText={(text) => {
                                        setContact(text);
                                        setNoDB(true);}}
                                    value={contact}
                                />
                            </View>

                            <View style={styles.row}>
                                <Text style={[styles.information, schemeStyle.textColor]}>{t('scenes:profile_editProfile:address')}</Text>
                                <TextInput
                                    style={[styles.inputText, schemeStyle.inputColor]}
                                    onChangeText={(text) => {setAddress(text);
                                        setNoDB(true);}}
                                    value={address}
                                />
                            </View>

                            <Text style={warning1?[styles.warning, {display: 'flex'}]:styles.warning}>{t('scenes:profile_editProfile:warning1')}</Text>
                            <Text style={warning2?[styles.warning, {display: 'flex'}]:styles.warning}>{t('scenes:profile_editProfile:warning2')}</Text>

                            <View style={styles.buttonRow}>
                                <TouchableOpacity
                                    style={[styles.cancelScreenButton, schemeStyle.dangerScreenButton]}
                                    onPress={() => navigation.navigate('Profile')}
                                    underlayColor='#fff'>
                                    <Text style={[styles.updateButtonText, schemeStyle.textColor]}>{t('scenes:profile_editProfile:cancel')}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.updateScreenButton, schemeStyle.primaryScreenButton]}
                                    onPress={() => updateClick()}
                                    underlayColor='#fff'>
                                    <Text style={[styles.updateButtonText, schemeStyle.textColor]}>{t('scenes:profile_editProfile:update')}</Text>
                                </TouchableOpacity>
                            </View>
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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.4,
        shadowRadius: 5,
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
        shadowRadius: 3,
        elevation: 5
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
});

export default editProfileScreen;