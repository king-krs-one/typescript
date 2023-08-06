import React, { createContext, useState, useCallback } from 'react';

// Interface for Global Context
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

// Global Context, props made available by Provider
const GlobalContext = createContext<GlobalContextType>({
  language: "en",
  user: null,
  token: null,
  message: null,
  setLanguage: () => {},
  setUser: () => {},
  setToken: () => {},
  setMessage: () => {},
});

// Interface for Global Provider
interface GlobalProviderProps {
  children: React.ReactNode;
}

// Global Provider Component, needs to be wrapped around App Component
const GlobalProvider: React.FC<GlobalProviderProps> = (props) => {
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
      {props.children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };