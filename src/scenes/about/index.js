import React from 'react';
import { StyleSheet, SafeAreaView, Text, View, ScrollView, TouchableOpacity } from 'react-native';

import { HeaderBar } from "../../components/organisms";
import { Colors } from '../../styles';

const AboutScreen = ({ navigation }) => {
    return(
        <SafeAreaView style={styles.container}>
            <HeaderBar navigation={navigation}/>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.innerContainer}>
                <Text>
                    This app is made by Nian Ci, Sonia and Jaden.
                </Text>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}>
                    <Text>Go to Home</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.GREY_BACKGROUND
    },
    innerContainer: {
        padding: 10,
    },
});

export default AboutScreen;