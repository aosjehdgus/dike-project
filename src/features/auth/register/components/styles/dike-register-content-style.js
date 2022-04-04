/* eslint-disable import/prefer-default-export */
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(1),
    },
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    width: '100%',
  },
  registerTitle: {
    color: 'rgba(41, 40, 45, 1)',
    fontSize: 20,
    fontWeight: 700,
  },
  input: {
    width: '100%',
    borderRadius: 10,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    // border: '1px solid #ced4da',
    fontSize: 13,
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
  },
  radioLabel: {
    fontSize: 13,
  },
  radio: {
    width: '100%',
    height: 70,
  },
  radioItem: {
    fontSize: 13,
    marginRight: 100,
  },
  btnGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  btn: {
    color: 'white',
    fontSize: 15,
    fontWeight: 800,
    backgroundColor: 'rgba(104, 104, 172, 1)',
    '&:hover': {
      backgroundColor: 'rgba(104, 104, 172, 0.8)',
    },
    borderRadius: 12,
    position: 'relative',
    p: 16,
  },
  backBtn: {
    color: 'white',
    fontSize: 15,
    fontWeight: 800,
    backgroundColor: 'rgba(98, 92, 96, 1)',
    '&:hover': {
      backgroundColor: 'rgba(98, 92, 96, 0.8)',
    },
    borderRadius: 12,
    position: 'relative',
    p: 16,
  },
  checkBtn: {
    width: 38,
    height: 30,
    borderRadius: 5,
    position: 'relative',
    backgroundColor: 'white',
    border: '1px solid #ced4da',
    color: 'rgba(104, 104, 172, 1)',
    fontSize: 11,
    fontWeight: 800,
    padding: '10px 12px',
    '&:hover': {
      color: 'white',
      backgroundColor: 'rgba(104, 104, 172, 1)',
    },
  },
  sendBtn: {
    width: 10,
    height: 30,
    borderRadius: 5,
    position: 'relative',
    backgroundColor: 'white',
    border: '1px solid #ced4da',
    color: 'rgba(43, 79, 156, 1)',
    fontSize: 11,
    fontWeight: 800,
    padding: '10px 12px',
    '&:hover': {
      color: 'white',
      backgroundColor: 'rgba(43, 79, 156, 0.8)',
    },
  },
  okBtn: {
    width: 38,
    height: 30,
    borderRadius: 5,
    position: 'relative',
    backgroundColor: 'white',
    border: '1px solid #ced4da',
    color: 'rgba(43, 79, 156, 1)',
    fontSize: 11,
    fontWeight: 800,
    padding: '10px 12px ',
    '&:hover': {
      color: 'white',
      backgroundColor: 'rgba(43, 79, 156, 0.8)',
    },
  },
}));
