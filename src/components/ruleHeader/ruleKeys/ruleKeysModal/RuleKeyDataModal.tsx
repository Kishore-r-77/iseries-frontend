import { TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect, useState } from "react";
import { useSignIn } from "../../../../contexts/SignInContext";
import CustomModal from "../../../../utilities/modal/CustomModal";
import { modifyRuleKey } from "../ruleKeysApi/ruleKeysApi";
import { useRuleKey } from "../../../../contexts/RuleKeyContext";

function RuleKeyDataModal({ state, handleClose, record }: any) {
  const title: string = "Rule Key Data";
  const size: string = "xl";

  const { authResponse } = useSignIn();
  const { getRuleKeysData } = useRuleKey();

  const token = authResponse?.accessToken;
  function isObject(value: any) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }
  const [ruleKeyData, setruleKeyData] = useState<any>({} || []);

  useEffect(() => {
    let parsedRuleKeyData = record?.data ? JSON.parse(record.data) : {};
    if (isObject(parsedRuleKeyData)) {
      setruleKeyData(parsedRuleKeyData);
    } else {
      setruleKeyData(parsedRuleKeyData);
    }
    const storedRuleKeyData = sessionStorage.getItem("ruleKeyData");
    if (storedRuleKeyData) {
      setruleKeyData(JSON.parse(storedRuleKeyData));
    }
    return () => {};
  }, [record]);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setruleKeyData((prev: any) => ({ ...prev, [name]: value }));
  };
  const handleEditChangeArray = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setruleKeyData((prev: any) =>
      prev.map((items: any, i: number) => {
        if (index === i) {
          return {
            ...items,
            [name]: value,
          };
        } else return items;
      })
    );
  };

  const editFormSubmit = () => {
    sessionStorage.setItem("ruleKeyData", JSON.stringify(ruleKeyData));
    return modifyRuleKey(record, token, ruleKeyData)
      .then((resp: any) => {
        console.log(resp);
        handleClose();
      })
      .catch((err) => console.log(err));
  };

  return (
    <CustomModal
      open={state.editOpen ? state.editOpen : state.infoOpen}
      handleClose={handleClose}
      size={size}
      title={title}
      handleFormSubmit={state.editOpen ? editFormSubmit : null}
    >
      <Grid2 container spacing={2}>
        {isObject(ruleKeyData)
          ? Object.keys(ruleKeyData).map((key: string) => (
              <Grid2 key={key} xs={8} md={6} lg={6}>
                <TextField
                  id={`${key}`}
                  name={`${key}`}
                  placeholder={key}
                  value={ruleKeyData[key]}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleEditChange(e)
                  }
                  label={`${key}`}
                  fullWidth
                  inputProps={{ readOnly: state.infoOpen }}
                  margin="dense"
                />
              </Grid2>
            ))
          : ruleKeyData?.map((value: any, index: number) => (
              <>
                {Object?.keys(value)?.map((key: string) => (
                  <Grid2 key={key} xs={8} md={6} lg={6}>
                    <TextField
                      name={`${key}`}
                      placeholder={key}
                      value={value[key]}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleEditChangeArray(e, index)
                      }
                      label={`${key}`}
                      fullWidth
                      inputProps={{ readOnly: state.infoOpen }}
                      margin="dense"
                    />
                  </Grid2>
                ))}
              </>
            ))}
      </Grid2>
    </CustomModal>
  );
}

export default RuleKeyDataModal;
