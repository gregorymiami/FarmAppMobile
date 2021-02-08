import { UserData, User } from '../interfaces/UserData';

const baseUrl = `http://ec2-18-218-65-79.us-east-2.compute.amazonaws.com:3050`;
const apiUrl = '/api';
const usersUrl = '/users';
const usersApiUrl = `${baseUrl}${apiUrl}${usersUrl}`;

export interface LoginResponse {
  user: User,
  token: string,
}

export const login = (email: string, password: string): Promise<LoginResponse> => {
  const data = { email, password };
  const params = {
    body: JSON.stringify(data),
    method: "POST",
  };
  return fetch(`${usersApiUrl}/login`, params)
  .then((response) => {
    let theString: string = JSON.stringify(response.body);
    const userData: UserData = (JSON.parse(theString) as UserData);
    let tokenString = response.headers.get("Cookie");

    if (!tokenString) {
      throw "error, no cookie in response.";
    }

    let token = tokenString.split('=')[1];
    let user = userData.user;

    return { user, token };
  }).catch((error) => {
    throw JSON.stringify(error);
  });
}