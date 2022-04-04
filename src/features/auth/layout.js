import AuthViews from 'features/auth/index';
import { Grid } from '@mui/material';
import { useStyles } from 'features/auth/styles/dike-auth-layout-style';

export const AuthLayout = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.authContainer}>
      <AuthViews />
    </Grid>
  );
};

export default AuthLayout;
