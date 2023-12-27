import { createContext, useContext, useState } from "react";
import { useSignIn } from "./SignInContext";
import {
  getAllApi,
  getRuleKey,
} from "../components/ruleHeader/ruleHeaderApis/ruleHeaderApi";

const RuleKeyContext = createContext<any | undefined>(undefined);
export const useRuleKey = () => {
  const context = useContext(RuleKeyContext);
  if (!context) {
    throw new Error("useSignIn must be used within a SignInContextProvider");
  }
  return context;
};

function RuleKeyContextProvider({ children }: any) {
  const { authResponse } = useSignIn();

  const token = authResponse?.accessToken;
  const [ruleKeyData, setruleKeyData] = useState([]);
  const [isrulekeyOpen, setisrulekeyOpen] = useState(false);
  const [ruleHeaderObj, setruleHeaderObj] = useState<any>({});
  const handleRuleKeyOpen = () => {
    setisrulekeyOpen(true);
  };
  const handleRuleKeyClose = () => {
    setisrulekeyOpen(false);
  };
  const [ruleHeaderData, setruleHeaderData] = useState<any>([]);
  const getRuleHeader = () => {
    return getAllApi(token!)
      .then((resp) => {
        setruleHeaderData(resp?.data?.body?.data);
      })
      .catch((err) => console.log(err.message));
  };

  const storedRuleHeaderObject = sessionStorage.getItem("ruleHeaderObject");
  const parsedRuleHeaderObject = storedRuleHeaderObject
    ? JSON.parse(storedRuleHeaderObject)
    : null;

  const getRuleKeysData = () => {
    return getRuleKey(
      token!,
      parsedRuleHeaderObject?.language,
      parsedRuleHeaderObject?.rulename,
      parsedRuleHeaderObject?.company,
      true
    )
      .then((resp: any) => {
        setruleKeyData(resp?.data?.body?.data);
      })
      .catch((err) => console.log(err.message));
  };

  const values = {
    ruleKeyData,
    setruleKeyData,
    getRuleKeysData,
    isrulekeyOpen,
    setisrulekeyOpen,
    handleRuleKeyOpen,
    handleRuleKeyClose,
    ruleHeaderData,
    setruleHeaderData,
    getRuleHeader,
    ruleHeaderObj,
    setruleHeaderObj,
  };
  return (
    <RuleKeyContext.Provider value={values}>{children}</RuleKeyContext.Provider>
  );
}

export default RuleKeyContextProvider;
