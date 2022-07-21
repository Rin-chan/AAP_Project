import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableHighlight, View, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { HeaderBar } from "../../components/organisms";
import { Colors } from '../../styles';
import UserDB from '../../utils/database/userdb';

const HomeScreen = ({ navigation }) => {
    const _width = Dimensions.get('screen').width * 0.2;

    const [username, setUsername] = useState("");
    const [points, setPoints] = useState("0");

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
                    setPoints(result['0']['points']);
                }
            });
        });
    };

    getUser();

    return (
        <SafeAreaView style={styles.container}>
            <HeaderBar navigation={navigation}/>

            <TouchableOpacity 
                style={styles.userCard}
                onPress={() => navigation.navigate('Profile')}>
                <Image
                    style={{ height: _width, width: _width }}
                    source={require("../../assets/images/favicon.png")} />
                <View style={{width: "60%"}}>
                    <Text style={{fontWeight: "bold"}}>{username}</Text>
                    <Text>Points: {points}</Text>

                    <Text style={{fontSize: 10, marginTop: "auto"}}>Profile &gt;</Text>
                </View>
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.innerContainer}>
                <View style={styles.row}>
                    <View style={styles.outterBox}>
                        <TouchableHighlight
                            style={styles.box}
                            onPress={() => navigation.navigate('Home')}>
                            <Image
                                style={{ height: _width, width: _width }}
                                source={require("../../assets/images/favicon.png")} />
                        </TouchableHighlight>
                        <Text style={styles.textCenter}>1</Text>
                    </View>

                    <View style={styles.outterBox}>
                        <TouchableHighlight
                            style={styles.box}
                            onPress={() => navigation.navigate('Home')}>
                            <Image
                                style={{ height: _width, width: _width }}
                                source={require("../../assets/images/favicon.png")} />
                        </TouchableHighlight>
                        <Text style={styles.textCenter}>2</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.outterBox}>
                        <TouchableHighlight
                            style={styles.box}
                            onPress={() => navigation.navigate('Home')}>
                            <Image
                                style={{ height: _width, width: _width }}
                                source={require("../../assets/images/favicon.png")} />
                        </TouchableHighlight>
                        <Text style={styles.textCenter}>3</Text>
                    </View>

                    <View style={styles.outterBox}>
                        <TouchableHighlight
                            style={styles.box}
                            onPress={() => navigation.navigate('Home')}>
                            <Image
                                style={{ height: _width, width: _width }}
                                source={require("../../assets/images/favicon.png")} />
                        </TouchableHighlight>
                        <Text style={styles.textCenter}>4</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.outterBox}>
                        <TouchableHighlight
                            style={styles.box}
                            onPress={() => navigation.navigate('Home')}>
                            <Image
                                style={{ height: _width, width: _width }}
                                source={require("../../assets/images/favicon.png")} />
                        </TouchableHighlight>
                        <Text style={styles.textCenter}>5</Text>
                    </View>

                    <View style={styles.outterBox}>
                        <TouchableHighlight
                            style={styles.box}
                            onPress={() => navigation.navigate('Home')}>
                            <Image
                                style={{ height: _width, width: _width }}
                                source={require("../../assets/images/favicon.png")} />
                        </TouchableHighlight>
                        <Text style={styles.textCenter}>6</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.GREY_BACKGROUND
    },
    userCard: {
        borderWidth: 1,
        borderRadius: 20,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',
        left: '10%',
        right: '10%',
        top: '10%',
        backgroundColor: '#399ED5',
        zIndex: 100
    },
    innerContainer: {
        borderTopWidth: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: 'absolute',
        bottom: 0,
        top: '20%',
        left: 0,
        right: 0,
        paddingTop: '10%',
        backgroundColor: 'white',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    outterBox: {
        margin: 20
    },
    box: {
        borderWidth: 1,
        margin: 5,
        padding: 15
    },
    textCenter: {
        textAlign: "center"
    },
});

export default HomeScreen;