import React, { createContext, useState } from 'react';

// 1. Створюємо сам контекст
export const UserContext = createContext();

// 2. Створюємо Провайдер (обгортку), яка роздаватиме дані
export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState('Геймер'); // Значення за замовчуванням

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};