import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableHighlight, View, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { useDarkMode } from 'react-native-dynamic';

import { HeaderBar } from "../../components/organisms";
import { Colors } from '../../styles';

const RedeemListScreen = ({ navigation }) => {
    const isDarkMode = useDarkMode();
    var BACKGROUND_COLOR = Colors.LIGHT_THIRD_BACKGROUND
    var TEXT_COLOR = Colors.LIGHT_PRIMARY_TEXT
    var BOX_COLOR = Colors.LIGHT_SECONDARY_BACKGROUND
    if (isDarkMode) {
        BACKGROUND_COLOR = Colors.DARK_FOURTH_BACKGROUND
        TEXT_COLOR = Colors.DARK_PRIMARY_TEXT
    }

    const schemeStyle = StyleSheet.create({
        backgroundColor: {
            backgroundColor: BACKGROUND_COLOR,
        },
        textColor: {
            color: TEXT_COLOR,
        },
        boxColor: {
            backgroundColor: BOX_COLOR,
        }
    })

    const _imgwidth = Dimensions.get('screen').width * 0.1;
    const _width = Dimensions.get('screen').width * 0.2;

    const [username, setUsername] = useState("");
    const [points, setPoints] = useState(0);

    const [request, setRequest] = useState(false);

    return(
        <View style={[styles.container, schemeStyle.backgroundColor]}>
            <HeaderBar navigation={navigation}/>
            
            {/* Page Content */}
            <SafeAreaView style={{flex:1}}>
                 {/* h1 - You have xxx points */}
                <View style={styles.row}>
                    <Text style={[styles.h1, schemeStyle.textColor]}>You have 0 C02 Points! :D  
                        <Image
                            style={{ height: _imgwidth, width: _imgwidth, paddingLeft:10}}
                            source={require("../../assets/images/favicon.png")} />
                    </Text>
                </View>

                {/* h2 - Reward list */}
                <Text style={[styles.h2, schemeStyle.textColor]}>Reward list</Text>

                {/* tab bar */}
                <ScrollView horizontal={true} style={[styles.tabContainer, schemeStyle.foregroundColor]}>
                    <View style={styles.row}>
                        <TouchableHighlight
                            style={[styles.tabs]}
                            onPress={() => navigation.navigate('RedeemList')}>
                            <Text style={[schemeStyle.textColor, styles.productTitle]}>All</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={[styles.tabs]}
                            onPress={() => navigation.navigate('RedeemList')}>
                            <Text style={[schemeStyle.textColor, styles.productTitle]}>Food</Text>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
                

                {/* List of Rewards */}
                <ScrollView showsVerticalScrollIndicator={false} style={[styles.innerContainer, schemeStyle.foregroundColor]}>
                    <View style={styles.row}>
                            <TouchableHighlight
                                style={[styles.outterBox, schemeStyle.boxColor]}
                                onPress={() => navigation.navigate('RedeemList')}>
                                <View style={styles.row}>
                                    <View style={{backgroundColor:'yellow', width:'30%'}}>
                                        <Image
                                            style={{ height: _width, width: '80%', margin:0, marginLeft:'10%', backgroundColor:'blue'}}
                                            source={require("../../assets/images/favicon.png")} />
                                    </View >
                                    <View style={{backgroundColor:'green', width:'60%'}}>
                                        <Text style={[schemeStyle.textColor, styles.productTitle]}>Reward Name</Text>
                                        <Text style={[schemeStyle.textColor]}>20 CO2 Points</Text>
                                    </View>
                                    
                                </View>
                            </TouchableHighlight>
                        {/* </View> */}
                    </View>
                </ScrollView>

                

            </SafeAreaView>
        </View>
            
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    innerContainer: {
        padding: 10,
        height: '69%'
    },
    tabContainer: {
        padding: 0,
        margin:0,
        paddingLeft: 10,   
    },
    h1: {
        fontWeight: "bold",
        fontSize: 35,
        textAlign: "center",
        margin: 15
    },
    h2: {
        fontWeight: "bold",
        fontSize: 20,
        paddingLeft: '5%',
        backgroundColor: '#949292'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        // alignItems: 'center'
    },
    outterBox: {
        marginTop: 0,
        margin: 30,
        padding: "4%",
        width: '95%',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 10,
        overflow: 'hidden', 
        marginBottom: '5%'
    },
    
    productTitle: {
        fontWeight: "bold",
        fontSize: 20,
    },

    tabs: {
        width: 100,
        height: 40,
        borderRadius: 10,
        fontSize: 15,
        paddingLeft: 20,
        paddingRight: 20,
        padding: 0,
        marginTop: 15,
        marginRight: 5,
        textAlign: "center",
        backgroundColor: 'green',
    }
    

});

export default RedeemListScreen;