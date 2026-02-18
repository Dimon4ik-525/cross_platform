import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>Дані надані CheapShark API</Text>
      <Text style={styles.subText}>© 2026 SteamDeals Project</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#171a21',
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#2a475e',
    width: '100%',
    // Ми ПРИБРАЛИ sticky, щоб футер був просто в кінці списку
  },
  text: { color: '#8f98a0', fontSize: 12, marginBottom: 5 },
  subText: { color: '#545d65', fontSize: 10 }
});