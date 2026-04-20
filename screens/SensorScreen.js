import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Switch, Platform } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { COLORS } from '../theme/colors';

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

  const isCritical = Math.abs(x) > 0.5 || Math.abs(y) > 0.5;
  const badgeColor = isCritical ? COLORS.danger : COLORS.success; 

  return (
    <View style={styles.container}>
      <Header />

      {/* 🔥 ФІРМОВА ПАНЕЛЬ НАВІГАЦІЇ VORTEX */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          <Text style={styles.backText} numberOfLines={1}>НАЗАД</Text>
        </TouchableOpacity>
        
        <Text style={styles.screenTitleText}>ТЕСТ ГЕЙМПАДА</Text>
        
        <View style={styles.spacer} /> 
      </View>

      <View style={styles.content}>
        
        <Text style={styles.desc}>Нахиляйте пристрій по осях X та Y, щоб керувати сенсором!</Text>

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>
            {isSensorActive ? '🟢 Сенсор УВІМКНЕНО' : '🔴 Сенсор ВИМКНЕНО'}
          </Text>
          <Switch
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
            <Text style={[styles.objectText, { color: isSensorActive ? COLORS.surfaceDark : COLORS.textMuted }]}>
              {isSensorActive ? '🎮' : '-'}
            </Text>
          </View>
        </View>

        <View style={styles.dataBox}>
          <Text style={styles.dataText}>Вісь X (Ліво/Право): {x.toFixed(2)}</Text>
          <Text style={styles.dataText}>Вісь Y (Верх/Низ): {y.toFixed(2)}</Text>
        </View>

      </View>

      <Footer />
    </View>
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
  backBtn: { flexDirection: 'row', alignItems: 'center', width: 100, ...Platform.select({ web: { cursor: 'pointer' } }) },
  spacer: { width: 100 }, 
  backText: { color: COLORS.primary, fontWeight: 'bold', marginLeft: 5 },
  screenTitleText: { color: COLORS.textPrimary, fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },

  content: { flex: 1, alignItems: 'center', padding: 20, paddingTop: 30 },
  desc: { color: COLORS.textMuted, fontSize: 14, marginBottom: 20, textAlign: 'center' },
  
  switchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surfaceDark, paddingHorizontal: 20, paddingVertical: 15, borderRadius: 10, marginBottom: 30, width: '100%', justifyContent: 'space-between', borderWidth: 1, borderColor: COLORS.border },
  switchLabel: { color: COLORS.textPrimary, fontSize: 16, fontWeight: 'bold' },

  arena: { width: 250, height: 250, backgroundColor: COLORS.surfaceDark, borderRadius: 125, borderWidth: 2, borderColor: COLORS.border, justifyContent: 'center', alignItems: 'center', marginBottom: 40, overflow: 'hidden' },
  movingObject: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', elevation: 5, borderWidth: 1, borderColor: COLORS.surface },
  objectText: { fontWeight: 'bold', fontSize: 32 },

  dataBox: { backgroundColor: COLORS.surfaceDark, padding: 15, borderRadius: 10, width: '100%', marginBottom: 20, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  dataText: { color: COLORS.textPrimary, fontSize: 16, fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace', marginVertical: 4, fontWeight: 'bold' },
});