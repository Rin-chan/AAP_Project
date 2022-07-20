import { createDrawerNavigator } from "react-navigation-drawer";

import AboutScreen from '../scenes/about';
import ProfileNavigator from './profile-navigation';

const TabNavigatorConfig = {
    initialRouteName: 'Home',
    header: null,
    headerMode: 'none',
};

const RouteConfigs = {
    Home: {
        screen: ProfileNavigator,
    },
    About: {
        screen: AboutScreen,
    },
};

const AppNavigator = createDrawerNavigator(RouteConfigs, TabNavigatorConfig);

export default AppNavigator;