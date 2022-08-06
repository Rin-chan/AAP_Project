import React from 'react';
import {SafeAreaView,Text,StyleSheet,} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useDarkMode } from 'react-native-dynamic'

// Language
import '../../translations/i18n';
import {useTranslation} from 'react-i18next';

import { Colors } from '../../styles';

const LoadingScreen = () => {
    const {t, i18n} = useTranslation();

    const isDarkMode = useDarkMode();
    var BACKGROUND_COLOR = Colors.LIGHT_SECONDARY_BACKGROUND
    var TEXT_COLOR = Colors.LIGHT_PRIMARY_TEXT
    if (isDarkMode) {
        BACKGROUND_COLOR = Colors.DARK_SECONDARY_BACKGROUND
        TEXT_COLOR = Colors.DARK_PRIMARY_TEXT
    }

    const schemeStyle = StyleSheet.create({
        backgroundColor: {
            backgroundColor: BACKGROUND_COLOR,
        },
        textColor: {
            color: TEXT_COLOR
        }
    })

    return (
        <SafeAreaView style={[styles.container, schemeStyle.backgroundColor]}>
            <ActivityIndicator
                textContent={'Loading...'}
                textStyle={schemeStyle.textColor}
                animating={true} 
                color={TEXT_COLOR}
                size={100}
            />
            <Text style={[schemeStyle.textColor, {textAlign: "center", fontSize: 40, margin: 40}]}>{t('organisms:loadingScreen:loading')}</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
});

export default LoadingScreen;