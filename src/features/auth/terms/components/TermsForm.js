/* eslint-disable import/no-cycle */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
import { Button, Grid } from '@mui/material';
import { useStyles } from 'features/auth/terms/components/styles/p1-terms-form-style';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGIN_PATH, REGISTER_PATH } from 'configs/AppConfig';
import CommonTerms from './CommonTerms';
import ProjectTerms from './ProjectTerms';

export default function TermsForm() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [value, setValue] = useState('');

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    history.push(REGISTER_PATH);
  };

  const backBtn = () => {
    history.push(LOGIN_PATH);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item>
            <CommonTerms />
          </Grid>
          <Grid item>
            <ProjectTerms />
          </Grid>
        </Grid>
        <Grid container className={classes.btnContainer}>
          <Grid item>
            <Button className={classes.backBtn} onClick={backBtn}>
              뒤로 가기
            </Button>
          </Grid>
          <Grid item>
            <Button className={classes.continueBtn} type="submit">
              계속 하기
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
