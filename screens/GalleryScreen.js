import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { COLORS } from '../theme/colors';

export default function GalleryScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header />
      
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.screenTitle}>🖼 Медіа Галерея</Text>
        
        {/* --- ЛОКАЛЬНЕ ЗОБРАЖЕННЯ --- */}
        <View style={styles.imageBlock}>
            <Text style={styles.imageTitle}>Локальне зображення (contain)</Text>
            <Image
                source={require('../assets/VITOS_dota_2_rip_mm_700mmr.jpg')} 
                style={styles.localImage}
                resizeMode="contain"
            />
            <Text style={styles.description}>
                Зображення завантажено з папки assets. Режим "contain" гарантує, що вся картинка влізе у виділений блок, не обрізаючись.
            </Text>
        </View>

        <View style={styles.separator} />

        {/* --- МЕРЕЖЕВЕ ЗОБРАЖЕННЯ --- */}
        <View style={styles.imageBlock}>
            <Text style={styles.imageTitle}>Мережеве зображення (cover)</Text>
            <Image
                source={{ uri: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1920&q=80' }} 
                style={styles.networkImage}
                resizeMode="cover"
            />
            <Text style={styles.description}>
                Зображення завантажено по URL у високій роздільній здатності. Режим "cover" масштабує зображення так, щоб воно повністю заповнило блок без втрати пропорцій.
            </Text>
        </View>
        
        {/* Кнопка повернення */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>← ПОВЕРНУТИСЬ НАЗАД</Text>
        </TouchableOpacity>

      </ScrollView>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flexGrow: 1, padding: 20, alignItems: 'center' },
  screenTitle: { fontSize: 24, fontWeight: 'bold', color: COLORS.primary, marginBottom: 30, textAlign: 'center' },
  imageBlock: {
    width: '100%', backgroundColor: COLORS.surfaceDark, padding: 15, borderRadius: 10,
    alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: COLORS.border,
    ...Platform.select({
      ios: { shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 4 },
      android: { elevation: 6 },
      web: { boxShadow: `0px 4px 10px ${COLORS.primary}33` } // Неонова тінь
    }),
  },
  imageTitle: { color: COLORS.textPrimary, fontSize: 16, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  description: { color: COLORS.textMuted, fontSize: 13, marginTop: 15, textAlign: 'center', lineHeight: 20 },
  
  localImage: { width: 200, height: 200, backgroundColor: COLORS.surface, borderRadius: 20, borderWidth: 2, borderColor: COLORS.primary },
  networkImage: { width: '100%', height: 200, borderRadius: 10, borderWidth: 1, borderColor: COLORS.primary },
  
  separator: { height: 2, backgroundColor: COLORS.border, width: '80%', marginVertical: 10 },
  
  backButton: { marginTop: 20, padding: 15, backgroundColor: COLORS.surfaceDark, borderRadius: 8, borderWidth: 1, borderColor: COLORS.primary, width: '100%', alignItems: 'center', ...Platform.select({ web: { cursor: 'pointer' } }) },
  backButtonText: { color: COLORS.primary, fontSize: 16, fontWeight: 'bold' }
});