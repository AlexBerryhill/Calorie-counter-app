import React from "react";
import { StyleSheet, View, Dimensions, Image } from "react-native";

function Footer(){
    return (
        <View style={styles.footer}>
            <Image
                style = {styles.image}
                source = {require('../assets/user.png')}
            />
            <Image
                style = {styles.image}
                source = {require('../assets/settings.png')}
            />
            <Image
                style = {styles.image}
                source = {require('../assets/options.png')}
            />
        </View>
    );
}

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    footer: {
        height: 50,
        width: window.width,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'black',
        flexDirection: 'row',
        padding: 20,
    },
    image: {
        height: 30,
        width: 30,
        marginHorizontal: 47,
    },
});
export default Footer;