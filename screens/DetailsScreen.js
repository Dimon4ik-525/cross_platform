import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, Linking, TouchableOpacity, Platform, ScrollView, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

import { UserContext } from '../context/UserContext'; 
import { COLORS } from '../theme/colors'; 
import SubscriptionModal from '../components/SubscriptionModal';
import Footer from '../components/Footer';

export default function DetailsScreen({ route }) {
  const { game } = route.params;
  const { countryCode, countryName } = useContext(UserContext); 

  const [modalVisible, setModalVisible] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false); 

  // Беремо HD-банер прямо з серверів Steam
  const directSteamImage = game.steamAppID 
    ? `https://cdn.akamai.steamstatic.com/steam/apps/${game.steamAppID}/header.jpg`
    : game.thumb;

  const [highResImage, setHighResImage] = useState(directSteamImage);
  const [isSteamLoading, setIsSteamLoading] = useState(true);

  const cheapSharkSavings = parseFloat(game.savings);
  const [displayNewPrice, setDisplayNewPrice] = useState(`$${game.salePrice}`);
  const [displayOldPrice, setDisplayOldPrice] = useState(cheapSharkSavings > 0 ? `$${game.normalPrice}` : null);
  const [displayDiscount, setDisplayDiscount] = useState(cheapSharkSavings > 0 ? Math.round(cheapSharkSavings) : 0);

  const gameTitle = game.title || game.external || 'Невідома назва';

  useEffect(() => {
    checkSubscriptionStatus();
    fetchSteamPrice(); 
  }, []);

  const fetchSteamPrice = async () => {
    if (!game.steamAppID) {
      setIsSteamLoading(false);
      return; 
    }

    try {
      // Гарантуємо, що запит іде для України (або твоєї локації), додаємо антикеш
      const safeCountryCode = (countryCode === 'US' || !countryCode) ? 'UA' : countryCode;
      const cacheBuster = new Date().getTime();
      const targetUrl = `https://store.steampowered.com/api/appdetails?appids=${game.steamAppID}&cc=${safeCountryCode}&l=ukrainian&v=${cacheBuster}`;
      
      // 🔥 Використовуємо CodeTabs Proxy — він стабільніший за AllOrigins для Steam
      const fetchUrl = Platform.OS === 'web' 
        ? `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(targetUrl)}`
        : targetUrl;

      const res = await fetch(fetchUrl);
      
      // БРОНЕБІЙНИЙ ПАРСИНГ: Читаємо як текст, щоб не впасти, якщо Steam видасть HTML-помилку
      const textResponse = await res.text();
      let data = null;
      
      try {
        data = JSON.parse(textResponse);
      } catch (parseError) {
        console.warn("Steam відмовив у доступі (Rate Limit). Залишаємо базові ціни CheapShark.");
        setIsSteamLoading(false);
        return;
      }

      const steamData = data && data[game.steamAppID];

      // Якщо Steam успішно відповів чистими даними
      if (steamData && steamData.success && steamData.data) {
        if (steamData.data.is_free) {
          setDisplayNewPrice("Безкоштовно");
          setDisplayOldPrice(null);
          setDisplayDiscount(0);
        } else if (steamData.data.price_overview) {
          const overview = steamData.data.price_overview;
          
          // Отримуємо офіційну гривню від Steam!
          setDisplayNewPrice(overview.final_formatted);
          
          if (overview.discount_percent > 0) {
            setDisplayOldPrice(overview.initial_formatted);
            setDisplayDiscount(overview.discount_percent);
          } else {
            setDisplayOldPrice(null);
            setDisplayDiscount(0);
          }
        }
      }
    } catch (error) {
      console.error("Мережева помилка під час запиту до Steam:", error);
    } finally {
      setIsSteamLoading(false); 
    }
  };

  const checkSubscriptionStatus = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@subscriptions');
      const subs = jsonValue != null ? JSON.parse(jsonValue) : [];
      const exists = subs.find(item => item.dealID === game.dealID || item.gameID === game.gameID);
      setIsSubscribed(!!exists);
    } catch(e) {}
  };

  const toggleSubscription = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@subscriptions');
      let subs = jsonValue != null ? JSON.parse(jsonValue) : [];

      if (isSubscribed) {
        subs = subs.filter(item => item.dealID !== game.dealID && item.gameID !== game.gameID);
        Alert.alert("Відписались", "Гру видалено з ваших підписок.");
      } else {
        subs.push(game);
        setModalVisible(true); 
      }

      await AsyncStorage.setItem('@subscriptions', JSON.stringify(subs));
      setIsSubscribed(!isSubscribed); 
    } catch (e) {}
  };

  const openInSteam = () => {
    const url = game.steamAppID 
        ? `https://store.steampowered.com/app/${game.steamAppID}/`
        : `https://www.cheapshark.com/redirect?dealID=${game.dealID}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.mainContainer}>
      <SubscriptionModal visible={modalVisible} onClose={() => setModalVisible(false)} gameTitle={gameTitle} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.innerContainer}>
          
          <Image source={{ uri: highResImage }} style={styles.image} />
          
          <Text style={styles.title}>{gameTitle}</Text>
          <Text style={styles.regionText}>📍 Регіон: {countryName === 'США' ? 'Ukraine' : countryName}</Text>

          <View style={styles.priceContainer}>
            {isSteamLoading ? (
               <ActivityIndicator size="large" color={COLORS.primary} />
            ) : (
               <>
                 {displayOldPrice && (
                   <Text style={styles.oldPrice}>{displayOldPrice}</Text>
                 )}
                 <Text style={styles.newPrice}>{displayNewPrice}</Text>
                 
                 {displayDiscount > 0 && (
                   <View style={styles.badge}>
                       <Text style={styles.badgeText}>-{displayDiscount}%</Text>
                   </View>
                 )}
               </>
            )}
          </View>

          <TouchableOpacity style={styles.steamButton} onPress={openInSteam} activeOpacity={0.8}>
            <Text style={styles.steamButtonText}>ВІДКРИТИ В STEAM</Text>
          </TouchableOpacity>
          
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
  mainContainer: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { flexGrow: 1, justifyContent: 'center', paddingBottom: 20 },
  innerContainer: { alignItems: 'center', padding: 20, width: '100%', maxWidth: 600, alignSelf: 'center' },
  image: { width: '100%', height: 250, resizeMode: 'contain', marginBottom: 20 },
  title: { fontSize: 26, color: COLORS.textPrimary, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  regionText: { color: COLORS.primary, fontSize: 14, marginBottom: 20, fontWeight: 'bold' },
  priceContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 35, minHeight: 40 },
  oldPrice: { color: COLORS.textMuted, textDecorationLine: 'line-through', fontSize: 20, marginRight: 12 },
  newPrice: { color: COLORS.textPrimary, fontSize: 32, fontWeight: 'bold', marginRight: 15 },
  badge: { backgroundColor: COLORS.primary, paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6 },
  badgeText: { color: COLORS.surfaceDark, fontWeight: 'bold', fontSize: 18 },
  steamButton: { backgroundColor: COLORS.primary, paddingVertical: 15, paddingHorizontal: 40, borderRadius: 30, elevation: 5, marginBottom: 15, width: '100%', maxWidth: 350, alignItems: 'center', ...Platform.select({ web: { cursor: 'pointer' } }) },
  steamButtonText: { color: COLORS.surfaceDark, fontWeight: 'bold', fontSize: 18, textTransform: 'uppercase', letterSpacing: 1 },
  subscribeButton: { backgroundColor: 'transparent', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 30, borderWidth: 1, borderColor: COLORS.textMuted, width: '100%', maxWidth: 350, alignItems: 'center', ...Platform.select({ web: { cursor: 'pointer' } }) },
  subscribedButtonActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  subscribeText: { color: COLORS.textMuted, fontWeight: 'bold', fontSize: 14 },
  subscribeTextActive: { color: COLORS.surfaceDark }
});