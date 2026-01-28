import React from 'react';
import { Text, StyleSheet } from 'react-native'; // Не забудьте імпортувати!

export default function Header({ title }) {
  return <Text style={styles.header}>{title}</Text>;
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    textAlign: 'center', // Можна додати центрування тексту
  },
});