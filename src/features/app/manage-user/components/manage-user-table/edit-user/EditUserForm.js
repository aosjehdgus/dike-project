/* eslint-disable no-unused-vars */

/* React */
import { useState } from 'react';
/* Redux & Toolkit */
import { useDispatch } from 'react-redux';
import { manageUserAction } from 'features/app/manage-user/slice';
/* Material UI */
import {
  Box,
  Button,
  IconButton,
  TextField,
  InputAdornment,
} from '@mui/material';
import { useStyles } from 'features/app/manage-user/components/styles/dike-manage-user-style';
/* Icons */
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export default function EditUserForm(prop) {
  const { userInfo, close } = prop;

  const classes = useStyles();
  const dispatch = useDispatch();

  const { EDIT_USER } = manageUserAction;

  const [values, setValues] = useState({
    name: userInfo.name,
    disabled: true,
  });
  const { disabled } = values;

  const [editName, setEditName] = useState(true);

  const handleEdit = () => {
    setEditName(prevState => !prevState);
  };

  const handleOnKeyUp = () => {
    if (userInfo.name !== values.name) {
      setValues({ ...values, disabled: false });
    } else {
      setValues({ ...values, disabled: true });
    }
  };

  const handleOnChange = e => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(EDIT_USER({ id: userInfo.id, name: values.name }));
    setValues({
      ...values,
      name: '',
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={classes.manageUserForm}>
        <TextField
          label="이름"
          name="name"
          margin="normal"
          variant="standard"
          fullWidth
          disabled={editName}
          value={values.name}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            disableUnderline: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleEdit}>
                  <EditOutlinedIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onKeyUp={handleOnKeyUp}
          onChange={handleOnChange}
        />
        <TextField
          label="아이디(이메일)"
          name="userId"
          margin="normal"
          variant="standard"
          fullWidth
          disabled
          value={userInfo.userId}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            disableUnderline: true,
          }}
        />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: 5,
          }}
        >
          <Button className={classes.closeBtn} onClick={close}>
            닫기
          </Button>
          <Button disabled={disabled} className={classes.addBtn} type="submit">
            확인
          </Button>
        </Box>
      </form>
    </>
  );
}
