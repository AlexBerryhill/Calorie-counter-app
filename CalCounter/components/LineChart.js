import { StyleSheet, Text, View, Dimensions } from "react-native";
import { getDatabase, ref, child, get, set, onValue } from "firebase/database";
import { fireDB, db} from "../firebaseConfig";
import { LineChart } from "react-native-chart-kit";

function _toList(obj){
    if(obj === undefined) return [];
    return toList(obj, []);
}

function toList(obj, list){
    if(Object.keys(obj).length == 0){
        return list
    }
    day = Object.keys(obj)[0]
    list.push(day.calories)
    delete obj[day];
    return toList(obj, list)
}

function lineChart(obj){
    list = _toList(obj);
    return (
    <LineChart
        data={{
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100]
            }
        ]
        }}
        width={Dimensions.get("window").width-60} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="cal"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
            backgroundColor: "#e26a00",
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
    />)
}

function ReadCalData(){
    let day = new Date();
    const dbRef = ref(db);
    
    return  get(child(dbRef, `${day.getMonth()}`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            return lineChart(snapshot.val());
        } else {
            console.log("No Data Available");
            return (<View></View>);
        }
    }).catch((error) => {
        console.error(error);
    });
}

async function MyLine(){
    const val=await ReadCalData()
    console.log("val");
    console.log(val);
    return val;
}

export default MyLine