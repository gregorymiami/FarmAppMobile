import React, { FC, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from "react-native";
import MainScreen from '../screens/MainScreen';
import LoginScreen from '../screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginContext } from '../contexts/LoginContext';
import { User } from '../interfaces/UserData';

enum LoadingState {
  NOT_STARTED,
  LOADING,
  FAILED,
  SUCEEDED
};

interface TokenLoader {
  token: string,
  loadingState: LoadingState
}

export const TokenChecker: FC = () => {
  const [loading, setLoading] = useState<TokenLoader>({
    token: "",
    loadingState: LoadingState.NOT_STARTED
  });
  const [user, setUser] = useState<User | null>(null);

  const updateToken = async (token: string | null) => {
    try {
      if (!token) {
        await AsyncStorage.removeItem('@login_token')
        await AsyncStorage.removeItem('@user_data')
        setLoading({
          token: "",
          loadingState: LoadingState.NOT_STARTED,
        });
        setUser(null);
      } else {
        await AsyncStorage.setItem('@login_token', token);
        setLoading({
          token: token,
          loadingState: LoadingState.SUCEEDED
        });
      }
    } catch(err) {
      console.log(err);
    }
  }

  const updateUser = async (updatedUser: User | null) => {
    try {
      if (!updatedUser) {
        return;
      } else {
        await AsyncStorage.setItem('@user_data', JSON.stringify(user));
        setUser(updatedUser);
      }
    } catch(err) {
      console.log(err);
    }
  }

  const readToken = async () => {
    try {
      const [token, userString] = await Promise.all([
        await AsyncStorage.getItem('@login_token'),
        await AsyncStorage.getItem('@user_data')
      ]);

      return [token, userString];
    } catch (err) {
      console.log(err);
      setLoading({ token: "", loadingState: LoadingState.FAILED });
    }
  }

  useEffect(() => {
    if (loading.loadingState === LoadingState.NOT_STARTED) {
      setLoading({ token: "", loadingState: LoadingState.LOADING });
    } else if (loading.loadingState === LoadingState.LOADING) {
      readToken()
      .then((result) => {
        if (!result) {
          setLoading({ token: "", loadingState: LoadingState.FAILED });
          return;
        }
        const [token, userString] = result;
        if (token !== null && userString !== null) {
          setLoading({ token, loadingState: LoadingState.SUCEEDED });
          const userObject:User = JSON.parse(userString);
          setUser(userObject);
        } else {
          setLoading({ token: "", loadingState: LoadingState.FAILED });
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading({ token: "", loadingState: LoadingState.FAILED });
      });
    }
  }, [loading, user]);

  if (loading.loadingState === LoadingState.SUCEEDED) {
    const Stack = createStackNavigator();
    return (
      <NavigationContainer>
        <LoginContext.Provider value={{ token: loading.token, updateToken: updateToken, user, updateUser: updateUser }}>
          <Stack.Navigator>
            <Stack.Screen name="Dashboard" component={MainScreen} />
          </Stack.Navigator>
        </LoginContext.Provider>
      </NavigationContainer>
    );
  } else if (loading.loadingState === LoadingState.FAILED) {
    return (
      <LoginContext.Provider value={{ token: loading.token, updateToken: updateToken, user, updateUser: updateUser }}>
        <LoginScreen />
      </LoginContext.Provider>
    );
  } else {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}