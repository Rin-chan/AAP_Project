import React from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, TextInput, View } from 'react-native';

import { HeaderBar } from "../../components/organisms";
import { Colors } from '../../styles';

const editProfileScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <HeaderBar navigation={navigation}/>

            <Text>editProfileScreen</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.GREY_BACKGROUND,
        flex: 1,
    },
});

export default editProfileScreen;