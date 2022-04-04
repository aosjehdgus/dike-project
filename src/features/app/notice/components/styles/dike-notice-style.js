/* eslint-disable import/prefer-default-export */
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  tabContainer: {
    paddingLeft: 1,
    paddingRight: 1,
    width: '100%',
    display: 'flex',
    borderRadius: 12,
    border: '1px solid rgba(241,237,233,1)',
  },
  tablist: {
    display: 'flex',
    '& .MuiTabs-indicator': {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: '#635ee7',
    },
  },

  deleteBtn: {
    display: 'flex',
    alignItems: 'center',
  },
  addNoticeForm: {
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
