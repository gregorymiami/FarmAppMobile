import { User } from '../interfaces/UserData';

export default interface LoginData {
  token: string | null,
  updateToken: (token: string | null) => void,
  user: User | null,
  updateUser: (user: User | null) => void,
}