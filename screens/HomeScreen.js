import React, { useContext } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { UserContext } from '../context/UserContext';

import Header from '../components/Header';
import Footer from '../components/Footer';
import GamesList from '../components/GamesList';

export default function HomeScreen({ navigation }) {
  const { userName } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Header />
      
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>Вітаю, <Text style={styles.userName}>{userName}</Text>! 👋</Text>
      </View>

      {/* Цей контейнер займає все вільне місце між Хедером і Футером.
         Саме в ньому буде жити наш скрол.
      */}
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
    // ПОВЕРТАЄМО ФІКСАЦІЮ ЕКРАНУ
    ...Platform.select({
      web: {
        height: '100%', // Займаємо висоту батька (App.js)
        overflow: 'hidden', // Забороняємо сторінці рости
      }
    }),
  },
  greetingContainer: {
    backgroundColor: '#2a475e', padding: 10, alignItems: 'center',
    borderBottomWidth: 1, borderBottomColor: '#4b6b8b',
    flexShrink: 0, // Не стискати
  },
  greetingText: { color: '#c7d5e0', fontSize: 16 },
  userName: { color: '#66c0f4', fontWeight: 'bold', fontSize: 18 },

  contentContainer: {
    flex: 1, // Критично важливо: розтягнутися на все доступне місце
    width: '100%',
    overflow: 'hidden', // Тримаємо контент в рамках
  },
});