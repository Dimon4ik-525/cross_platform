import React, { useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { UserContext } from '../context/UserContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const { userName, setUserName } = useContext(UserContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header />
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.avatarContainer}>
           <View style={styles.avatarPlaceholder}>
             <Text style={styles.avatarText}>{userName.charAt(0).toUpperCase()}</Text>
           </View>
        </View>

        <Text style={styles.label}>Ваш нікнейм:</Text>
        
        <TextInput 
          style={styles.input}
          value={userName}
          onChangeText={setUserName} 
          placeholder="Введіть ім'я"
          placeholderTextColor="#8f98a0"
        />

        <Text style={styles.hint}>Це ім'я відображатиметься на головній сторінці.</Text>

        <View style={styles.separator} />

        {/* Кнопка Лаби 7 */}
        <TouchableOpacity 
          style={styles.labButton}
          onPress={() => navigation.navigate('Users')}
        >
          <Text style={styles.labButtonText}>👥 ВІДКРИТИ СПИСОК ГЕЙМЕРІВ</Text>
          <Text style={styles.labSubText}>(API запит до jsonplaceholder)</Text>
        </TouchableOpacity>

        {/* --- НОВА КНОПКА ДЛЯ ЛАБОРАТОРНОЇ 8 --- */}
        <TouchableOpacity 
          style={[styles.labButton, styles.supportButton]} // Додатковий стиль
          onPress={() => navigation.navigate('Support')}
        >
          <Text style={styles.labButtonText}>✉️ НАПИСАТИ В ПІДТРИМКУ</Text>
          <Text style={styles.labSubText}>(Робота з формами та валідацією)</Text>
        </TouchableOpacity>

      </ScrollView>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1b2838', justifyContent: 'space-between' },
  content: { flexGrow: 1, alignItems: 'center', paddingTop: 50, paddingHorizontal: 20 },
  
  avatarContainer: { marginBottom: 30 },
  avatarPlaceholder: {
    width: 100, height: 100, borderRadius: 50, backgroundColor: '#66c0f4',
    justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#fff'
  },
  avatarText: { fontSize: 40, fontWeight: 'bold', color: '#fff' },

  label: { color: '#c7d5e0', fontSize: 18, alignSelf: 'flex-start', marginBottom: 10, marginLeft: 10 },
  input: {
    width: '100%', backgroundColor: '#2a475e', color: '#fff', fontSize: 18,
    padding: 15, borderRadius: 5, borderWidth: 1, borderColor: '#4b6b8b', marginBottom: 10
  },
  hint: { color: '#8f98a0', fontSize: 14, alignSelf: 'flex-start', marginLeft: 10 },

  separator: { height: 1, backgroundColor: '#2a475e', width: '100%', marginVertical: 30 },

  labButton: {
    backgroundColor: '#171a21',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#66c0f4',
    alignItems: 'center',
    width: '100%',
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  // Стиль відступу для кнопки підтримки
  supportButton: {
    marginTop: 15,
    borderColor: '#ff5252', // Червона обводка для контрасту
  },
  labButtonText: { color: '#66c0f4', fontWeight: 'bold', fontSize: 16 },
  labSubText: { color: '#4b6b8b', fontSize: 12, marginTop: 5 }
});