/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { AppRegistry } from "react-native";
import App from "./src/App";
import { name as appName } from "./app.json";
import { YellowBox } from "react-native";

YellowBox.ignoreWarnings(["WebView", "Remote debugger"]);
AppRegistry.registerComponent(appName, () => App);
