import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CustomModal from "../../../../utilities/modal/CustomModal";
import { TextField } from "@mui/material";

function RuleKeyDataModal({ open, handleClose, record }: any) {
  const title: string = "Rule Key Data";
  const size: string = "xl";

  const ruleKeyData = record?.data ? JSON.parse(record.data) : {};

  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
      size={size}
      title={title}
    >
      <Grid2 container spacing={2}>
        {Object.keys(ruleKeyData).map((key: string) => (
          <Grid2 key={key} xs={8} md={6} lg={6}>
            <TextField
              id={`${key}-textfield`}
              name={`${key}-textfield`}
              placeholder={key}
              value={ruleKeyData[key]}
              InputLabelProps={{ shrink: true }}
              label={`${key}-textfield`}
              fullWidth
              inputProps={{ readOnly: true }}
              margin="dense"
            />
          </Grid2>
        ))}
      </Grid2>
    </CustomModal>
  );
}

export default RuleKeyDataModal;
