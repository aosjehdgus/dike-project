/* eslint-disable import/prefer-default-export */
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  loginRoot: {
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  loginContainer: {
    backgroundColor: 'white',
    position: 'relative',
  },
  loginHeader: {
    padding: '60px 30px 40px 30px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  loginForm: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
  },
  otherAction: {
    display: 'flex',
    width: '100%',
    padding: '0px 10px 15px 10px',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: '5px 0 5px 0',
  },
  loginFooter: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    display: 'flex',
    justifyContent: 'center',
  },
}));
