import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function Footer({ text }) {
  return <Text style={styles.footer}>{text}</Text>;
}

const styles = StyleSheet.create({
  footer: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
    textAlign: 'center',
  },
});