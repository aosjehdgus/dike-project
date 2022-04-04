/* eslint-disable import/prefer-default-export */
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0, 3),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f8f9',
    height: '100vh',
  },
  container: {
    width: 400,
    padding: 30,
    borderRadius: 15,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    border: '1px solid #ECEFF1',
  },
}));
