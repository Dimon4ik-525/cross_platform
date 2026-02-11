import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function Header() {
  const navigation = useNavigation();

  return (
    <SafeAreaView 
      style={styles.safeContainer} 
      edges={['top']} 
    >
      <View style={styles.headerContent}>
        
        {/* 1. НОВА КНОПКА: Профіль (Зліва) */}
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Ionicons name="person-circle" size={28} color="#66c0f4" />
        </TouchableOpacity>

        {/* Логотип (Центр) */}
        <Text style={styles.logoText}>
          STEAM<Text style={styles.logoHighlight}>DEALS</Text>
        </Text>

        {/* 3. Кнопка дзвіночка (Справа) */}
        <TouchableOpacity 
          style={styles.bellButton}
          onPress={() => navigation.navigate('Subs')} 
        >
          <Ionicons name="notifications" size={24} color="#66c0f4" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: '#171a21',
    borderBottomWidth: 2,
    borderBottomColor: '#2a475e',
    width: '100%',
    shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4.65, elevation: 8,
  },
  headerContent: {
    width: '100%',
    alignItems: 'center', 
    justifyContent: 'center',
    paddingBottom: 15,
    paddingTop: 10,
    position: 'relative', 
  },
  logoText: { fontSize: 24, fontWeight: 'bold', color: '#c7d5e0', letterSpacing: 2 },
  logoHighlight: { color: '#66c0f4' },
  
  // Кнопка дзвіночка (Справа)
  bellButton: {
    position: 'absolute',
    right: 20,
    bottom: 15,
  },
  // НОВА КНОПКА (Зліва)
  profileButton: {
    position: 'absolute',
    left: 20,
    bottom: 12, // Трохи нижче, щоб вирівняти з текстом
  }
});