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

  const loginUser = async () => {
    setLoginState(LoginState.LOGGING_IN);
    try {
      const response: LoginResponse = await login(email, password);
      loginContext.updateToken(response.token);
      loginContext.updateUser(response.user);
    } catch (err) {
      console.log(err);
      setLoginState(LoginState.LOGIN_FAILED);
    }
  }

  const registerUser = () => {

  }

  if (loginState === LoginState.NOT_LOGGED_IN || loginState === LoginState.LOGIN_FAILED) {
    return (
      <View style={styles.container}>
        <TextInput placeholder="email" onChangeText={text => setEmail(text)} enablesReturnKeyAutomatically={true}></TextInput>
        <TextInput placeholder="password" onChangeText={text => setPassword(text)} enablesReturnKeyAutomatically={true}></TextInput>
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