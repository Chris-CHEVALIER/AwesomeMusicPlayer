import React from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity
} from "react-native";

import Header from "../components/Header";
import AlbumArt from "../components/AlbumArt";
import TrackDetails from "../components/TrackDetails";
import SeekBar from "../components/SeekBar";
import Controls from "../components/Controls";

export default class MusicPlayer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Header
                    message="Playing from Charts"
                    onDownPress={navigate("Home")}
                />
                <AlbumArt url="http://36.media.tumblr.com/14e9a12cd4dca7a3c3c4fe178b607d27/tumblr_nlott6SmIh1ta3rfmo1_1280.jpg" />
                <TrackDetails title="Stressed Out" artist="Twenty One Pilots" />
                {/*<SeekBar trackLength={204} currentPosition={156} />*/}
                <Controls />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "black"
    }
});
