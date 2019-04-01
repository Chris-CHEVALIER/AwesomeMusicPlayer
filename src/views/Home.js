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
import { List } from "antd-mobile-rn";
import Theme from "../theme";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Accordion from "../components/Accordion";
import { AudioRecorder } from "react-native-audio-player-recorder";
import OpenSettings from "react-native-open-settings";
import { AudioUtils } from "react-native-audio-player-recorder";

const Item = List.Item;

import albums from "../data/albums.json";

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "black"
    }
});

export default class Albums extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRecording: false
        };
    }

    static navigationOptions = {
        title: "Albums",
        headerStyle: {
            backgroundColor: Theme.brand_secondary
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
            isRecording: true
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
        const { isRecording } = this.state;
        console.log(isRecording);

        return (
            <View style={styles.container}>
                <ScrollView style={{ marginTop: 10 }}>
                    {this.renderAlbums()}
                </ScrollView>
                <View>
                    {!isRecording ? (
                        <TouchableOpacity
                            onPress={() => {
                                this.startRecording();
                            }}
                        >
                            <FontAwesome
                                name="microphone"
                                size={50}
                                style={{
                                    margin: 20,
                                    alignSelf: "flex-end",
                                    color: Theme.brand_primary
                                }}
                            />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={() => {
                                this.stopRecording();
                            }}
                        >
                            <FontAwesome
                                name="check"
                                size={50}
                                style={{
                                    margin: 20,
                                    alignSelf: "flex-end",
                                    color: Theme.brand_primary
                                }}
                            />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    }

    renderAlbums() {
        // Récupérer albums en BDD
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
