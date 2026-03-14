import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // 🔥 Додали іконки
import { UserContext } from '../context/UserContext'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import { COLORS } from '../theme/colors';

export default function SupportScreen({ navigation }) {
  const { userName } = useContext(UserContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (userName && userName !== 'Геймер') {
      setName(userName);
    }
  }, [userName]);

  const handleSubmit = () => {
    let valid = true;
    let newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Введіть ваше ім\'я';
      valid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Email обов\'язковий';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Невірний формат email';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      console.log('--- ФОРМА ПІДТРИМКИ ---');
      console.log('Ім’я:', name);
      console.log('Email:', email);
      console.log('Повідомлення:', message);

      if (Platform.OS === 'web') alert('Ми отримали ваш запит!');
      else Alert.alert('Надіслано!', 'Ми отримали ваш запит.');
      setMessage('');
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <Header />
      
      {/* 🔥 ФІРМОВА ПАНЕЛЬ НАВІГАЦІЇ VORTEX */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          <Text style={styles.backText} numberOfLines={1}>НАЗАД</Text>
        </TouchableOpacity>
        
        <Text style={styles.screenTitleText}>ПІДТРИМКА</Text>
        
        <View style={styles.spacer} /> 
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>Заповніть форму зворотного зв'язку</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Ім'я <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={[styles.input, errors.name && styles.inputError]}
            placeholder="Ваше ім'я"
            placeholderTextColor={COLORS.textMuted}
            value={name}
            onChangeText={(t) => { setName(t); setErrors({...errors, name: null}); }}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="example@mail.com"
            placeholderTextColor={COLORS.textMuted}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(t) => { setEmail(t); setErrors({...errors, email: null}); }}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Повідомлення</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Опишіть проблему..."
            placeholderTextColor={COLORS.textMuted}
            multiline={true}
            numberOfLines={4}
            value={message}
            onChangeText={setMessage}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>НАДІСЛАТИ</Text>
        </TouchableOpacity>

      </ScrollView>
      <Footer />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  
  /* 🔥 СТИЛІ НАВІГАЦІЇ VORTEX */
  navBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 15, 
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.surfaceDark
  },
  backBtn: { flexDirection: 'row', alignItems: 'center', width: 100 },
  spacer: { width: 100 }, 
  backText: { color: COLORS.primary, fontWeight: 'bold', marginLeft: 5 },
  screenTitleText: { color: COLORS.textPrimary, fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },

  content: { flexGrow: 1, padding: 20 },
  subtitle: { fontSize: 14, color: COLORS.textSecondary, textAlign: 'center', marginBottom: 25, marginTop: 10 },
  
  inputGroup: { marginBottom: 15 },
  label: { color: COLORS.textPrimary, fontSize: 16, marginBottom: 5, fontWeight: 'bold' },
  required: { color: COLORS.danger },
  
  input: {
    backgroundColor: COLORS.surface, color: COLORS.textPrimary, padding: 15, borderRadius: 5,
    borderWidth: 1, borderColor: COLORS.border, fontSize: 16, ...Platform.select({ web: { outlineStyle: 'none' } })
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  inputError: { borderColor: COLORS.danger, borderWidth: 2 },
  errorText: { color: COLORS.danger, fontSize: 13, marginTop: 5 },

  submitButton: {
    backgroundColor: COLORS.primary, padding: 15, borderRadius: 5, alignItems: 'center',
    marginTop: 10, ...Platform.select({ web: { cursor: 'pointer' } })
  },
  submitButtonText: { color: COLORS.surfaceDark, fontWeight: 'bold', fontSize: 16, letterSpacing: 1 }
});