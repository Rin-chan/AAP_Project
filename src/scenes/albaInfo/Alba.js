import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableHighlight, View, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { useDarkMode } from 'react-native-dynamic';

import { HeaderBar } from "../../components/organisms";
import { Colors } from '../../styles';

const AlbaInfoWhoScreen = ({ navigation }) => {
    const isDarkMode = useDarkMode();
    var BOX_COLOR = Colors.LIGHT_SECONDARY_BACKGROUND
    var BACKGROUND_COLOR = Colors.LIGHT_THIRD_BACKGROUND
    var TEXT_COLOR = Colors.LIGHT_PRIMARY_TEXT
    if (isDarkMode) {
        BACKGROUND_COLOR = Colors.DARK_THIRD_BACKGROUND
        BOX_COLOR = Colors.DARK_FOURTH_BACKGROUND
        TEXT_COLOR = Colors.DARK_PRIMARY_TEXT
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
    })

    const _width = Dimensions.get('screen').width * 0.8;

    return (
        <View style={[styles.container, schemeStyle.backgroundColor]}>
            <HeaderBar navigation={navigation}/>

            <SafeAreaView style={{flex:1}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={[styles.title, schemeStyle.textColor]}>Introduction of ALBA</Text>

                    <View style={[styles.box, schemeStyle.boxColor]}>
                        <Text style={[styles.subtitle, schemeStyle.textColor]}>Company</Text>

                        <Text style={[styles.innerText, schemeStyle.textColor]}>- The ALBA Group, formed in 1968, has a demonstrated track record in operating Producer Responsibility Schemes in countries such as Germany and Hong Kong. With its local presence and technology expertise, the ALBA Group has been appointed by NEA to be the Public Waste Collector for the Jurong Sector since 1 April 2020, and E-Waste PRS operator for Singapore since 1 July 2021.</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>- E-Waste will be channelled through ALBA E-Waste sorting &amp; logistics hub for weighing and categorisation, before being sent to licensed E-Waste recyclers for recycling. Raw materials are then recovered and channelled back into production, thus creating a circular value chain and enabling minimal environmental impact.</Text>
                        
                        <Image 
                            style={{ height: _width, width: _width, resizeMode:"contain", alignSelf:"center" }}
                            source={require("../../assets/images/albaInfo/image13.jpg")} />
                    </View>

                    <View style={[styles.box, schemeStyle.boxColor]}>
                        <Text style={[styles.subtitle, schemeStyle.textColor]}>ALBA Step-up App</Text>

                        <Text style={[styles.innerText, schemeStyle.textColor]}>- ALBA Step-Up app was introduced to encourage Singaporeans to recycle more by having a point system that will be earned everytime users recycle and scan the QR Code.</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>- Points can be exchanged for vouchers of different companies</Text>
                        
                        <Text style={[styles.innerText, schemeStyle.textColor]}>- Additional things which they added includes</Text>
                        <Text style={[styles.indentedText, schemeStyle.textColor]}>• A form that allows users to request for removal of bulky e-waste &#40;such as Fridge, TV, Washing Machine, etc…&#41;</Text>
                        <Text style={[styles.indentedText, schemeStyle.textColor]}>• Tips and instructions &#40;Not in the app, but will lead to their website&#41;</Text>
                        <Text style={[styles.indentedText, schemeStyle.textColor]}>• Tracking system for recycling habits</Text>
                        <Text style={[styles.indentedText, schemeStyle.textColor]}>• Event calendar for ALBA events</Text>

                        <Image 
                            style={{ height: _width, width: _width, resizeMode:"contain", alignSelf:"center" }}
                            source={require("../../assets/images/albaInfo/image14.png")} />
                    </View>

                    <View style={[styles.box, schemeStyle.boxColor]}>
                        <Text style={[styles.subtitle, schemeStyle.textColor]}>Points System &amp; Features</Text>

                        <Text style={[styles.innerText, schemeStyle.textColor]}>- Every time users recycle through any of ALBA E-Waste&apos;s collection channels, they will be rewarded with points on the app, which can then be used to exchanged for discounts and deals with our partners.</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>- With this, ALBA E-Waste aims to encourage the habit of recycling in Singapore, thus enabling a robust circular economy.</Text>
                        
                        <Text style={[styles.innerText, schemeStyle.textColor]}>- How to redeem points</Text>
                        <Text style={[styles.indentedText, schemeStyle.textColor]}>a. Check that all items being recycled is clean</Text>
                        <Text style={[styles.indentedText, schemeStyle.textColor]}>b. Using the Step-Up app, use the QR Code scanner in the app to scan the QR Code on the E-Waste bin</Text>
                        <Text style={[styles.indentedText, schemeStyle.textColor]}>c. Take a clear snapshot of the recyclables as a confirmation before throwing in the bin</Text>
                        <Text style={[styles.indentedText, schemeStyle.textColor]}>d. Claim points that can be exchanged for vouchers</Text>

                        <Text style={[styles.innerText, schemeStyle.textColor]}>- Following are the companies that are participating in the points &#40;As of 17 June 2022&#41;</Text>
                        <Text style={[styles.indentedText, schemeStyle.textColor]}>• Anywheel &#40;Bike Rental App&#41; &#40;Can be used to claim credit when renting bicycles&#41;</Text>
                        <Text style={[styles.indentedText, schemeStyle.textColor]}>• EZ-Link &#40;App, not card&#41; &#40;Exchange for credit that can be used for paying for things that can be paid for via EZ-Link&#41;;</Text>
                        <Text style={[styles.indentedText, schemeStyle.textColor]}>• Stojo &#40;Environmentally friendly cup company&#41; &#40;Can be exchanged for vouchers for their shop&#41;</Text>
                        <Text style={[styles.indentedText, schemeStyle.textColor]}>• Crunch Cutlery &#40;Edible Cutlery Company&#41; &#40;Can be exchanged for % off their product from their stores&#41;</Text>
                        <Text style={[styles.indentedText, schemeStyle.textColor]}>• Ecofrenli &#40;Sustainable Marketplace that sells many household and lifestyle stuff&#41; &#40;Can be used for credit that can be used in their store&#41;</Text>
                        <Text style={[styles.indentedText, schemeStyle.textColor]}>• Urban Origins &#40;Food Marketplace that sells foods from “Urban Producers”&#41; &#40;Can be used for % off their products&#41;</Text>
                        <Text style={[styles.indentedText, schemeStyle.textColor]}>• Colour Me Mats &#40;Activity class for children to create homemade mats of their designs&#41; &#40;Can be used for % off of sessions&#41;</Text>

                        <Image 
                            style={{ height: _width, width: _width, resizeMode:"contain", alignSelf:"center" }}
                            source={require("../../assets/images/albaInfo/image15.jpg")} />
                    </View>

                    <View style={[styles.box, schemeStyle.boxColor]}>
                        <Text style={[styles.subtitle, schemeStyle.textColor]}>Issues and limitations &#40;For comparison with SIT Apps&#41;</Text>

                        <Text style={[styles.innerText, schemeStyle.textColor]}>- Feel that the sponsors in the Step-Up programme is limited and not as appealing.</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>- Filling up forms for removal of bulky e-waste items is tedious</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>- Point system did not state clearly when the vouchers expire</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>- Buggy sign-up process &#40;lagging, app crashing etc.&#41;</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>- Layout of certain things &#40;such as E-waste tips&#41; are not categorised well and eventually is messy.</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>- Not interactive, which may affect encouragement for some users to use it.</Text>
                        <Text style={[styles.innerText, schemeStyle.textColor]}>- Limited functionality &#40;e.g. no map to show where the e-waste bins are located at&#41;.</Text>

                        <Image 
                            style={{ height: _width, width: _width, resizeMode:"contain", alignSelf:"center" }}
                            source={require("../../assets/images/albaInfo/image16.jpg")} />
                    </View>
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
    }
});

export default AlbaInfoWhoScreen;