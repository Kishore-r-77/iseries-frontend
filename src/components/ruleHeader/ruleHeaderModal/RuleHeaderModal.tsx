import { MenuItem, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect, useState } from "react";
import CustomModal from "../../../utilities/modal/CustomModal";

function RuleHeaderModal({
  state,
  record,
  ruleTypeData,
  setruleTypeData,
  dispatch,
  ACTIONS,
  handleFormSubmit,
}: any) {
  const addTitle: string = "Rule Header Add";
  const editTitle: string = "Rule Header Edit";
  const infoTitle: string = "Rule Header Info";
  const size: string = "xl";

  const handleRuleType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("podu");

    setruleTypeData((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <CustomModal
        open={
          state.addOpen
            ? state.addOpen
            : state.editOpen
            ? state.editOpen
            : state.infoOpen
        }
        size={size}
        handleClose={
          state.addOpen
            ? () => dispatch({ type: ACTIONS.ADDCLOSE })
            : state.editOpen
            ? () => dispatch({ type: ACTIONS.EDITCLOSE })
            : () => dispatch({ type: ACTIONS.INFOCLOSE })
        }
        title={
          state.addOpen
            ? addTitle
            : state.editOpen
            ? editTitle
            : state.infoOpen
            ? infoTitle
            : null
        }
        ACTIONS={ACTIONS}
        handleFormSubmit={() => handleFormSubmit()}
      >
        <form>
          <Grid2 container spacing={2}>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="company"
                name="company"
                value={state.addOpen ? state.company : record.company}
                placeholder="Prefix"
                label="Company Name"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "company",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="rulename"
                name="rulename"
                value={state.addOpen ? state.rulename : record.rulename}
                placeholder="Rule Name"
                label="Rule Name"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "rulename",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="ruleprog"
                name="ruleprog"
                value={state.addOpen ? state.ruleprog : record.ruleprog}
                placeholder="Rule Program"
                label="Rule Program"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "ruleprog",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="language"
                name="language"
                value={state.addOpen ? state.language : record.language}
                placeholder="Language"
                label="Language"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "language",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="longdesc"
                name="longdesc"
                value={state.addOpen ? state.longdesc : record.longdesc}
                placeholder="Long Description"
                label="Long Description"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "longdesc",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                select
                id="data"
                name="ruleType"
                value={
                  state.addOpen ? state.data.ruleType : ruleTypeData.ruleType
                }
                placeholder="Data"
                label="Data"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  state.addOpen
                    ? dispatch({
                        type: ACTIONS.ONCHANGE,
                        payload: e.target.value,
                        fieldName: "ruleType",
                      })
                    : handleRuleType(e)
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              >
                <MenuItem value="0">0</MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="d">d</MenuItem>
              </TextField>
            </Grid2>
          </Grid2>
        </form>
      </CustomModal>
    </div>
  );
}

export default RuleHeaderModal;
