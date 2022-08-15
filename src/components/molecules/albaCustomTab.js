import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { useDarkMode } from 'react-native-dynamic';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { Colors } from '../../styles';

const albaCustomTab = ({ navigation }) => {
    const { t, i18n } = useTranslation();

    const isDarkMode = useDarkMode();
    var BACKGROUND_COLOR = Colors.LIGHT_SECONDARY_BACKGROUND
    var ACTIVE_COLOR = Colors.DARK_PRIMARY_BUTTON
    var INACTIVE_COLOR = Colors.LIGHT_PRIMARY_TEXT
    var ICON_COLOR = "#000000"
    if (isDarkMode) {
        BACKGROUND_COLOR = Colors.DARK_SECONDARY_BACKGROUND
        ACTIVE_COLOR = Colors.LIGHT_PRIMARY_BUTTON
        INACTIVE_COLOR = Colors.DARK_PRIMARY_TEXT
        ICON_COLOR = '#FFFFFF'
    }

    const schemeStyle = StyleSheet.create({
        backgroundColor: {
            backgroundColor: BACKGROUND_COLOR,
        },
        activeColor: {
            color: ACTIVE_COLOR,
        },
        inactiveColor: {
            color: INACTIVE_COLOR,
        }
    })

    const [selectIndex, onSelectIndex] = useState(0);

    return (
        <SafeAreaView style={[styles.container, schemeStyle.backgroundColor]}>
            <TouchableOpacity
                style={styles.innerContainer}
                onPress={() => {
                    onSelectIndex(0);
                    navigation.navigate("AlbaInformation")
                }}
                underlayColor='#fff'>
                <View style={styles.center}>
                    <Icon name="info" size={30} color={ICON_COLOR} />
                    {
                        selectIndex == 0?<Text style={[styles.textStyle, schemeStyle.activeColor]}>{t('albaInfo_navigator:AlbaInformation')}</Text>
                        : <Text style={[styles.textStyle, schemeStyle.inactiveColor]}>{t('albaInfo_navigator:AlbaInformation')}</Text>
                    }
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.innerContainer}
                onPress={() => {
                    onSelectIndex(1);
                    navigation.navigate("AlbaInfoType")
                }}
                underlayColor='#fff'>
                <View style={styles.center}>
                    <Icon name="laptop" size={30} color={ICON_COLOR} />
                    {
                        selectIndex == 1?<Text style={[styles.textStyle, schemeStyle.activeColor]}>{t('albaInfo_navigator:AlbaInfoType')}</Text>
                        : <Text style={[styles.textStyle, schemeStyle.inactiveColor]}>{t('albaInfo_navigator:AlbaInfoType')}</Text>
                    }
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.innerContainer}
                onPress={() => {
                    onSelectIndex(2);
                    navigation.navigate("AlbaInfoWho")
                }}
                underlayColor='#fff'>
                <View style={styles.center}>
                    <Icon name="envira" size={30} color={ICON_COLOR} />
                    {
                        selectIndex == 2?<Text style={[styles.textStyle, schemeStyle.activeColor]}>{t('albaInfo_navigator:AlbaInfoWho')}</Text>
                        : <Text style={[styles.textStyle, schemeStyle.inactiveColor]}>{t('albaInfo_navigator:AlbaInfoWho')}</Text>
                    }
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.innerContainer}
                onPress={() => {
                    onSelectIndex(3);
                    navigation.navigate("AlbaInfoBinScreen")
                }}
                underlayColor='#fff'>
                <View style={styles.center}>
                    <Icon name="dumpster" size={30} color={ICON_COLOR} />
                    {
                        selectIndex == 3?<Text style={[styles.textStyle, schemeStyle.activeColor]}>{t('albaInfo_navigator:AlbaInfoBin')}</Text>
                        : <Text style={[styles.textStyle, schemeStyle.inactiveColor]}>{t('albaInfo_navigator:AlbaInfoBin')}</Text>
                    }
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        justifyContent: 'space-around'
    },
    innerContainer: {
        marginTop: 10
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 12,
        marginTop: 1,
    }
})

export default albaCustomTab;