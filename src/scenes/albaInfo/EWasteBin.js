import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableHighlight, View, Image, Dimensions, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useDarkMode } from 'react-native-dynamic';

import { HeaderBar } from "../../components/organisms";
import { Colors } from '../../styles';

const AlbaInfoBinScreen = ({ navigation }) => {
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

    return (
        <View style={[styles.container, schemeStyle.backgroundColor]}>
            <HeaderBar navigation={navigation}/>

            <SafeAreaView style={{flex:1}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={[styles.title, schemeStyle.textColor]}>E-Waste Bins</Text>

                    <View style={[styles.box, schemeStyle.boxColor]}>
                        <Text style={[styles.subtitle, schemeStyle.textColor]}>Types of ALBA E-waste bins</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>Click to show more details</Text>

                        <TouchableOpacity
                            onPress={() => setModalVisible1(true)}>
                            <Image 
                                style={{ height: _width, width: _width, resizeMode:"contain", alignSelf:"center" }}
                                source={require("../../assets/images/albaInfo/image17.jpg")} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setModalVisible2(true)}>
                            <Image 
                                style={{ height: _width, width: _width, resizeMode:"contain", alignSelf:"center" }}
                                source={require("../../assets/images/albaInfo/image18.jpg")} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setModalVisible3(true)}>
                            <Image 
                                style={{ height: _width, width: _width, resizeMode:"contain", alignSelf:"center" }}
                                source={require("../../assets/images/albaInfo/image19.jpg")} />
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.box, schemeStyle.boxColor]}>
                        <Text style={[styles.subtitle, schemeStyle.textColor]}>How to use ALBA E-waste bins</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>&#40;with ALBA Step-up App&#41;</Text>

                        <Text style={[styles.innerText, schemeStyle.textColor]}>1. Check whether your e-waste is regulated under ALBA website or ALBA Step-up App.</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>2. Select the type of e-waste to recycle.</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>3. Choose your disposal avenue.</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>4. Input your postal code to find your nearest drop-off location. &#40;or click on “Recycling Points” in ALBA Step-Up App to locate the nearest e-waste bin to you&#41;</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>5. To earn points while recycling, launch the ALBA Step-Up App and scan the QR code on the E-waste bin.</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>6. Take a clear picture of your e-waste before dropping them into the e-waste bin.</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>7. Remove all packaging unless e-waste is damaged.</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>8. For damaged e-waste, put them in a secure container or packaging before disposing.</Text>
                    </View>

                    <View style={[styles.box, schemeStyle.boxColor]}>
                        <Text style={[styles.subtitle, schemeStyle.textColor]}>ALBA E-waste bins&#39; locations</Text>

                        <View style={styles.region}>
                            <Text style={[styles.innerText, schemeStyle.textColor]}>North Region &#40;Approx.56&#41;</Text>
                            <Text style={[styles.indentedText, schemeStyle.textColor]}>• Lower Seletar &#40;7&#41;</Text>
                            <Text style={[styles.indentedText, schemeStyle.textColor]}>• Yishun &#40;17&#41;</Text>
                            <Text style={[styles.indentedText, schemeStyle.textColor]}>• Woodlands &#40;32&#41;</Text>
                        </View>

                        <View style={styles.region}>
                            <Text style={[styles.innerText, schemeStyle.textColor]}>North-east Region &#40;Approx.66&#41;</Text>
                            <Text style={[styles.indentedText, schemeStyle.textColor]}>• Hougang &#40;5&#41;</Text>
                            <Text style={[styles.indentedText, schemeStyle.textColor]}>• Sengkang &#40;9&#41;</Text>
                            <Text style={[styles.indentedText, schemeStyle.textColor]}>• Serangoon &#40;10&#41;</Text>
                            <Text style={[styles.indentedText, schemeStyle.textColor]}>• Punggol &#40;21&#41;</Text>
                            <Text style={[styles.indentedText, schemeStyle.textColor]}>• Ang Mo Kio &#40;21&#41;</Text>
                        </View>

                        <View style={styles.region}>
                            <Text style={[styles.innerText, schemeStyle.textColor]}>East Region &#40;Approx.87&#41;</Text>
                            <Text style={[styles.indentedText, schemeStyle.textColor]}>• Changi Airport &#40;1&#41;</Text>
                            <Text style={[styles.indentedText, schemeStyle.textColor]}>• Changi, Xilin Ave &#40;3&#41;</Text>
                            <Text style={[styles.indentedText, schemeStyle.textColor]}>• Pasir Ris &#40;14&#41;</Text>
                            <Text style={[styles.indentedText, schemeStyle.textColor]}>• Paya Lebar &#40;16&#41;</Text>
                            <Text style={[styles.indentedText, schemeStyle.textColor]}>• Bedok &#40;17&#41;</Text>
                            <Text style={[styles.indentedText, schemeStyle.textColor]}>• Tampines &#40;36&#41;</Text>
                        </View>

                        <View style={styles.region}>
                            <Text style={[styles.innerText, schemeStyle.textColor]}>Central Region &#40;Approx.164&#41;</Text>
                            <Text style={[styles.indentedText, schemeStyle.textColor]}>• Geylang &#40;3&#41;</Text>
                            <Text style={[styles.indentedText, schemeStyle.textColor]}>• Braddell &#40;3&#41;</Text>
                            <Text style={[styles.indentedText, schemeStyle.textColor]}>• Tanglin &#40;6&#41;</Text>
                            <Text style={[styles.indentedText, schemeStyle.textColor]}>• Bukit Timah &#40;7&#41;</Text>
                            <Text style={[styles.indentedText, schemeStyle.textColor]}>• Kallang &#40;15&#41;</Text>
                            <Text style={[styles.indentedText, schemeStyle.textColor]}>• Marine Parade &#40;18&#41;</Text>
                            <Text style={[styles.indentedText, schemeStyle.textColor]}>• Bukit Merah &#40;18&#41;</Text>
                            <Text style={[styles.indentedText, schemeStyle.textColor]}>• Queenstown &#40;22&#41;</Text>
                            <Text style={[styles.indentedText, schemeStyle.textColor]}>• Novena &#40;23&#41;</Text>
                            <Text style={[styles.indentedText, schemeStyle.textColor]}>• Chinatown &#40;49&#41;</Text>
                        </View>

                        <View style={styles.region}>
                            <Text style={[styles.innerText, schemeStyle.textColor]}>West Region &#40;Approx.102&#41;</Text>
                            <Text style={[styles.indentedText, schemeStyle.textColor]}>• Tuas &#40;1&#41;</Text>
                            <Text style={[styles.indentedText, schemeStyle.textColor]}>• Pioneer &#40;1&#41;</Text>
                            <Text style={[styles.indentedText, schemeStyle.textColor]}>• Bukit Batok &#40;2&#41;</Text>
                            <Text style={[styles.indentedText, schemeStyle.textColor]}>• Chua Chu Kang &#40;5&#41;</Text>
                            <Text style={[styles.indentedText, schemeStyle.textColor]}>• Clementi &#40;15&#41;</Text>
                            <Text style={[styles.indentedText, schemeStyle.textColor]}>• Jurong West &#40;18&#41;</Text>
                            <Text style={[styles.indentedText, schemeStyle.textColor]}>• Bukit Panjang &#40;26&#41;</Text>
                            <Text style={[styles.indentedText, schemeStyle.textColor]}>• Jurong East &#40;34&#41;</Text>
                        </View>

                        <Image 
                            style={{ height: _width, width: _width, resizeMode:"contain", alignSelf:"center" }}
                            source={require("../../assets/images/albaInfo/image20.jpg")} />
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
                                <Text style={[styles.modalSubtitle, schemeStyle.textColor]}>ICT, Battery, Bulb Bin &#40;3 in 1 Bin&#41;</Text>

                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>Accepted E-Waste:</Text>
                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- Batteries &#40;AA, AAA, AAAA, D, C, 9-volt, Button Cell only&#41; - circumference ≤ 50mm</Text>
                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- Light Bulbs - circumference ≤ 100mm</Text>
                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- ICT equipment: Printers, power banks, computers &amp; laptops, mobile phones &amp; tablets, network &amp; set-top boxes, TVs &amp; desktop monitors - devices must be able to fit through a 500mm x 250mm slot</Text>
                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- ICT Peripherals such as Mouse, Keyboards, Cables and Adaptors can be disposed together with the main regulated ICT product</Text>

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
                                <Text style={[styles.modalSubtitle, schemeStyle.textColor]}>Batteries &amp; Bulbs Bin</Text>

                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>Accepted E-Waste:</Text>
                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- Bulbs</Text>
                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- Batteries &#40;AA, AAA, AAAA, D, C, 9-volt, and Button Cell only&#41;</Text>

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
                                <Text style={[styles.modalSubtitle, schemeStyle.textColor]}>Batteries Bin</Text>

                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>Accepted E-Waste:</Text>
                                <Text style={[styles.modalInnertext, schemeStyle.textColor]}>- Batteries &#40;AA, AAA, AAAA, D, C, 9-volt, and Button Cell only&#41;</Text>

                                <TouchableOpacity
                                    style={[styles.button, schemeStyle.buttonColor]}
                                    onPress={() => setModalVisible3(!modalVisible3)} >
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
    indentedText: {
        marginLeft: 25,
        padding: 5,
    },
    region: {
        marginTop: 15,
        marginBottom: 15
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

export default AlbaInfoBinScreen;