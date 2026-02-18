import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { UserContext } from '../context/UserContext'; 
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SupportScreen({ navigation }) {
  const { userName } = useContext(UserContext);

  // 1. Стан для полів
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  // 2. Стан для помилок
  const [errors, setErrors] = useState({});

  // Автозаповнення імені з контексту
  useEffect(() => {
    if (userName && userName !== 'Геймер') {
      setName(userName);
    }
  }, [userName]);

  // 3. Валідація та відправка
  const handleSubmit = () => {
    let valid = true;
    let newErrors = {};

    // Перевірка імені
    if (!name.trim()) {
      newErrors.name = 'Введіть ваше ім\'я';
      valid = false;
    }

    // Перевірка пошти (простий regex)
    if (!email.trim()) {
      newErrors.email = 'Email обов\'язковий';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Невірний формат email';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      // 4. Вимога лаби: вивід у консоль
      console.log('--- ФОРМА ПІДТРИМКИ ---');
      console.log('Ім’я:', name);
      console.log('Email:', email);
      console.log('Повідомлення:', message);

      Alert.alert('Надіслано!', 'Ми отримали ваш запит.');
      setMessage('');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Header />
      
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Служба підтримки 🛠️</Text>
        <Text style={styles.subtitle}>Заповніть форму зворотного зв'язку</Text>

        {/* Поле ІМ'Я */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Ім'я <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={[styles.input, errors.name && styles.inputError]}
            placeholder="Ваше ім'я"
            placeholderTextColor="#5c6d7e"
            value={name}
            onChangeText={(t) => { setName(t); setErrors({...errors, name: null}); }}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>

        {/* Поле EMAIL */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="example@mail.com"
            placeholderTextColor="#5c6d7e"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(t) => { setEmail(t); setErrors({...errors, email: null}); }}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>

        {/* Поле ПОВІДОМЛЕННЯ */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Повідомлення</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Опишіть проблему..."
            placeholderTextColor="#5c6d7e"
            multiline={true}
            numberOfLines={4}
            value={message}
            onChangeText={setMessage}
          />
        </View>

        {/* КНОПКА */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>НАДІСЛАТИ</Text>
        </TouchableOpacity>

      </ScrollView>

      <Footer />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1b2838' },
  content: { flexGrow: 1, padding: 20 },
  title: { fontSize: 24, color: '#fff', fontWeight: 'bold', textAlign: 'center', marginBottom: 5 },
  subtitle: { fontSize: 14, color: '#8f98a0', textAlign: 'center', marginBottom: 25 },
  
  inputGroup: { marginBottom: 15 },
  label: { color: '#c7d5e0', fontSize: 16, marginBottom: 5, fontWeight: 'bold' },
  required: { color: '#ff5252' },
  
  input: {
    backgroundColor: '#2a475e', color: '#fff', padding: 12, borderRadius: 5,
    borderWidth: 1, borderColor: '#4b6b8b', fontSize: 16
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  inputError: { borderColor: '#ff5252', borderWidth: 2 },
  errorText: { color: '#ff5252', fontSize: 13, marginTop: 5 },

  submitButton: {
    backgroundColor: '#66c0f4', padding: 15, borderRadius: 5, alignItems: 'center',
    marginTop: 10, ...Platform.select({ web: { cursor: 'pointer' } })
  },
  submitButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 }
});