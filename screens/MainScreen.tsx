import React, { FC, useContext } from "react";
import { View, Text, Button } from 'react-native';
import { LoginContext }from '../contexts/LoginContext';
import LoginData from '../interfaces/LoginData';
import { logout } from '../requests/ServerRequests';

const MainScreen: FC = () => {
  const loginContext: LoginData = useContext(LoginContext);

  const logoutUser = () => {
    logout(loginContext.token)
    .then(() => {
      console.log("logout successful");
      loginContext.updateToken(null);
    })
    .catch((error) => {
      console.log(`Logout failed with ${error}`);
      loginContext.updateToken(null);
    });
  };

  return (
    <View>
      <Text>Welcome Home</Text>
      <Button title="Logout" onPress={logoutUser}></Button>
    </View>
  );
};

export default MainScreen;