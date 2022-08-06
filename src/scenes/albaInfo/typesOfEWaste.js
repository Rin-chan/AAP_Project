import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableHighlight, View, Image, Dimensions, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useDarkMode } from 'react-native-dynamic';

import '../../translations/i18n';
import {useTranslation} from 'react-i18next';

import { HeaderBar } from "../../components/organisms";
import { Colors } from '../../styles';

const AlbaInfoTypeScreen = ({ navigation }) => {
    const {t, i18n} = useTranslation();

    const isDarkMode = useDarkMode();
    var BOX_COLOR = Colors.LIGHT_SECONDARY_BACKGROUND
    var BACKGROUND_COLOR = Colors.LIGHT_THIRD_BACKGROUND
    var TEXT_COLOR = Colors.LIGHT_PRIMARY_TEXT
    var BLUE_BUTTON = Colors.LIGHT_BLUE_BUTTON
    if (isDarkMode) {
        BACKGROUND_COLOR = Colors.DARK_THIRD_BACKGROUND
        BOX_COLOR = Colors.DARK_FOURTH_BACKGROUND
        TEXT_COLOR = Colors.DARK_PRIMARY_TEXT
        BLUE_BUTTON = Colors.DARK_BLUE_BUTTON
    }

    const schemeStyle = StyleSheet.create({
        backgroundColor: {
            backgroundColor: BACKGROUND_COLOR,
        },
        boxColor: {
            backgroundColor: BOX_COLOR,
        },
        textColor: {
            color: TEXT_COLOR,
        },
        buttonColor: {
            backgroundColor: BLUE_BUTTON,
        }
    })

    const _width = Dimensions.get('screen').width * 0.8;

    const [modalVisible1, setModalVisible1] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisible3, setModalVisible3] = useState(false);
    const [modalVisible4, setModalVisible4] = useState(false);
    const [modalVisible5, setModalVisible5] = useState(false);
    const [modalVisible6, setModalVisible6] = useState(false);
    const [modalVisible7, setModalVisible7] = useState(false);

    return (
        <View style={[styles.container, schemeStyle.backgroundColor]}>
            <HeaderBar navigation={navigation}/>


            <SafeAreaView style={{flex:1}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={[styles.title, schemeStyle.textColor]}>{t('scenes:albaInfo_typesOfEWaste:title')}</Text>

                    <View style={[styles.box, schemeStyle.boxColor]}>
                        <Text style={[styles.subtitle, schemeStyle.textColor]}>{t('scenes:albaInfo_typesOfEWaste:subtitle1')}</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>{t('scenes:albaInfo_typesOfEWaste:text1')}</Text>
                        
                        <Text style={[styles.subtitle, schemeStyle.textColor]}>{t('scenes:albaInfo_typesOfEWaste:subtitle2')}</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>{t('scenes:albaInfo_typesOfEWaste:text2')}</Text>

                        <TouchableOpacity
                            onPress={() => setModalVisible1(true)}>
                            <Image 
                                style={{ height: _width, width: _width, resizeMode:"contain", alignSelf:"center" }}
                                source={require("../../assets/images/albaInfo/image5.jpg")} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setModalVisible2(true)}>
                            <Image 
                                style={{ height: _width, width: _width, resizeMode:"contain", alignSelf:"center" }}
                                source={require("../../assets/images/albaInfo/image6.jpg")} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setModalVisible3(true)}>
                            <Image 
                                style={{ height: _width, width: _width, resizeMode:"contain", alignSelf:"center" }}
                                source={require("../../assets/images/albaInfo/image7.jpg")} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setModalVisible4(true)}>
                            <Image 
                                style={{ height: _width, width: _width, resizeMode:"contain", alignSelf:"center" }}
                                source={require("../../assets/images/albaInfo/image8.jpg")} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setModalVisible5(true)}>
                            <Image 
                                style={{ height: _width, width: _width, resizeMode:"contain", alignSelf:"center" }}
                                source={require("../../assets/images/albaInfo/image9.jpg")} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setModalVisible6(true)}>
                            <Image 
                                style={{ height: _width, width: _width, resizeMode:"contain", alignSelf:"center" }}
                                source={require("../../assets/images/albaInfo/image10.jpg")} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setModalVisible7(true)}>
                            <Image 
                                style={{ height: _width, width: _width, resizeMode:"contain", alignSelf:"center" }}
                                source={require("../../assets/images/albaInfo/image11.jpg")} />
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.box, schemeStyle.boxColor]}>
                        <Text style={[styles.subtitle, schemeStyle.textColor]}>{t('scenes:albaInfo_typesOfEWaste:subtitle3')}</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>{t('scenes:albaInfo_typesOfEWaste:text3')}</Text>
                        <Image 
                            style={{ height: _width, width: _width, resizeMode:"contain", alignSelf:"center" }}
                            source={require("../../assets/images/albaInfo/image12.jpg")} />
                    </View>


                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible1}
                        onRequestClose={() => {
                            setModalVisible1(!modalVisible1);
                        }}
                        >
                        <View style={styles.centeredView}>
                            <View style={[styles.modalView, schemeStyle.boxColor]}>
                                <Text style={[styles.modalSubtitle, schemeStyle.textColor]}>{t('scenes:albaInfo_typesOfEWaste:modalSubtitle1')}</Text>

                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- {t('scenes:albaInfo_typesOfEWaste:modalText1')}</Text>
                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- {t('scenes:albaInfo_typesOfEWaste:modalText2')}</Text>
                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- {t('scenes:albaInfo_typesOfEWaste:modalText3')}</Text>
                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- {t('scenes:albaInfo_typesOfEWaste:modalText4')}</Text>
                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- {t('scenes:albaInfo_typesOfEWaste:modalText5')}</Text>

                                <TouchableOpacity
                                    style={[styles.button, schemeStyle.buttonColor]}
                                    onPress={() => setModalVisible1(!modalVisible1)} >
                                    <Text style={[styles.textStyle, schemeStyle.textColor]}>{t('scenes:albaInfo_typesOfEWaste:done')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible2}
                        onRequestClose={() => {
                            setModalVisible2(!modalVisible2);
                        }}
                        >
                        <View style={styles.centeredView}>
                            <View style={[styles.modalView, schemeStyle.boxColor]}>
                                <Text style={[styles.modalSubtitle, schemeStyle.textColor]}>{t('scenes:albaInfo_typesOfEWaste:modalSubtitle2')}</Text>

                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- {t('scenes:albaInfo_typesOfEWaste:modalText6')}</Text>
                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- {t('scenes:albaInfo_typesOfEWaste:modalText7')}</Text>
                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- {t('scenes:albaInfo_typesOfEWaste:modalText8')}</Text>
                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- {t('scenes:albaInfo_typesOfEWaste:modalText9')}</Text>
                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- {t('scenes:albaInfo_typesOfEWaste:modalText10')}</Text>

                                <TouchableOpacity
                                    style={[styles.button, schemeStyle.buttonColor]}
                                    onPress={() => setModalVisible2(!modalVisible2)} >
                                    <Text style={[styles.textStyle, schemeStyle.textColor]}>{t('scenes:albaInfo_typesOfEWaste:done')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible3}
                        onRequestClose={() => {
                            setModalVisible3(!modalVisible3);
                        }}
                        >
                        <View style={styles.centeredView}>
                            <View style={[styles.modalView, schemeStyle.boxColor]}>
                                <Text style={[styles.modalSubtitle, schemeStyle.textColor]}>{t('scenes:albaInfo_typesOfEWaste:modalSubtitle3')}</Text>

                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- {t('scenes:albaInfo_typesOfEWaste:modalText11')}</Text>
                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- {t('scenes:albaInfo_typesOfEWaste:modalText12')}</Text>
                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- {t('scenes:albaInfo_typesOfEWaste:modalText13')}</Text>

                                <TouchableOpacity
                                    style={[styles.button, schemeStyle.buttonColor]}
                                    onPress={() => setModalVisible3(!modalVisible3)} >
                                    <Text style={[styles.textStyle, schemeStyle.textColor]}>{t('scenes:albaInfo_typesOfEWaste:done')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible4}
                        onRequestClose={() => {
                            setModalVisible4(!modalVisible4);
                        }}
                        >
                        <View style={styles.centeredView}>
                            <View style={[styles.modalView, schemeStyle.boxColor]}>
                                <Text style={[styles.modalSubtitle, schemeStyle.textColor]}>{t('scenes:albaInfo_typesOfEWaste:modalSubtitle4')}</Text>

                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- {t('scenes:albaInfo_typesOfEWaste:modalText14')}</Text>

                                <TouchableOpacity
                                    style={[styles.button, schemeStyle.buttonColor]}
                                    onPress={() => setModalVisible4(!modalVisible4)} >
                                    <Text style={[styles.textStyle, schemeStyle.textColor]}>{t('scenes:albaInfo_typesOfEWaste:done')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible5}
                        onRequestClose={() => {
                            setModalVisible5(!modalVisible5);
                        }}
                        >
                        <View style={styles.centeredView}>
                            <View style={[styles.modalView, schemeStyle.boxColor]}>
                                <Text style={[styles.modalSubtitle, schemeStyle.textColor]}>{t('scenes:albaInfo_typesOfEWaste:modalSubtitle5')}</Text>

                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- {t('scenes:albaInfo_typesOfEWaste:modalText15')}</Text>
                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- {t('scenes:albaInfo_typesOfEWaste:modalText16')}</Text>
                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- {t('scenes:albaInfo_typesOfEWaste:modalText17')}</Text>

                                <TouchableOpacity
                                    style={[styles.button, schemeStyle.buttonColor]}
                                    onPress={() => setModalVisible5(!modalVisible5)} >
                                    <Text style={[styles.textStyle, schemeStyle.textColor]}>{t('scenes:albaInfo_typesOfEWaste:done')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible6}
                        onRequestClose={() => {
                            setModalVisible6(!modalVisible6);
                        }}
                        >
                        <View style={styles.centeredView}>
                            <View style={[styles.modalView, schemeStyle.boxColor]}>
                                <Text style={[styles.modalSubtitle, schemeStyle.textColor]}>{t('scenes:albaInfo_typesOfEWaste:modalSubtitle6')}</Text>

                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- {t('scenes:albaInfo_typesOfEWaste:modalText18')}</Text>
                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- {t('scenes:albaInfo_typesOfEWaste:modalText19')}</Text>
                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- {t('scenes:albaInfo_typesOfEWaste:modalText20')}</Text>
                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- {t('scenes:albaInfo_typesOfEWaste:modalText21')}</Text>

                                <TouchableOpacity
                                    style={[styles.button, schemeStyle.buttonColor]}
                                    onPress={() => setModalVisible6(!modalVisible6)} >
                                    <Text style={[styles.textStyle, schemeStyle.textColor]}>{t('scenes:albaInfo_typesOfEWaste:done')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible7}
                        onRequestClose={() => {
                            setModalVisible7(!modalVisible7);
                        }}
                        >
                        <View style={styles.centeredView}>
                            <View style={[styles.modalView, schemeStyle.boxColor]}>
                                <Text style={[styles.modalSubtitle, schemeStyle.textColor]}>{t('scenes:albaInfo_typesOfEWaste:modalSubtitle7')}</Text>

                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- {t('scenes:albaInfo_typesOfEWaste:modalText22')}</Text>
                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- {t('scenes:albaInfo_typesOfEWaste:modalText23')}</Text>

                                <TouchableOpacity
                                    style={[styles.button, schemeStyle.buttonColor]}
                                    onPress={() => setModalVisible7(!modalVisible7)} >
                                    <Text style={[styles.textStyle, schemeStyle.textColor]}>{t('scenes:albaInfo_typesOfEWaste:done')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontWeight: "bold",
        fontSize: 35,
        textAlign: "center",
        margin: 15
    },
    box: {
        margin: 15,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5
    },
    subtitle: {
        fontWeight: "bold",
        fontSize: 15,
        padding: 5,
    },
    innerText: {
        padding: 5,
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
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalSubtitle: {
        fontWeight: "bold",
        fontSize: 15,
        marginBottom: 15,
    },
    modalInnertext: {
        padding: 5,
        marginBottom: 15,
    }
});

export default AlbaInfoTypeScreen;