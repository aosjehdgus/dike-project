import { Grid } from '@mui/material';
import { useStyles } from 'features/auth/terms/styles/p1-terms-layout-style';
import TermsForm from './components/TermsForm';

import TermsTitle from './components/TermsTitle';

export default function TermsLayout() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Grid container className={classes.container}>
          <Grid item>
            <TermsTitle />
          </Grid>
          <Grid item>
            <TermsForm />
          </Grid>
        </Grid>
      </div>
    </>
  );
}
