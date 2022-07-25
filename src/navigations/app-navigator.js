import { createDrawerNavigator } from "react-navigation-drawer";
import { Appearance } from 'react-native';

import { Colors } from '../styles';

import AboutScreen from '../scenes/about';
import ProfileNavigator from './profile-navigation';
import AlbaInfoNavigator from './albaInfo-navigator';
import EWasteItScreen from '../scenes/games/EWasteIt';
import StepItUpScreen from '../scenes/games/StepItUp';

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
    drawerBackgroundColor: BACKGROUND_COLOR,
    contentOptions: {
        activeTintColor: ACTIVE_COLOR,
        activeBackgroundColor: 'transparent',
        inactiveTintColor: ACTIVE_COLOR,
        inactiveBackgroundColor: 'transparent',
    },
};

const RouteConfigs = {
    Home: {
        screen: ProfileNavigator,
    },
    Alba: {
        screen: AlbaInfoNavigator,
        navigationOptions: {
            title: "Information",
        }
    },
    EWasteIt: {
        screen: EWasteItScreen,
        navigationOptions: {
            title: "E-Waste It! Game"
        }
    },
    StepItUp: {
        screen: StepItUpScreen,
        navigationOptions: {
            title: "Step It Up Game"
        }
    },
    About: {
        screen: AboutScreen,
    },
};

const AppNavigator = createDrawerNavigator(RouteConfigs, TabNavigatorConfig);

export default AppNavigator;