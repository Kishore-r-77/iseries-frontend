import axios from "axios";

export const addRuleKey = (state: any, token: string | undefined) => {
  return axios.put(
    `http://localhost:8080/bizrules/ruleKey`,
    {
      prefix: state.prefix,
      company: state.company,
      rulename: state.rulename,
      rulekey: state.rulekey,
      seqno: state.seqno,
      language: state.language,
      activeflag: state.activeflag,
      longdesc: state.longdesc,
      shortdesc: state.shortdesc,
      data: null,
      itmfrm: state.itmfrm,
      itmto: state.itmto,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const modifyRuleKey = (
  state: any,
  token: string | undefined,
  ruleKeyData: any
) => {
  return axios.put(
    `http://localhost:8080/bizrules/ruleKey`,
    {
      prefix: state.prefix,
      company: state.company,
      rulename: state.rulename,
      rulekey: state.rulekey,
      seqno: state.seqno,
      fromDate: state.fromDate,
      toDate: state.toDate,
      ruleprog: state.ruleprog,
      activeflag: state.activeflag,
      data: JSON.stringify(ruleKeyData),
      user: state.user,
      language: "E",
      shortdesc: "SSSS",
      longdesc: "SSSS",
      totalMultiItems: state.totalMultiItems,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
