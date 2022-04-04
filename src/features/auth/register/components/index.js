import { Grid } from '@mui/material';
import { useStyles } from 'features/auth/register/components/styles/dike-register-layout-style';

import RegisterTitle from 'features/auth/register/components/RegisterTitle';
import RegisterForm from 'features/auth/register/components/RegisterForm';

export default function RegisterLayout() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Grid
          container
          flexDirection="column"
          justifyContent="space-evenly"
          className={classes.container}
          sx={{
            width: { sm: 400, xs: '80%' },
            height: { sm: 'fit-content' },
          }}
        >
          <Grid item className={classes.title}>
            <RegisterTitle />
          </Grid>
          <Grid item className={classes.form}>
            <RegisterForm />
          </Grid>
        </Grid>
      </div>
    </>
  );
}
