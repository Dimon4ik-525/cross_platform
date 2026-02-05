import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.footerContainer}>
      <Text style={styles.text}>Дані надані CheapShark API</Text>
      <Text style={styles.subText}>© 2026 SteamDeals Project</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    padding: 15,
    backgroundColor: '#171a21',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#2a475e',
    width: '100%',
  },
  text: {
    color: '#8f98a0',
    fontSize: 12,
  },
  subText: {
    color: '#535b65', // Темніший текст
    fontSize: 10,
    marginTop: 4,
  }
});