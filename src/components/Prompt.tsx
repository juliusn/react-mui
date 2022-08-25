import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog, { DialogProps } from "@mui/material/Dialog";

type ConfirmationDialogRawProps = ConfirmationDialogProps & Omit<DialogProps,"open">;
function ConfirmationDialogRaw(props: ConfirmationDialogRawProps) {
  const { show, confirmNavigation, cancelNavigation, ...rest } = props;

  const handleCancel = () => {
    if(!cancelNavigation)return;
    cancelNavigation();
  };

  const handleOk = () => {
    if(!confirmNavigation)return;
    confirmNavigation();
  };
  return (
    <Dialog
      {...rest}
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      open={show}
    >
      <DialogTitle>Phone Ringtone</DialogTitle>
      <DialogContent dividers>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
interface ConfirmationDialogProps {
  show: boolean,
  confirmNavigation: () => void,
  cancelNavigation: () => void,
}
export default function ConfirmationDialog( { show, confirmNavigation, cancelNavigation }: ConfirmationDialogProps) {


  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <ConfirmationDialogRaw
        keepMounted
        show={show}
        cancelNavigation={cancelNavigation}
        confirmNavigation={confirmNavigation}
      />
    </Box>
  );
}

