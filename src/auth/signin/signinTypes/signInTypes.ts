import { ReactNode } from "react";

export type AuthResponseType = {
  userid: string;
  username: string;
  authorities: string[];
  accessToken: string;
  tokenType: string;
};

export type SignInContextProps = {
  phoneNumber: string;
  setphoneNumber: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setpassword: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent) => void;
  authResponse: AuthResponseType | null;
};

export type SignInContextProviderProps = {
  children: ReactNode;
};
