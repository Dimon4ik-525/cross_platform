import * as Amplitude from '@amplitude/analytics-react-native';
import * as Sentry from 'sentry-expo';
import { Platform } from 'react-native'; // 🔥 Додали перевірку платформи

/**
 * Ідентифікує користувача в системах аналітики
 */
export const identifyUser = (userId, userName) => {
  if (!userId) return;
  
  // 1. Amplitude: Прив'язуємо події до конкретного ID
  Amplitude.setUserId(userId);
  
  const identifyObj = new Amplitude.Identify();
  if (userName) identifyObj.set('name', userName);
  Amplitude.identify(identifyObj);

  // 2. Sentry: Кажемо, в кого саме стався краш (Кросплатформно)
  const userData = { id: userId, username: userName };
  
  if (Platform.OS === 'web') {
    Sentry.Browser.setUser(userData);
  } else {
    Sentry.Native.setUser(userData);
  }
  
  console.log(`👤 [ANALYTICS] Юзера ідентифіковано: ${userName || userId}`);
};

/**
 * Відправляє подію (Event) в Amplitude та логує її для Sentry
 */
export const logVortexEvent = (eventName, properties = {}) => {
  // 1. Відправляємо в Amplitude
  Amplitude.track(eventName, properties);
  
  // 2. Sentry Breadcrumbs: Записуємо, що робив юзер (Кросплатформно)
  const breadcrumb = {
    category: 'user_action',
    message: eventName,
    data: properties,
    level: 'info',
  };

  if (Platform.OS === 'web') {
    Sentry.Browser.addBreadcrumb(breadcrumb);
  } else {
    Sentry.Native.addBreadcrumb(breadcrumb);
  }
  
  // 3. Виводимо в консоль для розробника
  console.log(`📊 [EVENT] ${eventName}`, properties);
};