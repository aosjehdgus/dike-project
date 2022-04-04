/* eslint-disable no-unused-vars */

/* Material UI */
import { Grid } from '@mui/material';
import { useStyles } from 'features/auth/login/components/styles/dike-login-layout-style';
/* Import Components and Variables */
import LoginHeader from 'features/auth/login/components/LoginHeader';
import LoginForm from 'features/auth/login/components/LoginForm';
import RegisterButton from 'features/auth/login/components/RegisterButton';
import LoginFooter from 'features/auth/login/components/LoginFooter';
// import ChangePasswordDialog from './controls/ChangePasswordDialog';
// import SocialLoginButton from './components/SocialLoginButton';

export default function LoginLayout() {
  const classes = useStyles();

  return (
    <div className={classes.loginRoot}>
      <Grid
        container
        flexDirection="column"
        justifyContent="space-evenly"
        className={classes.loginContainer}
        sx={{
          width: { sm: 400, xs: 'fit-content' },
          height: 'fit-content',
          p: 3,
          border: '1px solid rgba(174, 163, 146, 0.5)',
          borderRadius: 3,
        }}
      >
        <Grid item className={classes.loginHeader}>
          <LoginHeader />
        </Grid>
        <Grid item className={classes.loginForm}>
          <LoginForm />
        </Grid>
        <Grid item className={classes.otherAction}>
          <RegisterButton />
          {/* /<ChangePasswordDialog /> */}
        </Grid>
        <Grid item className={classes.loginFooter}>
          <LoginFooter />
        </Grid>
        {/* <Grid item className={classes.socialLogin}>
          <SocialLoginButton />
        </Grid> */}
      </Grid>
    </div>
  );
}
