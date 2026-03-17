import React, { useEffect, useState } from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet, View, ActivityIndicator } from 'react-native';

// 🔥 ПРАВИЛЬНИЙ ІМПОРТ ДЛЯ ШРИФТІВ
import * as Font from 'expo-font';

// 🔥 ІМПОРТИ ДЛЯ ЛАБОРАТОРНОЇ №13 (БЕЗПЕЧНІ)
import { initAnalytics, logVortexEvent } from './services/analytics';

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

// --- ІНІЦІАЛІЗАЦІЯ АНАЛІТИКИ ---
initAnalytics();

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
      Admin: 'admin' 
    },
  },
};

export default function App() {
  // Стейт для перевірки завантаження шрифтів
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  // 🔥 ЗАВАНТАЖЕННЯ ШРИФТІВ, ЯКЕ FIREFOX НЕ БЛОКУЄ
  useEffect(() => {
    async function loadAppFonts() {
      try {
        if (Platform.OS === 'web') {
          // Для вебу примусово вантажимо з CDN, щоб оминути Firefox Sanitizer
          await Font.loadAsync({
            Ionicons: { uri: 'https://cdn.jsdelivr.net/npm/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf' },
            ionicons: { uri: 'https://cdn.jsdelivr.net/npm/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf' }
  });
        } else {
          // Для мобільних додатків беремо стандартні
          await Font.loadAsync(Ionicons.font);
        }
      } catch (error) {
        console.warn('Помилка завантаження шрифтів:', error);
      } finally {
        setFontsLoaded(true);
      }
    }

    loadAppFonts();
    logVortexEvent('App_Opened', { platform: Platform.OS });
  }, []);

  // Поки шрифти вантажаться — показуємо індикатор (щоб уникнути помилок рендеру)
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

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