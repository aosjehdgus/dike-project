import { Grid } from '@mui/material';
import { useStyles } from 'features/auth/verification/components/styles/dike-verification-style';
import VerificationForm from 'features/auth/verification/components/VerificationForm';
import VerificationTitle from 'features/auth/verification/components/VerificationTitle';

export default function VerificationLayout() {
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
            width: { sm: 400, xs: 'fit-content' },
            height: { sm: 'fit-content' },
          }}
        >
          <Grid item>
            <VerificationTitle />
          </Grid>
          <Grid item>
            <VerificationForm />
          </Grid>
        </Grid>
      </div>
    </>
  );
}
