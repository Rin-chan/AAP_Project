import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native';
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
                    <Text style={[schemeStyle.highlightColor, styles.textStyle]}>{t('app_navigator:Home')}</Text>
                    :
                    <Text style={[schemeStyle.textColor, styles.textStyle]} onPress={() => {
                        navigation.navigate("Home");
                        setSelected(0);
                    }}>{t('app_navigator:Home')}</Text>
                }

                {
                    selected == 1?
                    <Text style={[schemeStyle.highlightColor, styles.textStyle]}>{t('app_navigator:Alba')}</Text>
                    :
                    <Text style={[schemeStyle.textColor, styles.textStyle]} onPress={() => {
                        navigation.navigate("Alba")
                        setSelected(1);
                    }}>{t('app_navigator:Alba')}</Text>
                }

                {
                    selected == 2?
                    <Text style={[schemeStyle.highlightColor, styles.textStyle]}>{t('app_navigator:EWasteIt')}</Text>
                    :
                    <Text style={[schemeStyle.textColor, styles.textStyle]} onPress={() => {
                        navigation.navigate("EWasteIt")
                        setSelected(2);
                    }}>{t('app_navigator:EWasteIt')}</Text>
                }

                {
                    selected == 3?
                    <Text style={[schemeStyle.highlightColor, styles.textStyle]}>{t('app_navigator:StepItUp')}</Text>
                    :
                    <Text style={[schemeStyle.textColor, styles.textStyle]} onPress={() => {
                        navigation.navigate("StepItUp")
                        setSelected(3);
                    }}>{t('app_navigator:StepItUp')}</Text>
                }

                {
                    selected == 4?
                    <Text style={[schemeStyle.highlightColor, styles.textStyle]}>{t('app_navigator:About')}</Text>
                    :
                    <Text style={[schemeStyle.textColor, styles.textStyle]} onPress={() => {
                        navigation.navigate("About")
                        setSelected(4);
                    }}>{t('app_navigator:About')}</Text>
                }

                {
                    selected == 5?
                    <Text style={[schemeStyle.highlightColor, styles.textStyle]}>{t('app_navigator:RedeemList')}</Text>
                    :
                    <Text style={[schemeStyle.textColor, styles.textStyle]} onPress={() => {
                        navigation.navigate("RedeemList")
                        setSelected(5);
                    }}>{t('app_navigator:RedeemList')}</Text>
                }

                {
                    selected == 6?
                    <Text style={[schemeStyle.highlightColor, styles.textStyle]}>{t('app_navigator:ScanQRcode')}</Text>
                    :
                    <Text style={[schemeStyle.textColor, styles.textStyle]} onPress={() => {
                        navigation.navigate("ScanQRcode")
                        setSelected(6);
                    }}>{t('app_navigator:ScanQRcode')}</Text>
                }

                {
                    selected == 8?
                    <Text style={[schemeStyle.highlightColor, styles.textStyle]}>{t('app_navigator:RedeemHistory')}</Text>
                    :
                    <Text style={[schemeStyle.textColor, styles.textStyle]} onPress={() => {
                        navigation.navigate("RedeemHistory")
                        setSelected(8);
                    }}>Redeem History</Text>
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