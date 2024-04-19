import {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function Dialogbox({open,handleNo, handleYes}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        // onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" display="flex" justifyContent="center" alignItems="center">
          {"Are you sure to delete?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You will not be able to recover the account later!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleNo}>
            Cancel
          </Button>
          <Button onClick={handleYes} autoFocus>
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
