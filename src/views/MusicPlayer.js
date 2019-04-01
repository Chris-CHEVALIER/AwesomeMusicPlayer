import React from "react";
import { StyleSheet, View, PermissionsAndroid } from "react-native";

import Header from "../components/Header";
import AlbumArt from "../components/AlbumArt";
import TrackDetails from "../components/TrackDetails";
import SeekBar from "../components/SeekBar";
import Controls from "../components/Controls";
import { AudioRecorder } from "react-native-audio-player-recorder";
import OpenSettings from "react-native-open-settings";
import { AudioUtils } from "react-native-audio-player-recorder";

export default class MusicPlayer extends React.Component {
    constructor(props) {
        super(props);
        const currentTrack = props.navigation.getParam("currentTrack");
        const currentAlbum = props.navigation.getParam("currentAlbum");

        this.state = {
            currentTrack,
            currentAlbum,
            currentPosition: 0,
            paused: true,
            totalLength: 1,
            currentPosition: 0,
            selectedTrack: 0,
            recording: false,
            shuffleOn: false
        };
    }

    setDuration(data) {
        this.setState({ totalLength: Math.floor(data.duration) });
    }

    setTime(data) {
        this.setState({ currentPosition: Math.floor(data.currentTime) });
    }

    seek(time) {
        time = Math.round(time);
        this.refs.audioElement && this.refs.audioElement.seek(time);
        this.setState({
            currentPosition: time,
            paused: false
        });
    }

    onBack() {
        if (this.state.currentPosition < 10 && this.state.selectedTrack > 0) {
            this.refs.audioElement && this.refs.audioElement.seek(0);
            this.setState({ isChanging: true });
            setTimeout(
                () =>
                    this.setState({
                        currentPosition: 0,
                        paused: false,
                        totalLength: 1,
                        isChanging: false,
                        selectedTrack: this.state.selectedTrack - 1
                    }),
                0
            );
        } else {
            this.refs.audioElement.seek(0);
            this.setState({
                currentPosition: 0
            });
        }
    }

    onForward() {
        if (
            this.state.selectedTrack <
            this.state.currentAlbum.tracks.length - 1
        ) {
            this.refs.audioElement && this.refs.audioElement.seek(0);
            this.setState({ isChanging: true });
            setTimeout(
                () =>
                    this.setState({
                        currentPosition: 0,
                        totalLength: 1,
                        paused: false,
                        isChanging: false,
                        selectedTrack: this.state.selectedTrack + 1
                    }),
                0
            );
        }
    }

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

    startRecording() {
        this.checkRecordPermission();

        this.prepareRecordingPath();
        AudioRecorder.startRecording();
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

    stopRecording() {
        AudioRecorder.stopRecording();

        console.log(
            "Commande vocale enregistré dans " +
                AudioUtils.DocumentDirectoryPath
        );
        fetch("localhost:3000/transcriber", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: '{"foo": "bar"}'
        }).then(d => console.log(d));
        /*AudioRecord.stop();
        /* or to get the wav file path
        audioFile = await AudioRecord.stop();

        AudioRecord.on("data", data => {
            console.log("data : ", data);
        });*/
    }

    render() {
        const { navigate } = this.props.navigation;
        const { currentAlbum, currentTrack, currentPosition } = this.state;
        if (this.state.recording) {
            this.startRecording();
        } else {
            this.stopRecording();
        }
        return (
            <View style={styles.container}>
                <Header
                    message="Playing from Charts"
                    onDownPress={() => {
                        navigate("Home");
                    }}
                />
                <AlbumArt url={currentAlbum.art} />
                <TrackDetails
                    title={currentTrack}
                    artist={currentAlbum.artist}
                />
                <SeekBar
                    onSeek={this.seek.bind(this)}
                    trackLength={this.state.totalLength}
                    onSlidingStart={() => this.setState({ paused: true })}
                    currentPosition={this.state.currentPosition}
                />
                <Controls
                    onPressRecord={() => {
                        this.setState({ recording: !this.state.recording });
                    }}
                    recording={this.state.recording}
                    shuffleOn={this.state.shuffleOn}
                    forwardDisabled={
                        this.state.selectedTrack ===
                        currentAlbum.tracks.length - 1
                    }
                    onPressShuffle={() =>
                        this.setState({ shuffleOn: !this.state.shuffleOn })
                    }
                    onPressPlay={() => this.setState({ paused: false })}
                    onPressPause={() => this.setState({ paused: true })}
                    onBack={this.onBack.bind(this)}
                    onForward={this.onForward.bind(this)}
                    paused={this.state.paused}
                />
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
