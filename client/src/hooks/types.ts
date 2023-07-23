export interface IUser {
  userEmail: string;
  authToken: string;
  name: string;
  dateOfBirth: string; 
}


export interface IAuthContext {
  user: IUser,
  setUser: (user: IUser) => void
}
