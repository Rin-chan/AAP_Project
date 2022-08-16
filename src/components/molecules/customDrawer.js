import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useDarkMode } from 'react-native-dynamic';
import { useTranslation } from 'react-i18next';

import { Colors } from '../../styles';

const customDrawer = ({ navigation }) => {
    const { t, i18n } = useTranslation();
    
    const isDarkMode = useDarkMode();
    var BACKGROUND_COLOR = Colors.LIGHT_SECONDARY_BACKGROUND;
    var TEXT_COLOR = Colors.LIGHT_PRIMARY_TEXT;
    var HIGHLIGHT_COLOR = Colors.LIGHT_GREEN_BUTTON;
    if (isDarkMode) {
        BACKGROUND_COLOR = Colors.DARK_SECONDARY_BACKGROUND;
        TEXT_COLOR = Colors.DARK_PRIMARY_TEXT;
        HIGHLIGHT_COLOR = Colors.DARK_GREEN_BUTTON;
    }

    const schemeStyle = StyleSheet.create({
        backgroundColor: {
            backgroundColor: BACKGROUND_COLOR,
        },
        textColor: {
            color: TEXT_COLOR,
        },
        highlightColor: {
            color: HIGHLIGHT_COLOR,
        }
    })

    const [selected, setSelected] = useState(0);

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={schemeStyle.backgroundColor}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
                {
                    selected == 0?
                    <TouchableOpacity>
                        <Text style={[schemeStyle.highlightColor, styles.textStyle]}>{t('app_navigator:Home')}</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("Home");
                        setSelected(0);
                    }}>
                        <Text style={[schemeStyle.textColor, styles.textStyle]}>{t('app_navigator:Home')}</Text>
                    </TouchableOpacity>
                }

                {
                    selected == 1?
                    <TouchableOpacity>
                        <Text style={[schemeStyle.highlightColor, styles.textStyle]}>{t('app_navigator:Alba')}</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("Alba")
                        setSelected(1);
                    }}>
                        <Text style={[schemeStyle.textColor, styles.textStyle]}>{t('app_navigator:Alba')}</Text>
                    </TouchableOpacity>
                }

                {
                    selected == 2?
                    <TouchableOpacity>
                        <Text style={[schemeStyle.highlightColor, styles.textStyle]}>{t('app_navigator:EWasteIt')}</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("EWasteIt")
                        setSelected(2);
                    }}>
                        <Text style={[schemeStyle.textColor, styles.textStyle]}>{t('app_navigator:EWasteIt')}</Text>
                    </TouchableOpacity>
                }

                {
                    selected == 3?
                    <TouchableOpacity>
                        <Text style={[schemeStyle.highlightColor, styles.textStyle]}>{t('app_navigator:StepItUp')}</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("StepItUp")
                        setSelected(3);
                    }}>
                        <Text style={[schemeStyle.textColor, styles.textStyle]}>{t('app_navigator:StepItUp')}</Text>
                    </TouchableOpacity>
                }

                {
                    selected == 4?
                    <TouchableOpacity>
                        <Text style={[schemeStyle.highlightColor, styles.textStyle]}>{t('app_navigator:About')}</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("About")
                        setSelected(4);
                    }}>
                        <Text style={[schemeStyle.textColor, styles.textStyle]}>{t('app_navigator:About')}</Text>
                    </TouchableOpacity>
                }

                {
                    selected == 5?
                    <TouchableOpacity>
                        <Text style={[schemeStyle.highlightColor, styles.textStyle]}>{t('app_navigator:RedeemList')}</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("RedeemList")
                        setSelected(5);
                    }}>
                        <Text style={[schemeStyle.textColor, styles.textStyle]}>{t('app_navigator:RedeemList')}</Text>
                    </TouchableOpacity>
                }

                {
                    selected == 6?
                    <TouchableOpacity>
                        <Text style={[schemeStyle.highlightColor, styles.textStyle]}>{t('app_navigator:ScanQRcode')}</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("ScanQRcode")
                        setSelected(6);
                    }}>
                        <Text style={[schemeStyle.textColor, styles.textStyle]}>{t('app_navigator:ScanQRcode')}</Text>
                    </TouchableOpacity>
                }

                {
                    selected == 7?
                    <TouchableOpacity>
                        <Text style={[schemeStyle.highlightColor, styles.textStyle]}>{t('app_navigator:RedeemHistory')}</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("RedeemHistory")
                        setSelected(7);
                    }}>
                        <Text style={[schemeStyle.textColor, styles.textStyle]}>Redeem History</Text>
                    </TouchableOpacity>
                }
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