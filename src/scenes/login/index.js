import React, {useState} from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, TextInput, View, Image, Dimensions, ScrollView } from 'react-native';
import CryptoJS from 'crypto-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDarkMode } from 'react-native-dynamic'

import UserDB from '../../utils/database/userdb';
import { Colors } from '../../styles';

const LoginScreen = ({ navigation }) => {
    const isDarkMode = useDarkMode();
    var BACKGROUND_COLOR = Colors.LIGHT_SECONDARY_BACKGROUND
    var INPUT_COLOR = Colors.LIGHT_PRIMARY_BACKGROUND
    var TEXT_COLOR = Colors.LIGHT_PRIMARY_TEXT
    var PRIMARY_BUTTON = Colors.LIGHT_PRIMARY_BUTTON
    var IMAGE_COLOR = "#000000"
    if (isDarkMode) {
        BACKGROUND_COLOR = Colors.DARK_SECONDARY_BACKGROUND
        TEXT_COLOR = Colors.DARK_PRIMARY_TEXT
        INPUT_COLOR = Colors.DARK_FOURTH_BACKGROUND
        PRIMARY_BUTTON = Colors.DARK_PRIMARY_BUTTON
        IMAGE_COLOR = "#FFFFFF"
    }

    const schemeStyle = StyleSheet.create({
        backgroundColor: {
            backgroundColor: BACKGROUND_COLOR,
            flex: 1,
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

    const _width = Dimensions.get('screen').width * 0.15;

    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");

    const [warning1, onWarning1] = useState(false);

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

        UserDB.getUser(email).then((result) => {
            if(result.length != 0) {
                if (email == result[0][2]) {
                    var hashedPassword = CryptoJS.SHA256(password).toString()

                    if (hashedPassword == result[0][3]){
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
        <View style={schemeStyle.backgroundColor}>
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={{flexGrow: 1}}
                    keyboardShouldPersistTaps='handled'>
                    <Text style={[styles.title, schemeStyle.textColor]}>Login</Text>

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
                            <Text style={[styles.loginButtonText, schemeStyle.textColor]}>Login</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={warning1?[styles.warning, {display: 'flex'}]:styles.warning}>Email or password is incorrect</Text>

                    <Text onPress={() => navigation.navigate('Register')} style={[styles.redirectText, schemeStyle.textColor]}>Create an account</Text>
                </ScrollView>
            </SafeAreaView>
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
        marginTop: 'auto',
        fontWeight: 'bold',
    },
    warning: {
        color: "red",
        display: 'none'
    },
});

export default LoginScreen;