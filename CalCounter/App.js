import { StyleSheet, View } from 'react-native';
import { NativeRouter, Route, Routes } from "react-router-native";
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
  return (
    <NativeRouter>
      <Header/>
      <Routes>
        <Route exact path="/" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
      </Routes>
      <Footer/>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
