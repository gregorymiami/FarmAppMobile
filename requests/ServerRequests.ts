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

export const login = (email: string, password: string, callback: (loginResponse: LoginResponse) => void, error: (error: any) => void): void => {
  const data = { email, password };
  const params = {
    body: JSON.stringify(data),
    method: "POST",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  };

  fetch(`${usersApiUrl}/login`, params)
  .then ((response) => {
    if (response.status !== 200) {
      console.log(response);
      console.log(`response status is ${response.status}`)
      error(response);
      return;
    }

    response.json()
    .then((userData: UserData) => {
      console.log(response.headers);
      let tokenString = response.headers.get(setCookie);
      if (!tokenString) {
        console.log("no token string");
        error("no token string");
        return;
      }

      let token = tokenString.split('=')[1];
      let user = userData.user;
      callback({ user, token });
      return;
    })
    .catch((err) => {
      console.log(err);
      error(err);
      return;
    }); 
  })
  .catch((err) => {
    console.log(err);
    error(err);
    return;
  });
};

export const logout = (token: string, callback: () => void, error: (error: any) => void): void => {
  const params = {
    method: "GET",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'set-cookie': `Authorization=${token}`,
    },
  };

  fetch(`${usersApiUrl}/logout`, params)
  .then((response) => {
    if (response.status !== 200) {
      console.log(response);
      console.log(`response status is ${response.status}`)
      error(response);
      return;
    }
    callback();
    return;
  })
  .catch((err) => {
    console.log(err);
    error(err);
    return;
  });
};