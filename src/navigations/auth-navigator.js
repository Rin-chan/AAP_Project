import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from '../scenes/login';
import RegisterScreen from '../scenes/register';

const AuthNavigatorConfig = {
    initialRouteName: 'Login',
    header: null,
    headerMode: 'none',
};

const RouteConfigs = {
    Login: LoginScreen,
    Register: RegisterScreen
};

const AuthNavigator = createStackNavigator(RouteConfigs, AuthNavigatorConfig);

export default AuthNavigator;