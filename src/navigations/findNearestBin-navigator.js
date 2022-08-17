import { createSwitchNavigator } from 'react-navigation';

import findNearestBinScreen from '../scenes/findNearestBin';
import findNearestBinPredictionScreen from '../scenes/findNearestBin/prediction';
import findNearestBinMapScreen from '../scenes/findNearestBin/map';

const TabNavigatorConfig = {
    initialRouteName: 'findNearestBin',
    header: null,
    headerMode: 'none',
};

const RouteConfigs = {
    findNearestBin: {
        screen: findNearestBinScreen,
    },
    findNearestBinPrediction: {
        screen: findNearestBinPredictionScreen,
    },
    findNearestBinMap: {
        screen: findNearestBinMapScreen,
    },
};

const findNearestBinNavigator = createSwitchNavigator(RouteConfigs, TabNavigatorConfig);

export default findNearestBinNavigator;