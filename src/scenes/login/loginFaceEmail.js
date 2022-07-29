import React, {useState} from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, TextInput, View, ScrollView } from 'react-native';
import { useDarkMode } from 'react-native-dynamic';

import UserDB from '../../utils/database/userdb';
import { Colors } from '../../styles';

const FaceLoginScreen = ({ navigation }) => {
    const isDarkMode = useDarkMode();
    var BACKGROUND_COLOR = Colors.LIGHT_SECONDARY_BACKGROUND
    var INPUT_COLOR = Colors.LIGHT_PRIMARY_BACKGROUND
    var TEXT_COLOR = Colors.LIGHT_PRIMARY_TEXT
    var PRIMARY_BUTTON = Colors.LIGHT_PRIMARY_BUTTON
    var DANGER_BUTTON = Colors.LIGHT_DANGER_BUTTON
    if (isDarkMode) {
        BACKGROUND_COLOR = Colors.DARK_SECONDARY_BACKGROUND
        TEXT_COLOR = Colors.DARK_PRIMARY_TEXT
        INPUT_COLOR = Colors.DARK_FOURTH_BACKGROUND
        PRIMARY_BUTTON = Colors.DARK_PRIMARY_BUTTON
        DANGER_BUTTON = Colors.DARK_DANGER_BUTTON
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
        continueScreenButton: {
            backgroundColor: PRIMARY_BUTTON
        },
        cancelScreenButton: {
            backgroundColor: DANGER_BUTTON
        },
    })

    const [email, onChangeEmail] = React.useState("");

    const [warning1, onWarning1] = useState(false);
    const [warning2, onWarning2] = useState(false);

    const continueClick = () => {
        onWarning1(false);
        onWarning2(false);

        UserDB.getUser(email).then((result) => {
            if(result.length != 0) {
                if (result[0][6]){
                    navigation.navigate('LoginCam', {faceImage: result[0][7], email: email});
                    return;
                }
                onWarning2(true);
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
                    keyboardShouldPersistTaps='handled'
                >
                    <Text style={[styles.title, schemeStyle.textColor]}>Face Verification</Text>

                    <Text style={schemeStyle.textColor}>Email</Text>
                    <TextInput
                        style={[styles.inputText, schemeStyle.inputColor]}
                        onChangeText={onChangeEmail}
                        value={email}
                        placeholder="Enter your email"
                    />

                    <View style={styles.row}>
                        <TouchableOpacity
                            style={[styles.cancelScreenButton, schemeStyle.cancelScreenButton]}
                            onPress={() => navigation.navigate('Login')}
                            underlayColor='#fff'>
                            <Text style={[styles.buttonText, schemeStyle.textColor]}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.continueScreenButton, schemeStyle.continueScreenButton]}
                            onPress={() => continueClick()}
                            underlayColor='#fff'>
                            <Text style={[styles.buttonText, schemeStyle.textColor]}>Continue</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={warning1?[styles.warning, {display: 'flex'}]:styles.warning}>Email does not exist</Text>
                    <Text style={warning2?[styles.warning, {display: 'flex'}]:styles.warning}>This account does not have face verification enabled</Text>
                </ScrollView>
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
    continueScreenButton: {
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
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5
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
        display: 'none',
        marginTop: 20
    },
});

export default FaceLoginScreen;