/* eslint-disable no-unused-vars */

/* React */
import { useState } from 'react';
/* Material UI */
import {
  Tab,
  Box,
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogContent,
} from '@mui/material';

import { TabPanel, TabContext, TabList } from '@mui/lab';
import { useStyles } from 'features/auth/login/components/styles/dike-change-password-style';
/* Import Components and Variables */
import SearchStepper from 'features/auth/login/components/controls/SearchStepper';

export default function SearchDialog() {
  /* Hook */
  const classes = useStyles();
  /* State */
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('searchId');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e, newValue) => {
    // console.log('newValue:', newValue);
    setValue(newValue);
  };

  return (
    <>
      <Button onClick={handleClickOpen}>아이디 찾기/비밀번호 변경</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogTitle>계정 정보 확인 및 변경</DialogTitle>
          <Box
            sx={{
              width: '100%',
              typography: 'body1',
            }}
          >
            <TabContext value={value}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                }}
              >
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  textColor="primary"
                  indicatorColor="primary"
                >
                  <Tab label="아이디 찾기" value="searchId" />
                  <Tab label="비밀번호 변경" value="changePassword" />
                </TabList>
              </Box>
              <TabPanel className={classes.tabPanel} value="searchId">
                <SearchStepper
                  name={
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="이름"
                      type="text"
                      fullWidth
                      variant="standard"
                    />
                  }
                  phone={
                    <TextField
                      margin="dense"
                      id="phone"
                      label="휴대전화"
                      type="text"
                      fullWidth
                      variant="standard"
                    />
                  }
                  action="userId"
                  onClick={handleClose}
                />
              </TabPanel>
              <TabPanel className={classes.tabPanel} value="changePassword">
                <SearchStepper
                  email={
                    <TextField
                      autoFocus
                      margin="dense"
                      id="userId"
                      label="이메일(아이디)"
                      type="email"
                      fullWidth
                      variant="standard"
                    />
                  }
                  action="password"
                  onClick={handleClose}
                />
              </TabPanel>
            </TabContext>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
