import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// 1. Імпортуємо бібліотеку іконок
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';

const Stack = createStackNavigator();

const linking = {
  config: {
    screens: {
      Home: '',
      Details: 'game',
    },
  },
};

export default function App() {
  return (
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
              headerStyle: {
                backgroundColor: '#171a21',
                elevation: 0, // Прибираємо тінь на Android
                borderBottomWidth: 0, // Прибираємо смужку знизу
              },
              headerTintColor: '#c7d5e0',
              headerBackTitleVisible: false,
              headerTitleStyle: { fontWeight: 'bold' },
              // 2. Замінюємо кнопку "назад" на власну велику іконку
              headerBackImage: () => (
                <Ionicons
                  name="arrow-back"
                  size={32} // <-- Розмір іконки (було десь 24)
                  color="#c7d5e0"
                  style={{ marginLeft: 10 }} // Відступ від краю
                />
              ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}