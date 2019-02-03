// @flow

import React from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
    h1: {
        fontSize: 30
    }
});

const H1 = props => (
    <Text style={[styles.h1, props.style]}>{props.children}</Text>
);

export default H1;
