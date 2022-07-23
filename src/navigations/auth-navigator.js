import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from '../scenes/login';
import RegisterScreen from '../scenes/register';
import LoginFaceEmailScreen from '../scenes/login/loginFaceEmail';
import LoginFaceCamScreen from '../scenes/login/loginFaceCam';

const AuthNavigatorConfig = {
    initialRouteName: 'Login',
    header: null,
    headerMode: 'none',
};

const RouteConfigs = {
    Login: LoginScreen,
    Register: RegisterScreen,
    LoginEmail: LoginFaceEmailScreen,
    LoginCam: LoginFaceCamScreen,
};

const AuthNavigator = createStackNavigator(RouteConfigs, AuthNavigatorConfig);

export default AuthNavigator;