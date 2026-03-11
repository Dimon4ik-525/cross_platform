import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Platform, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; 
import { Ionicons } from '@expo/vector-icons'; // 🔥 Додали іконки
import { UserContext } from '../context/UserContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../theme/colors'; 

export default function ProfileScreen() {
  const { userName, userAvatar, saveUserName, saveUserAvatar, clearUserName } = useContext(UserContext);
  const navigation = useNavigation();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(userName === 'Геймер' ? '' : userName);
  }, [userName]);

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
      
      {/* 🔥 НОВА ПАНЕЛЬ НАВІГАЦІЇ (ЗЛІВА ЗВЕРХУ) */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          <Text style={styles.backText}>НА ГОЛОВНУ</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitleText}>НАЛАШТУВАННЯ</Text>
        <View style={{ width: 140 }} /> {/* Компенсатор для вирівнювання по центру */}
      </View>

      <View style={styles.scrollWrapper}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          
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
              <Text style={styles.saveBtnText}>💾 ЗБЕРЕГТИ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, styles.clearBtn]} onPress={handleClear}>
              <Text style={styles.clearBtnText}>🗑 ОЧИСТИТИ</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.hint}>Це ім'я відображатиметься на головній сторінці.</Text>
          
          <View style={styles.separator} />

          {/* --- КНОПКИ ЛАБОРАТОРНИХ --- */}
          <TouchableOpacity 
            style={[styles.labButton, { borderColor: COLORS.primary, marginBottom: 15 }]} 
            onPress={() => navigation.navigate('Firebase')}
          >
            <Text style={styles.labButtonText}>☁️ ХМАРНІ НОТАТКИ</Text>
            <Text style={styles.labSubText}>(Лаба 12: Firebase Firestore)</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.labButton, { borderColor: COLORS.primary }]} 
            onPress={() => navigation.navigate('Map')}
          >
            <Text style={styles.labButtonText}>📍 РАДАР ГРАВЦІВ</Text>
            <Text style={styles.labSubText}>(GPS, Геолокація та Регіони)</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.labButton, { marginTop: 15, borderColor: COLORS.primary }]} 
            onPress={() => navigation.navigate('Sensors')}
          >
            <Text style={styles.labButtonText}>📱 ТЕСТ ГЕЙМПАДА</Text>
            <Text style={styles.labSubText}>(Акселерометр та Гіроскоп)</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

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
      </View>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  
  /* 🔥 СТИЛІ НАВІГАЦІЙНОЇ ПАНЕЛІ */
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
  backBtn: { flexDirection: 'row', alignItems: 'center', width: 140 },
  backText: { color: COLORS.primary, fontWeight: 'bold', marginLeft: 5 },
  screenTitleText: { color: COLORS.textPrimary, fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },

  scrollWrapper: { flex: 1, width: '100%', position: 'relative' },
  scrollView: {
    ...Platform.select({
      web: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflowY: 'auto' },
      default: { flex: 1 }
    })
  },
  content: { alignItems: 'center', paddingTop: 30, paddingHorizontal: 20, paddingBottom: 40, width: '100%', maxWidth: 700, alignSelf: 'center' },
  
  avatarWrapper: { alignItems: 'center', marginBottom: 20, ...Platform.select({ web: { cursor: 'pointer' } }) },
  avatarPlaceholder: { width: 100, height: 100, borderRadius: 50, backgroundColor: COLORS.surfaceDark, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: COLORS.primary },
  avatarImage: { width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: COLORS.primary },
  avatarText: { fontSize: 40, fontWeight: 'bold', color: COLORS.primary },
  editAvatarText: { color: COLORS.textMuted, fontSize: 12, marginTop: 8, fontWeight: 'bold' },

  savedNameLabel: { color: COLORS.textSecondary, fontSize: 18, marginBottom: 15, fontWeight: 'bold' },
  highlight: { color: COLORS.primary },
  
  input: { width: '100%', backgroundColor: COLORS.surface, color: COLORS.textPrimary, fontSize: 18, padding: 15, borderRadius: 5, borderWidth: 1, borderColor: COLORS.border, marginBottom: 20, ...Platform.select({ web: { outlineStyle: 'none' } }) },
  
  actionButtonsRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 10, gap: 10 },
  actionBtn: { flex: 1, paddingVertical: 15, borderRadius: 5, alignItems: 'center', justifyContent: 'center', ...Platform.select({ web: { cursor: 'pointer' } }) },
  saveBtn: { backgroundColor: COLORS.primary },
  clearBtn: { backgroundColor: COLORS.surfaceDark, borderWidth: 1, borderColor: COLORS.danger },
  
  saveBtnText: { color: COLORS.surfaceDark, fontWeight: 'bold', fontSize: 14 },
  clearBtnText: { color: COLORS.danger, fontWeight: 'bold', fontSize: 14 },
  
  hint: { color: COLORS.textMuted, fontSize: 14, alignSelf: 'flex-start', marginLeft: 5, marginTop: 5 },
  separator: { height: 1, backgroundColor: COLORS.border, width: '100%', marginVertical: 30 },
  
  labButton: { backgroundColor: COLORS.surfaceDark, paddingVertical: 15, paddingHorizontal: 20, borderRadius: 10, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center', width: '100%', ...Platform.select({ web: { cursor: 'pointer' } }) },
  supportButton: { marginTop: 15, borderColor: COLORS.danger },
  labButtonText: { color: COLORS.primary, fontWeight: 'bold', fontSize: 16 },
  labSubText: { color: COLORS.textMuted, fontSize: 12, marginTop: 5 } 
});