import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// 1. Імпортуємо Провайдер
import { UserProvider } from './context/UserContext';

// Імпорти екранів
import SubsScreen from './screens/SubsScreen';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import ProfileScreen from './screens/ProfileScreen';
import UsersScreen from './screens/UsersScreen'; // <--- 1. НОВИЙ ІМПОРТ

const Stack = createStackNavigator();

const linking = {
  config: {
    screens: {
      Home: '',
      Details: 'game',
      Subs: 'subscriptions',
      Profile: 'profile',
      Users: 'community', // <--- 2. НОВИЙ ШЛЯХ ДЛЯ ВЕБУ
    },
  },
};

export default function App() {
  return (
    // 3. ОБГОРТАЄМО ВЕСЬ ДОДАТОК У ПРОВАЙДЕР
    <UserProvider>
      <SafeAreaProvider>
        <NavigationContainer linking={linking}>
          <StatusBar style="light" />
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false
            }}
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
              options={{
                headerShown: true,
                title: 'Мої підписки',
                headerStyle: { backgroundColor: '#171a21' },
                headerTintColor: '#c7d5e0',
                headerBackImage: () => <Ionicons name="arrow-back" size={32} color="#c7d5e0" style={{ marginLeft: 10 }} />,
              }}
            />

            <Stack.Screen 
              name="Profile" 
              component={ProfileScreen} 
              options={{
                headerShown: true,
                title: 'Мій профіль',
                headerStyle: { backgroundColor: '#171a21' },
                headerTintColor: '#c7d5e0',
                headerBackImage: () => <Ionicons name="arrow-back" size={32} color="#c7d5e0" style={{ marginLeft: 10 }} />,
              }}
            />

            {/* --- 3. ДОДАЛИ ЕКРАН СПІЛЬНОТИ (USERS) --- */}
            <Stack.Screen 
              name="Users" 
              component={UsersScreen} 
              options={{
                headerShown: true,
                title: 'Спільнота',
                headerStyle: { backgroundColor: '#171a21' },
                headerTintColor: '#c7d5e0',
                headerBackImage: () => <Ionicons name="arrow-back" size={32} color="#c7d5e0" style={{ marginLeft: 10 }} />,
              }}
            />

          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </UserProvider>
  );
}