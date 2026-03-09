import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Switch } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import Header from '../components/Header';
import { COLORS } from '../theme/colors'; // <-- ПІДКЛЮЧИЛИ ТЕМУ

export default function SensorScreen({ navigation }) {
  const [{ x, y, z }, setData] = useState({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] = useState(null);
  const [isSensorActive, setIsSensorActive] = useState(false);

  useEffect(() => {
    let sub = null;

    if (isSensorActive) {
      Accelerometer.setUpdateInterval(60); 
      sub = Accelerometer.addListener(setData);
      setSubscription(sub);
    } else {
      if (subscription) {
        subscription.remove();
        setSubscription(null);
      }
      setData({ x: 0, y: 0, z: 0 });
    }

    return () => {
      if (sub) sub.remove();
    };
  }, [isSensorActive]);

  const moveX = x * 100; 
  const moveY = y * -100;

  // Використовуємо кольори з теми для індикації нахилу
  const isCritical = Math.abs(x) > 0.5 || Math.abs(y) > 0.5;
  const badgeColor = isCritical ? COLORS.danger : COLORS.success; 

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        
        <Text style={styles.title}>📱 Тест Гіроскопа</Text>
        <Text style={styles.desc}>Нахиляйте пристрій, щоб керувати знижкою!</Text>

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>
            {isSensorActive ? '🟢 Сенсор УВІМКНЕНО' : '🔴 Сенсор ВИМКНЕНО'}
          </Text>
          <Switch
            // Використовуємо кольори з теми для перемикача
            trackColor={{ false: COLORS.surfaceDark, true: COLORS.primary }}
            thumbColor={isSensorActive ? COLORS.textPrimary : COLORS.textMuted}
            onValueChange={() => setIsSensorActive(!isSensorActive)}
            value={isSensorActive}
          />
        </View>

        <View style={styles.arena}>
          <View style={[
              styles.movingObject, 
              { 
                backgroundColor: isSensorActive ? badgeColor : COLORS.surfaceDark, 
                transform: [{ translateX: moveX }, { translateY: moveY }] 
              }
            ]}>
            <Text style={[styles.objectText, { color: isSensorActive ? COLORS.surfaceDark : COLORS.textMuted }]}>-</Text>
          </View>
        </View>

        <View style={styles.dataBox}>
          <Text style={styles.dataText}>Вісь X (Ліво/Право): {x.toFixed(2)}</Text>
          <Text style={styles.dataText}>Вісь Y (Верх/Низ): {y.toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Повернутися назад</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, alignItems: 'center', padding: 20, paddingTop: 30 },
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.primary, marginBottom: 5 },
  desc: { color: COLORS.textMuted, fontSize: 14, marginBottom: 20, textAlign: 'center' },
  
  switchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, marginBottom: 20, width: '100%', justifyContent: 'space-between', borderWidth: 1, borderColor: COLORS.border },
  switchLabel: { color: COLORS.textSecondary, fontSize: 16, fontWeight: 'bold' },

  arena: { width: 250, height: 250, backgroundColor: COLORS.surfaceDark, borderRadius: 125, borderWidth: 2, borderColor: COLORS.border, justifyContent: 'center', alignItems: 'center', marginBottom: 30, overflow: 'hidden' },
  movingObject: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', elevation: 5 },
  objectText: { fontWeight: 'bold', fontSize: 22 },

  dataBox: { backgroundColor: COLORS.surface, padding: 15, borderRadius: 10, width: '100%', marginBottom: 20, alignItems: 'center' },
  dataText: { color: COLORS.textSecondary, fontSize: 16, fontFamily: 'monospace', marginVertical: 2 },
  
  backButton: { padding: 15, backgroundColor: COLORS.surfaceDark, borderRadius: 8, borderWidth: 1, borderColor: COLORS.primary, width: '100%', alignItems: 'center' },
  backButtonText: { color: COLORS.primary, fontSize: 16, fontWeight: 'bold' }
});