import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useDarkMode } from 'react-native-dynamic';
import { Drawer } from "react-native-paper";
import { useTranslation } from 'react-i18next';

import { Colors } from '../../styles';

const customDrawer = ({ navigation }) => {
    const { t, i18n } = useTranslation();

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
    })

    const theme = {
        colors: {
          primary: TEXT_COLOR,
        },
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={schemeStyle.backgroundColor}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
                <Drawer.Item
                    label={t('app_navigator:Home')}
                    active="true"
                    onPress={() => navigation.navigate("Home")}
                    theme={theme}
                />
                <Drawer.Item
                    label={t('app_navigator:Alba')}
                    active="true"
                    onPress={() => navigation.navigate("Alba")}
                    theme={theme}
                />
                <Drawer.Item
                    label={t('app_navigator:EWasteIt')}
                    active="true"
                    onPress={() => navigation.navigate("EWasteIt")}
                    theme={theme}
                />
                <Drawer.Item
                    label={t('app_navigator:StepItUp')}
                    active="true"
                    onPress={() => navigation.navigate("StepItUp")}
                    theme={theme}
                />
                <Drawer.Item
                    label={t('app_navigator:About')}
                    active="true"
                    onPress={() => navigation.navigate("About")}
                    theme={theme}
                />
                <Drawer.Item
                    label={t('app_navigator:RedeemList')}
                    active="true"
                    onPress={() => navigation.navigate("RedeemList")}
                    theme={theme}
                />
                <Drawer.Item
                    label={t('app_navigator:ScanQRcode')}
                    active="true"
                    onPress={() => navigation.navigate("ScanQRcode")}
                    theme={theme}
                />
                <Drawer.Item
                    label={t('app_navigator:displayCollectedPoints')}
                    active="true"
                    onPress={() => navigation.navigate("displayCollectedPoints")}
                    theme={theme}
                />
                <Drawer.Item
                    label="Item Desc"
                    active="true"
                    onPress={() => navigation.navigate("ItemDesc")}
                    theme={theme}
                />
            </SafeAreaView>
        </ScrollView>
    );
};

export default customDrawer;