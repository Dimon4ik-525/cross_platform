import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Sentry from 'sentry-expo'; 

import Header from '../components/Header';
import Footer from '../components/Footer';
import { COLORS } from '../theme/colors';

export default function AdminScreen() {
  const navigation = useNavigation();

  const crashMyApp = () => {
    if (Platform.OS === 'web') {
      // Бронебійний варіант для браузера
      const confirmCrash = window.confirm("УВАГА! Зараз додаток впаде. Згенерувати фатальну помилку?");
      if (confirmCrash) {
        throw new Error("Test Sentry Error від студента!");
      }
    } else {
      // Красивий варіант для мобільних пристроїв
      Alert.alert(
        "УВАГА!", 
        "Зараз додаток впаде. Звіт полетить у Sentry.",
        [
          { text: "Відміна", style: "cancel" },
          { 
            text: "ЗЛАМАТИ ДОДАТОК", 
            style: "destructive", 
            onPress: () => {
              throw new Error("Test Sentry Error від студента!");
            }
          }
        ]
      );
    }
  };

  const handleTestEvent = () => {
    Alert.alert('Успіх', 'Тут буде відправлятися тестова подія в Amplitude.');
  };

  return (
    <View style={styles.container}>
      <Header />
      
      <View style={[styles.navBar, { borderBottomColor: COLORS.danger }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.danger} />
          <Text style={[styles.backText, { color: COLORS.danger }]} numberOfLines={1}>НАЗАД</Text>
        </TouchableOpacity>
        
        <Text style={[styles.screenTitleText, { color: COLORS.danger }]}>DEV PANEL</Text>
        
        <View style={styles.spacer} /> 
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* 🔥 ВИПРАВЛЕНИЙ БЛОК: Тепер він яскраво-жовтий */}
        <View style={styles.warningHeader}>
          <Ionicons name="warning-outline" size={40} color="#ffb703" />
          <Text style={styles.warningTitle}>НЕБЕЗПЕЧНА ЗОНА</Text>
          <Text style={styles.warningDesc}>
            Ця панель має доступ до критичних систем додатка. Усі дії тут логуються і відправляються на сервери моніторингу.
          </Text>
        </View>

        <View style={[styles.card, { borderColor: COLORS.danger }]}>
          <Text style={[styles.cardTitle, { color: COLORS.danger }]}>Sentry (Моніторинг збоїв)</Text>
          <Text style={styles.cardDesc}>
            Перевірка роботи системи перехоплення фатальних помилок (Runtime Crashes).
          </Text>
          <TouchableOpacity style={styles.crashBtn} onPress={crashMyApp}>
            <Ionicons name="skull-outline" size={20} color={COLORS.surfaceDark} style={{ marginRight: 8 }} />
            <Text style={styles.crashBtnText}>ЗГЕНЕРУВАТИ ФАТАЛЬНУ ПОМИЛКУ</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.card, { borderColor: '#3b82f6' }]}>
          <Text style={[styles.cardTitle, { color: '#3b82f6' }]}>Amplitude (Аналітика)</Text>
          <Text style={styles.cardDesc}>
            Перевірка зв'язку з сервером продуктової аналітики та відправка тестового івенту.
          </Text>
          <TouchableOpacity style={styles.eventBtn} onPress={handleTestEvent}>
            <Ionicons name="stats-chart" size={20} color={COLORS.surfaceDark} style={{ marginRight: 8 }} />
            <Text style={styles.eventBtnText}>ВІДПРАВИТИ ТЕСТОВУ ПОДІЮ</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  
  navBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 12, borderBottomWidth: 1, backgroundColor: COLORS.surfaceDark },
  backBtn: { flexDirection: 'row', alignItems: 'center', width: 100, ...Platform.select({ web: { cursor: 'pointer' } }) },
  spacer: { width: 100 }, 
  backText: { fontWeight: 'bold', marginLeft: 5 },
  screenTitleText: { fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },

  content: { padding: 20, alignItems: 'center', paddingBottom: 40 },
  
  // 🔥 ОСЬ ТУТ ЯСКАРВІ КОЛЬОРИ ЗАМІСТЬ COLORS.warning
  warningHeader: { alignItems: 'center', marginBottom: 30, backgroundColor: 'rgba(255, 183, 3, 0.1)', padding: 20, borderRadius: 10, borderWidth: 1, borderColor: '#ffb703', width: '100%' },
  warningTitle: { color: '#ffb703', fontSize: 20, fontWeight: 'bold', marginTop: 10, marginBottom: 5, letterSpacing: 2 },
  warningDesc: { color: '#e2e8f0', textAlign: 'center', fontSize: 13, lineHeight: 20 },

  card: { width: '100%', backgroundColor: COLORS.surfaceDark, padding: 20, borderRadius: 10, borderWidth: 1, marginBottom: 20 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  cardDesc: { color: COLORS.textSecondary, fontSize: 13, marginBottom: 20, lineHeight: 20 },

  crashBtn: { flexDirection: 'row', backgroundColor: COLORS.danger, padding: 15, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  crashBtnText: { color: COLORS.surfaceDark, fontWeight: 'bold', fontSize: 14, letterSpacing: 1, textAlign: 'center' },

  eventBtn: { flexDirection: 'row', backgroundColor: '#3b82f6', padding: 15, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  eventBtnText: { color: COLORS.surfaceDark, fontWeight: 'bold', fontSize: 14, letterSpacing: 1, textAlign: 'center' }
});