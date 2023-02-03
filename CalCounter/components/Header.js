import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

function Header(){
    return (
        <View style={styles.header}>
            <Text style={styles.title}>
                Cal Counter
            </Text>
        </View>
    );
}

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    header: {
        height: 70,
        width: window.width,
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'black',
    },
    title: {
        top: 0,
        left: 0,
        margin: 20,
        color: 'white',
        fontSize: 20,
    },
});
export default Header;