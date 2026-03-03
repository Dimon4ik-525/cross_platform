import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function GalleryScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header />
      
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.screenTitle}>🖼 Медіа Галерея (Лаба 10)</Text>
        
        {/* --- ЛОКАЛЬНЕ ЗОБРАЖЕННЯ --- */}
        <View style={styles.imageBlock}>
            <Text style={styles.imageTitle}>1. Локальне зображення (resizeMode="contain")</Text>
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
            <Text style={styles.imageTitle}>2. Мережеве зображення (resizeMode="cover")</Text>
            <Image
                // Замінили на зображення у високій якості (Cyberpunk 2077)
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
            <Text style={styles.backButtonText}>← Повернутися назад</Text>
        </TouchableOpacity>

      </ScrollView>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b2838', // Фон у стилі Steam
  },
  content: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#66c0f4',
    marginBottom: 30,
    textAlign: 'center',
  },
  imageBlock: {
    width: '100%',
    backgroundColor: '#2a475e',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    // Додаємо тінь
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4 },
      android: { elevation: 6 },
      web: { boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)' }
    }),
  },
  imageTitle: {
    color: '#c7d5e0',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    color: '#8f98a0',
    fontSize: 13,
    marginTop: 15,
    textAlign: 'center',
    lineHeight: 20,
  },
  
  // Стилі для зображень згідно з лабою
  localImage: {
    width: 200,
    height: 200,
    backgroundColor: '#171a21', // Тло, щоб було видно межі блоку
    borderRadius: 20, // Округлені кути
    borderWidth: 2,
    borderColor: '#66c0f4'
  },
  networkImage: {
    width: '100%', // На всю ширину блоку
    height: 200,
    borderRadius: 10, // Інший радіус округлення
    borderWidth: 1,
    borderColor: '#4b6b8b'
  },
  
  separator: {
    height: 2,
    backgroundColor: '#171a21',
    width: '80%',
    marginVertical: 10,
  },
  
  backButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#171a21',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#66c0f4',
    width: '100%',
    alignItems: 'center',
    ...Platform.select({ web: { cursor: 'pointer' } })
  },
  backButtonText: {
    color: '#66c0f4',
    fontSize: 16,
    fontWeight: 'bold',
  }
});