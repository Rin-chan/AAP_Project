import React from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';

const HeaderBar = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Image
                        style={styles.menu}
                        source={require("../../assets/images/menu.png")} />
                </TouchableOpacity> 

                <Image
                    style={styles.title}
                    source={require("../../assets/images/logo.png")} />

                <View>

                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    menu: {
        resizeMode: "center",
        width: 30,
        height: 30,
    },
    title: {
        resizeMode: "center",
        width: 300,
        height: 30,
    },
    header:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        justifyContent: 'space-between',
        alignItems:'center',
        padding: 10, 
        backgroundColor: 'white', 
        borderBottomWidth: 1,
    },
    container: {
        backgroundColor: '#E8EBE8',
    },
});

export default HeaderBar;