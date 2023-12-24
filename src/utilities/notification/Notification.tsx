import { Portal } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import * as React from "react";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Notification(props: any) {
  const { notify, setNotify } = props;

  const handleClose = (reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setNotify({
      ...notify,
      isOpen: false,
    });
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Portal>
        <Snackbar
          open={notify.isOpen}
          autoHideDuration={5000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleClose}
            severity={notify.type}
            sx={{ width: "100%" }}
          >
            {notify.message}
          </Alert>
        </Snackbar>
      </Portal>
    </Stack>
  );
}
