import React from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableHighlight, View, Image, Dimensions } from 'react-native';

const HomeScreen = ({ navigation }) => {
    const _width = Dimensions.get('screen').width * 0.2;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userCard}>
                <Image
                    style={{ height: _width, width: _width }}
                    source={require("../../assets/images/favicon.png")} />
                <View>
                    <Text>User</Text>
                    <Text>Detail</Text>
                </View>
            </View>

            <View style={styles.innerContainer}>
                <View style={styles.row}>
                    <TouchableHighlight
                        style={styles.box}
                        onPress={() => navigation.navigate('Home')}>
                        <Image
                            style={{ height: _width, width: _width }}
                            source={require("../../assets/images/favicon.png")} />
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={styles.box}
                        onPress={() => navigation.navigate('Home')}>
                        <Image
                            style={{ height: _width, width: _width }}
                            source={require("../../assets/images/favicon.png")} />
                    </TouchableHighlight>
                </View>

                <View style={styles.row}>
                    <TouchableHighlight
                        style={styles.box}
                        onPress={() => navigation.navigate('Home')}>
                        <Image
                            style={{ height: _width, width: _width }}
                            source={require("../../assets/images/favicon.png")} />
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={styles.box}
                        onPress={() => navigation.navigate('Home')}>
                        <Image
                            style={{ height: _width, width: _width }}
                            source={require("../../assets/images/favicon.png")} />
                    </TouchableHighlight>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: '10%',
        flex: 1,
        justifyContent: 'space-evenly',
    },
    userCard: {
        borderWidth: 1,
        borderRadius: 20,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    innerContainer: {
        justifyContent: 'space-evenly',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    box: {
        borderWidth: 1,
        margin: 20,
        padding: 15
    },
});

export default HomeScreen;