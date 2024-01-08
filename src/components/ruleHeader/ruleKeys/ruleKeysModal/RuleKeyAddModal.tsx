import { TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CustomModal from "../../../../utilities/modal/CustomModal";

function RuleKeyAddModal({ state, dispatch, ACTIONS, handleFormSubmit }: any) {
  const addTitle: string = "Rule Key Add";
  const size: string = "xl";

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
        handleClose={() => dispatch({ type: ACTIONS.ADDCLOSE })}
        title={addTitle}
        ACTIONS={ACTIONS}
        handleFormSubmit={() => handleFormSubmit()}
      >
        <form>
          <Grid2 container spacing={2}>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="prefix"
                name="prefix"
                value={state.prefix}
                placeholder="Prefix"
                label="Prefix"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "prefix",
                  })
                }
                fullWidth
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="company"
                name="company"
                value={state.company}
                placeholder="Company"
                label="Company"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: ACTIONS.ONCHANGE,
                    payload: e.target.value,
                    fieldName: "company",
                  })
                }
                fullWidth
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="rulename"
                name="rulename"
                value={state.rulename}
                placeholder="rulename"
                label="rulename"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: ACTIONS.ONCHANGE,
                    payload: e.target.value,
                    fieldName: "rulename",
                  })
                }
                fullWidth
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="rulekey"
                name="rulekey"
                value={state.rulekey}
                placeholder="Rule Key"
                label="Rule Key"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: ACTIONS.ONCHANGE,
                    payload: e.target.value,
                    fieldName: "rulekey",
                  })
                }
                fullWidth
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="seqno"
                name="seqno"
                value={state.seqno}
                placeholder="seqno"
                label="seqno"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: ACTIONS.ONCHANGE,
                    payload: e.target.value,
                    fieldName: "seqno",
                  })
                }
                fullWidth
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="language"
                name="language"
                value={state.language}
                placeholder="language"
                label="language"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: ACTIONS.ONCHANGE,
                    payload: e.target.value,
                    fieldName: "language",
                  })
                }
                fullWidth
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="activeflag"
                name="activeflag"
                value={state.activeflag}
                placeholder="activeflag"
                label="activeflag"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: ACTIONS.ONCHANGE,
                    payload: e.target.value,
                    fieldName: "activeflag",
                  })
                }
                fullWidth
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="longdesc"
                name="longdesc"
                value={state.longdesc}
                placeholder="longdesc"
                label="longdesc"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: ACTIONS.ONCHANGE,
                    payload: e.target.value,
                    fieldName: "longdesc",
                  })
                }
                fullWidth
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="shortdesc"
                name="shortdesc"
                value={state.shortdesc}
                placeholder="Short Description"
                label="Short Description"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: ACTIONS.ONCHANGE,
                    payload: e.target.value,
                    fieldName: "shortdesc",
                  })
                }
                fullWidth
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="itmfrm"
                name="itmfrm"
                value={state.itmfrm}
                placeholder="itmfrm"
                label="itmfrm"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: ACTIONS.ONCHANGE,
                    payload: e.target.value,
                    fieldName: "itmfrm",
                  })
                }
                fullWidth
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="itmto"
                name="itmto"
                value={state.itmto}
                placeholder="itmto"
                label="itmto"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: ACTIONS.ONCHANGE,
                    payload: e.target.value,
                    fieldName: "itmto",
                  })
                }
                fullWidth
                margin="dense"
              />
            </Grid2>
          </Grid2>
        </form>
      </CustomModal>
    </div>
  );
}

export default RuleKeyAddModal;
