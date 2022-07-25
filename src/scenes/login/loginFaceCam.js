import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableHighlight, View, TouchableOpacity, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { manipulateAsync } from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import CryptoJS from 'crypto-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDarkMode } from 'react-native-dynamic';

import flaskServer from "../../../settings.json";
import { Colors } from '../../styles';

const faceVerificationScreen = ({ navigation }) => {
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
            flex: 1,
        },
        textColor: {
            color: TEXT_COLOR,
        },
    })

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(CameraType.front);
    const [cam, setCam] = useState(false);
    const [stopCam, setStopCam] = useState(false);
    const [image, setImage] = useState(undefined);

    const [timer, setTimer] = useState(0);

    const flaskIP = flaskServer.flaskServer;

    const storeData = async (location, value) => {
        try {
          await AsyncStorage.setItem(location, value)
        } catch (e) {
          console.log("Error in storing userToken");
          console.log(e);
        }
    }

    async function takePic() {
        if (cam) {
            const options = { quality: 1, base64: true, fixOrientation: true, 
            exif: true};
            await cam.takePictureAsync(options).then(photo => {
                photo.exif.Orientation = 1;
                setImage(photo);
            });     
        }
        return;
    }

    async function manipResult() {
        const manipResult = await manipulateAsync(
            image.uri,
            [{ resize: { width: 92, height: 112 } }]
        );
        
        const base64 = await FileSystem.readAsStringAsync(manipResult.uri, { encoding: 'base64' });
        return base64
    };

    const sendPic = async () => {
        let image = await manipResult();

        fetch(`http://${flaskIP}/faceVerification`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({originalFaceImage: navigation.state.params.faceImage, faceImage: image})
        })
        .then(response => response.json())
        .then(data => {
            if(data.result) {
                var email = navigation.state.params.email
                var randomNum = Math.floor(Math.random() * 999999) + 100000 // Generate a random number between 100000 and 999999
                var userToken = CryptoJS.SHA256(email+randomNum.toString()).toString() // Generate a token

                storeData('userToken', userToken);
                storeData('user', email);

                navigation.navigate('Home');
                return;
            }
            return;
        })
        .catch(err => console.error(err));
    }

    useEffect(() => {
        (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);

    useEffect(() => {
        if (cam){
            const interval = setInterval(() => {setTimer(timer => timer+1)}, 3000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [cam]);

    useEffect(() => {
        takePic();

        if (timer >= 5) {
            setStopCam(true);
        }
    }, [timer]);

    useEffect(() => {
        if (image != undefined) {
            sendPic();
        }
    }, [image]);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={schemeStyle.backgroundColor}>
            <SafeAreaView style={styles.container}>
                {stopCam == false ? (<View style={{flex: 1}}>
                    <TouchableHighlight
                        style={{padding: 10}}
                        onPress={() => navigation.navigate('Login')}>
                            <Text style={[schemeStyle.textColor, {fontWeight: "bold"}]}>Go back to Login</Text>
                    </TouchableHighlight>

                    <SafeAreaView style={styles.innerContainer}>
                        <Camera style={styles.camera} 
                            type={type}
                            ref={ref => {setCam(ref)}}
                            ratio={"1:1"}>
                        </Camera>
                    </SafeAreaView>
                </View>): (<View style={{flex: 1, flexDirection: "column", justifyContent: "center"}}>
                    <Text style={styles.warning}>Face Verification Failed</Text>

                    <TouchableHighlight
                        style={{padding: 10, alignSelf: "center"}}
                        onPress={() => navigation.navigate('Login')}>
                            <Text style={[schemeStyle.textColor, {fontWeight: "bold"}]}>Go back to Login</Text>
                    </TouchableHighlight>
                </View>
                )}
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        margin: "5%",
        marginTop: '25%',
    },
    camera: {
        aspectRatio: 1,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    warning: {
        color: "red",
        fontWeight: "bold",
        fontSize: 30,
        justifyContent: "center",
        alignSelf: "center"
    },
});

export default faceVerificationScreen;