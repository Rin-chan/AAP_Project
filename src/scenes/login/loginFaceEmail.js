import React, {useState} from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, TextInput, View } from 'react-native';

import UserDB from '../../utils/database/userdb';
import { Colors } from '../../styles';

const FaceLoginScreen = ({ navigation }) => {
    const [email, onChangeEmail] = React.useState("");

    const [warning1, onWarning1] = useState(false);
    const [warning2, onWarning2] = useState(false);

    const continueClick = () => {
        onWarning1(false);
        onWarning2(false);

        UserDB.getUser(email).then((result) => {
            if(result.length < 1) {
                onWarning1(true);
                return;
            }
            else {
                if (result['0']['face']){
                    navigation.navigate('LoginCam', {faceImage: result['0']['faceImage'], email: email});
                    return;
                }
                onWarning2(true);
                return;
            }
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Face Verification</Text>

            <Text>Email</Text>
            <TextInput
                style={styles.inputText}
                onChangeText={onChangeEmail}
                value={email}
                placeholder="Enter your email"
            />

            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.cancelScreenButton}
                    onPress={() => navigation.navigate('Login')}
                    underlayColor='#fff'>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.continueScreenButton}
                    onPress={() => continueClick()}
                    underlayColor='#fff'>
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
            </View>

            <Text style={warning1?[styles.warning, {display: 'flex'}]:styles.warning}>Email does not exist</Text>
            <Text style={warning2?[styles.warning, {display: 'flex'}]:styles.warning}>This account does not have face verification enabled</Text>
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
    continueScreenButton: {
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
        borderColor: '#fff'
    },
    buttonText: {
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    warning: {
        color: "red",
        display: 'none'
    },
});

export default FaceLoginScreen;