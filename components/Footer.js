import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors'; // 🔥 ПІДКЛЮЧИЛИ ТЕМУ

export default function Footer() {
  return (
    <View style={styles.footer}>
      {/* Додали згадку Steam, бо ми беремо звідти HD-картинки і ціни */}
      <Text style={styles.text}>Дані надані CheapShark & Steam API</Text>
      
      {/* Оновили назву проєкту! */}
      <Text style={styles.subText}>© 2026 VORTEX Project</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: COLORS.surfaceDark, // Найтемніший колір для футера
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,       // Темно-зелена обводка
    width: '100%',
    // Залишаємо без sticky, щоб був акуратно внизу
  },
  text: { 
    color: COLORS.textSecondary, // Світло-сіро-зелений текст 
    fontSize: 12, 
    marginBottom: 5 
  },
  subText: { 
    color: COLORS.textMuted,     // Темніший текст для копірайту
    fontSize: 10 
  }
});