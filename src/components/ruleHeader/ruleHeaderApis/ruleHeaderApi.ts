import axios from "axios";

export const getAllApi = (token: string) => {
  return axios.get(`http://localhost:8080/bizrules/ruleHeaders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      language: "E",
    },
  });
};
export const getRuleKey = (
  token: string,
  language: string,
  ruleNameEquals: string,
  company: string,
  getSearchfields: boolean
) => {
  return axios.get(`http://localhost:8080/bizrules/ruleKeys`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      language,
      ruleNameEquals,
      company,
      getSearchfields,
    },
  });
};

export const addApi = (state: any, token: string) => {
  return axios.post(
    `http://localhost:8080/bizrules/ruleHeader`,
    {
      company: state.company,
      rulename: state.rulename,
      ruleprog: state.ruleprog,
      language: state.language,
      longdesc: state.longdesc,
      data: JSON.stringify(state.data),
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const editApi = (record: any, token: string) => {
  return axios.put(
    `http://localhost:8080/bizrules/ruleKey`,

    {
      company: record.company,
      rulename: record.rulename,
      ruleprog: record.ruleprog,
      language: record.language,
      longdesc: record.longdesc,
      data: record.data,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
