import React, {useState} from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import CheckBox from 'expo-checkbox';

function Home(){
    let day = new Date();
    let weekday = day.getDay();
    const [toggleBagel, setToggleBagel] = useState(false)
    const [toggleBurrito, setToggleBurrito] = useState(false)
    let calories = 0;

    if (toggleBagel)calories+=380;
    if (toggleBurrito)calories+=420;

    return (
        <View style ={styles.mainContainer}>
            <View style ={styles.container}>
                <Text style={styles.title}>
                    This will be a graph
                </Text>
            </View>
            <View style ={styles.container}>
                <Text style={styles.title}>
                    Weekday
                </Text>
                <View style ={styles.rowContainer}>
                    <Text style ={[weekday==0 ? styles.today : styles.weekday]}>
                        S
                    </Text>
                    <Text style ={[weekday==1 ? styles.today : styles.weekday]}>
                        M
                    </Text>
                    <Text style ={[weekday==2 ? styles.today : styles.weekday]}>
                        T
                    </Text>
                    <Text style ={[weekday==3 ? styles.today : styles.weekday]}>
                        W
                    </Text>
                    <Text style ={[weekday==4 ? styles.today : styles.weekday]}>
                        T
                    </Text>
                    <Text style ={[weekday==5 ? styles.today : styles.weekday]}>
                        F
                    </Text>
                    <Text style ={[weekday==6 ? styles.today : styles.weekday]}>
                        S
                    </Text>
                </View>
            </View>
            <View style ={styles.container}>
                <Text style={styles.title}>
                    Today's Calories
                </Text>
                <View style={styles.rowContainer}>
                    <Text style={styles.bigText}>
                        {calories}
                    </Text>
                    <Text style = {styles.commonText}>
                        / 2000 Cal
                    </Text>
                </View>
            </View>
            <View style ={styles.container}>
                <Text style={styles.title}>
                    Meals
                </Text>
                <View style ={styles.rowContainer}>
                    <CheckBox
                        disabled={false}
                        value={toggleBagel}
                        onValueChange={(newValue) => setToggleBagel(newValue)}
                    />
                    <Text style ={styles.selection}>
                        Bagel
                    </Text>
                </View>
                <View style ={styles.rowContainer}>
                    <CheckBox
                        disabled={false}
                        value={toggleBurrito}
                        onValueChange={(newValue) => setToggleBurrito(newValue)}
                    />
                    <Text style ={styles.selection}>
                        Burrito
                    </Text>
                </View>
            </View>
        </View>
    );
}

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: window.width,
        height: window.height,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    container: {
        margin: 20,
        padding: 10,
        width: window.width-40,
        backgroundColor: '#353535',
        borderRadius: 10,
    },
    title: {
        color: 'white',
    }, 
    commonText: {
        color: 'white',
        fontSize: 10,
    },
    bigText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    rowContainer: {
        margin: 10,
        flexDirection: 'row',
    },
    selection: {
        marginLeft: 5,
        color: 'white',
        fontSize: 10,
    },
    weekday: {
        color: 'white',
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginRight: 5,
    },
    today: {
        backgroundColor: 'grey',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginRight: 5,
    },
});

export default Home;