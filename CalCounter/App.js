import { StyleSheet, Text, View } from 'react-native';
import Home from './pages/Home';
import Header from './components/Header';

export default function App() {
  return (
    <View style={styles.container}>
      <Header/>
      <Home/>
    </View>
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
