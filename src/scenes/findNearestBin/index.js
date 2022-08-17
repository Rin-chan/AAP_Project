import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableHighlight, View, TouchableOpacity, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { manipulateAsync } from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import { useDarkMode } from 'react-native-dynamic';

import '../../translations/i18n';
import {useTranslation} from 'react-i18next';

import { HeaderBar } from "../../components/organisms";
import { Colors } from '../../styles';

import flaskServer from "../../../settings.json";
const flaskIP = flaskServer.flaskServer;

const findNearestBinScreen = ({ navigation }) => {
    const {t, i18n} = useTranslation();

    const isDarkMode = useDarkMode();
    var BACKGROUND_COLOR = Colors.LIGHT_THIRD_BACKGROUND
    var TEXT_COLOR = Colors.LIGHT_PRIMARY_TEXT
    if (isDarkMode) {
        BACKGROUND_COLOR = Colors.DARK_FOURTH_BACKGROUND
        TEXT_COLOR = Colors.DARK_PRIMARY_TEXT
    }

    const schemeStyle = StyleSheet.create({
        backgroundColor: {
            backgroundColor: BACKGROUND_COLOR,
        },
        textColor: {
            color: TEXT_COLOR,
        },
    })

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(CameraType.back);
    const [cam, setCam] = useState(false);
    const [base64Image, setbase64Image] = useState("");
    const [stopCam, setStopCam] = useState(false);

    useEffect(() => {
        (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    async function manipResult() {
        const manipResult = await manipulateAsync(
            base64Image.uri,
            [{ resize: { width: 150, height: 150 } }]
        );
        
        const base64 = await FileSystem.readAsStringAsync(manipResult.uri, { encoding: 'base64' });
        return base64
    };
    
    const snapPhoto = async() => {
        if (cam) {
            const options = { quality: 1, base64: true, fixOrientation: true, 
            exif: true};
            await cam.takePictureAsync(options).then(photo => {
                photo.exif.Orientation = 1;
                setbase64Image(photo);
                setStopCam(true);
            });     
        }
    }

    const retakePhoto = () => {
        setStopCam(false);
    }

    const choosePhoto = async () => {
        let image = await manipResult()
        let prediction = '';

        await fetch(`http://${flaskIP}/predictItemApp`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image: image })
        })
            .then(response => response.json())
            .then(data => {
                prediction = data.prediction;
            })
            .catch(err => console.error(err));
        
        if (prediction != "") {
            navigation.navigate('findNearestBinPrediction', {prediction: prediction, image: image});
            return;
        }

        retakePhoto();
        return;
    }

    return (
        <View style={[styles.container, schemeStyle.backgroundColor]}>
            <HeaderBar navigation={navigation}/>

            <Text style={[schemeStyle.textColor, {fontSize: 35, fontWeight: "bold", margin: 10}]}>{t('scenes:findNearestBin_index:title')}</Text>
            <Text style={[schemeStyle.textColor, {marginLeft: 10, marginRight: 10}]}>{t('scenes:findNearestBin_index:text')}</Text>

            {stopCam == false ? (<View style={{flex: 1}}>
                <SafeAreaView style={styles.innerContainer}>
                    <Camera style={styles.camera} 
                        type={type}
                        ref={setCam}
                        ratio={"1:1"}>
                        <View style={styles.buttonContainer}> 
                            <TouchableOpacity style={{marginTop: "auto", margin: 20}} onPress={snapPhoto}>
                                <Image style={{width: 50, height: 50}} source={require("../../assets/images/circle_button.png")} />
                            </TouchableOpacity>
                        </View>
                    </Camera>
                </SafeAreaView>
            </View>): (<View style={{flex: 1}}>
                <View style={styles.innerContainer}>
                    <Image style={{ height: 300, width: 300, alignSelf: "center" }} source={base64Image}/>

                    <View style={styles.row}>
                        <TouchableOpacity style={{margin: 20}} onPress={retakePhoto}>
                            <Text style={schemeStyle.textColor}>{t('scenes:findNearestBin_index:retakePhoto')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{margin: 20}} onPress={choosePhoto}>
                            <Text style={schemeStyle.textColor}>{t('scenes:findNearestBin_index:choosePhoto')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.GREY_BACKGROUND,
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        margin: "5%",
    },
    camera: {
        aspectRatio: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        marginTop: 20,
        alignSelf: "center",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
});

export default findNearestBinScreen;