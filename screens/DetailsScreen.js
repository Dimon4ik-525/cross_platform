import React from 'react';
import { View, Text, StyleSheet, Image, Linking, TouchableOpacity, Platform, ScrollView } from 'react-native';
// 1. Імпортуємо Футер
import Footer from '../components/Footer';

export default function DetailsScreen({ route }) {
  const { game } = route.params; 

  const openInSteam = () => {
    const url = `https://www.cheapshark.com/redirect?dealID=${game.dealID}`;
    Linking.openURL(url);
  };

  return (
    // 2. Головний контейнер на весь екран
    <View style={styles.mainContainer}>
      
      {/* 3. ScrollView займає все доступне місце посередині */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.innerContainer}>
          <Image source={{ uri: game.thumb }} style={styles.image} />
          
          <Text style={styles.title}>{game.title}</Text>
          
          <View style={styles.priceContainer}>
            <Text style={styles.oldPrice}>${game.normalPrice}</Text>
            <Text style={styles.newPrice}>${game.salePrice}</Text>
            <View style={styles.badge}>
                <Text style={styles.badgeText}>-{Math.round(game.savings)}%</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.steamButton} onPress={openInSteam} activeOpacity={0.8}>
            <Text style={styles.steamButtonText}>ВІДКРИТИ В STEAM</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* 4. Футер завжди внизу (поза ScrollView) */}
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  // Головний контейнер, який тримає структуру
  mainContainer: {
    flex: 1,
    backgroundColor: '#1b2838',
  },
  // Контент всередині скролу
  scrollContent: {
    flexGrow: 1, 
    justifyContent: 'center',
    paddingBottom: 20, // Відступ, щоб контент не прилипав до футера при прокрутці
  },
  innerContainer: {
    alignItems: 'center',
    padding: 20,
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    marginBottom: 25,
  },
  title: {
    fontSize: 26,
    color: '#c7d5e0',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 35,
  },
  oldPrice: {
    color: '#888',
    textDecorationLine: 'line-through',
    fontSize: 20,
    marginRight: 12,
  },
  newPrice: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginRight: 15,
  },
  badge: {
    backgroundColor: '#4c6b22',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  badgeText: {
    color: '#a4d007',
    fontWeight: 'bold',
    fontSize: 18,
  },
  steamButton: {
    backgroundColor: '#66c0f4',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5,
    marginBottom: 20,
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  steamButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});