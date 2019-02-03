// @flow

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Theme from "../theme";

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center"
    },
    text: {
        fontSize: 20,
        color: Theme.brand_primary,
        textAlign: "center",
        marginLeft: 8,
        marginRight: 8
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: Theme.brand_primary
    }
});

function renderLine(key, props) {
    return <View key={key} style={[styles.line, props.lineStyle]} />;
}

function renderText(key, props) {
    return (
        <View key={key}>
            <Text style={[styles.text, props.textStyle]}>
                {props.children.toString().toUpperCase()}
            </Text>
        </View>
    );
}

function renderInner(props) {
    if (!props.children) {
        return renderLine(null, props);
    }
    return [renderLine(1, props), renderText(2, props), renderLine(3, props)];
}

const H2 = props => (
    <View style={[styles.container, props.containerStyle]}>
        {renderInner(props)}
    </View>
);

export default H2;
