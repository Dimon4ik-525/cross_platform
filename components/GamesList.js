import React, { useState, useEffect } from 'react';
import { 
  View, Text, FlatList, StyleSheet, Image, 
  ActivityIndicator, TextInput, TouchableOpacity, Keyboard, Platform 
} from 'react-native';
import { COLORS } from '../theme/colors';

export default function GamesList({ navigation }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState('best');

  const fetchGames = (filter, query = '') => {
    setLoading(true);
    
    // Використовуємо ТІЛЬКИ /deals для всього! Він віддає правильні ціни та знижки.
    let url = `https://www.cheapshark.com/api/1.0/deals?storeID=1&pageSize=30`;

    if (query) {
      // Додаємо пошуковий запит
      url += `&title=${encodeURIComponent(query)}`;
    } else {
      if (filter === 'best') url += '&sortBy=Savings&onSale=1';
      if (filter === 'cheap') url += '&upperPrice=5&sortBy=Price&onSale=1';
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let finalData = data;

        // Для категорій залишаємо лише ті, де дійсно є знижка
        if (!query) {
          finalData = data.filter(game => {
            const oldP = parseFloat(game.normalPrice || 0);
            const newP = parseFloat(game.salePrice || 0);
            return oldP > newP;
          });
        }
        
        setGames(finalData);
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
    if(searchText.trim() === '') return;
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
      <View style={styles.topSection}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Пошук ігор..."
            placeholderTextColor={COLORS.textMuted}
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>🔍</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filtersContainer}>
          <FilterButton title="🔥 Гарячі знижки" isActive={activeFilter === 'best'} onPress={() => handleCategoryPress('best')} />
          <FilterButton title="💰 < $5" isActive={activeFilter === 'cheap'} onPress={() => handleCategoryPress('cheap')} />
        </View>
      </View>

      <View style={styles.listContainerRelative}>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 50 }} />
        ) : games.length === 0 ? (
          <Text style={{color: COLORS.textMuted, textAlign: 'center', marginTop: 50}}>Ігор не знайдено 😔</Text>
        ) : (
          <FlatList
            data={games}
            keyExtractor={(item, index) => item.dealID || item.gameID || index.toString()}
            contentContainerStyle={{ padding: 10, paddingBottom: 20 }}
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
    // МАГІЯ ТУТ: Беремо title, а якщо немає - беремо external
    const gameTitle = item.title || item.external || 'Невідома назва';

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Details', { game: item })}>
            <View style={styles.card}>
                <Image source={{ uri: item.thumb }} style={styles.thumb} resizeMode="cover" />
                <View style={styles.info}>
                    <Text style={styles.title} numberOfLines={2}>{gameTitle}</Text>
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
  <TouchableOpacity style={[styles.filterBtn, isActive && styles.filterBtnActive]} onPress={onPress}>
    <Text style={[styles.filterText, isActive && styles.filterTextActive]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  mainWrapper: { flex: 1, width: '100%', backgroundColor: COLORS.background, display: 'flex', flexDirection: 'column' },
  topSection: { flexShrink: 0, zIndex: 2, backgroundColor: COLORS.background },
  listContainerRelative: { flex: 1, width: '100%', position: 'relative', backgroundColor: COLORS.background },
  absoluteList: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, ...Platform.select({ web: { overflowY: 'auto', height: '100%' } }) },
  searchContainer: { flexDirection: 'row', padding: 10, backgroundColor: COLORS.surfaceDark },
  input: { flex: 1, backgroundColor: COLORS.surface, color: COLORS.textSecondary, padding: 10, borderRadius: 5, marginRight: 10, ...Platform.select({ web: { outlineStyle: 'none' } }) },
  searchButton: { backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15, borderRadius: 5, ...Platform.select({ web: { cursor: 'pointer' } }) },
  searchButtonText: { fontSize: 18 },
  filtersContainer: { flexDirection: 'row', justifyContent: 'center', gap: 20, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: COLORS.surface },
  filterBtn: { paddingVertical: 6, paddingHorizontal: 15, borderRadius: 20, borderWidth: 1, borderColor: COLORS.border, ...Platform.select({ web: { cursor: 'pointer' } }) },
  filterBtnActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  filterText: { color: COLORS.textMuted, fontWeight: 'bold' },
  filterTextActive: { color: COLORS.surfaceDark }, 
  card: { flexDirection: 'row', backgroundColor: COLORS.surfaceDark, marginBottom: 8, height: 70, alignItems: 'center', paddingRight: 10, borderRadius: 4, overflow: 'hidden', ...Platform.select({ web: { cursor: 'pointer' } }) },
  thumb: { width: 120, height: '100%' },
  info: { flex: 1, paddingHorizontal: 10, justifyContent: 'center' },
  title: { color: COLORS.textSecondary, fontSize: 13, fontWeight: 'bold' },
  priceBlock: { flexDirection: 'row', alignItems: 'center' },
  discountBadge: { backgroundColor: COLORS.primary, paddingVertical: 2, paddingHorizontal: 6, marginRight: 8, borderRadius: 4 },
  discountText: { color: COLORS.surfaceDark, fontWeight: 'bold', fontSize: 14 },
  priceColumn: { alignItems: 'flex-end' },
  oldPrice: { color: COLORS.textMuted, fontSize: 11, textDecorationLine: 'line-through' },
  newPrice: { color: COLORS.textSecondary, fontSize: 14, fontWeight: 'bold' }
});