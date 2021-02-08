import React from 'react';
import LoginData from '../interfaces/LoginData';

export const LoginContext = React.createContext<LoginData>({
  token: "",
  updateToken: () => {},
  user: null,
  updateUser: () => {},
});