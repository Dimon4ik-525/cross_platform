import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function UsersScreen() {
  // 1. Стан для даних, завантаження та помилок
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Виконуємо запит при запуску екрану
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Запит до API з методички
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
          throw new Error('Не вдалося отримати дані');
        }

        const data = await response.json();
        setUsers(data); // Зберігаємо користувачів
      } catch (err) {
        setError('Помилка при завантаженні даних: ' + err.message);
      } finally {
        setLoading(false); // Вимикаємо спінер
      }
    };

    fetchUsers();
  }, []);

  // 3. Компонент для відображення одного користувача
  const renderUser = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.avatarPlaceholder}>
        <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
      </View>
      <View style={styles.info}>
        {/* Вимога: Ім'я жирним */}
        <Text style={styles.name}>{item.name}</Text>
        {/* Вимога: Email звичайним */}
        <Text style={styles.email}>📧 {item.email}</Text>
        <Text style={styles.company}>🏢 {item.company.name}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      
      <View style={styles.content}>
        <Text style={styles.headerTitle}>Спільнота Steam</Text>

        {/* 4. Обробка станів */}
        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#66c0f4" />
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
            contentContainerStyle={{ padding: 10, paddingBottom: 20 }}
          />
        )}
      </View>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1b2838', justifyContent: 'space-between' },
  content: { flex: 1, width: '100%' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  
  headerTitle: {
    color: '#fff', fontSize: 22, fontWeight: 'bold', 
    textAlign: 'center', marginVertical: 15, letterSpacing: 1
  },

  // Стилі картки користувача
  card: {
    flexDirection: 'row', backgroundColor: '#16202d', marginBottom: 10,
    padding: 15, borderRadius: 5, alignItems: 'center',
    borderWidth: 1, borderColor: '#2a475e'
  },
  avatarPlaceholder: {
    width: 50, height: 50, borderRadius: 25, backgroundColor: '#2a475e',
    justifyContent: 'center', alignItems: 'center', marginRight: 15,
    borderWidth: 1, borderColor: '#66c0f4'
  },
  avatarText: { color: '#66c0f4', fontSize: 24, fontWeight: 'bold' },
  
  info: { flex: 1 },
  name: { color: '#c7d5e0', fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  email: { color: '#8f98a0', fontSize: 14, marginBottom: 2 },
  company: { color: '#5c7e10', fontSize: 12 }, // Трохи зеленого для різноманіття

  loadingText: { color: '#8f98a0', marginTop: 10 },
  errorText: { color: '#ff5252', fontSize: 16, textAlign: 'center' }
});