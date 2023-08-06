import React, { createContext, useState } from 'react';

// Global Context, props made available by Provider
const GlobalContext = createContext({
  language: "en",
  user: null,
  token: null,
  message: null,
  setLanguage: () => {},
  setUser: () => {},
  setToken: () => {},
  setMessage: () => {},
});

// Global Provider Component, needs to be wrapped around App Component
const GlobalProvider = (props) => {
  const [language, setLanguage] = useState("en");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState(null);

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
