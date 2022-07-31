import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import { useDarkMode } from 'react-native-dynamic'

import { Colors } from '../../styles';

const HeaderBar = ({ navigation }) => {
    const isDarkMode = useDarkMode();
    var BACKGROUND_COLOR = Colors.LIGHT_SECONDARY_BACKGROUND
    var IMAGE_COLOR = "#000000"
    if (isDarkMode) {
        BACKGROUND_COLOR = Colors.DARK_SECONDARY_BACKGROUND
        IMAGE_COLOR = "#FFFFFF"
    }

    const schemeStyle = StyleSheet.create({
        backgroundColor: {
            backgroundColor: BACKGROUND_COLOR,
        },
        imageColor: {
            tintColor: IMAGE_COLOR
        }
    })

    return (
        <View style={styles.container}>
            <SafeAreaView style={[styles.header, schemeStyle.backgroundColor]}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Image
                        style={[styles.menu, schemeStyle.imageColor]}
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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5
    },
    container: {
    },
});

export default HeaderBar;