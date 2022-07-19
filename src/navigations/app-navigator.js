import { createDrawerNavigator } from "react-navigation-drawer";

import HomeScreen from '../scenes/home';
import AboutScreen from '../scenes/about';

const TabNavigatorConfig = {
    initialRouteName: 'Home',
    header: null,
    headerMode: 'none',
};

const RouteConfigs = {
    Home: {
        screen: HomeScreen,
    },
    About: {
        screen: AboutScreen,
    },
};

const AppNavigator = createDrawerNavigator(RouteConfigs, TabNavigatorConfig);

export default AppNavigator;