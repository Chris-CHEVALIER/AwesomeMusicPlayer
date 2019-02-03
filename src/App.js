import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from "./views/Home";

const RootStack = createStackNavigator({
    Home: {
        screen: Home
    }
});

const App = createAppContainer(RootStack);

export default App;
