import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { COLORS } from '../theme/colors';

export default function GalleryScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header />
      
      {/* 🔥 ФІРМОВА ПАНЕЛЬ НАВІГАЦІЇ */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          <Text style={styles.backText} numberOfLines={1}>НАЗАД</Text>
        </TouchableOpacity>
        
        <Text style={styles.screenTitleText}>ГАЛЕРЕЯ</Text>
        
        <View style={styles.spacer} /> 
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* --- ЛОКАЛЬНЕ ЗОБРАЖЕННЯ --- */}
        <View style={styles.imageBlock}>
            <Text style={styles.imageTitle}>Локальне зображення (contain)</Text>
            <Image
                source={require('../assets/VITOS_dota_2_rip_mm_700mmr.jpg')} 
                style={styles.localImage}
                resizeMode="contain"
            />
            <Text style={styles.description}>
                Зображення завантажено з папки assets. Режим "contain" гарантує, що вся картинка влізе у виділений блок.
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
                Зображення завантажено по URL. Режим "cover" масштабує фото так, щоб воно повністю заповнило блок.
            </Text>
        </View>

      </ScrollView>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  
  /* СТИЛІ НАВІГАЦІЇ VORTEX */
  navBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 15, 
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.surfaceDark
  },
  backBtn: { flexDirection: 'row', alignItems: 'center', width: 120 },
  spacer: { width: 120 }, 
  backText: { color: COLORS.primary, fontWeight: 'bold', marginLeft: 5 },
  screenTitleText: { color: COLORS.textPrimary, fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },

  content: { flexGrow: 1, padding: 20, alignItems: 'center', paddingBottom: 40 },
  
  imageBlock: {
    width: '100%', backgroundColor: COLORS.surfaceDark, padding: 15, borderRadius: 10,
    alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: COLORS.surface,
    ...Platform.select({
      ios: { shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 4 },
      android: { elevation: 4 },
      web: { boxShadow: `0px 4px 10px ${COLORS.primary}22` }
    }),
  },
  imageTitle: { color: COLORS.textPrimary, fontSize: 16, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  description: { color: COLORS.textMuted, fontSize: 13, marginTop: 15, textAlign: 'center', lineHeight: 20 },
  
  localImage: { width: 220, height: 220, backgroundColor: COLORS.surface, borderRadius: 15, borderWidth: 2, borderColor: COLORS.primary },
  networkImage: { width: '100%', height: 200, borderRadius: 10, borderWidth: 1, borderColor: COLORS.border },
  
  separator: { height: 1, backgroundColor: COLORS.border, width: '90%', marginVertical: 20 }
});