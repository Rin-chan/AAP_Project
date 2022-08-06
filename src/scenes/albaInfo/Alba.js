import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableHighlight, View, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { useDarkMode } from 'react-native-dynamic';

import '../../translations/i18n';
import {useTranslation} from 'react-i18next';

import { HeaderBar } from "../../components/organisms";
import { Colors } from '../../styles';

const AlbaInfoWhoScreen = ({ navigation }) => {
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

    const _width = Dimensions.get('screen').width * 0.8;

    return (
        <View style={[styles.container, schemeStyle.backgroundColor]}>
            <HeaderBar navigation={navigation}/>

            <SafeAreaView style={{flex:1}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={[styles.title, schemeStyle.textColor]}>{t('scenes:albaInfo_Alba:introductionOfAlba')}</Text>

                    <View style={[styles.box, schemeStyle.boxColor]}>
                        <Text style={[styles.subtitle, schemeStyle.textColor]}>{t('scenes:albaInfo_Alba:company')}</Text>

                        <Text style={[styles.innerText, schemeStyle.textColor]}>- {t('scenes:albaInfo_Alba:text1')}</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>- {t('scenes:albaInfo_Alba:text2')}</Text>
                        
                        <Image 
                            style={{ height: _width, width: _width, resizeMode:"contain", alignSelf:"center" }}
                            source={require("../../assets/images/albaInfo/image13.jpg")} />
                    </View>

                    <View style={[styles.box, schemeStyle.boxColor]}>
                        <Text style={[styles.subtitle, schemeStyle.textColor]}>{t('scenes:albaInfo_Alba:stepUpApp')}</Text>

                        <Text style={[styles.innerText, schemeStyle.textColor]}>- {t('scenes:albaInfo_Alba:text3')}</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>- {t('scenes:albaInfo_Alba:text4')}</Text>
                        
                        <Text style={[styles.innerText, schemeStyle.textColor]}>- {t('scenes:albaInfo_Alba:text5')}</Text>
                        <Text style={[styles.indentedText, schemeStyle.textColor]}>• {t('scenes:albaInfo_Alba:text6')}</Text>
                        <Text style={[styles.indentedText, schemeStyle.textColor]}>• {t('scenes:albaInfo_Alba:text7')}</Text>
                        <Text style={[styles.indentedText, schemeStyle.textColor]}>• {t('scenes:albaInfo_Alba:text8')}</Text>
                        <Text style={[styles.indentedText, schemeStyle.textColor]}>• {t('scenes:albaInfo_Alba:text9')}</Text>

                        <Image 
                            style={{ height: _width, width: _width, resizeMode:"contain", alignSelf:"center" }}
                            source={require("../../assets/images/albaInfo/image14.png")} />
                    </View>

                    <View style={[styles.box, schemeStyle.boxColor]}>
                        <Text style={[styles.subtitle, schemeStyle.textColor]}>{t('scenes:albaInfo_Alba:pointSystem')}</Text>

                        <Text style={[styles.innerText, schemeStyle.textColor]}>- {t('scenes:albaInfo_Alba:text10')}</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>- {t('scenes:albaInfo_Alba:text11')}</Text>
                        
                        <Text style={[styles.innerText, schemeStyle.textColor]}>- {t('scenes:albaInfo_Alba:text12')}</Text>
                        <Text style={[styles.indentedText, schemeStyle.textColor]}>a. {t('scenes:albaInfo_Alba:text13')}</Text>
                        <Text style={[styles.indentedText, schemeStyle.textColor]}>b. {t('scenes:albaInfo_Alba:text14')}</Text>
                        <Text style={[styles.indentedText, schemeStyle.textColor]}>c. {t('scenes:albaInfo_Alba:text15')}</Text>
                        <Text style={[styles.indentedText, schemeStyle.textColor]}>d. {t('scenes:albaInfo_Alba:text16')}</Text>

                        <Text style={[styles.innerText, schemeStyle.textColor]}>- {t('scenes:albaInfo_Alba:text17')}</Text>
                        <Text style={[styles.indentedText, schemeStyle.textColor]}>• {t('scenes:albaInfo_Alba:text18')}</Text>
                        <Text style={[styles.indentedText, schemeStyle.textColor]}>• {t('scenes:albaInfo_Alba:text19')}</Text>
                        <Text style={[styles.indentedText, schemeStyle.textColor]}>• {t('scenes:albaInfo_Alba:text20')}</Text>
                        <Text style={[styles.indentedText, schemeStyle.textColor]}>• {t('scenes:albaInfo_Alba:text21')}</Text>
                        <Text style={[styles.indentedText, schemeStyle.textColor]}>• {t('scenes:albaInfo_Alba:text22')}</Text>
                        <Text style={[styles.indentedText, schemeStyle.textColor]}>• {t('scenes:albaInfo_Alba:text23')}</Text>
                        <Text style={[styles.indentedText, schemeStyle.textColor]}>• {t('scenes:albaInfo_Alba:text24')}</Text>

                        <Image 
                            style={{ height: _width, width: _width, resizeMode:"contain", alignSelf:"center" }}
                            source={require("../../assets/images/albaInfo/image15.jpg")} />
                    </View>

                    <View style={[styles.box, schemeStyle.boxColor]}>
                        <Text style={[styles.subtitle, schemeStyle.textColor]}>{t('scenes:albaInfo_Alba:issues')}</Text>

                        <Text style={[styles.innerText, schemeStyle.textColor]}>- {t('scenes:albaInfo_Alba:text25')}</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>- {t('scenes:albaInfo_Alba:text26')}</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>- {t('scenes:albaInfo_Alba:text27')}</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>- {t('scenes:albaInfo_Alba:text28')}</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>- {t('scenes:albaInfo_Alba:text29')}</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>- {t('scenes:albaInfo_Alba:text30')}</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>- {t('scenes:albaInfo_Alba:text31')}</Text>

                        <Image 
                            style={{ height: _width, width: _width, resizeMode:"contain", alignSelf:"center" }}
                            source={require("../../assets/images/albaInfo/image16.jpg")} />
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
    indentedText: {
        marginLeft: 25,
        padding: 5,
    }
});

export default AlbaInfoWhoScreen;