// @flow

import React from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity
} from "react-native";
import { Button, Modal, List } from "antd-mobile-rn";
import Theme from "../theme";

import Accordion from "../components/Accordion";
import H2 from "../components/H2";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Item = List.Item;
const Brief = Item.Brief;

import albums from "../data/tmpData.json";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerModal: false,
            currentAlbum: null,
            currentTrack: ""
        };
    }

    static navigationOptions = {
        title: "Albums"
    };

    showModal = key => e => {
        e.preventDefault();
        this.setState({
            [key]: true
        });
    };

    onClose = key => () => {
        this.setState({
            [key]: false
        });
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>{this.renderAlbums()}</ScrollView>
            </View>
        );
    }

    renderAlbums() {
        // Récupérer albums en BDD
        return (
            <View>
                {albums &&
                    albums.map(album => (
                        <View key={album.id} style={{ flex: 1 }}>
                            <Accordion label={album.name} info={album.artist}>
                                {this.renderTracks(album.tracks)}
                            </Accordion>
                        </View>
                    ))}
            </View>
        );
    }

    renderTracks(tracks) {
        return (
            <View>
                {tracks &&
                    tracks.map(track => (
                        <View key={track} style={{ flex: 1 }}>
                            <TouchableOpacity>
                                <Item
                                    arrow="horizontal"
                                    multipleLine
                                    onClick={this.showModal("playerModal")}
                                    platform="android"
                                >
                                    <Text
                                        style={{
                                            fontSize: 17
                                        }}
                                    >
                                        {track}
                                    </Text>
                                    {this.renderPlayerModal()}
                                </Item>
                            </TouchableOpacity>
                        </View>
                    ))}
            </View>
        );
    }

    renderPlayerModal() {
        const { currentAlbum, currentTrack } = this.state;

        return (
            <Modal
                popup
                visible={this.state.playerModal}
                onClose={this.onClose("playerModal")}
                animationType="slide-up"
                transparent={false}
            >
                <View
                    style={{
                        height: 150,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Text>{currentTrack}</Text>
                    <Button
                        type="primary"
                        onClick={this.onClose("playerModal")}
                    >
                        Fermer
                    </Button>
                </View>
            </Modal>
        );
    }
}
