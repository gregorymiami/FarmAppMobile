import React, { FC, useContext } from "react";
import { TextInput, Button, View, StyleSheet, ActivityIndicator } from "react-native";
import { login, LoginResponse } from '../requests/ServerRequests';
import LoginData from '../interfaces/LoginData';
import { LoginContext }from '../contexts/LoginContext';

enum LoginState {
  NOT_LOGGED_IN,
  LOGGING_IN,
  LOGIN_FAILED,
}

const LoginScreen:FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginState, setLoginState] = React.useState<LoginState>(LoginState.NOT_LOGGED_IN);
  const loginContext: LoginData = useContext(LoginContext);
  const defaultEmail = "lmao4@lmao.com";
  const defaultPassword = "Lmaolmao123";

  const loginUser = () => {
    setLoginState(LoginState.LOGGING_IN);
    login(defaultEmail, defaultPassword, (loginResponse) => {
      loginContext.updateToken(loginResponse.token);
      loginContext.updateUser(loginResponse.user);
    }, (error) => {
      console.log(`login api request failed with: ${error}`);
      setLoginState(LoginState.LOGIN_FAILED);
    });
  }

  const registerUser = () => {

  }

  if (loginState === LoginState.NOT_LOGGED_IN || loginState === LoginState.LOGIN_FAILED) {
    return (
      <View style={styles.container}>
        <TextInput placeholder="email" onChangeText={text => setEmail(text)} defaultValue={"lmao4@lmao.com"} enablesReturnKeyAutomatically={true}></TextInput>
        <TextInput placeholder="password" onChangeText={text => setPassword(text)} defaultValue={"Lmaolmao123"} enablesReturnKeyAutomatically={true}></TextInput>
        <Button title="Login" onPress={loginUser}></Button>
        <Button title="Register" onPress={registerUser}></Button>
      </View>
    );
  } else {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default LoginScreen;