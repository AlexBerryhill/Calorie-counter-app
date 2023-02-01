import React, {useState, useCallback, useRef, useEffect} from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import CheckBox from 'expo-checkbox';
import { getDatabase, ref, child, get, set, onValue } from "firebase/database";
import { fireDB, db } from "../firebaseConfig";
import {LineChart} from "react-native-chart-kit";
import * as firebase from 'firebase/app';
import 'firebase/database';
import Constants from 'expo-constants';

function writeUserData(day, calories) {
    set(ref(db, `${day.getMonth()}/${day.getDate()}`), {
      calories: calories
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
    const [toggleBagel, setToggleBagel] = useState(false)
    const [toggleBurrito, setToggleBurrito] = useState(false)
    let calories = 0;
    // let data = [
    //     Math.random() * 100,
    //     Math.random() * 100,
    //     Math.random() * 100,
    //     Math.random() * 100,
    //     Math.random() * 100,
    //     Math.random() * 100,
    //   ];
    let label=[];
    // const lineChartRef = useRef(null);
    // const editText = useCallback(() => {
    //     console.log("data")
    //     lineChartRef.current.setNativeProps({yAxisLabel:'f'}
    //     );
    //   }, []);

    //         cont dbRef = ref(db);
    //         get(child(dbRef, `${day.getMonth()}`)).then((snapshot) => {
    //         if (snapshot.exists()) {
    //             // console.log(snapshot.val());
                
    //             data=_toList(snapshot.val());
    //             editText();
    //             console.log(data)
    //         } else {
    //             console.log("No Data Available");
    //         }
    //         }).catch((error) => {
    //             console.error(error);
    //         });
    s

    if (toggleBagel)calories+=380;
    if (toggleBurrito)calories+=420;
    
    writeUserData(day, calories);
    
    
    useEffect(() => {
        // const firebaseConfig = {
        //     apiKey: Constants.expoConfig.extra.apiKey,
        //     authDomain: Constants.expoConfig.extra.authDomain,
        //     projectId: Constants.expoConfig.extra.projectID,
        //     storageBucket: Constants.expoConfig.extra.storageBucket,
        //     messagingSenderId: Constants.expoConfig.extra.messagingSenderId,
        //     appId: Constants.expoConfig.extra.appId,
        //     measurementId: Constants.expoConfig.extra.measurementId
        // };
        // const app =firebase.initializeApp(firebaseConfig);

        const databaseRef = firebase.database().ref('data/'+day.getDate());        
        // const databaseRef = ref(db);
        databaseRef.once('value').then((snapshot) => {
            console.log(snapshot.val());
            setData(snapshot.val());
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
                                data: [
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                  ]
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width-60} // from react-native
                    height={220}
                    yAxisLabel="$"
                    yAxisSuffix="k"
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