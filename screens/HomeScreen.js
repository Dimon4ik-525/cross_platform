import React, { useContext } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { UserContext } from '../context/UserContext';
import { COLORS } from '../theme/colors'; // <-- ПІДКЛЮЧИЛИ ТЕМУ

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
    backgroundColor: COLORS.background, // Використовуємо тему
    ...Platform.select({
      web: {
        height: '100%', 
        overflow: 'hidden', 
      }
    }),
  },
  greetingContainer: {
    backgroundColor: COLORS.surface, padding: 10, alignItems: 'center',
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
    flexShrink: 0, 
  },
  greetingText: { color: COLORS.textSecondary, fontSize: 16 },
  userName: { color: COLORS.primary, fontWeight: 'bold', fontSize: 18 },

  contentContainer: {
    flex: 1, 
    width: '100%',
    overflow: 'hidden', 
  },
});