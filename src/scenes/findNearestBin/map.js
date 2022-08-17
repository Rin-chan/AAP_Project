import React, {useState, useEffect} from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, TextInput, View, Dimensions, TouchableHighlight } from 'react-native';
import { useDarkMode } from 'react-native-dynamic';
import * as Location from 'expo-location';
import MapView, { Marker, Polyline } from 'react-native-maps';
var openrouteservice = require("openrouteservice-js");

import '../../translations/i18n';
import {useTranslation} from 'react-i18next';

import { HeaderBar, LoadingScreen } from "../../components/organisms";
import { Colors } from '../../styles';

import flaskServer from '../../../settings.json'
import apiKey from '../../../secrets.json'

const findNearestBinMapScreen = ({ navigation }) => {
    const {t, i18n} = useTranslation();

    const isDarkMode = useDarkMode();
    var BACKGROUND_COLOR = Colors.LIGHT_SECONDARY_BACKGROUND
    var TEXT_COLOR = Colors.LIGHT_PRIMARY_TEXT
    var BUTTON_COLOR = Colors.LIGHT_GREEN_BUTTON
    if (isDarkMode) {
        BACKGROUND_COLOR = Colors.DARK_THIRD_BACKGROUND
        TEXT_COLOR = Colors.DARK_PRIMARY_TEXT
        BUTTON_COLOR = Colors.DARK_GREEN_BUTTON
    }

    const schemeStyle = StyleSheet.create({
        backgroundColor: {
            backgroundColor: BACKGROUND_COLOR,
        },
        textColor: {
            color: TEXT_COLOR,
        },
        doneScreenButton: {
            backgroundColor: BUTTON_COLOR
        },
    })

    const [start, setStart] = useState({longitude: 1.3521, latitude: 103.8198});
    const [end, setEnd] = useState(Array);

    useEffect(() => {
        (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        if (rendered == false) {
            await Location.getCurrentPositionAsync({}).then(location => {
                setStart(location.coords);
                getPath(location.coords);
            });
        }

        })();
    }, []);

    var Directions = new openrouteservice.Directions({ api_key: apiKey.ORSKey});

    const [rendered, setRendered] = useState(false);
    const [coords, setCoords] = useState(Array);

    const _width = Dimensions.get('screen').width * 0.8;
    const _height = Dimensions.get('screen').height * 0.5;

    const getPath = async (location) => {
        fetch(`http://${flaskServer.flaskServer}/nearestBin`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ longitude: JSON.stringify(location.longitude), latitude: JSON.stringify(location.latitude) })
        })
        .then(response => response.json())
        .then(data => {
            var dataList = new Array
            data.coords.forEach(element => {
                dataList.push(element)
            });

            setEnd(dataList[1])

            Directions.calculate({
                coordinates: dataList,
                profile: 'driving-car',
                format: 'geojson'
            })
            .then(function(geojson) {
                var PolyLine = geojson.features[0].geometry.coordinates.map(c => ({latitude: c[1], longitude: c[0]}));
                setRendered(true);
                setCoords(PolyLine);
            })
            .catch(function(err) {
                var str = "An error occurred: " + err;
                console.log(str);
            });
        })
        .catch(err => console.error(err));
    }

    return (
        <View style={[schemeStyle.backgroundColor, {flex: 1}]}>
            <HeaderBar navigation={navigation}/>
            {
                rendered == false?
                <View style={{ flex: 1, width: Dimensions.get('screen').width, height: Dimensions.get('screen').height }}>
                    <LoadingScreen />
                </View>
                :
                <View style={{ flex: 1 }}>
                    <TouchableHighlight
                        style={{padding: 10}}
                        onPress={() => navigation.navigate('findNearestBin')}>
                            <Text style={[schemeStyle.textColor, {fontWeight: "bold"}]}>{t('scenes:findNearestBin_map:goBack')}</Text>
                    </TouchableHighlight>

                    <SafeAreaView style={styles.container}>
                        <Text style={[styles.title, schemeStyle.textColor]}>{t('scenes:findNearestBin_map:locate')}</Text>

                        <MapView
                            style={{height: _height, width: _width}}
                            region={{
                                latitude: start.latitude,
                                longitude: start.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.07,
                            }}>
            
                            <Marker
                                coordinate={{latitude: start.latitude, longitude: start.longitude}}
                                key={0}
                                title={"Start"}
                            />
                            <Marker
                                coordinate={{latitude: end[1], longitude: end[0]}}
                                key={1}
                                title={"Bin"}
                            />

                            <Polyline
                                coordinates={coords.map(c => ({latitude: c.latitude, longitude: c.longitude}))}
                                strokeColor="#000"
                                strokeWidth={6}
                            />

                        </MapView>

                        <TouchableOpacity style={[styles.doneScreenButton, schemeStyle.doneScreenButton]} onPress={() => navigation.navigate('Main')}>
                            <Text style={[styles.buttonText, schemeStyle.textColor]}>{t('scenes:findNearestBin_map:done')}</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 20,
        flex: 1,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 20
    },
    doneScreenButton: {
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
        elevation: 5
    },
    buttonText: {
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
});

export default findNearestBinMapScreen;