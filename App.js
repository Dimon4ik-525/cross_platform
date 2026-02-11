import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import SubsScreen from './screens/SubsScreen';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';

const Stack = createStackNavigator();

const linking = {
  config: {
    screens: {
      Home: '',
      Details: 'game',
      Subs: 'subscriptions', // Додали адресу для браузера
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
                elevation: 0,
                borderBottomWidth: 0,
              },
              headerTintColor: '#c7d5e0',
              headerBackTitleVisible: false,
              headerTitleStyle: { fontWeight: 'bold' },
              headerBackImage: () => (
                <Ionicons
                  name="arrow-back"
                  size={32}
                  color="#c7d5e0"
                  style={{ marginLeft: 10 }}
                />
              ),
            }}
          />

          {/* --- ДОДАНО ЕКРАН ПІДПИСОК --- */}
          <Stack.Screen 
            name="Subs" 
            component={SubsScreen} 
            options={{
              headerShown: true,
              title: 'Мої підписки',
              headerStyle: { backgroundColor: '#171a21' },
              headerTintColor: '#c7d5e0',
              // Можна використати таку ж стрілку назад, як і в деталях
              headerBackImage: () => (
                <Ionicons
                  name="arrow-back"
                  size={32}
                  color="#c7d5e0"
                  style={{ marginLeft: 10 }}
                />
              ),
            }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}