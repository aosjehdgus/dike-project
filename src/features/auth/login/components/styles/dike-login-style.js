/* eslint-disable import/prefer-default-export */
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(theme => ({
  loginHeaderTitleContainer: {
    display: 'flex',
    width: 240,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    width: '100%',
    color: 'rgba(41, 40, 45, 0.9)',
    fontSize: 26,
    fontWeight: 700,
    textAlign: 'center',
  },
  headerSubTitle: {
    color: 'rgba(41, 40, 45, 0.8)',
    fontSize: 15,
    fontWeight: 500,
  },
  loginForm: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: theme.palette.common.white,
    marginTop: 15,
    fontSize: 15,
    paddingLeft: 15,
    borderRadius: 12,
  },
  btn: {
    marginTop: theme.spacing(3),
    position: 'relative',
    backgroundColor: 'rgba(104, 104, 172, 1)',
    borderRadius: 12,
    color: 'white',
    fontSize: 17,
    fontWeight: 800,
    padding: '10px 12px',
    '&:hover': {
      backgroundColor: 'rgba(104, 104, 172, 0.8)',
    },
  },
  registerBtn: {
    color: 'rgba(41, 40, 45, 1)',
    fontSize: 15,
    fontWeight: 700,
    padding: 0,
    '&:hover': {
      backgroundColor: 'white',
      textDecoration: 'underline',
    },
  },
  loginFooterContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  loginFooterLogo: {
    height: 25,
  },
  socialLogin: {
    height: 210,
  },
}));
