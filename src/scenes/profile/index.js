import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableHighlight, View, Dimensions, ScrollView, TouchableOpacity, Modal, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDarkMode } from 'react-native-dynamic';
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync } from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import { Camera, CameraType } from 'expo-camera';
import { Avatar } from 'react-native-paper';

// Language
import '../../translations/i18n';
import {useTranslation} from 'react-i18next';
import DropDownPicker from 'react-native-dropdown-picker';

import { HeaderBar, LoadingScreen } from "../../components/organisms";
import { Colors } from '../../styles';
import UserDB from '../../utils/database/userdb';

const ProfileScreen = ({ navigation }) => {
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
        {label: '中文', value: 'zh'},
        {label: 'Bahasa melayu', value: 'ms'},
    ]);

    useEffect(() => {
        changeLanguage(value);
        AsyncStorage.setItem('language', value);
    }, [value]);

    const isDarkMode = useDarkMode();
    var FOREGROUND_COLOR = Colors.LIGHT_SECONDARY_BACKGROUND;
    var BACKGROUND_COLOR = Colors.LIGHT_THIRD_BACKGROUND;
    var INPUT_COLOR = Colors.LIGHT_PRIMARY_BACKGROUND;
    var TEXT_COLOR = Colors.LIGHT_PRIMARY_TEXT;
    var PRIMARY_BUTTON = Colors.LIGHT_PRIMARY_BUTTON;
    var DANGER_BUTTON = Colors.LIGHT_DANGER_BUTTON;
    DropDownPicker.setTheme("LIGHT");
    if (isDarkMode) {
        BACKGROUND_COLOR = Colors.DARK_FOURTH_BACKGROUND;
        FOREGROUND_COLOR = Colors.DARK_THIRD_BACKGROUND;
        TEXT_COLOR = Colors.DARK_PRIMARY_TEXT;
        INPUT_COLOR = Colors.DARK_FOURTH_BACKGROUND;
        PRIMARY_BUTTON = Colors.DARK_PRIMARY_BUTTON;
        DANGER_BUTTON = Colors.DARK_DANGER_BUTTON;
        DropDownPicker.setTheme("DARK");
    }

    const schemeStyle = StyleSheet.create({
        backgroundColor: {
            backgroundColor: BACKGROUND_COLOR,
        },
        foregroundColor: {
            backgroundColor: FOREGROUND_COLOR,
        },
        textColor: {
            color: TEXT_COLOR,
        },
        inputColor: {
            backgroundColor: INPUT_COLOR,
            color: TEXT_COLOR,
        },
        primaryScreenButton: {
            backgroundColor: PRIMARY_BUTTON,
        },
        dangerScreenButton: {
            backgroundColor: DANGER_BUTTON,
        }
    })

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('None');
    const [username, setUsername] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [face, setFace] = useState(false);
    const [image, setImage] = useState(null);

    const [request, setRequest] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(CameraType.front);
    const [cam, setCam] = useState(false);
    const [base64Image, setbase64Image] = useState("");
    const [stopCam, setStopCam] = useState(false);
    const [tempModal, setTempModal] = useState(false);

    const _width = Dimensions.get('screen').width * 0.7;

    const takePhoto = () => {
        setModalVisible(false);
        setStopCam(true);
    }

    const snapPhoto = async() => {
        if (cam) {
            const options = { quality: 1, base64: true, fixOrientation: true, 
            exif: true};
            await cam.takePictureAsync(options).then(photo => {
                photo.exif.Orientation = 1;
                setbase64Image(photo);
                setStopCam(false);
                setTempModal(true);
            });     
        }
    }

    const retakePhoto = () => {
        setStopCam(true);
        setTempModal(false);
    }

    async function manipResult() {
        const manipResult = await manipulateAsync(
            base64Image.uri,
            [{ resize: { width: 160, height: 160 } }]
        );
        
        const base64 = await FileSystem.readAsStringAsync(manipResult.uri, { encoding: 'base64' });
        return base64
    };

    const choosePhoto = async () => {
        let maniImage = await manipResult();

        setTempModal(false);
        setImage(maniImage);
        UserDB.updateUserProfilePic(email, maniImage);
    }

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

    const getUser = async () => {
        if (request == false) {
            setRequest(true);

            await AsyncStorage.getItem('user')
            .then(email => {
                setEmail(email);

                UserDB.getUser(email).then((result) => {
                    if(result != undefined) {
                        setUsername(result[0][1]);
                        setPassword(result[0][3])
                        setContact(result[0][4]);
                        setAddress(result[0][5]);
                        setFace(result[0][6]);
                        setImage(result[0][11]);
                        setPageLoading(true);
                    }
                    else {
                        console.log("USER NOT FOUND");
                        return;
                    }
                });
            });
        }
    };

    async function logout() {
        try {
            await AsyncStorage.removeItem("user");
            await AsyncStorage.removeItem("userToken");
            await AsyncStorage.removeItem("google");
            navigation.navigate('Login');
        }
        catch(exception) {
            console.log("LOGOUT FAILED");
            console.log(exception);
        }
    };

    getUser();

    async function resetFaceVeri() {
        await AsyncStorage.getItem('user')
        .then(email => {
            UserDB.getUser(email).then((result) => {
                if(result.length != 0) {
                    UserDB.updateUserFace(email, "", 0);
                    setFace(false);
                    return;
                }
                else {
                    console.log("USER NOT FOUND");
                    return;
                }
            });
        });
    }

    async function addFaceVeri() {
        navigation.navigate("faceVerification");
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
                [{ resize: { width: 160, height: 160 } }]
            );
            
            const reducedResult = await FileSystem.readAsStringAsync(manipResult.uri, { encoding: 'base64' });

            setImage(reducedResult);
            UserDB.updateUserProfilePic(email, reducedResult);
        }

        setModalVisible(false);
    };

    const clearImage = async () => {
        setImage(null);
        UserDB.updateUserProfilePic(email, null);
        setModalVisible(false);
    }

    return (
        <View style={[styles.container, schemeStyle.backgroundColor]}>
            <HeaderBar navigation={navigation} />
            {
                pageLoading == false?
                <View style={{flex: 1, width:Dimensions.get('screen').width, height:Dimensions.get('screen').height }}>
                    <LoadingScreen/>
                </View>
                :
                <View style={{flex: 1}}>
                    <View style={{flex: 1}}>
                        <TouchableHighlight
                            style={{padding: 10}}
                            onPress={() => navigation.navigate('Main')}>
                                <Text style={[schemeStyle.textColor, {fontWeight: "bold"}]}>{t('scenes:profile_index:goBack')}</Text>
                        </TouchableHighlight>

                        <ScrollView showsVerticalScrollIndicator={false} style={[styles.innerContainer, schemeStyle.foregroundColor]} contentInsetAdjustmentBehavior="automatic">
                            <TouchableOpacity
                                style={{alignSelf: "center"}}
                                onPress={() => setModalVisible(true)}>
                                {
                                    image == null?
                                    <Avatar.Text size={160} label={username[0]} />
                                    :
                                    <Avatar.Image size={160} source={{uri: `data:image/jpeg;base64,${image}`}} />
                                }
                            </TouchableOpacity>

                            <Text style={[styles.information, schemeStyle.textColor]}>{t('scenes:profile_index:username')}</Text>
                            <Text style={[styles.details, schemeStyle.textColor, schemeStyle.inputColor]}>{username}</Text>

                            <Text style={[styles.information, schemeStyle.textColor]}>{t('scenes:profile_index:email')}</Text>
                            <Text style={[styles.details, schemeStyle.textColor, schemeStyle.inputColor]}>{email}</Text>

                            {contact != ''? (<View>
                                <Text style={[styles.information, schemeStyle.textColor]}>{t('scenes:profile_index:contact')}</Text>
                                <Text style={[styles.details, schemeStyle.textColor, schemeStyle.inputColor]}>{contact}</Text>
                                </View>)
                                : null }

                            {address != ''? (<View>
                                <Text style={[styles.information, schemeStyle.textColor]}>{t('scenes:profile_index:address')}</Text>
                                <Text style={[styles.details, schemeStyle.textColor, schemeStyle.inputColor]}>{address}</Text>
                                </View>)
                                : null }
                            
                            {face == true? (<View style={styles.row}>
                                <Text style={[styles.information, schemeStyle.textColor]}>{t('scenes:profile_index:faceVerification')}</Text>
                                <Text style={[styles.faceVeriDetails, schemeStyle.textColor]}>{t('scenes:profile_index:faceVerificationYes')}</Text>
                                <TouchableOpacity
                                    style={[styles.faceVeriButton, schemeStyle.primaryScreenButton]}
                                    onPress={() => resetFaceVeri()}
                                    underlayColor='#fff'>
                                    <Text style={[styles.logoutButtonText, schemeStyle.textColor]}>{t('scenes:profile_index:faceVerificationYesButton')}</Text>
                                </TouchableOpacity>
                                </View>)
                                : (<View style={styles.row}>
                                    <Text style={[styles.information, schemeStyle.textColor]}>{t('scenes:profile_index:faceVerification')}</Text>
                                    <Text style={[styles.faceVeriDetails, schemeStyle.textColor]}>{t('scenes:profile_index:faceVerificationNo')}</Text>
                                    <TouchableOpacity
                                        style={[styles.faceVeriButton, schemeStyle.primaryScreenButton]}
                                        onPress={() => addFaceVeri()}
                                        underlayColor='#fff'>
                                        <Text style={[styles.buttonText, schemeStyle.textColor]}>{t('scenes:profile_index:faceVerificationNoButton')}</Text>
                                    </TouchableOpacity>
                                    </View>)
                                    }

                            {
                                password != "None"?
                                <View style={styles.buttonRow}>
                                    <TouchableOpacity
                                        style={[styles.editButton, schemeStyle.primaryScreenButton]}
                                        onPress={() => navigation.navigate("editProfile")}
                                        underlayColor='#fff'>
                                        <Text style={[styles.buttonText, schemeStyle.textColor]}>{t('scenes:profile_index:editProfile')}</Text>
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity
                                        style={[styles.editButton, schemeStyle.primaryScreenButton]}
                                        onPress={() => navigation.navigate("editPassword")}
                                        underlayColor='#fff'>
                                        <Text style={[styles.buttonText, schemeStyle.textColor]}>{t('scenes:profile_index:changePassword')}</Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <TouchableOpacity
                                        style={[styles.editButton, schemeStyle.primaryScreenButton, {width: "80%"}]}
                                        onPress={() => navigation.navigate("editProfile")}
                                        underlayColor='#fff'>
                                        <Text style={[styles.buttonText, schemeStyle.textColor]}>{t('scenes:profile_index:editProfile')}</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                            
                            <SafeAreaView>
                                <TouchableOpacity
                                    style={[styles.logoutButton, schemeStyle.dangerScreenButton]}
                                    onPress={() => logout()}
                                    underlayColor='#fff'>
                                    <Text style={[styles.buttonText, schemeStyle.textColor]}>{t('scenes:profile_index:logout')}</Text>
                                </TouchableOpacity>
                            </SafeAreaView>

                            <View style={[styles.dropdownRow, {justifyContent: "flex-start"}]}>
                                <Text style={[schemeStyle.textColor, {alignSelf: "center", margin: 10}]}>{t('scenes:profile_index:language')}</Text>
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
                        </ScrollView>
                    </View>
                </View>
            }

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
                >
                <View style={styles.centeredView}>
                    <View style={[styles.modalView, schemeStyle.backgroundColor]}>
                        <Text style={[styles.textStyle, schemeStyle.textColor]} onPress={() => takePhoto()}>{t('scenes:profile_index:takePhoto')}</Text>
                        <View
                            style={{
                                borderBottomColor: TEXT_COLOR,
                                borderBottomWidth: StyleSheet.hairlineWidth,
                            }}
                        />
                        <Text style={[styles.textStyle, schemeStyle.textColor]} onPress={() => pickImage()}>{t('scenes:profile_index:gallery')}</Text>
                        <View
                            style={{
                                borderBottomColor: TEXT_COLOR,
                                borderBottomWidth: StyleSheet.hairlineWidth,
                            }}
                        />
                        <Text style={[styles.textStyle, schemeStyle.textColor]} onPress={() => clearImage()}>{t('scenes:profile_index:removePhoto')}</Text>
                        <View
                            style={{
                                borderBottomColor: TEXT_COLOR,
                                borderBottomWidth: StyleSheet.hairlineWidth,
                            }}
                        />
                        <Text style={[styles.textStyle, schemeStyle.textColor]} onPress={() => setModalVisible(!modalVisible)}>{t('scenes:profile_index:cancel')}</Text>
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
                            <Text style={[schemeStyle.textColor, {textAlign: 'right', fontWeight: 'bold', marginBottom: 10, fontSize: 25}]}>X</Text>
                        </TouchableOpacity>

                        <View style={{width: _width, height: _width}}>
                            <Camera style={styles.camera}
                                type={type}
                                ref={setCam}
                                ratio={"1:1"}>
                                <View style={styles.buttonContainer}>
                                    <Image style={{width: _width, height: _width}} source={require("../../assets/images/oval.png")} />
                                </View>
                            </Camera>
                        </View>

                        <TouchableOpacity style={{marginTop: 10, alignSelf: 'center'}} onPress={snapPhoto}>
                            <Image style={{width: 50, height: 50}} source={require("../../assets/images/circle_button.png")} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={tempModal}
                onRequestClose={() => {
                    setTempModal(!tempModal);
                }}
                >
                <View style={styles.centeredView}>
                    <View style={[styles.modalView, schemeStyle.backgroundColor]}>
                        <TouchableOpacity
                            onPress={() => setTempModal(!tempModal)}
                            underlayColor='#fff'>
                            <Text style={[schemeStyle.textColor, {textAlign: 'right', fontWeight: 'bold', fontSize: 25}]}>X</Text>
                        </TouchableOpacity>

                        <Avatar.Image size={_width} source={base64Image} />
                        
                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                style={[styles.editButton, schemeStyle.primaryScreenButton]}
                                onPress={() => retakePhoto()}
                                underlayColor='#fff'>
                                <Text style={[styles.buttonText, schemeStyle.textColor]}>{t('scenes:profile_index:retakePhoto')}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.editButton, schemeStyle.primaryScreenButton]}
                                onPress={() => choosePhoto()}
                                underlayColor='#fff'>
                                <Text style={[styles.buttonText, schemeStyle.textColor]}>{t('scenes:profile_index:choosePhoto')}</Text>
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
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        marginLeft: "5%",
        marginRight: "5%",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: "5%",
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 5
    },
    information: {
        margin: "2%",
    },
    details: {
        width: "100%",
        padding: "2%",
        margin: "2%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5
    },
    logoutButton: {
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: Colors.RED_BUTTON,
        borderRadius: 20,
        width: "100%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5
    },
    buttonText: {
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
    row: {
        flexDirection: "row",
        marginBottom: "5%",
        marginTop: "5%",
        flexWrap: "wrap"
    },
    buttonRow: {
        flexDirection: "row",
        marginBottom: "5%",
        marginTop: "5%",
        flexWrap: "nowrap"
    },
    faceVeriDetails: {
        margin: "2%",
    },
    faceVeriButton: {
        padding: 10,
        width: "40%",
        backgroundColor: Colors.GREEN_BUTTON,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5
    },
    editButton: {
        marginTop: 10,
        marginLeft: "2%",
        marginRight: "2%",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: Colors.GREEN_BUTTON,
        borderRadius: 20,
        width: "46%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5
    },
    dropdownRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
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
    camera: {
        aspectRatio: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignSelf: "center",
    },
});

export default ProfileScreen;