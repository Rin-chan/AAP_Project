import { createDrawerNavigator } from "react-navigation-drawer";

import AboutScreen from '../scenes/about';
import ProfileNavigator from './profile-navigation';
import AlbaInfoNavigator from './albaInfo-navigator';
import EWasteItScreen from '../scenes/games/EWasteIt';
import StepItUpScreen from '../scenes/games/StepItUp';

const TabNavigatorConfig = {
    initialRouteName: 'Home',
    header: null,
    headerMode: 'none',
    unmountInactiveRoutes: true,
};

const RouteConfigs = {
    Home: {
        screen: ProfileNavigator,
    },
    Alba: {
        screen: AlbaInfoNavigator,
        navigationOptions: {
            title: "Information"
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