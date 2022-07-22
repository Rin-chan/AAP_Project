import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableHighlight, View, TouchableOpacity, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { HeaderBar } from "../../components/organisms";
import { Colors } from '../../styles';
import UserDB from '../../utils/database/userdb';

const faceVerificationScreen = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(CameraType.front);
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
        await AsyncStorage.getItem('user')
        .then(email => {
            UserDB.getUser(email).then((result) => {
                if(result.length < 1) {
                    console.log("USER NOT FOUND");
                    return;
                }
                else {
                    UserDB.updateUserFace(email, base64Image.uri, true);
                    navigation.navigate("Profile");
                    return;
                }
            });
        });
    }

    return (
        <View style={styles.container}>
            <HeaderBar navigation={navigation}/>

            {stopCam == false ? (<View style={{flex: 1}}>
                <TouchableHighlight
                    style={{padding: 10}}
                    onPress={() => navigation.navigate('Profile')}>
                        <Text style={{fontWeight: "bold"}}>Go back to profile page</Text>
                </TouchableHighlight>

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
                <TouchableHighlight
                    style={{padding: 10}}
                    onPress={() => navigation.navigate('Profile')}>
                        <Text style={{fontWeight: "bold"}}>Go back to profile page</Text>
                </TouchableHighlight>

                <View style={styles.innerContainer}>
                    <Image style={{ height: 300, width: 300, alignSelf: "center" }} source={base64Image}/>

                    <View style={styles.row}>
                        <TouchableOpacity style={{margin: 20}} onPress={retakePhoto}>
                            <Text>Retake photo</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{margin: 20}} onPress={choosePhoto}>
                            <Text>Choose this photo</Text>
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
    text: {
        fontSize: 18,
        color: 'white',
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
});

export default faceVerificationScreen;