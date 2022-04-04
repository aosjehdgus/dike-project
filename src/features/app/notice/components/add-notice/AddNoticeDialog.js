/* eslint-disable no-unused-vars */
/* React */
import { useState, useEffect } from 'react';
/* Redux & Toolkit */
import { useSelector } from 'react-redux';
import { noticeSelector } from 'features/app/notice/slice';
/* Material UI */
import {
  Dialog,
  Button,
  Divider,
  DialogTitle,
  DialogContent,
} from '@mui/material';
/* Import Components */
import AddNoticeForm from 'features/app/notice/components/add-notice/AddNoticeForm';
/* Library */
import { isEmpty } from 'lodash/';

export default function AddNoticeDialog() {
  const [open, setOpen] = useState(false);
  const { notice } = useSelector(noticeSelector.all);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!isEmpty(notice)) {
      setOpen(false);
    }
  }, [notice]);

  return (
    <>
      <Button
        sx={{
          p: 0.5,
          fontSize: 12,
          fontWeight: 700,
          color: 'white',
          backgroundColor: '#625c60',
          border: '1px solid #fafafa',
          '&.MuiButton-root:hover': {
            backgroundColor: '#5d5c60e6',
            color: 'white',
          },
        }}
        onClick={handleClickOpen}
      >
        추가
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogTitle>공지 추가</DialogTitle>
          <Divider />

          <AddNoticeForm close={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
}
