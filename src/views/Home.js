// @flow

import React from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity
} from "react-native";
import { List } from "antd-mobile-rn";

import Accordion from "../components/Accordion";

const Item = List.Item;
const Brief = Item.Brief;

import albums from "../data/tmpData.json";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: "Albums"
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
        let arr = [];
        for (let album of albums) {
            arr.push(
                <View key={album.id} style={{ flex: 1 }}>
                    <Accordion label={album.name} info={album.artist}>
                        {this.renderTracks(album.tracks)}
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

    renderTracks(tracks) {
        const { navigate } = this.props.navigation;
        let arr = [];
        for (let track of tracks) {
            arr.push(
                <View key={track} style={{ flex: 1 }}>
                    <TouchableOpacity>
                        <Item
                            arrow="horizontal"
                            multipleLine
                            //onClick={navigate("MusicPlayer")}
                            platform="android"
                        >
                            <Text
                                style={{
                                    fontSize: 17
                                }}
                            >
                                {track}
                            </Text>
                        </Item>
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
