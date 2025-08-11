// client/src/useContext.jsx
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    profession: '',
    age: null,
    about: '',
    gender: '',
  });

  return (
    <UserContext.Provider value={{ location, setLocation, formData, setFormData }}>
      {children}
    </UserContext.Provider>
  );
}
