import { TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect, useState } from "react";
import { useSignIn } from "../../../../contexts/SignInContext";
import CustomModal from "../../../../utilities/modal/CustomModal";
import { modifyRuleKey } from "../ruleKeysApi/ruleKeysApi";

function RuleKeyDataModal({ state, handleClose, record }: any) {
  const title: string = "Rule Key Data";
  const size: string = "xl";

  const { authResponse } = useSignIn();

  const token = authResponse?.accessToken;
  const [ruleKeyData, setruleKeyData] = useState<any>({});
  useEffect(() => {
    let parsedRuleKeyData = record?.data ? JSON.parse(record.data) : {};
    setruleKeyData(parsedRuleKeyData);
    return () => {};
  }, [record]);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setruleKeyData((prev: any) => ({ ...prev, [name]: value }));
  };

  const editFormSubmit = () => {
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
        {Object.keys(ruleKeyData).map((key: string) => (
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
        ))}
      </Grid2>
    </CustomModal>
  );
}

export default RuleKeyDataModal;
