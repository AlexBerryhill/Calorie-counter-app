import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import CheckBox from 'expo-checkbox';
import { set } from "firebase/database";
import { db, auth } from "../firebaseConfig";
import { LineChart } from "react-native-chart-kit";
import 'firebase/compat/database';

async function writeUserData(day, calories){
    var userId=auth.currentUser.email;
    const docRef = db.collection('users').doc(userId).collection(String(day.getFullYear())).doc(String(day.getMonth())).collection('Days').doc(String(day.getDate()));

    await docRef.set({
        Kcal: calories/1000,
        day: day.getDate()
    });
}

async function getUserData(day){
    var userId=auth.currentUser.email;
    const snapshot = await db.collection('users').doc(userId).collection(String(day.getFullYear())).doc(String(day.getMonth())).collection('Days').get();
    const userMonthData = snapshot.docs.map(doc => {
        return { day: doc.id, ...doc.data() }
    });
    return userMonthData;
}

// Convert an object to a list
function toList(obj){
    if(obj === undefined) return []; // If the object is undefined, return an empty list
    return _toList(obj, [], []);
}

// Recursive helper function for converting an object to a list
function _toList(arr, data, labels){
    
    data.push(arr[0].Kcal); // Push the calories into the data list
    labels.push(arr[0].day)
    arr.shift(); // Delete the first element from the object
    if(arr.length===0){ // If the object is empty
        return [data, labels]; // Return the data list
    }
    return _toList(arr, data, labels) // Recursively call the function with the updated object
}

function Home(){
    let day = new Date(); // Get the current date
    let weekday = day.getDay(); // Get the weekday
    const [data, setData] = useState([1]) // State to store the data for the line chart
    const [labels, setLabels] = useState([1]) // State to store the labels for the line chart
    const [toggleBagel, setToggleBagel] = useState(false) // State to keep track of whether the bagel checkbox is checked
    const [toggleCereal, setToggleCereal] = useState(false) // State to keep track of whether the bagel checkbox is checked
    const [toggleBurrito, setToggleBurrito] = useState(false) // State to keep track of whether the burrito checkbox is checked
    const [toggleHotDog, setToggleHotDog] = useState(false) // State to keep track of whether the hot dog checkbox is checked
    const [toggleSpaghetti, setToggleSpaghetti] = useState(false) // State to keep track of whether the spaghetti checkbox is checked
    const [toggleMacNCheese, setToggleMacNCheese] = useState(false) // State to keep track of whether the spaghetti checkbox is checked
    let calories = 0; // Keep track of the total calories

    // Add the calories for each checked food item
    if (toggleBagel)calories+=380;
    if (toggleCereal)calories+=540;
    if (toggleBurrito)calories+=420;
    if (toggleHotDog)calories+=420;
    if (toggleSpaghetti)calories+=485;
    if (toggleMacNCheese)calories+=1200;
    
    // Write the user data to the Firebase database
    writeUserData(day, calories);
    
    // Use the useEffect hook to fetch the data from the Firebase database
    useEffect(() => {
        var myData, myLabels
        const userData=getUserData(day).then(
            (value) => {
                [myData, myLabels]= toList(value);
                setData(myData);
                setLabels(myLabels);
                return value;
            },
            (err) => {
                console.log(err);
            }
        );         
    }, []); // Pass an empty array as the second argument to run this effect only once when the component mounts

    return (
        <ScrollView style ={styles.mainContainer}>
            <View style ={styles.container}>
                {/* Display the Kilo-Calories over time */}
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
                {/* Display the weekdays */}
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
                {/* Display the checkboxes for food items */}
                <Text style={styles.title}>
                    Breakfast
                </Text>
                <View style ={styles.rowContainer}>
                    <CheckBox
                        disabled={false}
                        value={toggleBagel}
                        onValueChange={(newValue) => setToggleBagel(newValue)}
                    />
                    <Text style ={styles.selection}>
                        Bagel with cream cheese
                    </Text>
                </View>
                <View style ={styles.rowContainer}>
                    <CheckBox
                        disabled={false}
                        value={toggleCereal}
                        onValueChange={(newValue) => setToggleCereal(newValue)}
                    />
                    <Text style ={styles.selection}>
                        Cinnomon Toast Crunch
                    </Text>
                </View>
            </View>
            <View style ={styles.container}>
                {/* Display the checkboxes for food items */}
                <Text style={styles.title}>
                    Lunch
                </Text>
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
            </View>
            <View style ={styles.container}>
                {/* Display the checkboxes for food items */}
                <Text style={styles.title}>
                    Dinner
                </Text>
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
                <View style ={styles.rowContainer}>
                    <CheckBox
                        disabled={false}
                        value={toggleMacNCheese}
                        onValueChange={(newValue) => setToggleMacNCheese(newValue)}
                    />
                    <Text style ={styles.selection}>
                        Mac N' Cheese
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