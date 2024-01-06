import { Button, MenuItem, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect, useState } from "react";
import { useSignIn } from "../../../../contexts/SignInContext";
import CustomModal from "../../../../utilities/modal/CustomModal";
import { modifyRuleKey } from "../ruleKeysApi/ruleKeysApi";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import DeleteIcon from "@mui/icons-material/Delete";

function RuleKeyDataModal({ state, handleClose, record }: any) {
  const title: string = "Rule Key Data";
  const size: string = "xl";

  const { authResponse } = useSignIn();

  const token = authResponse?.accessToken;

  function isObject(value: any) {
    return (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value) &&
      !value.hasOwnProperty("data")
    );
  }

  const [ruleKeyData, setRuleKeyData] = useState<any>({});

  useEffect(() => {
    let parsedRuleKeyData = record?.data ? JSON.parse(record.data) : {};
    setRuleKeyData(parsedRuleKeyData);
    return () => {};
  }, [record]);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRuleKeyData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleEditChangeArray = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;

    setRuleKeyData((prev: any) => {
      if (!prev || !prev.data || !Array.isArray(prev.data)) {
        console.error("Invalid data structure");
        return prev;
      }

      return {
        ...prev,
        data: prev.data.map((items: any, i: number) =>
          index === i ? { ...items, [name]: value } : items
        ),
      };
    });
  };

  const editFormSubmit = () => {
    return modifyRuleKey(record, token, ruleKeyData)
      .then((resp: any) => {
        console.log(resp);
        handleClose();
      })
      .catch((err) => console.log(err));
  };

  const handleAddField = () => {
    setRuleKeyData((prev: any) => {
      const keys = Object.keys(prev?.data[0]); // Extract keys from the first object
      const resultObject: any = {};
      keys.forEach((key) => {
        resultObject[key] = "";
      });

      const newData = [...(prev.data || []), resultObject];

      return {
        ...prev,
        data: newData,
      };
    });
  };

  const handleDeleteField = (index: number) => {
    setRuleKeyData((prev: any) => ({
      ...prev,
      data: prev.data.filter((_item: any, i: number) => i !== index),
    }));
  };

  return (
    <CustomModal
      open={state.editOpen ? state.editOpen : state.infoOpen}
      handleClose={handleClose}
      isfullscreen={Array.isArray(ruleKeyData.data)}
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
          : ruleKeyData?.data?.map((value: any, index: number) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  width: "90%",
                  justifyContent: "center",
                  margin: "10px auto",
                }}
              >
                {Object.keys(value).map((key: string) => (
                  <Grid2 key={`${index}-${key}`} xs={8} md={6} lg={2}>
                    {key === "mandatory" ? (
                      <TextField
                        select
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
                      >
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                      </TextField>
                    ) : (
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
                    )}
                  </Grid2>
                ))}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  {!state.infoOpen && ruleKeyData.data.length !== 1 ? (
                    <Button
                      onClick={() => handleDeleteField(index)}
                      variant="contained"
                      style={{
                        maxWidth: "40px",
                        maxHeight: "40px",
                        minWidth: "40px",
                        minHeight: "40px",
                        backgroundColor: "crimson",
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  ) : null}
                  {!state.infoOpen &&
                  ruleKeyData.data.length - 1 === index &&
                  ruleKeyData.data.length < 5 ? (
                    <Button
                      variant="contained"
                      onClick={() => handleAddField()}
                      style={{
                        maxWidth: "40px",
                        maxHeight: "40px",
                        minWidth: "40px",
                        minHeight: "40px",
                        backgroundColor: "#0a3161",
                      }}
                    >
                      <AddBoxRoundedIcon />
                    </Button>
                  ) : null}
                </div>
              </div>
            ))}
      </Grid2>
    </CustomModal>
  );
}

export default RuleKeyDataModal;
