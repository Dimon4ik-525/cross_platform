import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { COLORS } from '../theme/colors';

export default function UsersScreen() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      
      <View style={styles.content}>
        <Text style={styles.headerTitle}>СПІЛЬНОТА VORTEX</Text>

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
  content: { flex: 1, width: '100%' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  
  headerTitle: { color: COLORS.textPrimary, fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 15, letterSpacing: 1 },

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