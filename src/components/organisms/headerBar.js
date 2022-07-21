import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';

const HeaderBar = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.header}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Image
                        style={styles.menu}
                        source={require("../../assets/images/menu.png")} />
                </TouchableOpacity> 

                <Image
                    style={styles.title}
                    source={require("../../assets/images/logo.png")} />

                <View></View>
                <View></View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    menu: {
        resizeMode: "center",
        width: 30,
        height: 30,
        margin: 10
    },
    title: {
        resizeMode: "center",
        width: 200,
        height: 30,
        margin: 10
    },
    header:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems:'center',
        backgroundColor: 'white', 
        borderBottomWidth: 1,
    },
    container: {
        backgroundColor: '#E8EBE8',
    },
});

export default HeaderBar;