import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableHighlight, View, Image, Dimensions, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { WebView } from 'react-native-webview';

import { HeaderBar } from "../../../components/organisms";
import { Colors } from '../../../styles';

const StepItUpScreen = ({ navigation }) => {
    const _width = Dimensions.get('screen').width * 0.8;

    return (
        <View style={styles.container}>
            <HeaderBar navigation={navigation}/>


            <SafeAreaView style={{flex:1}}>
                <WebView source={{ uri: 'https://aap-project-game2.netlify.app/' }} />
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.GREY_BACKGROUND
    },
    title: {
        fontWeight: "bold",
        fontSize: 35,
        textAlign: "center",
        margin: 15
    },
});

export default StepItUpScreen;