import * as Amplitude from '@amplitude/analytics-react-native';
import * as Sentry from 'sentry-expo';

// 🔥 Функція запуску (працює тільки у браузері)
export const initAnalytics = () => {
  Sentry.init({
    dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
    enableInExpoDevelopment: true,
    debug: false,
  });

  if (process.env.EXPO_PUBLIC_AMPLITUDE_API_KEY) {
    Amplitude.init(process.env.EXPO_PUBLIC_AMPLITUDE_API_KEY);
    console.log('✅ Amplitude та Sentry успішно підключено (Web-режим)!');
  }
};

export const identifyUser = (userId, userName) => {
  if (!userId) return;
  Amplitude.setUserId(userId);
  const identifyObj = new Amplitude.Identify();
  if (userName) identifyObj.set('name', userName);
  Amplitude.identify(identifyObj);

  Sentry.Browser.setUser({ id: userId, username: userName });
  console.log(`👤 [ANALYTICS WEB] Юзера ідентифіковано: ${userName}`);
};

export const logVortexEvent = (eventName, properties = {}) => {
  Amplitude.track(eventName, properties);
  Sentry.Browser.addBreadcrumb({ category: 'user_action', message: eventName, data: properties, level: 'info' });
  console.log(`📊 [EVENT WEB] ${eventName}`, properties);
};