import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Додали імпорт AsyncStorage

// 1. Створюємо сам контекст
export const UserContext = createContext();

// 2. Створюємо Провайдер (обгортку), яка роздаватиме дані
export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState('Геймер'); // Значення за замовчуванням

  // --- НОВИЙ ФУНКЦІОНАЛ ДЛЯ ЛАБОРАТОРНОЇ №9 ---

  // 1. Завантаження збереженого імені при запуску додатка
  useEffect(() => {
    const loadName = async () => {
      try {
        const storedName = await AsyncStorage.getItem('userName');
        if (storedName !== null) {
          setUserName(storedName); // Якщо знайшли збережене ім'я - встановлюємо його
        }
      } catch (error) {
        console.error('Помилка завантаження імені:', error);
      }
    };
    loadName();
  }, []); // Порожній масив означає, що це виконається лише один раз при старті

  // 2. Функція для збереження імені (оновлює стан + записує в пам'ять)
  const saveUserName = async (newName) => {
    try {
      await AsyncStorage.setItem('userName', newName);
      setUserName(newName);
    } catch (error) {
      console.error('Помилка збереження імені:', error);
    }
  };

  // 3. Функція для видалення імені з пам'яті
  const clearUserName = async () => {
    try {
      await AsyncStorage.removeItem('userName');
      setUserName('Геймер'); // Повертаємо значення за замовчуванням
    } catch (error) {
      console.error('Помилка очищення імені:', error);
    }
  };

  return (
    // Передаємо нові функції у value, щоб інші екрани могли їх викликати
    <UserContext.Provider value={{ userName, setUserName, saveUserName, clearUserName }}>
      {children}
    </UserContext.Provider>
  );
};