import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Platform } from 'react-native';
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
        
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Ionicons name="person-circle" size={28} color="#66c0f4" />
        </TouchableOpacity>

        <Text style={styles.logoText}>
          STEAM<Text style={styles.logoHighlight}>DEALS</Text>
        </Text>

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
    
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
      },
      android: {
        elevation: 8,
      },
      web: {
        // !!! ГОЛОВНА ЗМІНА !!!
        // position: 'sticky' змушує хедер "липнути" до верху браузера при скролі
        position: 'sticky', 
        top: 0, 
        zIndex: 1000, // Гарантує, що хедер буде поверх списку ігор
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)', 
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
  logoText: { fontSize: 24, fontWeight: 'bold', color: '#c7d5e0', letterSpacing: 2 },
  logoHighlight: { color: '#66c0f4' },
  bellButton: { position: 'absolute', right: 20, bottom: 15 },
  profileButton: { position: 'absolute', left: 20, bottom: 12 }
});