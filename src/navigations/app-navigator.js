import { createDrawerNavigator } from "react-navigation-drawer";

import AboutScreen from '../scenes/about';
import ProfileNavigator from './profile-navigation';
import AlbaInfoNavigator from './albaInfo-navigator';

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
    About: {
        screen: AboutScreen,
    },
};

const AppNavigator = createDrawerNavigator(RouteConfigs, TabNavigatorConfig);

export default AppNavigator;