import axios from "axios";

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
