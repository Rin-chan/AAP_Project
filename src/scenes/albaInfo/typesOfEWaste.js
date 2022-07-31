import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableHighlight, View, Image, Dimensions, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useDarkMode } from 'react-native-dynamic';

import { HeaderBar } from "../../components/organisms";
import { Colors } from '../../styles';

const AlbaInfoTypeScreen = ({ navigation }) => {
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
                    <Text style={[styles.title, schemeStyle.textColor]}>Types of E-Waste</Text>

                    <View style={[styles.box, schemeStyle.boxColor]}>
                        <Text style={[styles.subtitle, schemeStyle.textColor]}>Regulated E-Waste</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>Consumer products generally refer to products largely marketed to, and bought or used for private consumption &#40;e.g. mobile phones and household appliances&#41;, and includes dual-use products that are supplied to both consumers and businesses.</Text>
                        
                        <Text style={[styles.subtitle, schemeStyle.textColor]}>Examples of regulated E-Waste</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>Click to show more details</Text>

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
                        <Text style={[styles.subtitle, schemeStyle.textColor]}>Non-Regulated E-Waste</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>If your E-Waste cannot be found above &#40;regulated e-waste&#41;, it is currently non-regulated under the Extended Producer Responsibility Scheme for E-waste Management.</Text>
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
                                <Text style={[styles.modalSubtitle, schemeStyle.textColor]}>Information and Communication Equipment &#40;ICT&#41;</Text>

                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- Printers &#40;&lt;20kg&#41;</Text>
                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- Computers &amp; Laptops</Text>
                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- Mobile phone &amp; Tablets</Text>
                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- TVs &amp; Desktop Monitors</Text>
                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- ICT Peripherals &#40;mouse, keyboard, cables and adaptor&#41;</Text>

                                <TouchableOpacity
                                    style={[styles.button, schemeStyle.buttonColor]}
                                    onPress={() => setModalVisible1(!modalVisible1)} >
                                    <Text style={[styles.textStyle, schemeStyle.textColor]}>Done</Text>
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
                                <Text style={[styles.modalSubtitle, schemeStyle.textColor]}>Large Household Appliances</Text>

                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- Consumer Refrigerators &#40;≤900L&#41;</Text>
                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- Air-conditioners</Text>
                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- Washing machines</Text>
                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- Dryers</Text>
                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- Televisions</Text>

                                <TouchableOpacity
                                    style={[styles.button, schemeStyle.buttonColor]}
                                    onPress={() => setModalVisible2(!modalVisible2)} >
                                    <Text style={[styles.textStyle, schemeStyle.textColor]}>Done</Text>
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
                                <Text style={[styles.modalSubtitle, schemeStyle.textColor]}>Electric Mobility Device</Text>

                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- Personal Mobility Device &#40;PMD&#41;</Text>
                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- Power Assisted Bicycle</Text>
                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- Electric Mobility Scooter</Text>

                                <TouchableOpacity
                                    style={[styles.button, schemeStyle.buttonColor]}
                                    onPress={() => setModalVisible3(!modalVisible3)} >
                                    <Text style={[styles.textStyle, schemeStyle.textColor]}>Done</Text>
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
                                <Text style={[styles.modalSubtitle, schemeStyle.textColor]}>Household Battery</Text>

                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- D, C, AA, AAA, AAAA, N, 9-volt, Button Cell</Text>

                                <TouchableOpacity
                                    style={[styles.button, schemeStyle.buttonColor]}
                                    onPress={() => setModalVisible4(!modalVisible4)} >
                                    <Text style={[styles.textStyle, schemeStyle.textColor]}>Done</Text>
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
                                <Text style={[styles.modalSubtitle, schemeStyle.textColor]}>Lithium Ion Portable Battery</Text>

                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- Powerbank</Text>
                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- Mobile Telephone Battery &amp; laptop</Text>
                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- Battery</Text>

                                <TouchableOpacity
                                    style={[styles.button, schemeStyle.buttonColor]}
                                    onPress={() => setModalVisible5(!modalVisible5)} >
                                    <Text style={[styles.textStyle, schemeStyle.textColor]}>Done</Text>
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
                                <Text style={[styles.modalSubtitle, schemeStyle.textColor]}>Consumer Electric Vehicle Battery</Text>

                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- Lithium-ion</Text>
                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- Nickel-metal hydride</Text>
                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- Lead-acid</Text>
                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- Ultracapacitors</Text>

                                <TouchableOpacity
                                    style={[styles.button, schemeStyle.buttonColor]}
                                    onPress={() => setModalVisible6(!modalVisible6)} >
                                    <Text style={[styles.textStyle, schemeStyle.textColor]}>Done</Text>
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
                                <Text style={[styles.modalSubtitle, schemeStyle.textColor]}>Consumer Lamp</Text>

                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- Bulb</Text>
                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- Fluorescent Tube</Text>

                                <TouchableOpacity
                                    style={[styles.button, schemeStyle.buttonColor]}
                                    onPress={() => setModalVisible7(!modalVisible7)} >
                                    <Text style={[styles.textStyle, schemeStyle.textColor]}>Done</Text>
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