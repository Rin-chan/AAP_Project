import { createSwitchNavigator } from 'react-navigation';

import HomeScreen from '../scenes/home';
import ProfileScreen from '../scenes/profile';
import editProfileScreen from '../scenes/profile/editProfile';
import editPasswordScreen from '../scenes/profile/editPassword';
import faceVerificationScreen from '../scenes/profile/faceVerification';

const TabNavigatorConfig = {
    initialRouteName: 'Main',
    header: null,
    headerMode: 'none',
};

const RouteConfigs = {
    Main: {
        screen: HomeScreen,
    },
    Profile: {
        screen: ProfileScreen,
    },
    editProfile: {
        screen: editProfileScreen,
    },
    editPassword: {
        screen: editPasswordScreen,
    },
    faceVerification: {
        screen: faceVerificationScreen,
    }
};

const ProfileNavigator = createSwitchNavigator(RouteConfigs, TabNavigatorConfig);

export default ProfileNavigator;