/* eslint-disable import/prefer-default-export */
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  container: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: 'white',
    border: '1px solid rgba(174, 163, 146, 0.5)',
    position: 'relative',
  },
  title: {
    marginTop: 10,
    marginBottom: 30,
    width: '100%',
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  btn: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
}));
