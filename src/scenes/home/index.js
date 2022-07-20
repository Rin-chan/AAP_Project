import React from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableHighlight, View, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';

import { HeaderBar } from "../../components/organisms";
import { Colors } from '../../styles';

const HomeScreen = ({ navigation }) => {
    const _width = Dimensions.get('screen').width * 0.2;

    return (
        <SafeAreaView style={styles.container}>
            <HeaderBar navigation={navigation}/>

            <TouchableOpacity 
                style={styles.userCard}
                onPress={() => navigation.navigate('Profile')}>
                <Image
                    style={{ height: _width, width: _width }}
                    source={require("../../assets/images/favicon.png")} />
                <View>
                    <Text>User</Text>
                    <Text>Detail</Text>
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