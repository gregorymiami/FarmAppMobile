import React from "react";
import { TextInput, Button } from "react-native";
import { View } from "../components/Themed";
import { StyleSheet } from 'react-native';

const LoginScreen = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const login = () => {

  }

  const register = () => {

  }

  return (
    <View style={styles.container}>
      <TextInput placeholder="username" onChangeText={text => setUsername(text)} enablesReturnKeyAutomatically={true}></TextInput>
      <TextInput placeholder="password" onChangeText={text => setPassword(text)} enablesReturnKeyAutomatically={true}></TextInput>
      <Button title="Login" onPress={login}></Button>
      <Button title="Register" onPress={register}></Button>
    </View>
  );
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

export { LoginScreen };