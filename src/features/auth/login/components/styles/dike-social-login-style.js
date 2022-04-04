/* eslint-disable import/prefer-default-export */
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  socialBtnContainer: {
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    width: 350,
    height: 200,
    marginTop: 15,
    marginBottom: 15,
  },
  symbolItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
  },
  textItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
  },
  kakaoSymbolBtn: {
    display: 'flex',
    justifyContent: 'space-around',
    borderRadius: 12,
    backgroundColor: '#FEE500',
    width: 350,
    height: 50,
    padding: 0,
    '&:hover': {
      backgroundColor: '#FEE500',
    },
    color: '191919',
    fontWeight: 700,
  },
  kakaoSymbol: {
    width: 20,
    height: 20,
  },
  naverSymbolBtn: {
    borderRadius: 12,
    width: 350,
    height: 50,
    padding: 0,
    backgroundColor: '#03C75A',
    color: 'white',
    fontWeight: 700,
    '&:hover': {
      backgroundColor: '#03C75A',
    },
  },
  naverSymbol: {
    width: 35,
    height: 35,
    borderRadius: 12,
  },
  googleSymbolBtn: {
    borderRadius: 12,
    width: 352,
    height: 50,
    padding: 0,
    backgroundColor: 'white',
    color: 'black',
    fontWeight: 700,
    border: '1px solid #ECEFF1',
  },
  googleSymbol: {
    width: 20,
    height: 20,
  },
}));
