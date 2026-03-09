import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location'; 
import { Platform } from 'react-native'; // <-- ДОДАЛИ ПЛАТФОРМУ

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState('Геймер');
  const [userAvatar, setUserAvatar] = useState(null); 
  
  const [countryCode, setCountryCode] = useState('US'); 
  const [countryName, setCountryName] = useState('США'); 

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedName = await AsyncStorage.getItem('userName');
        if (storedName) setUserName(storedName);

        const storedAvatar = await AsyncStorage.getItem('userAvatar');
        if (storedAvatar) setUserAvatar(storedAvatar);

        await detectUserRegion();
      } catch (error) {
        console.error('Помилка завантаження даних:', error);
      }
    };
    loadData();
  }, []);

  const detectUserRegion = async () => {
    try {
      // --- МАГІЯ ДЛЯ ВЕБ-ВЕРСІЇ (ПО IP-АДРЕСІ) ---
      if (Platform.OS === 'web') {
        const res = await fetch('https://get.geojs.io/v1/ip/geo.json');
        const data = await res.json();
        
        if (data && data.country_code) {
          setCountryCode(data.country_code); // "UA"
          setCountryName(data.country);      // "Ukraine"
        }
        return; // Зупиняємо функцію, далі нам GPS не потрібен
      }

      // --- ЛОГІКА ДЛЯ СМАРТФОНА (GPS) ---
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setCountryName('Локація недоступна');
        return;
      }

      let currentLoc = await Location.getCurrentPositionAsync({});
      let address = await Location.reverseGeocodeAsync({
        latitude: currentLoc.coords.latitude,
        longitude: currentLoc.coords.longitude
      });

      if (address.length > 0) {
        const code = address[0].isoCountryCode;
        const name = address[0].country;
        
        if (code) setCountryCode(code);
        if (name) setCountryName(name);
      }
    } catch (error) {
      console.error("Помилка отримання локації:", error);
    }
  };

  const saveUserName = async (newName) => {
    try {
      await AsyncStorage.setItem('userName', newName);
      setUserName(newName);
    } catch (error) { console.error(error); }
  };

  const saveUserAvatar = async (uri) => {
    try {
      await AsyncStorage.setItem('userAvatar', uri);
      setUserAvatar(uri);
    } catch (error) { console.error(error); }
  };

  const clearUserName = async () => {
    try {
      await AsyncStorage.removeItem('userName');
      await AsyncStorage.removeItem('userAvatar');
      setUserName('Геймер');
      setUserAvatar(null);
    } catch (error) { console.error(error); }
  };

  return (
    <UserContext.Provider value={{ 
      userName, 
      userAvatar, 
      saveUserName, 
      saveUserAvatar, 
      clearUserName,
      countryCode,    
      countryName     
    }}>
      {children}
    </UserContext.Provider>
  );
};