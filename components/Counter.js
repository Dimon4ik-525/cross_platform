import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Counter() {
  // Виконання пункту 4: Початкове значення 0
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      {/* Виконання пункту 1: Відображення числа */}
      <Text style={styles.counterText}>Лічильник: {count}</Text>
      
      {/* Виконання пунктів 2 та 3: Кнопки та інтерактивність */}
      <View style={styles.buttonsBlock}>
        <View style={styles.buttonWrapper}>
             <Button title="-" onPress={() => setCount(count - 1)} color="#f4511e" />
        </View>
        <View style={styles.buttonWrapper}>
             <Button title="+" onPress={() => setCount(count + 1)} color="#4CAF50" />
        </View>
      </View>
    </View>
  );
}

// Виконання пункту 5: Стилі
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  counterText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  buttonsBlock: {
    flexDirection: 'row', // Кнопки в рядок
    justifyContent: 'space-between',
    width: 150,
  },
  buttonWrapper: {
    width: 60, // Фіксована ширина для кнопок, щоб виглядали охайно
  }
});