export enum AppRole {
  INTERNAL,
  EXTERNAL,
  PRIVILEDGED,
  ADMIN,
}

export interface User {
  identifier: string,
  userName: string,
  password: string,
  email: string,
  emailVerified: boolean,
  role: AppRole,
}

export interface UserData {
  user: User,
}