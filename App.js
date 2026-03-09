import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet } from 'react-native';

import { UserProvider } from './context/UserContext';
import { COLORS } from './theme/colors'; // <-- ПІДКЛЮЧИЛИ НАШУ ГЛОБАЛЬНУ ТЕМУ

// Імпорти екранів
import SubsScreen from './screens/SubsScreen';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import ProfileScreen from './screens/ProfileScreen';
import UsersScreen from './screens/UsersScreen';
import SupportScreen from './screens/SupportScreen';
import GalleryScreen from './screens/GalleryScreen'; 

// ---> ДОДАЛИ ІМПОРТИ НОВИХ ЕКРАНІВ З ЛАБИ 11 <---
import MapScreen from './screens/MapScreen';
import SensorScreen from './screens/SensorScreen';

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
      Map: 'map',       // Лінк для карти
      Sensors: 'sensors' // Лінк для сенсорів
    },
  },
};

export default function App() {
  return (
    <UserProvider>
      <SafeAreaProvider style={styles.appContainer}>
        <NavigationContainer linking={linking}>
          <StatusBar style="light" />
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            
            <Stack.Screen
              name="Details"
              component={DetailsScreen}
              options={{
                headerShown: true,
                title: 'Деталі гри',
                // Використовуємо глобальні кольори!
                headerStyle: { backgroundColor: COLORS.surfaceDark, elevation: 0, borderBottomWidth: 0 },
                headerTintColor: COLORS.textSecondary,
                headerBackTitleVisible: false,
                headerTitleStyle: { fontWeight: 'bold' },
                headerBackImage: () => <Ionicons name="arrow-back" size={32} color={COLORS.textSecondary} style={{ marginLeft: 10 }} />,
              }}
            />

            <Stack.Screen 
              name="Subs" 
              component={SubsScreen} 
              options={{ headerShown: true, title: 'Мої підписки', headerStyle: { backgroundColor: COLORS.surfaceDark }, headerTintColor: COLORS.textSecondary, headerBackImage: () => <Ionicons name="arrow-back" size={32} color={COLORS.textSecondary} style={{ marginLeft: 10 }} /> }}
            />

            <Stack.Screen 
              name="Profile" 
              component={ProfileScreen} 
              options={{ headerShown: false, title: 'Мій профіль', headerStyle: { backgroundColor: COLORS.surfaceDark }, headerTintColor: COLORS.textSecondary, headerBackImage: () => <Ionicons name="arrow-back" size={32} color={COLORS.textSecondary} style={{ marginLeft: 10 }} /> }}
            />

            <Stack.Screen 
              name="Users" 
              component={UsersScreen} 
              options={{ headerShown: true, title: 'Спільнота', headerStyle: { backgroundColor: COLORS.surfaceDark }, headerTintColor: COLORS.textSecondary, headerBackImage: () => <Ionicons name="arrow-back" size={32} color={COLORS.textSecondary} style={{ marginLeft: 10 }} /> }}
            />

            <Stack.Screen 
              name="Support" 
              component={SupportScreen} 
              options={{ headerShown: true, title: 'Підтримка', headerStyle: { backgroundColor: COLORS.surfaceDark }, headerTintColor: COLORS.textSecondary, headerBackImage: () => <Ionicons name="arrow-back" size={32} color={COLORS.textSecondary} style={{ marginLeft: 10 }} /> }}
            />

            <Stack.Screen 
              name="Gallery" 
              component={GalleryScreen} 
              options={{ headerShown: false }} 
            />

            {/* ---> НАШІ НОВІ ЕКРАНИ (Карта і Сенсори) <--- */}
            <Stack.Screen 
              name="Map" 
              component={MapScreen} 
              options={{ headerShown: false }} 
            />
            
            <Stack.Screen 
              name="Sensors" 
              component={SensorScreen} 
              options={{ headerShown: false }} 
            />

          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: COLORS.background, // Фон беремо з теми
    ...Platform.select({
      web: {
        height: '100vh',
        overflow: 'hidden', 
      }
    })
  }
});