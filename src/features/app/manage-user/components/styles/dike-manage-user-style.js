/* eslint-disable import/prefer-default-export */
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  manageUserForm: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '15px 20px 15px 20px',
    borderRadius: 12,
    flexGrow: 1,
  },
  addBtn: {
    border: '1px solid rgba(57, 70, 49, 1)',
    fontWeight: 600,
    color: 'rgba(57, 70, 49, 1)',
    '&:hover': {
      backgroundColor: 'rgba(57, 70, 49, 0.1)',
    },
  },
  closeBtn: {
    border: '1px solid rgba(57, 70, 49, 1)',
    fontWeight: 600,
    color: 'rgba(57, 70, 49, 1)',
    marginRight: 10,
    '&:hover': {
      backgroundColor: 'rgba(57, 70, 49, 0.1)',
    },
  },
}));
