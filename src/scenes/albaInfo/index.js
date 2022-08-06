import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableHighlight, View, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { useDarkMode } from 'react-native-dynamic';

import '../../translations/i18n';
import {useTranslation} from 'react-i18next';

import { HeaderBar } from "../../components/organisms";
import { Colors } from '../../styles';

const AlbaInfoScreen = ({ navigation }) => {
    const {t, i18n} = useTranslation();

    const isDarkMode = useDarkMode();
    var BOX_COLOR = Colors.LIGHT_SECONDARY_BACKGROUND
    var BACKGROUND_COLOR = Colors.LIGHT_THIRD_BACKGROUND
    var TEXT_COLOR = Colors.LIGHT_PRIMARY_TEXT
    if (isDarkMode) {
        BACKGROUND_COLOR = Colors.DARK_THIRD_BACKGROUND
        BOX_COLOR = Colors.DARK_FOURTH_BACKGROUND
        TEXT_COLOR = Colors.DARK_PRIMARY_TEXT
    }

    const schemeStyle = StyleSheet.create({
        backgroundColor: {
            backgroundColor: BACKGROUND_COLOR,
        },
        boxColor: {
            backgroundColor: BOX_COLOR,
        },
        textColor: {
            color: TEXT_COLOR,
        },
    })

    const _width = Dimensions.get('screen').width * 0.7;

    return (
        <View style={[styles.container, schemeStyle.backgroundColor]}>
            <HeaderBar navigation={navigation}/>

            <SafeAreaView style={{flex:1}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={[styles.title, schemeStyle.textColor]}>{t('scenes:albaInfo_index:title')}</Text>

                    <View style={[styles.box, schemeStyle.boxColor]}>
                        <Text style={[styles.subtitle, schemeStyle.textColor]}>{t('scenes:albaInfo_index:subtitle1')}</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>{t('scenes:albaInfo_index:text1')}</Text>
                        <Image 
                            style={{ height: _width, width: _width, resizeMode:"contain", alignSelf:"center" }}
                            source={require("../../assets/images/albaInfo/image1.jpg")} />
                    </View>

                    <View style={[styles.box, schemeStyle.boxColor]}>
                        <Text style={[styles.subtitle, schemeStyle.textColor]}>{t('scenes:albaInfo_index:subtitle2')}</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>- {t('scenes:albaInfo_index:text2')}</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>- {t('scenes:albaInfo_index:text3')}</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>- {t('scenes:albaInfo_index:text4')}</Text>
                        <Image 
                            style={{ height: _width, width: _width, resizeMode:"contain", alignSelf:"center" }}
                            source={require("../../assets/images/albaInfo/image2.jpg")} />
                    </View>

                    <View style={[styles.box, schemeStyle.boxColor]}>
                        <Text style={[styles.subtitle, schemeStyle.textColor]}>{t('scenes:albaInfo_index:subtitle3')}</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>- {t('scenes:albaInfo_index:text5')}</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>- {t('scenes:albaInfo_index:text6')}</Text>
                        <Image 
                            style={{ height: _width, width: _width, resizeMode:"contain", alignSelf:"center" }}
                            source={require("../../assets/images/albaInfo/image3.jpg")} />
                    </View>

                    <View style={[styles.box, schemeStyle.boxColor]}>
                        <Text style={[styles.subtitle, schemeStyle.textColor]}>{t('scenes:albaInfo_index:subtitle4')}</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>1. {t('scenes:albaInfo_index:text7')}</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>2. {t('scenes:albaInfo_index:text8')}</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>3. {t('scenes:albaInfo_index:text9')}</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>4. {t('scenes:albaInfo_index:text10')}</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>- {t('scenes:albaInfo_index:text11')}</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>- {t('scenes:albaInfo_index:text12')}</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>- {t('scenes:albaInfo_index:text13')}</Text>
                        <Image 
                            style={{ height: _width, width: _width, resizeMode:"contain", alignSelf:"center" }}
                            source={require("../../assets/images/albaInfo/image4.jpg")} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontWeight: "bold",
        fontSize: 35,
        textAlign: "center",
        margin: 15
    },
    box: {
        margin: 15,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5
    },
    subtitle: {
        fontWeight: "bold",
        fontSize: 15,
        padding: 5,
    },
    innerText: {
        padding: 5,
    },
});

export default AlbaInfoScreen;