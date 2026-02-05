import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

import Header from '../components/Header';
import Footer from '../components/Footer';
import GamesList from '../components/GamesList';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header />
      
      <View style={styles.contentContainer}>
        <GamesList navigation={navigation} />
      </View>
      
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b2838',
    // --- ЯДЕРНИЙ ФІКС ДЛЯ ВЕБУ ---
    ...Platform.select({
      web: {
        // Це змушує екран бути рівно розміром з вікно браузера
        height: '100vh', 
        position: 'fixed', 
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden', // Забороняємо вилазити за межі
      }
    }),
  },
  contentContainer: {
    flex: 1, 
    width: '100%',
    overflow: 'hidden',
  },
});