import { createContext, useContext, useState, ReactNode } from "react";
import { signIn } from "../auth/signin/signinApi/signinApi";
import { AuthResponseType } from "../auth/signin/signinTypes/signInTypes";
import { useNavigate } from "react-router-dom"; // assuming you are using react-router-dom

// Define the context type
interface SignInContextProps {
  phoneNumber: string;
  setphoneNumber: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setpassword: React.Dispatch<React.SetStateAction<string>>;
  authResponse: AuthResponseType | null;
  handleSubmit: (e: React.FormEvent) => void;
}

const SignInContext = createContext<SignInContextProps | undefined>(undefined);

export const useSignIn = () => {
  const context = useContext(SignInContext);
  if (!context) {
    throw new Error("useSign must be used within a SignInContextProvider");
  }
  return context;
};

interface SignInContextProviderProps {
  children: ReactNode;
}

function SignInContextProvider({ children }: SignInContextProviderProps) {
  const [authResponse, setauthResponse] = useState<AuthResponseType | null>(
    null
  );
  const [phoneNumber, setphoneNumber] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signIn({ phoneNumber, password })
      .then((resp: AuthResponseType) => {
        setauthResponse(resp);
        navigate("home");
      })
      .catch((err: Error) => {
        console.log(err);
      });
  };

  const signInValues = {
    phoneNumber,
    setphoneNumber,
    password,
    setpassword,
    handleSubmit,
    authResponse,
  };

  return (
    <SignInContext.Provider value={signInValues}>
      {children}
    </SignInContext.Provider>
  );
}

export default SignInContextProvider;
