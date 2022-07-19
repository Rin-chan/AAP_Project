import React from 'react';
import { StyleSheet, SafeAreaView, Text, View, ScrollView } from 'react-native';
import { HeaderBar } from "../../components/organisms";

const AboutScreen = ({ navigation }) => {
    return(
        <SafeAreaView style={styles.container}>
            <HeaderBar navigation={navigation}/>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.innerContainer}>
                <Text>
                    This app is made by Nian Ci, Sonia and Jaden.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EBE8',
    },
    innerContainer: {
        padding: 10,
    },
});

export default AboutScreen;