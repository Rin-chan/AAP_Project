import React, {useState} from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, TextInput, View } from 'react-native';
import CryptoJS from 'crypto-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { Round_Green_Button } from '../../components/atoms';

import UserDB from '../../utils/database/userdb';
import { Colors } from '../../styles';

const LoginScreen = ({ navigation }) => {
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
            if(result.length < 1) {
                onWarning1(true);
                return;
            }
            else {
                if (email == result['0']['email']) {
                    var hashedPassword = CryptoJS.SHA256(password).toString()

                    if (hashedPassword == result['0']['password']){
                        var randomNum = Math.floor(Math.random() * 999999) + 100000 // Generate a random number between 100000 and 999999
                        var userToken = CryptoJS.SHA256(email+randomNum.toString()).toString() // Generate a token

                        storeData('userToken', userToken);
                        storeData('user', email);

                        navigation.navigate('Home');
                    }
                }
                onWarning1(true);
                return;
            }
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <Text>Email</Text>
            <TextInput
                style={styles.inputText}
                onChangeText={onChangeEmail}
                value={email}
                placeholder="Enter your email"
            />

            <Text>Password</Text>
            <TextInput
                style={styles.inputText}
                onChangeText={onChangePassword}
                secureTextEntry={true}
                value={password}
                placeholder="Enter your password"
            />

            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.loginScreenButton}
                    onPress={() => loginClick()}
                    underlayColor='#fff'>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
            </View>

            <Text style={warning1?[styles.warning, {display: 'inline'}]:styles.warning}>Email or password is incorrect</Text>

            <Text onPress={() => navigation.navigate('Register')} style={styles.redirectText}>Create an account</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: '10%',
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
        borderWidth: 1,
        padding: 10
    },
    loginScreenButton: {
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
    loginButtonText: {
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
});

export default LoginScreen;