import { createDrawerNavigator } from "react-navigation-drawer";
import { Appearance } from 'react-native';

import { Colors } from '../styles';
import { CustomDrawer } from '../components/molecules';

import AboutScreen from '../scenes/about';
import ProfileNavigator from './profile-navigation';
import AlbaInfoNavigator from './albaInfo-navigator';
import EWasteItScreen from '../scenes/games/EWasteIt';
import StepItUpScreen from '../scenes/games/StepItUp';
import RedeemListScreen from '../scenes/redeemList';
import ScanQRCodeScreen from '../scenes/scanQRcode';
import DisplayCollectedPointScreen from "../scenes/displayCollectedPoints";
import ItemDescScreen from "../scenes/redeemList/itemDesc";
import RedeemHistoryScreen from "../scenes/redeemHistory";
import RHItemDescScreen from "../scenes/redeemHistory/redeemedItemDesc";

// Language (BACKUP)
import i18n from 'i18next';
var HomeTitle = i18n.t('app_navigator:Home');
var AlbaTitle = i18n.t('app_navigator:Alba');
var EWasteItTitle = i18n.t('app_navigator:EWasteIt');
var StepItUpTitle = i18n.t('app_navigator:StepItUp');
var AboutTitle = i18n.t('app_navigator:About');
var RedeemListTitle = i18n.t('app_navigator:RedeemList');
var ScanQRcodeTitle = i18n.t('app_navigator:ScanQRcode');
var displayCollectedPointsTitle = i18n.t('app_navigator:displayCollectedPoints');

// Backup in case customDrawer.js is not function
const colorScheme = Appearance.getColorScheme();
var BACKGROUND_COLOR = Colors.LIGHT_THIRD_BACKGROUND
var ACTIVE_COLOR = Colors.LIGHT_PRIMARY_TEXT
if (colorScheme === 'dark') {
    BACKGROUND_COLOR = Colors.DARK_FOURTH_BACKGROUND
    ACTIVE_COLOR = Colors.DARK_PRIMARY_TEXT
}

const TabNavigatorConfig = {
    initialRouteName: 'Home',
    header: null,
    headerMode: 'none',
    unmountInactiveRoutes: true,
    drawerBackgroundColor: 'transparent', // Backup
    contentOptions: { // Backup
        activeTintColor: ACTIVE_COLOR,
        activeBackgroundColor: 'transparent',
        inactiveTintColor: ACTIVE_COLOR,
        inactiveBackgroundColor: 'transparent',
    },
    contentComponent: CustomDrawer, // ACTUAL DRAWER
};

const RouteConfigs = {
    Home: {
        screen: ProfileNavigator,
        navigationOptions: {
            title: HomeTitle
        }
    },
    Alba: {
        screen: AlbaInfoNavigator,
        navigationOptions: {
            title: AlbaTitle
        }
    },
    EWasteIt: {
        screen: EWasteItScreen,
        navigationOptions: {
            title: EWasteItTitle
        }
    },
    StepItUp: {
        screen: StepItUpScreen,
        navigationOptions: {
            title: StepItUpTitle
        }
    },
    About: {
        screen: AboutScreen,
        navigationOptions: {
            title: AboutTitle
        }
    },
    RedeemList: {
        screen: RedeemListScreen,
        navigationOptions: {
            title: RedeemListTitle
        }
    },
    ScanQRcode: {
        screen: ScanQRCodeScreen,
        navigationOptions: {
            title: ScanQRcodeTitle
        }
    },
    displayCollectedPoints: {
        screen: DisplayCollectedPointScreen,
        navigationOptions: {
            tabBarVisible: false,
            title: displayCollectedPointsTitle
        }
    },
    ItemDesc: {
        screen: ItemDescScreen,
        tabBarVisible: false,
        navigationOptions: {
            title: "Item Desc"
        }
    },
    RedeemHistory: {
        screen: RedeemHistoryScreen,
        tabBarVisible: false,
        navigationOptions: {
            title: "Redeem History"
        }
    },
    RHItemDesc: {
        screen: RHItemDescScreen,
        tabBarVisible: false,
        navigationOptions: {
            title: "Redeemed Item Desc"
        }
    }

};

const AppNavigator = createDrawerNavigator(RouteConfigs, TabNavigatorConfig);

export default AppNavigator;