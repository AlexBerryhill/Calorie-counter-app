import React, {useState, useEffect} from "react";
import { StyleSheet, Text, TextInput, View, Dimensions, TouchableOpacity } from "react-native";
import { useNavigate } from "react-router-native";
import { auth } from "../firebaseConfig";
import { Link } from "react-router-native";

function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user =>{
            if (user) {
                console.log('Working')
            }
        })
        return unsubscribe
    },[])
    
    const handleEmail = (value) =>{
        return value.trim()
    }

    const handleLogin = () =>{
        auth
        .signInWithEmailAndPassword(email,password.replace(/\s/g, '') )
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log("logged in with:", user.email);
            navigate('/home');
        })
        .catch(error => alert(error.message))
    }

    return(
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <Text style={styles.text}>Log In</Text>
                <TextInput 
                    placeholder="E-mail"
                    onChangeText={text => setEmail(handleEmail(text))}
                    style={styles.input}
                />

                <TextInput 
                    secureTextEntry={true}
                    placeholder="Password"
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text>Login</Text>
                </TouchableOpacity>

                <Link to="/" component={TouchableOpacity}>
                    <Text style={styles.text}>Already have an account?</Text>
                </Link>
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
        backgroundColor: 'black',
        alignContent: 'center'
    },
    container: {
        margin: 20,
        padding: 10,
        width: window.width-40,
        backgroundColor: '#353535',
        borderRadius: 10,
    },
    text: {
        color: 'white'
    },
    input: {
        marginVertical: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'grey',
        color: 'black',
    },
    button: {
        backgroundColor: 'grey',
        width: window.width/5,
        borderRadius: 10,
        padding: 10,
        marginHorizontal: window.width/3.3
    },
});

export default Login;