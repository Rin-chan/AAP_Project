import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableHighlight, View, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';

import { HeaderBar } from "../../components/organisms";
import { Colors } from '../../styles';

const AlbaInfoScreen = ({ navigation }) => {
    const _width = Dimensions.get('screen').width * 0.7;

    return (
        <View style={styles.container}>
            <HeaderBar navigation={navigation}/>

            <SafeAreaView style={{flex:1}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.title}>Introduction of E-Waste</Text>

                    <View style={styles.box}>
                        <Text style={styles.subtitle}>Definition of E-Waste</Text>
                        <Text style={styles.innerText}>E-waste is electrical and electronic waste that include televisions, light bulbs, mobile phones and desktop monitors. While these items can often be refurbished, repaired or recycled, they are usually discarded instead.</Text>
                        <Image 
                            style={{ height: _width, width: _width, resizeMode:"contain", alignSelf:"center" }}
                            source={require("../../assets/images/albaInfo/image1.jpg")} />
                    </View>

                    <View style={styles.box}>
                        <Text style={styles.subtitle}>What are the issuses?</Text>
                        <Text style={styles.innerText}>- E-waste contains harmful substances such as cadmium and lead which could potentially harm one&apos;s health and the environment if mis-handled.</Text>
                        <Text style={styles.innerText}>- When e-waste is disposed of and incinerated, it results in the loss of resources as well as carbon emissions that contribute to global warming and climate change.</Text>
                        <Text style={styles.innerText}>- Recycling our e-waste appropriately decreases the amount of heavy metals &#40;cadmium &amp; lead&#41; in the incineration ash.</Text>
                        <Image 
                            style={{ height: _width, width: _width, resizeMode:"contain", alignSelf:"center" }}
                            source={require("../../assets/images/albaInfo/image2.jpg")} />
                    </View>

                    <View style={styles.box}>
                        <Text style={styles.subtitle}>Statistics &amp; Articles</Text>
                        <Text style={styles.innerText}>- According to the Ministry of Sustainability and the Environment &#40;MSE&#41;, Singapore generates about 60K tonnes of E-waste each year, that is equivalent to 70 mobile phones being discarded by 1 person.</Text>
                        <Text style={styles.innerText}>- An article from The Straits Time states that due to the lack of knowledge in public, 30&#37; of non-regulated electronic waste are found in the E-waste bins which increased the burden and stress to the E-waste collection team and systems as more manpower and resources may be needed to filter out non-regulated E-waste.</Text>
                        <Image 
                            style={{ height: _width, width: _width, resizeMode:"contain", alignSelf:"center" }}
                            source={require("../../assets/images/albaInfo/image3.jpg")} />
                    </View>

                    <View style={styles.box}>
                        <Text style={styles.subtitle}>Ways to reduce e-waste</Text>
                        <Text style={styles.innerText}>1. Buy only what you need.</Text>
                        <Text style={styles.innerText}>2. Repair instead of replace.</Text>
                        <Text style={styles.innerText}>3. Donate unwanted items.</Text>
                        <Text style={styles.innerText}>4. Recycle &#40;at designated place &amp; e-waste bins&#41;.</Text>
                        <Text style={styles.innerText}>- Broken or non-functional e-waste items should be recycled.</Text>
                        <Text style={styles.innerText}>- Recycling allows for heavy materials such as gold, silver, copper and plastics to be recovered and made into new products.</Text>
                        <Text style={styles.innerText}>- A simple act of recycling reduces the amount of new materials being used and our carbon footprint.</Text>
                        <Image 
                            style={{ height: _width, width: _width, resizeMode:"contain", alignSelf:"center" }}
                            source={require("../../assets/images/albaInfo/image4.jpg")} />
                    </View>
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
});

export default AlbaInfoScreen;