import { Grid, Typography } from '@mui/material';
import { useStyles } from 'features/auth/login/components/styles/dike-login-style';

export default function LoginHeader() {
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.loginHeaderTitleContainer}>
        <Grid
          item
          sx={{
            marginBottom: 3,
          }}
        >
          <Typography className={classes.headerTitle}>
            비윤리적 표현 말뭉치 연구 분석 및 시범 구축
          </Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.headerSubTitle}>
            우리 A.I. 윤리 가르치기
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
