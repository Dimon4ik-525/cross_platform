import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
  return (
    <View style={styles.container}>
      <Header title="Головна сторінка" />

      <View style={styles.content}>
        <Text style={styles.text}>Привіт, React Native!</Text>
        <StatusBar style="auto" />
      </View>

      <Footer text="Всі права захищено © 2026" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between', 
  },
  content: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    color: 'blue',
  },
});
