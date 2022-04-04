/* eslint-disable no-unused-vars */

/* React */
import { useState } from 'react';
/* Redux & Toolkit */
import { useDispatch } from 'react-redux';
import { noticeAction } from 'features/app/notice/slice';
/* Material UI */
import {
  Box,
  Radio,
  Button,
  FormLabel,
  TextField,
  RadioGroup,
  FormControl,
  InputAdornment,
  FormControlLabel,
} from '@mui/material';
import { useStyles } from 'features/app/notice/components/styles/dike-notice-style';
/* Library */
import { isEmpty } from 'lodash/';
/* Import Comonents */
import { addNoticeConfig } from 'features/app/constants/notice';

export default function AddNoticeForm(prop) {
  const { close } = prop;

  const classes = useStyles();
  const dispatch = useDispatch();
  const { ADD_NOTICE } = noticeAction;

  const [values, setValues] = useState({
    title: '',
    link: '',
    type: '',
  });

  const currentTime = Math.floor(new Date().getTime());

  const handleOnChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(
      ADD_NOTICE({
        title: values.title,
        link: `https://www.notion.so/${values.link}`,
        type: values.type,
        registrationDateTime: currentTime,
      }),
    );
    setValues({
      ...values,
      title: '',
      link: '',
      type: '',
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={classes.addNoticeForm}>
        {addNoticeConfig.map(data => {
          const { key, title, name, radioConfig } = data;

          return isEmpty(radioConfig) ? (
            <TextField
              key={key}
              label={title}
              name={name}
              margin="normal"
              variant="standard"
              fullWidth
              value={values[name]}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                disableUnderline: true,
                startAdornment:
                  name === 'link' ? (
                    <InputAdornment position="end">
                      <InputAdornment position="start">
                        https://www.notion.so/
                      </InputAdornment>
                    </InputAdornment>
                  ) : null,
              }}
              // onKeyUp={handleOnKeyUp}
              onChange={handleOnChange}
            />
          ) : (
            <FormControl key={`formControl${key}`}>
              <FormLabel
                key={`formLabel${key}`}
                sx={{
                  '&.MuiFormLabel-root': {
                    mt: 1.5,
                    fontSize: 12,
                    color: 'rgba(0, 0, 0, 0.6)',
                  },
                }}
              >
                {title}
              </FormLabel>
              <Box
                sx={{
                  mt: 1,
                  p: 1,
                  borderRadius: 1,
                }}
              >
                <RadioGroup
                  row
                  key={key}
                  aria-label="type"
                  name={name}
                  value={values[name]}
                  onChange={handleOnChange}
                >
                  {radioConfig.map(radio => {
                    const { value, label } = radio;
                    return (
                      <FormControlLabel
                        key={label}
                        value={value}
                        control={<Radio />}
                        label={label}
                      />
                    );
                  })}
                </RadioGroup>
              </Box>
            </FormControl>
          );
        })}
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
          <Button
            disabled={
              isEmpty(values.type) ||
              isEmpty(values.title) ||
              isEmpty(values.link)
            }
            className={classes.addBtn}
            type="submit"
          >
            추가
          </Button>
        </Box>
      </form>
    </>
  );
}
