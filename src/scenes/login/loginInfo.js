import React, {useState,useEffect} from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, TextInput, View, Image, Dimensions, ScrollView, Modal } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDarkMode } from 'react-native-dynamic';

// Language
import '../../translations/i18n';
import {useTranslation} from 'react-i18next';
import DropDownPicker from 'react-native-dropdown-picker';

import { Colors } from '../../styles';

const LoginInfoScreen = ({ navigation }) => {
    const isDarkMode = useDarkMode();
    var BACKGROUND_COLOR = Colors.LIGHT_SECONDARY_BACKGROUND;
    var TEXT_COLOR = Colors.LIGHT_PRIMARY_TEXT;
    var PRIMARY_BUTTON = Colors.LIGHT_PRIMARY_BUTTON;
    var SECONDARY_BUTTON = Colors.LIGHT_SECONDARY_BUTTON;
    var INFO_ONE = '#07C0FF';
    var INFO_TWO = '#07FFC2';
    var INFO_THREE = '#FFC207';
    DropDownPicker.setTheme("LIGHT");
    if (isDarkMode) {
        BACKGROUND_COLOR = Colors.DARK_SECONDARY_BACKGROUND;
        TEXT_COLOR = Colors.DARK_PRIMARY_TEXT;
        PRIMARY_BUTTON = Colors.DARK_PRIMARY_BUTTON;
        SECONDARY_BUTTON = Colors.DARK_SECONDARY_BUTTON;
        INFO_ONE = '#009dd3';
        INFO_TWO = '#00D39F';
        INFO_THREE = '#D39F00';
        DropDownPicker.setTheme("DARK");
    }

    const schemeStyle = StyleSheet.create({
        backgroundColor: {
            backgroundColor: BACKGROUND_COLOR,
        },
        textColor: {
            color: TEXT_COLOR,
        },
        loginScreenButton: {
            backgroundColor: PRIMARY_BUTTON
        },
        registerScreenButton: {
            backgroundColor: SECONDARY_BUTTON
        },
    })

    const {t, i18n} = useTranslation();

    const changeLanguage = value => {
        i18n
        .changeLanguage(value)
        .catch(err => console.log(err));
    };

    const [run, setRun] = useState(true);

    async function getLanguage() {
        try{
            await AsyncStorage.getItem('language')
            .then(language => {
                setValue(language);
            })
            .catch(e => {
                console.log(e);
            })
        }
        catch {
        }

        setRun(false);
    }

    if (run) {
        getLanguage();
    }

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'English', value: 'en'},
        {label: 'Čeština', value: 'cs'},
        {label: '中文', value: 'zh', disabled: true},
        {label: 'Bahasa melayu', value: 'ms', disabled: true},
    ]);

    useEffect(() => {
        changeLanguage(value);
        AsyncStorage.setItem('language', value);
    }, [value]);

    const _width = Dimensions.get('screen').width * 0.85;
    const _height = Dimensions.get('screen').height * 0.45;

    const slides = [
        {
          key: 'one',
          title: t('scenes:login_info:title1'),
          text: t('scenes:login_info:text1'),
          image: require('../../assets/images/login/Home.jpeg'),
          backgroundColor: INFO_ONE,
        },
        {
          key: 'two',
          title: t('scenes:login_info:title2'),
          text: t('scenes:login_info:text2'),
          image: require('../../assets/images/login/Points.png'),
          backgroundColor: INFO_TWO,
        },
        {
          key: 'three',
          title: t('scenes:login_info:title3'),
          text: t('scenes:login_info:text3'),
          image: require('../../assets/images/login/Game.jpeg'),
          backgroundColor: INFO_THREE,
        }
    ];

    const renderItem = ({ item }) => {
        return (
          <SafeAreaView style={[styles.slide, {backgroundColor: item.backgroundColor}]}>
            <View style={styles.innerSlide}>
                <Text style={[styles.title, schemeStyle.textColor]}>{item.title}</Text>
                <Image source={item.image} style={{height: _height, width: _width, resizeMode: 'contain'}} />
                <Text style={schemeStyle.textColor}>{item.text}</Text>
            </View>
          </SafeAreaView>
        );
    }

    const keyExtractor = (item) => item.title;

    const renderPagination = (activeIndex) => {
        return (
          <View style={styles.paginationContainer}>
            <SafeAreaView>
                <View style={styles.paginationDots}>
                    {slides.length > 1 &&
                    slides.map((_, i) => (
                        <View
                            key={i}
                            style={[
                                styles.dot,
                                i === activeIndex
                                ? {backgroundColor: 'white'}
                                : {backgroundColor: 'rgba(0, 0, 0, .2)'},
                            ]}
                        />
                    ))}
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={[styles.button, schemeStyle.loginScreenButton]}
                        onPress={() => navigation.navigate('Login')}>
                    <Text style={[styles.buttonText, schemeStyle.textColor]}>{t('scenes:login_info:login')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.button, schemeStyle.registerScreenButton]} 
                        onPress={() => navigation.navigate('Register')}>
                    <Text style={[styles.buttonText, schemeStyle.textColor]}>{t('scenes:login_info:register')}</Text>
                    </TouchableOpacity>
                </View>

                <View style={[styles.dropdownRow, {justifyContent: "flex-start"}]}>
                    <Text style={[schemeStyle.textColor, {alignSelf: "center", margin: 10}]}>{t('scenes:login_info:language')}</Text>
                    <DropDownPicker
                        containerStyle={{width: '35%'}}
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        placeholder="English"
                        listMode="SCROLLVIEW"
                    />
                </View>
            </SafeAreaView>
          </View>
        );
    };

    return (
        <View style={[schemeStyle.backgroundColor, {flex: 1}]}>
            <AppIntroSlider renderItem={renderItem} data={slides} keyExtractor={keyExtractor} renderPagination={renderPagination}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: '10%',
        marginLeft: '5%'
    },
    dropdownRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    slide: {
        flex: 1,
        padding: 10,
    },
    innerSlide: {
        margin: 25,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 20
    },
    paginationContainer: {
        position: 'absolute',
        bottom: 16,
        left: 16,
        right: 16,
    },
    paginationDots: {
        height: 16,
        margin: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonContainer: {
    },
    button: {
        flex: 1,
        margin: 10,
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'red',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default LoginInfoScreen;