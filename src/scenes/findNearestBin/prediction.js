import React from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, ScrollView, View, Image, TouchableHighlight } from 'react-native';
import { useDarkMode } from 'react-native-dynamic';

import '../../translations/i18n';
import {useTranslation} from 'react-i18next';

import { HeaderBar } from "../../components/organisms";
import { Colors } from '../../styles';

const findNearestBinPredictionScreen = ({ navigation }) => {
    let prediction = navigation.state.params.prediction;
    let image = navigation.state.params.image;

    const {t, i18n} = useTranslation();

    const isDarkMode = useDarkMode();
    var BACKGROUND_COLOR = Colors.LIGHT_THIRD_BACKGROUND
    var TEXT_COLOR = Colors.LIGHT_PRIMARY_TEXT
    var PRIMARY_BUTTON = Colors.LIGHT_PRIMARY_BUTTON
    var DANGER_BUTTON = Colors.LIGHT_DANGER_BUTTON
    if (isDarkMode) {
        BACKGROUND_COLOR = Colors.DARK_FOURTH_BACKGROUND
        TEXT_COLOR = Colors.DARK_PRIMARY_TEXT
        PRIMARY_BUTTON = Colors.DARK_PRIMARY_BUTTON
        DANGER_BUTTON = Colors.DARK_DANGER_BUTTON
    }

    const schemeStyle = StyleSheet.create({
        backgroundColor: {
            backgroundColor: BACKGROUND_COLOR,
        },
        textColor: {
            color: TEXT_COLOR,
        },
        continueScreenButton: {
            backgroundColor: PRIMARY_BUTTON
        },
        cancelScreenButton: {
            backgroundColor: DANGER_BUTTON
        },
    })

    return (
        <View style={[schemeStyle.backgroundColor, {flex: 1}]}>
            <HeaderBar navigation={navigation}/>
            
            <TouchableHighlight
                style={{padding: 10}}
                onPress={() => navigation.navigate('findNearestBin')}>
                    <Text style={[schemeStyle.textColor, {fontWeight: "bold"}]}>{t('scenes:findNearestBin_prediction:goBack')}</Text>
            </TouchableHighlight>

            <SafeAreaView style={styles.container}>
                <Text style={[styles.title, schemeStyle.textColor]}>{t('scenes:findNearestBin_prediction:prediction')}</Text>

                <ScrollView>
                    <View style={styles.row}>
                        <Image style={{ height: 150, width: 150, alignSelf: "center" }} source={{uri: `data:image/jpeg;base64,${image}`}}/>

                        <View style={{justifyContent: 'center'}}>
                            <Text style={[schemeStyle.textColor, {margin: 10}]}>{t('scenes:findNearestBin_prediction:result')}: {prediction}</Text>
                        </View>
                    </View>
                </ScrollView>

                {
                    prediction == 'non_regulated'?
                    <View style={{marginTop: 50}}>
                        <TouchableOpacity style={[styles.cancelScreenButton, schemeStyle.cancelScreenButton]} onPress={() => navigation.navigate("findNearestBin")}>
                            <Text style={[styles.buttonText, schemeStyle.textColor]}>{t('scenes:findNearestBin_prediction:goBack')}</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={[styles.row, {marginTop: 50}]}>
                        <TouchableOpacity style={[styles.cancelScreenButton, schemeStyle.cancelScreenButton]} onPress={() => navigation.navigate("findNearestBin")}>
                            <Text style={schemeStyle.textColor}>{t('scenes:findNearestBin_prediction:goBack')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.continueScreenButton, schemeStyle.continueScreenButton]} onPress={() => navigation.navigate("findNearestBinMap")}>
                            <Text style={[styles.buttonText, schemeStyle.textColor]}>{t('scenes:findNearestBin_prediction:continue')}</Text>
                        </TouchableOpacity>
                    </View>
                }
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 20,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 20
    },
    continueScreenButton: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5
    },
    cancelScreenButton: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5
    },
    buttonText: {
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

export default findNearestBinPredictionScreen;