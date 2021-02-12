import { UserData, User } from '../interfaces/UserData';

const baseUrl = `http://ec2-18-218-65-79.us-east-2.compute.amazonaws.com:3050`;
const apiUrl = '/api';
const usersUrl = '/users';
const usersApiUrl = `${baseUrl}${apiUrl}${usersUrl}`;
const setCookie = "set-cookie";

export interface LoginResponse {
  user: User,
  token: string,
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const data = { email, password };
  const params = {
    body: JSON.stringify(data),
    method: "POST",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  };

  try {
    let response = await fetch(`${usersApiUrl}/login`, params);
    if (response.status !== 200) {
      console.log(response);
      console.log(`response status is ${response.status}`);
      throw `Bad Response: ${response}`;
    }
    let tokenString = response.headers.get(setCookie);
    if (!tokenString) {
      console.log("no token string");
      throw "no token string";
    }
    let token = tokenString.split('=')[1];
    let userData: UserData = await response.json();
    let user = userData.user;
    return { user, token };
  } catch(error) {
    throw `Request Failure: ${error}`;
  }
};

export const logout = async (token: string): Promise<void> => {
  const params = {
    method: "GET",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'set-cookie': `Authorization=${token}`,
    },
  };
  try {
    let response = await fetch(`${usersApiUrl}/logout`, params);
    if (response.status !== 200) {
      console.log(response);
      console.log(`response status is ${response.status}`);
      throw `Bad Response: ${response}`;
    }
    return;
  } catch (error) {
    throw `Request Failure: ${error}`;
  }
};