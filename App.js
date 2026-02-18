import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet } from 'react-native'; // Додав StyleSheet

import { UserProvider } from './context/UserContext';

// Імпорти екранів
import SubsScreen from './screens/SubsScreen';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import ProfileScreen from './screens/ProfileScreen';
import UsersScreen from './screens/UsersScreen';
import SupportScreen from './screens/SupportScreen';

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
    },
  },
};

export default function App() {
  return (
    <UserProvider>
      {/* ПОВЕРТАЄМО ФІКСОВАНУ ВИСОТУ 
          Ми кажемо: займай 100vh (все вікно) і обрізай все, що вилазить (overflow: hidden).
          Скрол будемо робити всередині компонентів.
      */}
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
                headerStyle: { backgroundColor: '#171a21', elevation: 0, borderBottomWidth: 0 },
                headerTintColor: '#c7d5e0',
                headerBackTitleVisible: false,
                headerTitleStyle: { fontWeight: 'bold' },
                headerBackImage: () => <Ionicons name="arrow-back" size={32} color="#c7d5e0" style={{ marginLeft: 10 }} />,
              }}
            />

            <Stack.Screen 
              name="Subs" 
              component={SubsScreen} 
              options={{ headerShown: true, title: 'Мої підписки', headerStyle: { backgroundColor: '#171a21' }, headerTintColor: '#c7d5e0', headerBackImage: () => <Ionicons name="arrow-back" size={32} color="#c7d5e0" style={{ marginLeft: 10 }} /> }}
            />

            <Stack.Screen 
              name="Profile" 
              component={ProfileScreen} 
              options={{ headerShown: true, title: 'Мій профіль', headerStyle: { backgroundColor: '#171a21' }, headerTintColor: '#c7d5e0', headerBackImage: () => <Ionicons name="arrow-back" size={32} color="#c7d5e0" style={{ marginLeft: 10 }} /> }}
            />

            <Stack.Screen 
              name="Users" 
              component={UsersScreen} 
              options={{ headerShown: true, title: 'Спільнота', headerStyle: { backgroundColor: '#171a21' }, headerTintColor: '#c7d5e0', headerBackImage: () => <Ionicons name="arrow-back" size={32} color="#c7d5e0" style={{ marginLeft: 10 }} /> }}
            />

            <Stack.Screen 
              name="Support" 
              component={SupportScreen} 
              options={{ headerShown: true, title: 'Підтримка', headerStyle: { backgroundColor: '#171a21' }, headerTintColor: '#c7d5e0', headerBackImage: () => <Ionicons name="arrow-back" size={32} color="#c7d5e0" style={{ marginLeft: 10 }} /> }}
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
    backgroundColor: '#1b2838',
    // ВАЖЛИВО: Жорстко фіксуємо висоту для вебу
    ...Platform.select({
      web: {
        height: '100vh',
        overflow: 'hidden', 
      }
    })
  }
});