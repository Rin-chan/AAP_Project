import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Appearance } from 'react-native';

// Language (BACKUP)
import i18n from 'i18next';
var AlbaInformationTitle = i18n.t('albaInfo_navigator:AlbaInformation');
var AlbaInfoTypeTitle = i18n.t('albaInfo_navigator:AlbaInfoType');
var AlbaInfoWhoTitle = i18n.t('albaInfo_navigator:AlbaInfoWho');
var AlbaInfoBinTitle = i18n.t('albaInfo_navigator:AlbaInfoBin');


import { Colors } from '../styles';
import { AlbaCustomTab } from '../components/molecules';

import AlbaInfoScreen from '../scenes/albaInfo';
import AlbaInfoTypeScreen from '../scenes/albaInfo/typesOfEWaste';
import AlbaInfoWhoScreen from '../scenes/albaInfo/Alba';
import AlbaInfoBinScreen from '../scenes/albaInfo/EWasteBin';

// BACKUP
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
    tabBarOptions: { // BACKUP
        activeTintColor: ACTIVE_COLOR,
        inactiveTintColor: INACTIVE_COLOR,
        activeBackgroundColor: BACKGROUND_COLOR,
        inactiveBackgroundColor: BACKGROUND_COLOR,
        style: {
            backgroundColor: BACKGROUND_COLOR,
            borderTopWidth: 0,
        }
    },
    tabBarComponent: AlbaCustomTab, // ACTUAL BAR
};

const RouteConfigs = {
    AlbaInformation: {
        screen: AlbaInfoScreen,
        navigationOptions: {
            tabBarLabel: AlbaInformationTitle,
            tabBarIcon: ({ tintColor }) => (
                <Icon name="info" size={30} color={ICON_COLOR} />
            )
        }
    },
    AlbaInfoType: {
        screen: AlbaInfoTypeScreen,
        navigationOptions: {
            tabBarLabel: AlbaInfoTypeTitle,
            tabBarIcon: ({ tintColor }) => (
                <Icon name="laptop" size={30} color={ICON_COLOR} />
            )
        }
    },
    AlbaInfoWho: {
        screen: AlbaInfoWhoScreen,
        navigationOptions: {
            tabBarLabel: AlbaInfoWhoTitle,
            tabBarIcon: ({ tintColor }) => (
                <Icon name="envira" size={30} color={ICON_COLOR} />
            )
        }
    },
    AlbaInfoBinScreen: {
        screen: AlbaInfoBinScreen,
        navigationOptions: {
            tabBarLabel: AlbaInfoBinTitle,
            tabBarIcon: ({ tintColor }) => (
                <Icon name="dumpster" size={30} color={ICON_COLOR} />
            )
        }
    }
};

const AlbaInfoNavigator = createBottomTabNavigator(RouteConfigs, AuthNavigatorConfig);

export default AlbaInfoNavigator;