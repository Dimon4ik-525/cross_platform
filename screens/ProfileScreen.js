import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Platform, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // ІМПОРТ ДЛЯ РОБОТИ З ГАЛЕРЕЄЮ
import { UserContext } from '../context/UserContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../theme/colors'; // <-- ПІДКЛЮЧИЛИ ТЕМУ

export default function ProfileScreen() {
  const { userName, userAvatar, saveUserName, saveUserAvatar, clearUserName } = useContext(UserContext);
  const navigation = useNavigation();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(userName === 'Геймер' ? '' : userName);
  }, [userName]);

  // --- ФУНКЦІЯ ДЛЯ ВСТАНОВЛЕННЯ АВАТАРКИ (ЛАБА 11) ---
  const handlePickAvatar = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Доступ заборонено ❌', 
        'Нам потрібен доступ до галереї, щоб ти міг встановити круту аватарку!'
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], 
      quality: 0.8,
    });

    if (!result.canceled) {
      saveUserAvatar(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (inputValue.trim()) {
      saveUserName(inputValue);
      if (Platform.OS === 'web') alert('Ім\'я збережено!');
    }
  };

  const handleClear = () => {
    clearUserName();
    setInputValue('');
    if (Platform.OS === 'web') alert('Пам\'ять очищено!');
  };

  return (
    <View style={styles.container}>
      <Header />
      
      <ScrollView contentContainerStyle={styles.content}>
        
        {/* --- КЛІКАБЕЛЬНА АВАТАРКА --- */}
        <TouchableOpacity style={styles.avatarWrapper} onPress={handlePickAvatar}>
           {userAvatar ? (
             <Image source={{ uri: userAvatar }} style={styles.avatarImage} />
           ) : (
             <View style={styles.avatarPlaceholder}>
               <Text style={styles.avatarText}>{userName.charAt(0).toUpperCase()}</Text>
             </View>
           )}
           <Text style={styles.editAvatarText}>📷 Змінити фото</Text>
        </TouchableOpacity>

        <Text style={styles.savedNameLabel}>
          Збережене ім'я: <Text style={styles.highlight}>{userName}</Text>
        </Text>
        
        <TextInput 
          style={styles.input}
          value={inputValue}
          onChangeText={setInputValue} 
          placeholder="Введіть нове ім'я..."
          placeholderTextColor={COLORS.textMuted}
        />

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

        {/* --- НАШІ КНОПКИ З УСІХ ЛАБОРАТОРНИХ --- */}

        {/* Лаба 11: Карта */}
        <TouchableOpacity 
          style={[styles.labButton, { borderColor: COLORS.primary }]} 
          onPress={() => navigation.navigate('Map')}
        >
          <Text style={styles.labButtonText}>📍 РАДАР ГРАВЦІВ</Text>
          <Text style={styles.labSubText}>(GPS, Геолокація та Регіони)</Text>
        </TouchableOpacity>

        {/* Лаба 11: Сенсори */}
        <TouchableOpacity 
          style={[styles.labButton, { marginTop: 15, borderColor: COLORS.primary }]} 
          onPress={() => navigation.navigate('Sensors')}
        >
          <Text style={styles.labButtonText}>📱 ТЕСТ ГЕЙМПАДА</Text>
          <Text style={styles.labSubText}>(Акселерометр та Гіроскоп)</Text>
        </TouchableOpacity>

        <View style={styles.separator} />

        {/* Старі лаби */}
        <TouchableOpacity style={styles.labButton} onPress={() => navigation.navigate('Users')}>
          <Text style={styles.labButtonText}>👥 ВІДКРИТИ СПИСОК ГЕЙМЕРІВ</Text>
          <Text style={styles.labSubText}>(Лаба 7: API запити)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.labButton, styles.supportButton]} onPress={() => navigation.navigate('Support')}>
          <Text style={styles.labButtonText}>✉️ НАПИСАТИ В ПІДТРИМКУ</Text>
          <Text style={styles.labSubText}>(Лаба 8: Форми)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.labButton, { marginTop: 15, borderColor: COLORS.success }]} onPress={() => navigation.navigate('Gallery')}>
          <Text style={styles.labButtonText}>🖼 ВІДКРИТИ ГАЛЕРЕЮ</Text>
          <Text style={styles.labSubText}>(Лаба 10: Зображення)</Text>
        </TouchableOpacity>

      </ScrollView>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, justifyContent: 'space-between' },
  content: { flexGrow: 1, alignItems: 'center', paddingTop: 30, paddingHorizontal: 20 },
  
  avatarWrapper: { alignItems: 'center', marginBottom: 20 },
  avatarPlaceholder: { width: 100, height: 100, borderRadius: 50, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: COLORS.textPrimary },
  avatarImage: { width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: COLORS.primary },
  avatarText: { fontSize: 40, fontWeight: 'bold', color: COLORS.textPrimary },
  editAvatarText: { color: COLORS.textMuted, fontSize: 12, marginTop: 8, fontWeight: 'bold' },

  savedNameLabel: { color: COLORS.textSecondary, fontSize: 18, marginBottom: 15, fontWeight: 'bold' },
  highlight: { color: COLORS.primary },
  
  input: { width: '100%', backgroundColor: COLORS.surface, color: COLORS.textPrimary, fontSize: 18, padding: 15, borderRadius: 5, borderWidth: 1, borderColor: COLORS.border, marginBottom: 20, ...Platform.select({ web: { outlineStyle: 'none' } }) },
  
  actionButtonsRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 10 },
  actionBtn: { flex: 1, paddingVertical: 15, borderRadius: 5, alignItems: 'center', ...Platform.select({ web: { cursor: 'pointer' } }) },
  saveBtn: { backgroundColor: COLORS.primary, marginRight: 10 },
  clearBtn: { backgroundColor: COLORS.surfaceDark, borderWidth: 1, borderColor: COLORS.danger },
  actionBtnText: { color: COLORS.textPrimary, fontWeight: 'bold', fontSize: 14 },
  
  hint: { color: COLORS.textMuted, fontSize: 14, alignSelf: 'flex-start', marginLeft: 10, marginTop: 10 },
  separator: { height: 1, backgroundColor: COLORS.surface, width: '100%', marginVertical: 30 },
  
  labButton: { backgroundColor: COLORS.surfaceDark, paddingVertical: 15, paddingHorizontal: 20, borderRadius: 10, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center', width: '100%', ...Platform.select({ web: { cursor: 'pointer' } }) },
  supportButton: { marginTop: 15, borderColor: COLORS.danger },
  labButtonText: { color: COLORS.primary, fontWeight: 'bold', fontSize: 16 },
  labSubText: { color: COLORS.border, fontSize: 12, marginTop: 5 }
});