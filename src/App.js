import { createStackNavigator, createAppContainer } from "react-navigation";

import Home from "./views/Home";
import MusicPlayer from "./views/MusicPlayer";

const RootStack = createStackNavigator({
    Home: Home,
    MusicPlayer: {
        screen: MusicPlayer,
        navigationOptions: {
            header: null
        }
    }
});

const App = createAppContainer(RootStack);

export default App;
