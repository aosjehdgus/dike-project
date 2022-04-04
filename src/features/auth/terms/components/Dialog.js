/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react';
import {
  Button,
  Dialog,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';
import ArrowRight from '@mui/icons-material/ArrowRight';

export default function TermsScrollDialog(props) {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');

  const { title, contents, setChecked } = props;

  const handleClickOpen = scrollType => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChecked = () => {
    setOpen(false);
    setChecked();
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <>
      <IconButton onClick={handleClickOpen('paper')}>
        <ArrowRight />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {contents}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleChecked}>동의</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
