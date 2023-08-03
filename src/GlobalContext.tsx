import React, { createContext, useState, useCallback } from 'react';

// Step 1: Define the TypeScript interfaces as mentioned above

interface GlobalContextType {
  language: string;
  user: User | null;
  token: string | null;
  message: Message | null;
  setLanguage: (language: string) => void;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setMessage: (message: Message | null) => void;
}

interface User {
  id: number;
  name: string;
}

interface Message {
  type: string;
  text: string;
}

// Step 2: Create the context
const GlobalContext = createContext<GlobalContextType>({
  language: "en",
  user: null,
  token: null,
  message: null,
  setLanguage: () => { },
  setUser: () => { },
  setToken: () => { },
  setMessage: () => { },
});

// Step 3: Create the provider component
interface GlobalProviderProps {
  children: React.ReactNode;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<string>("en");
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [message, setMessage] = useState<Message | null>(null);

  return (
    <GlobalContext.Provider
      value={{
        language,
        user,
        token,
        message,
        setLanguage,
        setUser,
        setToken,
        setMessage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };