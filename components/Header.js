import React from 'react';
import { Text, StyleSheet, Platform } from 'react-native';
// Імпортуємо спеціальний компонент, який сам знає про "чубчик"
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Header() {
  return (
    <SafeAreaView 
      style={styles.safeContainer} 
      edges={['top']} // Захищаємо тільки верх, щоб не зіпсувати низ
    >
      <Text style={styles.logoText}>STEAM<Text style={styles.logoHighlight}>DEALS</Text></Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: '#171a21', // Фон тепер на самому контейнері безпеки
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#2a475e',
    width: '100%',
    // Внутрішній відступ знизу, щоб текст не прилипав до лінії
    paddingBottom: 15,
    paddingTop: 10, // Невеликий додатковий відступ від "чубчика"
    
    // Тінь
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#c7d5e0',
    letterSpacing: 2,
  },
  logoHighlight: {
    color: '#66c0f4',
  }
});