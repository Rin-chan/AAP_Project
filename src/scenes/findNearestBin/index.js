import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, Modal, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { manipulateAsync } from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { useDarkMode } from 'react-native-dynamic';
import Icon from 'react-native-vector-icons/FontAwesome5';

import '../../translations/i18n';
import {useTranslation} from 'react-i18next';

import { HeaderBar } from "../../components/organisms";
import { Colors } from '../../styles';

import flaskServer from "../../../settings.json";
const flaskIP = flaskServer.flaskServer;

const findNearestBinScreen = ({ navigation }) => {
    const {t, i18n} = useTranslation();

    const isDarkMode = useDarkMode();
    var BACKGROUND_COLOR = Colors.LIGHT_SECONDARY_BACKGROUND;
    var TEXT_COLOR = Colors.LIGHT_PRIMARY_TEXT;
    var SKIP_COLOR = Colors.LIGHT_PRIMARY_BUTTON;
    var IMAGE_COLOR = "#000000";
    var ICON_BG_COLOR = Colors.LIGHT_THIRD_BACKGROUND;
    if (isDarkMode) {
        BACKGROUND_COLOR = Colors.DARK_THIRD_BACKGROUND;
        TEXT_COLOR = Colors.DARK_PRIMARY_TEXT;
        SKIP_COLOR = Colors.DARK_PRIMARY_BUTTON;
        IMAGE_COLOR = "#FFFFFF";
        ICON_BG_COLOR = Colors.DARK_FOURTH_BACKGROUND;
    }

    const schemeStyle = StyleSheet.create({
        backgroundColor: {
            backgroundColor: BACKGROUND_COLOR,
        },
        textColor: {
            color: TEXT_COLOR,
        },
        skipColor: {
            backgroundColor: SKIP_COLOR,
        },
        iconBGColor: {
            backgroundColor: ICON_BG_COLOR,
        }
    })

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(CameraType.back);
    const [cam, setCam] = useState(false);
    const [base64Image, setbase64Image] = useState("");
    const [stopCam, setStopCam] = useState(false);
    const [showCam, setShowCam] = useState(false);

    const _width = Dimensions.get('screen').width * 0.75;

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
                setShowCam(false);
                setStopCam(true);
            });     
        }
    }

    const retakePhoto = () => {
        setStopCam(false);
        setShowCam(true);
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

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            base64: true,
        });
    
        if (!result.cancelled) {
            const manipResult = await manipulateAsync(
                result.uri,
                [{ resize: { width: 150, height: 150 } }]
            );
            const reducedResult = await FileSystem.readAsStringAsync(manipResult.uri, { encoding: 'base64' });

            let prediction = '';

            await fetch(`http://${flaskIP}/predictItemApp`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ image: reducedResult })
            })
                .then(response => response.json())
                .then(data => {
                    prediction = data.prediction;
                })
                .catch(err => console.error(err));
            
            if (prediction != "") {
                navigation.navigate('findNearestBinPrediction', {prediction: prediction, image: reducedResult});
                return;
            }

            return;
        }
    };

    return (
        <View style={[styles.container, schemeStyle.backgroundColor]}>
            <HeaderBar navigation={navigation}/>

            <Text style={[schemeStyle.textColor, {fontSize: 35, fontWeight: "bold", margin: 10}]}>{t('scenes:findNearestBin_index:title')}</Text>
            <Text style={[schemeStyle.textColor, {marginLeft: 10, marginRight: 10}]}>{t('scenes:findNearestBin_index:text')}</Text>

            <View style={styles.row}>
                <TouchableOpacity style={[styles.buttonIcon, schemeStyle.iconBGColor]} onPress={() => setShowCam(true)}>
                    <Icon name="camera" size={30} color={IMAGE_COLOR} style={{justifyContent: 'center', alignSelf: 'center'}}/>
                    <Text style={[schemeStyle.textColor]}>{t('scenes:findNearestBin_index:camera')}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.buttonIcon, schemeStyle.iconBGColor]} onPress={() => pickImage()}>
                    <Icon name="folder" size={30} color={IMAGE_COLOR} style={{justifyContent: 'center', alignSelf: 'center'}}/>
                    <Text style={[schemeStyle.textColor]}>{t('scenes:findNearestBin_index:gallery')}</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.innerContainer, {flex: 1}]}>
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                        marginTop: 30,
                        marginBottom: 30
                    }}
                />

                <Text style={[schemeStyle.textColor]}>{t('scenes:findNearestBin_index:skipText')}</Text>

                <TouchableOpacity style={[styles.skipScreenButton, schemeStyle.skipColor]} onPress={() => navigation.navigate('findNearestBinMap')}>
                    <Text style={schemeStyle.textColor}>{t('scenes:findNearestBin_index:skipToBin')}</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={showCam}
                onRequestClose={() => {
                    setShowCam(!showCam);
                }}
                >
                <View style={styles.centeredView}>
                    <View style={[styles.modalView, schemeStyle.backgroundColor]}>
                        <TouchableOpacity
                            onPress={() => setShowCam(!showCam)}
                            underlayColor='#fff'>
                            <Text style={[schemeStyle.textColor, {textAlign: 'right', fontWeight: 'bold', marginBottom: 10, fontSize: 20}]}>X</Text>
                        </TouchableOpacity>

                        <View style={{width: _width, height: _width}}>
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
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={stopCam}
                onRequestClose={() => {
                    setStopCam(!stopCam);
                }}
                >
                <View style={styles.centeredView}>
                    <View style={[styles.modalView, schemeStyle.backgroundColor]}>
                        <TouchableOpacity
                            onPress={() => setStopCam(!stopCam)}
                            underlayColor='#fff'>
                            <Text style={[schemeStyle.textColor, {textAlign: 'right', fontWeight: 'bold', fontSize: 25}]}>X</Text>
                        </TouchableOpacity>

                        <Image style={{ height: _width, width: _width, alignSelf: "center" }} source={base64Image}/>

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
            </Modal>

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
    buttonIcon: {
        marginTop: 20,
        padding: 25,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    skipScreenButton: {
        marginRight: 10,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 5
    },
    textStyle: {
        fontWeight: "bold",
        textAlign: "center",
        padding: 10
    },
});

export default findNearestBinScreen;