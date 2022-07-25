import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Appearance } from 'react-native';

import { Colors } from '../styles';

import AlbaInfoScreen from '../scenes/albaInfo';
import AlbaInfoTypeScreen from '../scenes/albaInfo/typesOfEWaste';
import AlbaInfoWhoScreen from '../scenes/albaInfo/Alba';
import AlbaInfoBinScreen from '../scenes/albaInfo/EWasteBin';

const colorScheme = Appearance.getColorScheme();
var BACKGROUND_COLOR = Colors.LIGHT_SECONDARY_BACKGROUND
var ACTIVE_COLOR = Colors.DARK_PRIMARY_BUTTON
var INACTIVE_COLOR = Colors.LIGHT_PRIMARY_TEXT
var ICON_COLOR = "#000000"
if (colorScheme === 'dark') {
    BACKGROUND_COLOR = Colors.DARK_SECONDARY_BACKGROUND
    ACTIVE_COLOR = Colors.LIGHT_PRIMARY_BUTTON
    INACTIVE_COLOR = Colors.DARK_PRIMARY_TEXT
    ICON_COLOR = '#FFFFFF'
}

const AuthNavigatorConfig = {
    initialRouteName: 'AlbaInformation',
    header: null,
    headerMode: 'none',
    tabBarOptions: {
        activeTintColor: ACTIVE_COLOR,
        inactiveTintColor: INACTIVE_COLOR,
        activeBackgroundColor: BACKGROUND_COLOR,
        inactiveBackgroundColor: BACKGROUND_COLOR,
        style: {
            backgroundColor: BACKGROUND_COLOR,
            borderTopWidth: 0,
        }
    }
};

const RouteConfigs = {
    AlbaInformation: {
        screen: AlbaInfoScreen,
        navigationOptions: {
            tabBarLabel:"Information",
            tabBarIcon: ({ tintColor }) => (
                <Icon name="info" size={30} color={ICON_COLOR} />
            )
        }
    },
    AlbaInfoType: {
        screen: AlbaInfoTypeScreen,
        navigationOptions: {
            tabBarLabel:"Types of E-Waste",
            tabBarIcon: ({ tintColor }) => (
                <Icon name="laptop" size={30} color={ICON_COLOR} />
            )
        }
    },
    AlbaInfoWho: {
        screen: AlbaInfoWhoScreen,
        navigationOptions: {
            tabBarLabel:"ALBA",
            tabBarIcon: ({ tintColor }) => (
                <Icon name="envira" size={30} color={ICON_COLOR} />
            )
        }
    },
    AlbaInfoBinScreen: {
        screen: AlbaInfoBinScreen,
        navigationOptions: {
            tabBarLabel:"E-Waste Bin",
            tabBarIcon: ({ tintColor }) => (
                <Icon name="dumpster" size={30} color={ICON_COLOR} />
            )
        }
    }
};

const AlbaInfoNavigator = createBottomTabNavigator(RouteConfigs, AuthNavigatorConfig);

export default AlbaInfoNavigator;