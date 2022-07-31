import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useDarkMode } from 'react-native-dynamic';

import { HeaderBar, OldLoadingScreen, LoadingScreen } from "../../components/organisms";
import { Colors } from '../../styles';

const AboutScreen = ({ navigation }) => {
    const isDarkMode = useDarkMode();
    var BACKGROUND_COLOR = Colors.LIGHT_THIRD_BACKGROUND
    var TEXT_COLOR = Colors.LIGHT_PRIMARY_TEXT
    var BUTTON_COLOR = Colors.LIGHT_PRIMARY_BUTTON
    if (isDarkMode) {
        BACKGROUND_COLOR = Colors.DARK_FOURTH_BACKGROUND
        TEXT_COLOR = Colors.DARK_PRIMARY_TEXT
        BUTTON_COLOR = Colors.DARK_PRIMARY_BUTTON
    }

    const schemeStyle = StyleSheet.create({
        backgroundColor: {
            backgroundColor: BACKGROUND_COLOR,
        },
        textColor: {
            color: TEXT_COLOR,
        },
        buttonColor: {
            backgroundColor: BUTTON_COLOR
        }
    })

    const [oldLoadingDisplay, setOldLoadingDisplay] = useState(false);
    const [newLoadingDisplay, setNewLoadingDisplay] = useState(false);

    return(
        <View style={[styles.container, schemeStyle.backgroundColor]}>
            {
                oldLoadingDisplay?
                <View style={{flex: 1, width:Dimensions.get('screen').width, height:Dimensions.get('screen').height }}>
                    <SafeAreaView>
                        <Text onPress={() => setOldLoadingDisplay(false)} style={[schemeStyle.textColor, {margin: 10}]}>Close Loading Screen</Text>
                    </SafeAreaView>
                    <OldLoadingScreen/>
                </View>
                :
                <View style={{flex: 1}}>
                    {
                        newLoadingDisplay?
                        <View style={{flex: 1, width:Dimensions.get('screen').width, height:Dimensions.get('screen').height }}>
                            <SafeAreaView>
                                <Text onPress={() => setNewLoadingDisplay(false)} style={[schemeStyle.textColor, {margin: 10}]}>Close Loading Screen</Text>
                            </SafeAreaView>
                            <LoadingScreen/>
                        </View>
                        :
                        <View style={{flex: 1}}>
                            <HeaderBar navigation={navigation}/>

                            <View style={{flex: 1}}>
                                <ScrollView showsVerticalScrollIndicator={false} style={styles.innerContainer}>
                                    <Text style={schemeStyle.textColor}>
                                        This app is made by Nian Ci, Sonia and Jaden.
                                    </Text>

                                    <View style={{marginTop: 50, flexDirection: "row", justifyContent: "space-between"}}>
                                        <TouchableOpacity
                                            style={[styles.button, schemeStyle.buttonColor]}
                                            onPress={() => setOldLoadingDisplay(true)}
                                            underlayColor='#fff'>
                                            <Text style={schemeStyle.textColor}>Tree Loading Screen</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[styles.button, schemeStyle.buttonColor]}
                                            onPress={() => setNewLoadingDisplay(true)}
                                            underlayColor='#fff'>
                                            <Text style={schemeStyle.textColor}>Activity Loading Screen</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                    }
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        padding: 10,
    },
    button: {
        margin: 10,
        padding: 10,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5
    }
});

export default AboutScreen;