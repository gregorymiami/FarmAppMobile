import React, { FC, useContext } from "react";
import { View, Text, Button } from 'react-native';
import { LoginContext }from '../contexts/LoginContext';
import LoginData from '../interfaces/LoginData';

const MainScreen: FC = () => {
  const loginContext: LoginData = useContext(LoginContext);

  const logout = () => {
    loginContext.updateToken(null);
  }

  return (
    <View>
      <Text>Welcome Home</Text>
      <Button title="Logout" onPress={logout}></Button>
    </View>
  );
}

export default MainScreen;