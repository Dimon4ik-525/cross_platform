import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import { COLORS } from '../theme/colors';

export default function MapScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.title}>📍 Радар гравців</Text>
        
        <View style={styles.webPlaceholder}>
          <Text style={styles.webPlaceholderText}>🗺️ Карта працює тільки на смартфоні</Text>
          <Text style={styles.webPlaceholderSub}>
            Оскільки браузер не має вбудованих мобільних карт, ця функція доступна лише в Expo Go на реальному пристрої.
          </Text>
        </View>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Назад до профілю</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', color: COLORS.primary, marginBottom: 20 },
  webPlaceholder: { backgroundColor: COLORS.surfaceDark, padding: 30, borderRadius: 15, borderWidth: 2, borderColor: COLORS.border, marginBottom: 30, alignItems: 'center' },
  webPlaceholderText: { color: COLORS.primary, fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  webPlaceholderSub: { color: COLORS.textMuted, fontSize: 14, textAlign: 'center', lineHeight: 22 },
  backButton: { padding: 15, backgroundColor: COLORS.surfaceDark, borderRadius: 8, borderWidth: 1, borderColor: COLORS.primary, width: '100%', alignItems: 'center', cursor: 'pointer' },
  backButtonText: { color: COLORS.primary, fontSize: 16, fontWeight: 'bold' }
});