import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableHighlight, TextInput, View, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { HeaderBar } from "../../components/organisms";
import { Colors } from '../../styles';
import UserDB from '../../utils/database/userdb';

const editProfileScreen = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [birthday, setBirthday] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");

    const [warning1, onWarning1] = useState(false);
    const [warning2, onWarning2] = useState(false);
    const [noDB, setNoDB] = useState(false);

    const getUser = async () => {
        await AsyncStorage.getItem('user')
        .then(email => {
            UserDB.getUser(email).then((result) => {
                if(result.length < 1) {
                    console.log("USER NOT FOUND");
                    return;
                }
                else {
                    setUsername(result['0']['username']);
                    setBirthday(result['0']['birthday']);
                    setContact(result['0']['contact']);
                    setAddress(result['0']['address']);
                }
            });
        });
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

        if (re.test(contact) && contact != ""){
            onWarning2(true);
            return;
        }

        await AsyncStorage.getItem('user')
        .then(email => {
            UserDB.getUser(email).then((result) => {
                if(result.length < 1) {
                    console.log("USER NOT FOUND");
                    return;
                }
                else {
                    return;
                }
            });
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <HeaderBar navigation={navigation}/>

            <TouchableHighlight
                style={{padding: 10}}
                onPress={() => navigation.navigate('Profile')}>
                    <Text style={{fontWeight: "bold"}}>Go back to profile page</Text>
            </TouchableHighlight>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.innerContainer}>
                <View style={styles.row}>
                    <Text style={styles.information}>Username:</Text>
                    <TextInput
                        style={styles.inputText}
                        onChangeText={(text) => {setUsername(text);
                            setNoDB(true);}}
                        value={username}
                    />
                </View>

                <View style={styles.row}>
                    <Text style={styles.information}>Birthday:</Text>
                    <TextInput
                        style={styles.inputText}
                        onChangeText={(text) => {setBirthday(text);
                            setNoDB(true);}}
                        value={birthday}
                    />
                </View>

                <View style={styles.row}>
                    <Text style={styles.information}>Contact:</Text>
                    <TextInput
                        style={styles.inputText}
                        keyboardType = 'numeric'
                        onChangeText={(text) => {
                            setContact(text);
                            setNoDB(true);}}
                        value={contact}
                    />
                </View>

                <View style={styles.row}>
                    <Text style={styles.information}>Address:</Text>
                    <TextInput
                        style={styles.inputText}
                        onChangeText={(text) => {setAddress(text);
                            setNoDB(true);}}
                        value={address}
                    />
                </View>

                <Text style={warning1?[styles.warning, {display: 'inline'}]:styles.warning}>Username cannot be empty</Text>
                <Text style={warning2?[styles.warning, {display: 'inline'}]:styles.warning}>Contact can only contain numbers</Text>

                <TouchableOpacity
                    style={styles.updateScreenButton}
                    onPress={() => updateClick()}
                    underlayColor='#fff'>
                    <Text style={styles.updateButtonText}>Update</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.GREY_BACKGROUND,
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        marginLeft: "5%",
        marginRight: "5%",
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: "5%",
        backgroundColor: "white"
    },
    row: {
        flexDirection: "row",
    },
    inputText: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: "100%"
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
        backgroundColor: Colors.GREEN_BUTTON,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff'
    },
    updateButtonText: {
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
});

export default editProfileScreen;