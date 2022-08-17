import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useDarkMode } from 'react-native-dynamic';
import { useTranslation } from 'react-i18next';

import { Colors } from '../../styles';

const customDrawer = ({ navigation }) => {
    const { t, i18n } = useTranslation();
    
    const isDarkMode = useDarkMode();
    var BACKGROUND_COLOR = Colors.LIGHT_SECONDARY_BACKGROUND;
    var TEXT_COLOR = Colors.LIGHT_PRIMARY_TEXT;
    if (isDarkMode) {
        BACKGROUND_COLOR = Colors.DARK_SECONDARY_BACKGROUND;
        TEXT_COLOR = Colors.DARK_PRIMARY_TEXT;
    }

    const schemeStyle = StyleSheet.create({
        backgroundColor: {
            backgroundColor: BACKGROUND_COLOR,
        },
        textColor: {
            color: TEXT_COLOR,
        },
    })

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={schemeStyle.backgroundColor}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("Home");
                }}>
                    <Text style={[schemeStyle.textColor, styles.textStyle]}>{t('app_navigator:Home')}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    navigation.navigate("findNearestBin")
                }}>
                    <Text style={[schemeStyle.textColor, styles.textStyle]}>{t('app_navigator:findNearestBin')}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    navigation.navigate("Alba")
                }}>
                    <Text style={[schemeStyle.textColor, styles.textStyle]}>{t('app_navigator:Alba')}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    navigation.navigate("EWasteIt")
                }}>
                    <Text style={[schemeStyle.textColor, styles.textStyle]}>{t('app_navigator:EWasteIt')}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    navigation.navigate("StepItUp")
                }}>
                    <Text style={[schemeStyle.textColor, styles.textStyle]}>{t('app_navigator:StepItUp')}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    navigation.navigate("About")
                }}>
                    <Text style={[schemeStyle.textColor, styles.textStyle]}>{t('app_navigator:About')}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    navigation.navigate("RedeemList")
                }}>
                    <Text style={[schemeStyle.textColor, styles.textStyle]}>{t('app_navigator:RedeemList')}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    navigation.navigate("ScanQRcode")
                }}>
                    <Text style={[schemeStyle.textColor, styles.textStyle]}>{t('app_navigator:ScanQRcode')}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    navigation.navigate("displayCollectedPoints")
                }}>
                <Text style={[schemeStyle.textColor, styles.textStyle]}>{t('app_navigator:displayCollectedPoints')}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    navigation.navigate("ItemDesc")
                }}>
                    <Text style={[schemeStyle.textColor, styles.textStyle]}>Item Desc</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    textStyle: {
        margin: 15,
        marginLeft: 25,
    },
})

export default customDrawer;