import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { COLORS } from '../theme/colors';

export default function UsersScreen() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation(); // 🔥 Додали навігацію

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Не вдалося отримати дані');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError('Помилка при завантаженні даних: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const renderUser = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.avatarPlaceholder}>
        <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.email}>📧 {item.email}</Text>
        <Text style={styles.company}>🏢 {item.company.name}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />

      {/* 🔥 ФІРМОВА ПАНЕЛЬ НАВІГАЦІЇ VORTEX */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          <Text style={styles.backText} numberOfLines={1}>НАЗАД</Text>
        </TouchableOpacity>
        
        <Text style={styles.screenTitleText}>СПІЛЬНОТА</Text>
        
        <View style={styles.spacer} /> 
      </View>
      
      <View style={styles.content}>
        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>Завантаження списку...</Text>
          </View>
        ) : error ? (
          <View style={styles.center}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <FlatList
            data={users}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderUser}
            contentContainerStyle={{ padding: 15, paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, justifyContent: 'space-between' },
  
  /* 🔥 СТИЛІ НАВІГАЦІЇ VORTEX */
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
  backBtn: { flexDirection: 'row', alignItems: 'center', width: 100 },
  spacer: { width: 100 }, 
  backText: { color: COLORS.primary, fontWeight: 'bold', marginLeft: 5 },
  screenTitleText: { color: COLORS.textPrimary, fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },

  content: { flex: 1, width: '100%' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  
  card: {
    flexDirection: 'row', backgroundColor: COLORS.surfaceDark, marginBottom: 12,
    padding: 15, borderRadius: 10, alignItems: 'center',
    borderWidth: 1, borderColor: COLORS.surface
  },
  avatarPlaceholder: {
    width: 50, height: 50, borderRadius: 25, backgroundColor: COLORS.surface,
    justifyContent: 'center', alignItems: 'center', marginRight: 15,
    borderWidth: 2, borderColor: COLORS.primary
  },
  avatarText: { color: COLORS.primary, fontSize: 24, fontWeight: 'bold' },
  
  info: { flex: 1 },
  name: { color: COLORS.textPrimary, fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  email: { color: COLORS.textSecondary, fontSize: 14, marginBottom: 2 },
  company: { color: COLORS.success, fontSize: 12 },

  loadingText: { color: COLORS.textMuted, marginTop: 10 },
  errorText: { color: COLORS.danger, fontSize: 16, textAlign: 'center' }
});