import { TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CustomModal from "../../../../utilities/modal/CustomModal";

function RuleKeysModal({ ruleKeyData, dispatch, ACTIONS, open }: any) {
  const title: string = "Rule Key";
  const size: string = "lg";

  return (
    <div>
      <CustomModal
        open={open}
        size={size}
        handleClose={() => dispatch({ type: ACTIONS.INFOCLOSE })}
        title={title}
        ACTIONS={ACTIONS}
      >
        <form>
          <Grid2 container spacing={2}>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="prefix"
                name="prefix"
                value={ruleKeyData?.prefix}
                placeholder="Prefix"
                label="Prefix"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="company"
                name="company"
                value={ruleKeyData?.company}
                placeholder="Prefix"
                label="Company Name"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="rulename"
                name="rulename"
                value={ruleKeyData?.rulename}
                placeholder="Rule Name"
                label="Rule Name"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="rulekey"
                name="rulekey"
                value={ruleKeyData?.rulekey}
                placeholder="Rule Key"
                label="Rule Key"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="ruleprog"
                name="ruleprog"
                value={ruleKeyData?.ruleprog}
                placeholder="Rule Program"
                label="Rule Program"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="language"
                name="language"
                value={ruleKeyData?.language}
                placeholder="Language"
                label="Language"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="longdesc"
                name="longdesc"
                value={ruleKeyData?.longdesc}
                placeholder="Long Description"
                label="Long Description"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="data"
                name="data"
                value={ruleKeyData?.data}
                placeholder="Data"
                label="Data"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="user"
                name="user"
                value={ruleKeyData?.user}
                placeholder="user"
                label="user"
                fullWidth
                inputProps={{ readOnly: true }}
                margin="dense"
              />
            </Grid2>
          </Grid2>
        </form>
      </CustomModal>
    </div>
  );
}

export default RuleKeysModal;
