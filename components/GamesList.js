import React, { useState, useEffect } from 'react';
import { 
  View, Text, FlatList, StyleSheet, Image, 
  ActivityIndicator, TextInput, TouchableOpacity, Keyboard, Platform 
} from 'react-native';

export default function GamesList({ navigation }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState('best');

  const fetchGames = (filter, query = '') => {
    setLoading(true);
    let url = 'https://www.cheapshark.com/api/1.0/deals?storeID=1&pageSize=20';

    if (query) {
      url += `&title=${query}`;
    } else {
      if (filter === 'best') url += '&sortBy=Savings&onSale=1';
      if (filter === 'cheap') url += '&upperPrice=5&sortBy=Price&onSale=1';
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchGames('best');
  }, []);

  const handleSearch = () => {
    Keyboard.dismiss();
    fetchGames(null, searchText);
    setActiveFilter('');
  };

  const handleCategoryPress = (category) => {
    setSearchText('');
    setActiveFilter(category);
    fetchGames(category);
  };

  return (
    <View style={styles.mainWrapper}>
      
      {/* 1. Верхня частина (Пошук + Фільтри) */}
      <View style={styles.topSection}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Пошук гри..."
            placeholderTextColor="#8f98a0"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>🔍</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filtersContainer}>
          <FilterButton 
            title="🔥 Гарячі знижки" 
            isActive={activeFilter === 'best'} 
            onPress={() => handleCategoryPress('best')} 
          />
          <FilterButton 
            title="💰 < $5" 
            isActive={activeFilter === 'cheap'} 
            onPress={() => handleCategoryPress('cheap')} 
          />
        </View>
      </View>

      {/* 2. Контейнер для списку */}
      {/* position: relative важливо, щоб абсолютний скрол знав межі */}
      <View style={styles.listContainerRelative}>
        {loading ? (
          <ActivityIndicator size="large" color="#66c0f4" style={{ marginTop: 50 }} />
        ) : (
          <FlatList
            data={games}
            keyExtractor={(item) => item.dealID}
            contentContainerStyle={{ padding: 10, paddingBottom: 20 }}
            
            // !!! ЗАЛІЗНИЙ МЕТОД !!!
            // Ми відриваємо список від потоку і кажемо:
            // "Приклейся до всіх країв батьківського контейнера"
            style={styles.absoluteList}
            
            renderItem={({ item }) => <GameCard item={item} navigation={navigation} />}
          />
        )}
      </View>
    </View>
  );
}

const GameCard = ({ item, navigation }) => {
    const hasDiscount = parseFloat(item.savings) > 0;
    return (
        <TouchableOpacity 
            activeOpacity={0.7} 
            onPress={() => navigation.navigate('Details', { game: item })}
        >
            <View style={styles.card}>
                <Image source={{ uri: item.thumb }} style={styles.thumb} resizeMode="cover" />
                <View style={styles.info}>
                    <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                </View>
                <View style={styles.priceBlock}>
                    {hasDiscount && (
                    <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>-{Math.round(item.savings)}%</Text>
                    </View>
                    )}
                    <View style={styles.priceColumn}>
                    {hasDiscount && (
                        <Text style={styles.oldPrice}>${item.normalPrice}</Text>
                    )}
                    <Text style={styles.newPrice}>${item.salePrice}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const FilterButton = ({ title, isActive, onPress }) => (
  <TouchableOpacity 
    style={[styles.filterBtn, isActive && styles.filterBtnActive]} 
    onPress={onPress}
  >
    <Text style={[styles.filterText, isActive && styles.filterTextActive]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1, // Займає все місце в HomeScreen
    width: '100%',
    backgroundColor: '#1b2838',
    display: 'flex',
    flexDirection: 'column',
  },
  topSection: {
    flexShrink: 0, // Завжди своєї висоти, не стискається
    zIndex: 2,
    backgroundColor: '#1b2838',
  },
  
  // Контейнер, який займає все, що лишилося
  listContainerRelative: {
    flex: 1, 
    width: '100%',
    position: 'relative', // Це база для абсолютного позиціонування
    backgroundColor: '#1b2838',
  },

  // !!! ГОЛОВНЕ ВИПРАВЛЕННЯ !!!
  absoluteList: {
    position: 'absolute', // Вириваємо з потоку
    top: 0,
    left: 0,
    right: 0,
    bottom: 0, // Розтягуємо до самого низу батька
    // Специфічно для вебу вмикаємо скрол
    ...Platform.select({
      web: {
        overflowY: 'auto',
        height: '100%',
      }
    })
  },

  // Стилі компонентів
  searchContainer: { flexDirection: 'row', padding: 10, backgroundColor: '#171a21' },
  input: { flex: 1, backgroundColor: '#2a475e', color: '#c7d5e0', padding: 10, borderRadius: 5, marginRight: 10, ...Platform.select({ web: { outlineStyle: 'none' } }) },
  searchButton: { backgroundColor: '#66c0f4', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15, borderRadius: 5, ...Platform.select({ web: { cursor: 'pointer' } }) },
  searchButtonText: { fontSize: 18 },
  filtersContainer: { flexDirection: 'row', justifyContent: 'center', gap: 20, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#2a475e' },
  filterBtn: { paddingVertical: 6, paddingHorizontal: 15, borderRadius: 20, borderWidth: 1, borderColor: '#4b6b8b', ...Platform.select({ web: { cursor: 'pointer' } }) },
  filterBtnActive: { backgroundColor: '#66c0f4', borderColor: '#66c0f4' },
  filterText: { color: '#8f98a0', fontWeight: 'bold' },
  filterTextActive: { color: '#fff' },
  card: { flexDirection: 'row', backgroundColor: '#16202d', marginBottom: 8, height: 70, alignItems: 'center', paddingRight: 10, borderRadius: 4, overflow: 'hidden', ...Platform.select({ web: { cursor: 'pointer' } }) },
  thumb: { width: 120, height: '100%' },
  info: { flex: 1, paddingHorizontal: 10, justifyContent: 'center' },
  title: { color: '#c7d5e0', fontSize: 13, fontWeight: 'bold' },
  priceBlock: { flexDirection: 'row', alignItems: 'center' },
  discountBadge: { backgroundColor: '#4c6b22', paddingVertical: 2, paddingHorizontal: 6, marginRight: 8 },
  discountText: { color: '#a4d007', fontWeight: 'bold', fontSize: 14 },
  priceColumn: { alignItems: 'flex-end' },
  oldPrice: { color: '#626366', fontSize: 11, textDecorationLine: 'line-through' },
  newPrice: { color: '#c7d5e0', fontSize: 14 }
});