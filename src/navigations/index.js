import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AuthNavigator from './auth-navigator';
import AppNavigator from './app-navigator';

const RootNavigator = createSwitchNavigator(
    {
        Auth: AuthNavigator,
        App: AppNavigator,
    },
    {
        initialRouteName: 'App',
    },
);

export default createAppContainer(RootNavigator);