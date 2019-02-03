// @flow

import { Platform, StatusBar } from "react-native";
import { createStackNavigator, createSwitchNavigator } from "react-navigation";

// Signed Out views
import HomeScreen from "./views/HomeScreen";
import ProfileScreen from "./views/ProfileScreen";

const headerStyle = {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

export const createRootNavigator = () => {
    return createSwitchNavigator(
        {
            HomeScreen: HomeScreen,
            ProfileScreen: ProfileScreen
        },
        {
            initialRouteName: "HomeScreen"
        }
    );
};
