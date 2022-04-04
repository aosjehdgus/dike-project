/* eslint-disable import/prefer-default-export */
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  currentWorkParagraph: {
    display: 'flex',
    fontSize: 20,
  },
  currentWorkForm: {
    display: 'flex',
    width: '100%',
    padding: 15,
  },
  radioGroup: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 11,
  },
  speaker: {
    display: 'inline-block',
    height: 30,
  },
}));
