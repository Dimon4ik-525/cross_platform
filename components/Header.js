import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors'; // 🔥 ПІДКЛЮЧИЛИ НАШУ ДИЗАЙН-СИСТЕМУ

export default function Header() {
  const navigation = useNavigation();

  return (
    <SafeAreaView 
      style={styles.safeContainer} 
      edges={['top']} 
    >
      <View style={styles.headerContent}>
        
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          {/* Іконка тепер бере колір з теми */}
          <Ionicons name="person-circle" size={28} color={COLORS.primary} />
        </TouchableOpacity>

        {/* НОВА НАЗВА ПРОЄКТУ */}
        <Text style={styles.logoText}>
          VOR<Text style={styles.logoHighlight}>TEX</Text>
        </Text>

        <TouchableOpacity 
          style={styles.bellButton}
          onPress={() => navigation.navigate('Subs')} 
        >
          <Ionicons name="notifications" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: COLORS.surfaceDark, // Темний фон шапки
    borderBottomWidth: 2,
    borderBottomColor: COLORS.border,    // Зеленувата обводка
    width: '100%',
    
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary, // Неонова тінь на iOS
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4.65,
      },
      android: {
        elevation: 8,
      },
      web: {
        position: 'sticky', 
        top: 0, 
        zIndex: 1000, 
        // 🔥 Неонове свічення у вебі замість нудної чорної тіні
        boxShadow: `0px 4px 15px ${COLORS.primary}33`, 
      }
    }),
  },
  headerContent: {
    width: '100%',
    alignItems: 'center', 
    justifyContent: 'center',
    paddingBottom: 15,
    paddingTop: 10,
    position: 'relative', 
  },
  logoText: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: COLORS.textPrimary, // Білий текст
    letterSpacing: 3 // Трохи розширили для футуристичності
  },
  logoHighlight: { 
    color: COLORS.primary // Неоново-зелений акцент
  },
  bellButton: { 
    position: 'absolute', right: 20, bottom: 15,
    ...Platform.select({ web: { cursor: 'pointer' } })
  },
  profileButton: { 
    position: 'absolute', left: 20, bottom: 12,
    ...Platform.select({ web: { cursor: 'pointer' } })
  }
});