// 🔥 ЦЕЙ ФАЙЛ ЗАВАНТАЖИТЬСЯ НА IPHONE (EXPO GO)
// Тут немає нативних імпортів, тому телефон НЕ БУДЕ крашитись!

export const initAnalytics = () => {
  console.log('⚠️ Аналітика Sentry/Amplitude вимкнена на телефоні. Відкрийте Web-версію для їх тестування.');
};

export const identifyUser = (userId, userName) => {
  console.log(`👤 [MOCK] Юзера ідентифіковано: ${userName}`);
};

export const logVortexEvent = (eventName, properties = {}) => {
  console.log(`📊 [MOCK EVENT] ${eventName}`, properties);
};