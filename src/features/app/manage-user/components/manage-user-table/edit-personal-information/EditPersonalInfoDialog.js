/* eslint-disable no-unused-vars */

/* React */
import { useState } from 'react';
/* Material UI */
import {
  Dialog,
  Divider,
  MenuItem,
  DialogTitle,
  ListItemIcon,
  DialogContent,
} from '@mui/material';
/* Icons */
import Settings from '@mui/icons-material/Settings';
/* Import Components */
import EditPersonalInfoTitle from 'features/app/manage-user/components/manage-user-table/edit-personal-information/EditPersonalInfoTitle';
import EditPersonalInfoForm from 'features/app/manage-user/components/manage-user-table/edit-personal-information/EditPersonalInfoForm';

export default function EditPersonalInfoDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MenuItem onClick={handleClickOpen}>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        <EditPersonalInfoTitle />
      </MenuItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogTitle>
            <EditPersonalInfoTitle />
          </DialogTitle>
          <Divider />
          <EditPersonalInfoForm close={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
}
