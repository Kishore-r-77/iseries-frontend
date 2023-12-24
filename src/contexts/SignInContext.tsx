import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../auth/signin/signinApi/signinApi";
import {
  AuthResponseType,
  SignInContextProps,
  SignInContextProviderProps,
} from "../auth/signin/signinTypes/signInTypes";

const SignInContext = createContext<SignInContextProps | undefined>(undefined);

export const useSignIn = () => {
  const context = useContext(SignInContext);
  if (!context) {
    throw new Error("useSignIn must be used within a SignInContextProvider");
  }
  return context;
};

function SignInContextProvider({ children }: SignInContextProviderProps) {
  const [phoneNumber, setphoneNumber] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signIn({ phoneNumber, password })
      .then((resp: AuthResponseType) => {
        sessionStorage.setItem("authResponse", JSON.stringify(resp));
        navigate("home");
      })
      .catch((err: Error) => {
        console.log(err);
      });
  };

  const storedAuthResponse = sessionStorage.getItem("authResponse");
  const initialAuthResponse: AuthResponseType | null = storedAuthResponse
    ? JSON.parse(storedAuthResponse)
    : null;

  const signInValues = {
    phoneNumber,
    setphoneNumber,
    password,
    setpassword,
    handleSubmit,
    authResponse: initialAuthResponse,
  };

  useEffect(() => {
    // Cleanup sessionStorage if authResponse is null
    if (!initialAuthResponse) {
      sessionStorage.removeItem("authResponse");
    }
  }, [initialAuthResponse]);

  return (
    <SignInContext.Provider value={signInValues}>
      {children}
    </SignInContext.Provider>
  );
}

export default SignInContextProvider;
