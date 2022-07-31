import React, {useState} from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, TextInput, View, ScrollView, Modal } from 'react-native';
import { useDarkMode } from 'react-native-dynamic';

import UserDB from '../../utils/database/userdb';
import { Colors } from '../../styles';

const ForgotPasswordScreen = ({ navigation }) => {
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
    const [modalVisible, setModalVisible] = useState(false);

    const continueClick = () => {
        onWarning1(false);

        UserDB.getUser(email).then((result) => {
            if(result.length != 0) {
                UserDB.addForgotPassword(email);
                setModalVisible(true);
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
                    keyboardShouldPersistTaps='handled'
                >
                    <Text style={[styles.title, schemeStyle.textColor]}>Forgot Password</Text>

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
                            <Text style={[styles.modalSubtitle, schemeStyle.textColor]}>Email has been sent</Text>
                            <Text style={[styles.modalInnertext, schemeStyle.textColor]}>Please check your email to reset your password.</Text>

                            <TouchableOpacity
                                style={[styles.modalButton, schemeStyle.continueScreenButton]}
                                onPress={() => {setModalVisible(!modalVisible);
                                    navigation.navigate("Login")}} >
                                <Text style={styles.textStyle}>Done</Text>
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

export default ForgotPasswordScreen;