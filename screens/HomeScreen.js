import React, { useContext } from 'react'; // 1. Додали useContext
import { View, Text, StyleSheet, Platform } from 'react-native';
import { UserContext } from '../context/UserContext'; // 2. Імпорт контексту

import Header from '../components/Header';
import Footer from '../components/Footer';
import GamesList from '../components/GamesList';

export default function HomeScreen({ navigation }) {
  // 3. Отримуємо ім'я
  const { userName } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Header />
      
      {/* 4. Блок привітання */}
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>Вітаю, <Text style={styles.userName}>{userName}</Text>! 👋</Text>
      </View>

      <View style={styles.contentContainer}>
        <GamesList navigation={navigation} />
      </View>
      
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#1b2838',
    ...Platform.select({ web: { height: '100vh', overflow: 'hidden' } }),
  },
  // Стилі для привітання
  greetingContainer: {
    backgroundColor: '#2a475e', padding: 10, alignItems: 'center',
    borderBottomWidth: 1, borderBottomColor: '#4b6b8b'
  },
  greetingText: { color: '#c7d5e0', fontSize: 16 },
  userName: { color: '#66c0f4', fontWeight: 'bold', fontSize: 18 },

  contentContainer: {
    flex: 1, width: '100%', overflow: 'hidden', minHeight: 0, 
    ...Platform.select({ web: { height: '100%' } }),
  },
});