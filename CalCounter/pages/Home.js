import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import CheckBox from 'expo-checkbox';
import { set } from "firebase/database";
import { db } from "../firebaseConfig";
import {LineChart} from "react-native-chart-kit";
import 'firebase/compat/database';

function writeUserData(day, calories) {
    set(db.ref(`${day.getMonth()}/${day.getDate()}`), {
      Kcalories: calories/1000
    });
}

function toList(obj){
    if(obj === undefined) return [];
    return _toList(obj, []);
}

function _toList(obj, data){
    let day = Object.keys(obj)[0];
    // label.push(day);
    data.push(obj[day].calories);
    delete obj[day];
    if(Object.keys(obj).length == 0){
        return data;
    }
    return _toList(obj, data)
}

function Home(){
    let day = new Date();
    let weekday = day.getDay();
    const [data, setData] = useState([1])
    const [labels, setLabels] = useState([1])
    const [toggleBagel, setToggleBagel] = useState(false)
    const [toggleBurrito, setToggleBurrito] = useState(false)
    const [toggleHotDog, setToggleHotDog] = useState(false)
    const [toggleSpaghetti, setToggleSpaghetti] = useState(false)
    let calories = 0;

    if (toggleBagel)calories+=380;
    if (toggleBurrito)calories+=420;
    if (toggleHotDog)calories+=420;
    if (toggleSpaghetti)calories+=485;
    
    writeUserData(day, calories);
    
    useEffect(() => {
        const databaseRef = db.ref('/0');        
        databaseRef.once('value').then((snapshot) => {
            console.log(snapshot.val());
            setData(toList(snapshot.val()));
            setLabels(Object.keys(snapshot.val()));
        });
      }, []);

    return (
        <ScrollView style ={styles.mainContainer}>
            <View style ={styles.container}>
                <Text style={styles.title}>
                    Kilo-Calories over time
                </Text>
                <LineChart
                    data={{
                        labels: labels,
                        datasets: [
                            {
                                data: data
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width-60} // from react-native
                    height={220}
                    yAxisSuffix="Kcal"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                    backgroundColor: "#353535",
                    backgroundGradientFrom: "#353535",
                    backgroundGradientTo: "#353535",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#353535"
                    }
                    }}
                    bezier
                    style={{
                    marginVertical: 8,
                    borderRadius: 16
                    }}
                />
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
                <View style ={styles.rowContainer}>
                    <CheckBox
                        disabled={false}
                        value={toggleHotDog}
                        onValueChange={(newValue) => setToggleHotDog(newValue)}
                    />
                    <Text style ={styles.selection}>
                        Hot Dogs
                    </Text>
                </View>
                <View style ={styles.rowContainer}>
                    <CheckBox
                        disabled={false}
                        value={toggleSpaghetti}
                        onValueChange={(newValue) => setToggleSpaghetti(newValue)}
                    />
                    <Text style ={styles.selection}>
                        Spaghetti
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: window.width,
        height: window.height,
        // alignItems: 'center',
        // justifyContent: 'center',
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