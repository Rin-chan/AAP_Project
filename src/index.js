import React, { useState, useLayoutEffect } from 'react';
import Navigator from './navigations';
import { View } from 'react-native';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Index = () => {
    const {t, i18n} = useTranslation();
    const [run, setRun] = useState(false);

    async function setLanguage() {
        await AsyncStorage.getItem('language')
        .then(language => {
            i18n.changeLanguage(language).catch(err => console.log(err));
            setRun(true);
        })
    }

    if (run == false){
        setLanguage();
    }

    return (
        <View style={{flex: 1}}>
        {
            run == true? <Navigator /> 
            : null
        }
        </View>
    );
}

export default Index;