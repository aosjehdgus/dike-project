import { Box, Grid } from '@mui/material';
import { useStyles } from 'features/auth/login/components/styles/dike-login-style';
import { useSelector } from 'react-redux';
import { loginSelector } from 'features/auth/login/slice';
import { BorderLinearProgress } from 'features/auth/constants/progress-bar';

export default function LoginFooter() {
  const { loading } = useSelector(loginSelector.all);
  const classes = useStyles();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '50px',
        justifyContent: 'space-between',
      }}
    >
      <Grid container className={classes.loginFooterContainer}>
        <img className={classes.loginFooterLogo} src="/img/nikl.jpg" alt="" />
        <img className={classes.loginFooterLogo} src="/img/snue.png" alt="" />
        <img className={classes.loginFooterLogo} src="/img/media.jpg" alt="" />
      </Grid>
      {loading ? <BorderLinearProgress /> : null}
    </Box>
  );
}
