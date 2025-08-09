// useContext.jsx
import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [location, setLocation] = useState({ lat: -1.0, lon: -1.0 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    profession: '',
    age: '',
    about: '',
    gender: '',
  });

  return (
    <UserContext.Provider value={{ location, setLocation, formData, setFormData }}>
      {children}
    </UserContext.Provider>
  );
}
