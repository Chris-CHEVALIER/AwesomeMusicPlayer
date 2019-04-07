// @flow

import React from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    PermissionsAndroid,
    Alert
} from "react-native";
import Accordion from "../components/Accordion";
import { AudioRecorder } from "react-native-audio-player-recorder";
import OpenSettings from "react-native-open-settings";
import { AudioUtils } from "react-native-audio-player-recorder";

import albums from "../data/albums.json";

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "#292929"
    },
    recordingButton: {
        height: 30,
        width: 30,
        margin: 20,
        alignSelf: "flex-end"
    },
    off: {
        opacity: 0.3
    }
});

export default class Albums extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recording: false
        };
    }

    static navigationOptions = {
        title: "Albums",
        headerStyle: {
            backgroundColor: "white"
        }
    };

    checkRecordPermission() {
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
        ).then(granted => {
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // Access is granted, Yay!
            } else {
                Alert.alert(
                    "Attention !",
                    'Vous n\'avez pas autorisé l\'application à accéder au microphone. Ainsi, aucune commande audio ne pourra être lancée.\n\nPour remedier à cela, appuyez sur "Mettre à jour les autorisations", puis activez la permission d\'accès au "Microphone" dans le menu "Autorisations".',
                    [
                        {
                            text: "Mettre à jour les autorisations",
                            onPress: () => OpenSettings.openSettings()
                        }
                    ],
                    { cancelable: false }
                );
            }
        });
    }

    prepareRecordingPath() {
        AudioRecorder.prepareRecordingAtPath(
            AudioUtils.DocumentDirectoryPath + "command.wav",
            {
                SampleRate: 22050,
                Channels: 1,
                AudioQuality: "High",
                AudioEncoding: "wav",
                AudioEncodingBitRate: 32000
            }
        );
    }

    startRecording() {
        this.checkRecordPermission();
        this.setState({
            recording: true
        });
        this.prepareRecordingPath();
        AudioRecorder.startRecording();
    }

    stopRecording() {
        const { isRecording } = this.state;
        if (!isRecording) return;

        AudioRecorder.stopRecording();
        this.setState({
            isRecording: false
        });
        console.log(
            "Commande vocale enregistré dans " +
                AudioUtils.DocumentDirectoryPath
        );
        /*AudioRecord.stop();
        /* or to get the wav file path
        audioFile = await AudioRecord.stop();

        AudioRecord.on("data", data => {
            console.log("data : ", data);
        });*/
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={{ marginTop: 10 }}>
                    {this.renderAlbums()}
                </ScrollView>
                <TouchableOpacity
                    activeOpacity={0.0}
                    onPress={() => {
                        this.setState({ recording: !this.state.recording });
                    }}
                >
                    <Image
                        style={[
                            styles.recordingButton,
                            this.state.recording ? [] : styles.off
                        ]}
                        source={require("../../images/record_voice_over_white_36pt.png")}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    renderAlbums() {
        let arr = [];
        for (let album of albums) {
            arr.push(
                <View key={album.id}>
                    <Accordion label={album.name} info={album.artist}>
                        {this.renderTracks(album.tracks, album)}
                    </Accordion>
                </View>
            );
        }
        if (!arr || arr.length === 0) {
            return (
                <Text style={styles.noDataMessage}>Aucun album trouvé.</Text>
            );
        }
        return <View>{arr}</View>;
    }

    renderTracks(tracks, album) {
        const { navigate } = this.props.navigation;
        let arr = [];
        for (let track of tracks) {
            arr.push(
                <View key={track}>
                    <TouchableOpacity
                        onPress={() =>
                            navigate("MusicPlayer", {
                                currentTrack: track,
                                currentAlbum: album
                            })
                        }
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                marginLeft: 20,
                                margin: 10,
                                color: "white"
                            }}
                        >
                            {track}
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }
        if (!arr || arr.length === 0) {
            return (
                <Text style={styles.noDataMessage}>Aucun morceau trouvé.</Text>
            );
        }
        return <View>{arr}</View>;
    }
}
