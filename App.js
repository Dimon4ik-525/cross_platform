import React, { useEffect } from 'react'; // 🔥 Додали useEffect
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet } from 'react-native';

// 🔥 ІМПОРТИ ДЛЯ ЛАБОРАТОРНОЇ №13 (SENTRY ТА AMPLITUDE)
import * as Sentry from 'sentry-expo';
import * as Amplitude from '@amplitude/analytics-react-native';
import { logVortexEvent } from './services/analytics'; // 🔥 Імпортували наш сервіс

import { UserProvider } from './context/UserContext';
import { COLORS } from './theme/colors'; 

// Імпорти екранів
import SubsScreen from './screens/SubsScreen';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import ProfileScreen from './screens/ProfileScreen';
import UsersScreen from './screens/UsersScreen';
import SupportScreen from './screens/SupportScreen';
import GalleryScreen from './screens/GalleryScreen'; 
import MapScreen from './screens/MapScreen';
import SensorScreen from './screens/SensorScreen';
import FirebaseScreen from './screens/FirebaseScreen'; 
import AdminScreen from './screens/AdminScreen';

// --- ІНІЦІАЛІЗАЦІЯ SENTRY (Моніторинг помилок) ---
// Sentry буде автоматично ловити всі краші додатку
Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  enableInExpoDevelopment: true, // Ловить краші навіть під час розробки (в Expo Go)
  debug: false, 
});

// --- ІНІЦІАЛІЗАЦІЯ AMPLITUDE (Продуктова аналітика) ---
if (process.env.EXPO_PUBLIC_AMPLITUDE_API_KEY) {
  Amplitude.init(process.env.EXPO_PUBLIC_AMPLITUDE_API_KEY);
  console.log('✅ Amplitude успішно підключено!');
}

const Stack = createStackNavigator();

const linking = {
  config: {
    screens: {
      Home: '',
      Details: 'game',
      Subs: 'subscriptions',
      Profile: 'profile',
      Users: 'community',
      Support: 'support',
      Gallery: 'gallery',
      Map: 'map',
      Sensors: 'sensors',
      Firebase: 'wishlist',
      Admin: 'admin' // Додав глибоке посилання і для адмінки про всяк випадок
    },
  },
};

export default function App() {
  
  // 🔥 ТРЕКАЄМО ВІДКРИТТЯ ДОДАТКУ
  useEffect(() => {
    logVortexEvent('App_Opened', { platform: Platform.OS });
  }, []);

  return (
    <UserProvider>
      <SafeAreaProvider style={styles.appContainer}>
        <NavigationContainer linking={linking}>
          
          <StatusBar style="light" />
          
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ 
              headerStyle: { 
                backgroundColor: COLORS.surfaceDark, 
                elevation: 0, 
                shadowOpacity: 0, 
                borderBottomWidth: 2, 
                borderBottomColor: COLORS.border 
              },
              headerTintColor: COLORS.textPrimary, 
              headerTitleStyle: { fontWeight: 'bold', letterSpacing: 1 },
              headerBackTitleVisible: false, 
              headerBackImage: () => (
                <Ionicons name="arrow-back" size={28} color={COLORS.primary} style={{ marginLeft: 15 }} />
              ),
            }}
          >
            {/* Екрани БЕЗ стандартної шапки */}
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Gallery" component={GalleryScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Map" component={MapScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Sensors" component={SensorScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Subs" component={SubsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Users" component={UsersScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Support" component={SupportScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Admin" component={AdminScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Firebase" component={FirebaseScreen} options={{ headerShown: false }} />

            {/* Екрани ЗІ стандартною шапкою */}
            <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Деталі гри', headerBackTitle: 'На головну' }} />
            
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    ...Platform.select({
      web: {
        height: '100vh',
        overflow: 'hidden', 
      }
    })
  }
});