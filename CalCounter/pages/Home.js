import React, {useState, useCallback, useRef, useEffect} from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import CheckBox from 'expo-checkbox';
import { getDatabase, ref, child, get, set, onValue } from "firebase/database";
import { fireDB, db } from "../firebaseConfig";
import {LineChart} from "react-native-chart-kit";
import * as firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import Constants from 'expo-constants';

function writeUserData(day, calories) {
    set(db.ref(`${day.getMonth()}/${day.getDate()}`), {
      calories: calories/1000
    });
}

function _toList(obj){
    if(obj === undefined) return [];
    return toList(obj, []);
}

function toList(obj, data){
    if(Object.keys(obj).length == 0){
        return data;
    }
    let day = Object.keys(obj)[0];
    // label.push(day);
    data.push(obj[day].calories);
    delete obj[day];
    return toList(obj, data)
}

function Home(){
    let day = new Date();
    let weekday = day.getDay();
    const [data, setData] = useState({})
    const [labels, setLabels] = useState([])
    const [toggleBagel, setToggleBagel] = useState(false)
    const [toggleBurrito, setToggleBurrito] = useState(false)
    let calories = 0;

    if (toggleBagel)calories+=380;
    if (toggleBurrito)calories+=420;
    
    writeUserData(day, calories);
    
    
    useEffect(() => {
        const databaseRef = db.ref('/0');        
        databaseRef.once('value').then((snapshot) => {
            console.log(snapshot.val());
            setData(_toList(snapshot.val()));
        });
      }, []);

    console.log(data)
    return (
        <View style ={styles.mainContainer}>
            <View style ={styles.container}>
                <Text style={styles.title}>
                    This will be a graph
                </Text>
                <LineChart
                    data={{
                        labels: ["January", "February", "March", "April", "May", "June", "July"],
                        datasets: [
                            {
                                data: data
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width-60} // from react-native
                    height={220}
                    yAxisSuffix="cal"
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