import React from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    await AsyncStorage.setItem('google', "true");
    await AsyncStorage.setItem('userToken', "123");
    const google = await AsyncStorage.getItem('google');
    const userToken = await AsyncStorage.getItem('userToken');

    if (google == "true") {
      axios.get('https://www.googleapis.com/oauth2/v3/tokeninfo?access_token='+userToken)
        .then(function(response){
            const userDetails = response.data

            if (userDetails.access_type == "online") {
              this.props.navigation.navigate('App');
              return;
            }
      })

      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("google");
      this.props.navigation.navigate('Auth');
      return;
    }

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    return;
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default AuthLoadingScreen;