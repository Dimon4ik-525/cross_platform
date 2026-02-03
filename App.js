import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import Header from './components/Header';
import Footer from './components/Footer';
import Counter from './components/Counter'; 

export default function App() {
  return (
    <View style={styles.container}>
      <Header title="Лабораторна №3" />

      <View style={styles.content}>
        {/* Тут тепер живе наш лічильник */}
        <Counter />
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
    justifyContent: 'center', 
  },
});