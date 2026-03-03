import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { UserContext } from '../context/UserContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  // Дістаємо поточне ім'я та нові функції з контексту
  const { userName, saveUserName, clearUserName } = useContext(UserContext);
  const navigation = useNavigation();

  // Локальний стан для поля вводу
  const [inputValue, setInputValue] = useState('');

  // Підставляємо поточне ім'я в поле вводу при завантаженні екрану
  useEffect(() => {
    setInputValue(userName === 'Геймер' ? '' : userName);
  }, [userName]);

  // Обробник збереження
  const handleSave = () => {
    if (inputValue.trim()) {
      saveUserName(inputValue);
      if (Platform.OS === 'web') alert('Ім\'я успішно збережено в AsyncStorage!');
    }
  };

  // Обробник очищення
  const handleClear = () => {
    clearUserName();
    setInputValue('');
    if (Platform.OS === 'web') alert('Пам\'ять AsyncStorage очищено!');
  };

  return (
    <View style={styles.container}>
      <Header />
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.avatarContainer}>
           <View style={styles.avatarPlaceholder}>
             <Text style={styles.avatarText}>{userName.charAt(0).toUpperCase()}</Text>
           </View>
        </View>

        {/* Вимоги Лабораторної №9: Відображення збереженого імені */}
        <Text style={styles.savedNameLabel}>
          Збережене ім'я: <Text style={styles.highlight}>{userName}</Text>
        </Text>
        
        <TextInput 
          style={styles.input}
          value={inputValue}
          onChangeText={setInputValue} 
          placeholder="Введіть нове ім'я..."
          placeholderTextColor="#8f98a0"
        />

        {/* --- КНОПКИ ДЛЯ ЛАБОРАТОРНОЇ 9 --- */}
        <View style={styles.actionButtonsRow}>
          <TouchableOpacity style={[styles.actionBtn, styles.saveBtn]} onPress={handleSave}>
            <Text style={styles.actionBtnText}>💾 ЗБЕРЕГТИ</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionBtn, styles.clearBtn]} onPress={handleClear}>
            <Text style={styles.actionBtnText}>🗑 ОЧИСТИТИ</Text>
          </TouchableOpacity>
        </View>

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

        {/* Кнопка Лаби 8 */}
        <TouchableOpacity 
          style={[styles.labButton, styles.supportButton]} 
          onPress={() => navigation.navigate('Support')}
        >
          <Text style={styles.labButtonText}>✉️ НАПИСАТИ В ПІДТРИМКУ</Text>
          <Text style={styles.labSubText}>(Робота з формами та валідацією)</Text>
        </TouchableOpacity>

        {/* ---> ДОДАЙ ЦЮ КНОПКУ (Лаба 10) <--- */}
        <TouchableOpacity 
          style={[styles.labButton, { marginTop: 15, borderColor: '#a4d007' }]} 
          onPress={() => navigation.navigate('Gallery')}
        >
          <Text style={styles.labButtonText}>🖼 ВІДКРИТИ ГАЛЕРЕЮ</Text>
          <Text style={styles.labSubText}>(Робота з зображеннями)</Text>
        </TouchableOpacity>

      </ScrollView>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1b2838', justifyContent: 'space-between' },
  content: { flexGrow: 1, alignItems: 'center', paddingTop: 30, paddingHorizontal: 20 },
  
  avatarContainer: { marginBottom: 20 },
  avatarPlaceholder: {
    width: 100, height: 100, borderRadius: 50, backgroundColor: '#66c0f4',
    justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#fff'
  },
  avatarText: { fontSize: 40, fontWeight: 'bold', color: '#fff' },

  savedNameLabel: { color: '#c7d5e0', fontSize: 18, marginBottom: 15, fontWeight: 'bold' },
  highlight: { color: '#66c0f4' },

  input: {
    width: '100%', backgroundColor: '#2a475e', color: '#fff', fontSize: 18,
    padding: 15, borderRadius: 5, borderWidth: 1, borderColor: '#4b6b8b', marginBottom: 20,
    ...Platform.select({ web: { outlineStyle: 'none' } })
  },
  
  actionButtonsRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 10 },
  actionBtn: { flex: 1, paddingVertical: 15, borderRadius: 5, alignItems: 'center', ...Platform.select({ web: { cursor: 'pointer' } }) },
  saveBtn: { backgroundColor: '#66c0f4', marginRight: 10 },
  clearBtn: { backgroundColor: '#3d4450', borderWidth: 1, borderColor: '#ff5252' },
  actionBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },

  hint: { color: '#8f98a0', fontSize: 14, alignSelf: 'flex-start', marginLeft: 10, marginTop: 10 },

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
  supportButton: {
    marginTop: 15,
    borderColor: '#ff5252', 
  },
  labButtonText: { color: '#66c0f4', fontWeight: 'bold', fontSize: 16 },
  labSubText: { color: '#4b6b8b', fontSize: 12, marginTop: 5 }
});