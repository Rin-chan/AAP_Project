import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableHighlight, View, Image, Dimensions, ScrollView, TouchableOpacity, Modal } from 'react-native';

import { HeaderBar } from "../../components/organisms";
import { Colors } from '../../styles';

const AlbaInfoTypeScreen = ({ navigation }) => {
    const _width = Dimensions.get('screen').width * 0.8;

    const [modalVisible1, setModalVisible1] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisible3, setModalVisible3] = useState(false);
    const [modalVisible4, setModalVisible4] = useState(false);
    const [modalVisible5, setModalVisible5] = useState(false);
    const [modalVisible6, setModalVisible6] = useState(false);
    const [modalVisible7, setModalVisible7] = useState(false);

    return (
        <View style={styles.container}>
            <HeaderBar navigation={navigation}/>


            <SafeAreaView style={{flex:1}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.title}>Types of E-Waste</Text>

                    <View style={styles.box}>
                        <Text style={styles.subtitle}>Regulated E-Waste</Text>
                        <Text style={styles.innerText}>Consumer products generally refer to products largely marketed to, and bought or used for private consumption &#40;e.g. mobile phones and household appliances&#41;, and includes dual-use products that are supplied to both consumers and businesses.</Text>
                        
                        <Text style={styles.subtitle}>Examples of regulated E-Waste</Text>
                        <Text style={styles.innerText}>Click to show more details</Text>

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

                    <View style={styles.box}>
                        <Text style={styles.subtitle}>Non-Regulated E-Waste</Text>
                        <Text style={styles.innerText}>If your E-Waste cannot be found above &#40;regulated e-waste&#41;, it is currently non-regulated under the Extended Producer Responsibility Scheme for E-waste Management.</Text>
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
                            <View style={styles.modalView}>
                                <Text style={styles.modalSubtitle}>Information and Communication Equipment &#40;ICT&#41;</Text>

                                <Text style={styles.modalInnertext}>- Printers &#40;&lt;20kg&#41;</Text>
                                <Text style={styles.modalInnertext}>- Computers &amp; Laptops</Text>
                                <Text style={styles.modalInnertext}>- Mobile phone &amp; Tablets</Text>
                                <Text style={styles.modalInnertext}>- TVs &amp; Desktop Monitors</Text>
                                <Text style={styles.modalInnertext}>- ICT Peripherals &#40;mouse, keyboard, cables and adaptor&#41;</Text>

                                <TouchableOpacity
                                    style={[styles.button]}
                                    onPress={() => setModalVisible1(!modalVisible1)} >
                                    <Text style={styles.textStyle}>Done</Text>
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
                            <View style={styles.modalView}>
                                <Text style={styles.modalSubtitle}>Large Household Appliances</Text>

                                <Text style={styles.modalInnertext}>- Consumer Refrigerators &#40;≤900L&#41;</Text>
                                <Text style={styles.modalInnertext}>- Air-conditioners</Text>
                                <Text style={styles.modalInnertext}>- Washing machines</Text>
                                <Text style={styles.modalInnertext}>- Dryers</Text>
                                <Text style={styles.modalInnertext}>- Televisions</Text>

                                <TouchableOpacity
                                    style={[styles.button]}
                                    onPress={() => setModalVisible2(!modalVisible2)} >
                                    <Text style={styles.textStyle}>Done</Text>
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
                            <View style={styles.modalView}>
                                <Text style={styles.modalSubtitle}>Electric Mobility Device</Text>

                                <Text style={styles.modalInnertext}>- Personal Mobility Device &#40;PMD&#41;</Text>
                                <Text style={styles.modalInnertext}>- Power Assisted Bicycle</Text>
                                <Text style={styles.modalInnertext}>- Electric Mobility Scooter</Text>

                                <TouchableOpacity
                                    style={[styles.button]}
                                    onPress={() => setModalVisible3(!modalVisible3)} >
                                    <Text style={styles.textStyle}>Done</Text>
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
                            <View style={styles.modalView}>
                                <Text style={styles.modalSubtitle}>Household Battery</Text>

                                <Text style={styles.modalInnertext}>- D, C, AA, AAA, AAAA, N, 9-volt, Button Cell</Text>

                                <TouchableOpacity
                                    style={[styles.button]}
                                    onPress={() => setModalVisible4(!modalVisible4)} >
                                    <Text style={styles.textStyle}>Done</Text>
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
                            <View style={styles.modalView}>
                                <Text style={styles.modalSubtitle}>Lithium Ion Portable Battery</Text>

                                <Text style={styles.modalInnertext}>- Powerbank</Text>
                                <Text style={styles.modalInnertext}>- Mobile Telephone Battery &amp; laptop</Text>
                                <Text style={styles.modalInnertext}>- Battery</Text>

                                <TouchableOpacity
                                    style={[styles.button]}
                                    onPress={() => setModalVisible5(!modalVisible5)} >
                                    <Text style={styles.textStyle}>Done</Text>
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
                            <View style={styles.modalView}>
                                <Text style={styles.modalSubtitle}>Consumer Electric Vehicle Battery</Text>

                                <Text style={styles.modalInnertext}>- Lithium-ion</Text>
                                <Text style={styles.modalInnertext}>- Nickel-metal hydride</Text>
                                <Text style={styles.modalInnertext}>- Lead-acid</Text>
                                <Text style={styles.modalInnertext}>- Ultracapacitors</Text>

                                <TouchableOpacity
                                    style={[styles.button]}
                                    onPress={() => setModalVisible6(!modalVisible6)} >
                                    <Text style={styles.textStyle}>Done</Text>
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
                            <View style={styles.modalView}>
                                <Text style={styles.modalSubtitle}>Consumer Lamp</Text>

                                <Text style={styles.modalInnertext}>- Bulb</Text>
                                <Text style={styles.modalInnertext}>- Fluorescent Tube</Text>

                                <TouchableOpacity
                                    style={[styles.button]}
                                    onPress={() => setModalVisible7(!modalVisible7)} >
                                    <Text style={styles.textStyle}>Done</Text>
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
        backgroundColor: Colors.GREY_BACKGROUND
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
        borderWidth: 1,
        backgroundColor: "white"
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
        backgroundColor: Colors.BLUE_BUTTON,
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