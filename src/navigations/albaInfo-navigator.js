import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import AlbaInfoScreen from '../scenes/albaInfo';
import AlbaInfoTypeScreen from '../scenes/albaInfo/typesOfEWaste';
import AlbaInfoWhoScreen from '../scenes/albaInfo/Alba';
import AlbaInfoBinScreen from '../scenes/albaInfo/EWasteBin';

const AuthNavigatorConfig = {
    initialRouteName: 'AlbaInformation',
    header: null,
    headerMode: 'none',
};

const RouteConfigs = {
    AlbaInformation: {
        screen: AlbaInfoScreen,
        navigationOptions: {
            tabBarLabel:"Information",
            tabBarIcon: ({ tintColor }) => (
                <Icon name="info" size={30} color="#000" />
            )
        }
    },
    AlbaInfoType: {
        screen: AlbaInfoTypeScreen,
        navigationOptions: {
            tabBarLabel:"Types of E-Waste",
            tabBarIcon: ({ tintColor }) => (
                <Icon name="laptop" size={30} color="#000" />
            )
        }
    },
    AlbaInfoWho: {
        screen: AlbaInfoWhoScreen,
        navigationOptions: {
            tabBarLabel:"ALBA",
            tabBarIcon: ({ tintColor }) => (
                <Icon name="envira" size={30} color="#000" />
            )
        }
    },
    AlbaInfoBinScreen: {
        screen: AlbaInfoBinScreen,
        navigationOptions: {
            tabBarLabel:"E-Waste Bin",
            tabBarIcon: ({ tintColor }) => (
                <Icon name="dumpster" size={30} color="#000" />
            )
        }
    }
};

const AlbaInfoNavigator = createBottomTabNavigator(RouteConfigs, AuthNavigatorConfig);

export default AlbaInfoNavigator;