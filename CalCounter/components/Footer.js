import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

function Footer(){
    return (
        <View style={styles.footer}>
            <Text style={styles.title}>
                Cal Counter
            </Text>
        </View>
    );
}

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    footer: {
        height: 80,
        width: window.width,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'black',
        flexDirection: 'row',
    },
    title: {
        top: 0,
        left: 0,
        margin: 20,
        color: 'white',
        fontSize: 20,
    },
});
export default Footer;