import * as Amplitude from '@amplitude/analytics-react-native';
import * as Sentry from 'sentry-expo';

export const initAnalytics = () => {
  Sentry.init({
    dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
    enableInExpoDevelopment: true,
    debug: false,
  });

  if (process.env.EXPO_PUBLIC_AMPLITUDE_API_KEY) {
    Amplitude.init(process.env.EXPO_PUBLIC_AMPLITUDE_API_KEY, undefined, {
      // 1. Кажемо використовувати LocalStorage замість Cookies для ідентифікації
      // Це прибирає потребу в перевірці домену через куки
      identityStorage: 'localStorage', 
      
      // 2. Вимикаємо сесійні куки, якщо вони досі роблять проблеми
      disableCookies: true,

      // 3. Додатковий захист від спроб Amplitude "вгадати" домен
      cookieOptions: {
        domain: typeof window !== 'undefined' ? window.location.hostname : '',
      },
    });

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
};

// Переконайся, що тут точно є export
export const logVortexEvent = (eventName, properties = {}) => {
  try {
    Amplitude.track(eventName, properties);
    console.log(`📊 [EVENT WEB] ${eventName}`, properties);
  } catch (e) {
    console.warn('Amplitude track error:', e);
  }
};