import React, {useEffect, useState} from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, TextInput, View } from 'react-native';
import CryptoJS from 'crypto-js';

import User from '../../utils/models/user'
import UserDB from '../../utils/database/userdb'
import { Colors } from '../../styles';

const RegisterScreen = ({ navigation }) => {
    const [username, onChangeUsername] = useState("");
    const [email, onChangeEmail] = useState("");
    const [password, onChangePassword] = useState("");
    const [repassword, onChangeRePassword] = useState("");
    
    const [warning1, onWarning1] = useState(false);
    const [warning2, onWarning2] = useState(false);
    const [warning3, onWarning3] = useState(false);
    const [warning4, onWarning4] = useState(false);

    const registerClick = () => {
        let errors = [];
        onWarning1(false);
        onWarning2(false);
        onWarning3(false);
        onWarning4(false);

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

        let check = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
        if (!password.match(check)) { 
            onWarning4(true)
            return;
        }

        if (password != repassword) { 
            onWarning2(true)
            return;
        }

        UserDB.getUser(email).then((result) => {
            if(result.length > 0) {
                onWarning3(true);
                return;
            }
            else {
                var hashedPassword = CryptoJS.SHA256(password).toString()

                let user = new User(username, email, hashedPassword);
                UserDB.addUser(user);
                navigation.navigate('Login');
                return;
            }
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Register</Text>

            <Text>Username</Text>
            <TextInput
                style={styles.inputText}
                onChangeText={onChangeUsername}
                value={username}
                placeholder="Enter your username"
            />

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

            <Text>Retype Your Password</Text>
            <TextInput
                style={styles.inputText}
                onChangeText={onChangeRePassword}
                secureTextEntry={true}
                value={repassword}
                placeholder="Enter your password again"
            />

            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.registerScreenButton}
                    onPress={() => registerClick()}
                    underlayColor='#fff'>
                    <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
            </View>

            <Text style={warning1?[styles.warning, {display: 'flex'}]:styles.warning}>Fill in all the blanks</Text>
            <Text style={warning2?[styles.warning, {display: 'flex'}]:styles.warning}>Passwords are not the same</Text>
            <Text style={warning3?[styles.warning, {display: 'flex'}]:styles.warning}>This email is already in use</Text>
            <Text style={warning4?[styles.warning, {display: 'flex'}]:styles.warning}>Password must have at least 8 characters, inclusive of one uppercase, one lowercase and numerical number.</Text>
            
            <Text onPress={() => navigation.navigate('Login')} style={styles.redirectText}>Already have an account?</Text>
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
    registerScreenButton: {
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
});

export default RegisterScreen;