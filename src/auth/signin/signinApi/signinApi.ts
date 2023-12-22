import axios, { AxiosError } from "axios";
import { AuthResponseType } from "../signinTypes/signInTypes";

type SignInCredentials = {
  phoneNumber: string;
  password: string;
};

export const signIn = async ({
  phoneNumber,
  password,
}: SignInCredentials): Promise<AuthResponseType> => {
  try {
    const resp = await axios.post(`http://localhost:8080/auth/signin`, {
      username: phoneNumber,
      password: password,
    });

    // Handle the response here, return the data
    return resp.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios errors
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // The request was made and the server responded with a status code
        console.error("Server error:", axiosError.response.data);
      } else if (axiosError.request) {
        // The request was made but no response was received
        console.error("No response received:", axiosError.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", axiosError.message);
      }
    } else {
      // Handle non-Axios errors
      console.error("Non-Axios error:", (error as Error).message);
    }

    // Throw a custom error for better handling in the component
    throw new Error("Sign-in failed");
  }
};
