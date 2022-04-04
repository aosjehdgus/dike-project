/* eslint-disable import/prefer-default-export */
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  btnContainer: {
    width: '100%',
    marginTop: 20,
    display: 'flex',
    justifyContent: 'space-around',
  },
  continueBtn: {
    fontSize: 15,
    display: 'flex',
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(43, 79, 156, 1)',
    borderRadius: 5,
    color: 'rgba(43, 79, 156, 1)',
    backgroundColor: 'white',
    fontWeight: 600,
    '&:hover': {
      color: 'white',
      backgroundColor: 'rgba(43, 79, 156, 1)',
    },
  },
  backBtn: {
    fontSize: 15,
    display: 'flex',
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(43, 79, 156, 1)',
    borderRadius: 5,
    color: 'white',
    backgroundColor: 'rgba(43, 79, 156, 1)',
    fontWeight: 600,
    '&:hover': {
      color: 'rgba(43, 79, 156, 1)',
      backgroundColor: 'white',
    },
  },
});
