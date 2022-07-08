import React from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableHighlight, View, Image, Dimensions } from 'react-native';

const HeaderBar = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ padding: 10, backgroundColor: 'white', borderBottomWidth: 1, }}>
                <Image
                    style={styles.title}
                    source={require("../../assets/images/logo.png")} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    title: {
        resizeMode: 'center',
        width: '100%',
        height: 30,
    },
    container: {
        flex: 1,
        backgroundColor: '#E8EBE8'
    },
});

export default HeaderBar;