import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useDarkMode } from 'react-native-dynamic';

import '../../translations/i18n';
import {useTranslation} from 'react-i18next';

import { HeaderBar, OldLoadingScreen, LoadingScreen } from "../../components/organisms";
import { Colors } from '../../styles';

const AboutScreen = ({ navigation }) => {
    const {t, i18n} = useTranslation();

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
                        <Text onPress={() => setOldLoadingDisplay(false)} style={[schemeStyle.textColor, {margin: 10}]}>{t('scenes:about_index:closeLoading')}</Text>
                    </SafeAreaView>
                    <OldLoadingScreen/>
                </View>
                :
                <View style={{flex: 1}}>
                    {
                        newLoadingDisplay?
                        <View style={{flex: 1, width:Dimensions.get('screen').width, height:Dimensions.get('screen').height }}>
                            <SafeAreaView>
                                <Text onPress={() => setNewLoadingDisplay(false)} style={[schemeStyle.textColor, {margin: 10}]}>{t('scenes:about_index:closeLoading')}</Text>
                            </SafeAreaView>
                            <LoadingScreen/>
                        </View>
                        :
                        <View style={{flex: 1}}>
                            <HeaderBar navigation={navigation}/>

                            <View style={{flex: 1}}>
                                <ScrollView showsVerticalScrollIndicator={false} style={styles.innerContainer}>
                                    <Text style={schemeStyle.textColor}>
                                        {t('scenes:about_index:creditDeveloper')}
                                    </Text>

                                    <View style={{marginTop: 10}}>
                                        <Text style={schemeStyle.textColor}>
                                            {t('scenes:about_index:creditTranslator')}
                                        </Text>
                                        <View style={{marginLeft: 20}}>
                                            <Text style={schemeStyle.textColor}>
                                            {t('scenes:about_index:czech')} - Kikina
                                            </Text>
                                            <Text style={schemeStyle.textColor}>
                                                {t('scenes:about_index:malay')} - Neeza
                                            </Text>
                                            <Text style={schemeStyle.textColor}>
                                                {t('scenes:about_index:chinese')} - Yu Hsi &amp; Caleb
                                            </Text>
                                        </View>
                                    </View>
                                    

                                    <View style={{marginTop: 50, flexDirection: "row", justifyContent: "space-between"}}>
                                        <TouchableOpacity
                                            style={[styles.button, schemeStyle.buttonColor]}
                                            onPress={() => setOldLoadingDisplay(true)}
                                            underlayColor='#fff'>
                                            <Text style={schemeStyle.textColor}>{t('scenes:about_index:treeLoading')}</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[styles.button, schemeStyle.buttonColor]}
                                            onPress={() => setNewLoadingDisplay(true)}
                                            underlayColor='#fff'>
                                            <Text style={schemeStyle.textColor}>{t('scenes:about_index:activityLoading')}</Text>
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