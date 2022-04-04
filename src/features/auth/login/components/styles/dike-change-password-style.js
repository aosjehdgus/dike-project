/* eslint-disable import/prefer-default-export */
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  changeBtn: {
    marginLeft: 3,
    color: 'rgba(4, 14, 4, 1)',
    backgroundColor: 'white',
    padding: 0,
    fontWeight: 500,
    '&:hover': {
      backgroundColor: 'white',
      textDecoration: 'underline',
    },
  },
  alert: {
    marginTop: 20,
  },
  remainTime: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    color: '#f44336',
    position: 'relative',
    marginTop: 10,
    marginBottom: 10,
    padding: '0px 10px 0px 10px',
    fontSize: 12,
    fontWeight: 800,
  },
}));
