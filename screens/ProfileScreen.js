import React, { useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { UserContext } from '../context/UserContext'; // Імпортуємо контекст
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ProfileScreen() {
  // Отримуємо доступ до глобальних даних
  const { userName, setUserName } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Header />
      
      <View style={styles.content}>
        <View style={styles.avatarContainer}>
           {/* Імітація аватарки Steam */}
           <View style={styles.avatarPlaceholder}>
             <Text style={styles.avatarText}>{userName.charAt(0).toUpperCase()}</Text>
           </View>
        </View>

        <Text style={styles.label}>Ваш нікнейм:</Text>
        
        {/* Поле вводу, яке відразу змінює глобальний стейт */}
        <TextInput 
          style={styles.input}
          value={userName}
          onChangeText={setUserName} // Магія React: зміна тут оновлює HomeScreen миттєво
          placeholder="Введіть ім'я"
          placeholderTextColor="#8f98a0"
        />

        <Text style={styles.hint}>Це ім'я відображатиметься на головній сторінці.</Text>
      </View>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1b2838', justifyContent: 'space-between' },
  content: { flex: 1, alignItems: 'center', paddingTop: 50, paddingHorizontal: 20 },
  
  avatarContainer: { marginBottom: 30 },
  avatarPlaceholder: {
    width: 100, height: 100, borderRadius: 50, backgroundColor: '#66c0f4',
    justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#fff'
  },
  avatarText: { fontSize: 40, fontWeight: 'bold', color: '#fff' },

  label: { color: '#c7d5e0', fontSize: 18, alignSelf: 'flex-start', marginBottom: 10, marginLeft: 10 },
  
  input: {
    width: '100%', backgroundColor: '#2a475e', color: '#fff', fontSize: 18,
    padding: 15, borderRadius: 5, borderWidth: 1, borderColor: '#4b6b8b', marginBottom: 10
  },
  hint: { color: '#8f98a0', fontSize: 14, alignSelf: 'flex-start', marginLeft: 10 }
});