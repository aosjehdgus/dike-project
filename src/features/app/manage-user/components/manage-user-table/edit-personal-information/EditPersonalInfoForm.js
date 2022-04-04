/* eslint-disable no-unused-vars */

/* React */
import { useState } from 'react';
/* Redux & Toolkit */
import { useDispatch, useSelector } from 'react-redux';
import { loginSelector } from 'features/auth/login/slice';
import { manageUserAction } from 'features/app/manage-user/slice';
/* Icons */
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
/* Material UI */
import {
  Box,
  Button,
  TextField,
  IconButton,
  InputAdornment,
} from '@mui/material';
/* Import Comonents */
import { useStyles } from 'features/app/manage-user/components/styles/dike-manage-user-style';

export default function EditPersonalInfoForm(prop) {
  const { close } = prop;
  const { me } = useSelector(loginSelector.all);
  const { userId, level } = me || '';

  const classes = useStyles();
  const dispatch = useDispatch();

  const { EDIT_USER } = manageUserAction;

  const [values, setValues] = useState({
    name: me.name,
    disabled: true,
  });

  const { disabled } = values;

  const [editName, setEditName] = useState(true);

  const handleEditName = () => {
    setEditName(prevState => !prevState);
  };

  const handleOnChange = e => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleOnKeyUp = () => {
    if (me.name !== values.name) {
      setValues({ ...values, disabled: false });
    } else {
      setValues({ ...values, disabled: true });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(EDIT_USER({ id: me.id, name: values.name }));
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
                <IconButton onClick={handleEditName}>
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
          margin="normal"
          variant="standard"
          fullWidth
          value={userId}
          disabled
        />
        <TextField
          label="역할"
          margin="normal"
          variant="standard"
          fullWidth
          value={level}
          disabled
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
            수정
          </Button>
        </Box>
      </form>
    </>
  );
}
