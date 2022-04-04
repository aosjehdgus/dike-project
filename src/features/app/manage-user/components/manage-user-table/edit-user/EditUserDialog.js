/* eslint-disable no-unused-vars */

/* React */
import { useState } from 'react';
/* Material UI */
import {
  Dialog,
  Divider,
  IconButton,
  DialogTitle,
  DialogContent,
} from '@mui/material';
/* Icons */
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
/* Import Components */
import EditUserTitle from 'features/app/manage-user/components/manage-user-table/edit-user/EditUserTitle';
import EditUserForm from 'features/app/manage-user/components/manage-user-table/edit-user/EditUserForm';
/* Library */

export default function EditUserDialog(prop) {
  const [open, setOpen] = useState(false);

  const { userInfo } = prop;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton size="small" onClick={handleClickOpen}>
        <CreateTwoToneIcon fontSize="small" />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogTitle>
            <EditUserTitle />
          </DialogTitle>
          <Divider />

          <EditUserForm close={handleClose} userInfo={userInfo} />
        </DialogContent>
      </Dialog>
    </>
  );
}
