import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Linking, TouchableOpacity, Platform, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // 1. Імпорт сховища

import SubscriptionModal from '../components/SubscriptionModal';
import Footer from '../components/Footer';

export default function DetailsScreen({ route }) {
  const { game } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false); // 2. Стан підписки

  // Логіка знижки
  const savings = parseFloat(game.savings);
  const hasDiscount = savings > 0;

  // 3. Перевіряємо при старті, чи гра вже збережена
  useEffect(() => {
    checkSubscriptionStatus();
  }, []);

  const checkSubscriptionStatus = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@subscriptions');
      const subs = jsonValue != null ? JSON.parse(jsonValue) : [];
      // Шукаємо гру по ID
      const exists = subs.find(item => item.dealID === game.dealID);
      setIsSubscribed(!!exists);
    } catch(e) {
      console.error(e);
    }
  };

  // 4. Функція перемикання (Додати/Видалити)
  const toggleSubscription = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@subscriptions');
      let subs = jsonValue != null ? JSON.parse(jsonValue) : [];

      if (isSubscribed) {
        // Якщо вже є -> ВИДАЛЯЄМО
        subs = subs.filter(item => item.dealID !== game.dealID);
        Alert.alert("Відписались", "Гру видалено з ваших підписок.");
      } else {
        // Якщо немає -> ДОДАЄМО
        subs.push(game);
        setModalVisible(true); // Показуємо красиву модалку
      }

      // Зберігаємо оновлений масив
      await AsyncStorage.setItem('@subscriptions', JSON.stringify(subs));
      setIsSubscribed(!isSubscribed); // Міняємо колір кнопки

    } catch (e) {
      console.error("Помилка збереження", e);
    }
  };

  const openInSteam = () => {
    const url = `https://www.cheapshark.com/redirect?dealID=${game.dealID}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.mainContainer}>
      
      <SubscriptionModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)}
        gameTitle={game.title}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.innerContainer}>
          <Image source={{ uri: game.thumb }} style={styles.image} />
          
          <Text style={styles.title}>{game.title}</Text>
          
          <View style={styles.priceContainer}>
            {hasDiscount && (
              <Text style={styles.oldPrice}>${game.normalPrice}</Text>
            )}
            <Text style={styles.newPrice}>${game.salePrice}</Text>
            {hasDiscount && (
              <View style={styles.badge}>
                  <Text style={styles.badgeText}>-{Math.round(savings)}%</Text>
              </View>
            )}
          </View>

          <TouchableOpacity style={styles.steamButton} onPress={openInSteam} activeOpacity={0.8}>
            <Text style={styles.steamButtonText}>ВІДКРИТИ В STEAM</Text>
          </TouchableOpacity>
          
          {/* 5. Кнопка змінює стиль залежно від isSubscribed */}
          <TouchableOpacity 
            style={[styles.subscribeButton, isSubscribed && styles.subscribedButtonActive]} 
            onPress={toggleSubscription}
            activeOpacity={0.7}
          >
            <Text style={[styles.subscribeText, isSubscribed && styles.subscribeTextActive]}>
              {isSubscribed ? "✅ ВИ ПІДПИСАНІ" : "🔔 ПОВІДОМИТИ ПРО ЗНИЖКУ"}
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#1b2838' },
  scrollContent: { flexGrow: 1, justifyContent: 'center', paddingBottom: 20 },
  innerContainer: { alignItems: 'center', padding: 20, width: '100%', maxWidth: 600, alignSelf: 'center' },
  image: { width: '100%', height: 250, resizeMode: 'contain', marginBottom: 25 },
  title: { fontSize: 26, color: '#c7d5e0', fontWeight: 'bold', textAlign: 'center', marginBottom: 25 },
  priceContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 35 },
  oldPrice: { color: '#888', textDecorationLine: 'line-through', fontSize: 20, marginRight: 12 },
  newPrice: { color: '#fff', fontSize: 32, fontWeight: 'bold', marginRight: 15 },
  badge: { backgroundColor: '#4c6b22', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6 },
  badgeText: { color: '#a4d007', fontWeight: 'bold', fontSize: 18 },
  steamButton: {
    backgroundColor: '#66c0f4', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 30,
    elevation: 5, marginBottom: 15, width: '100%', maxWidth: 350, alignItems: 'center',
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  steamButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 18, textTransform: 'uppercase', letterSpacing: 1 },
  
  // Стилі для кнопки підписки
  subscribeButton: {
    backgroundColor: 'transparent', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 30,
    borderWidth: 1, borderColor: '#8f98a0', width: '100%', maxWidth: 350, alignItems: 'center',
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  // Стиль активної кнопки (зелений)
  subscribedButtonActive: {
    backgroundColor: '#4c6b22', 
    borderColor: '#4c6b22',
  },
  subscribeText: { color: '#8f98a0', fontWeight: 'bold', fontSize: 14 },
  subscribeTextActive: { color: '#fff' }
});