/* eslint-disable import/prefer-default-export */
import { makeStyles } from '@mui/styles';
// import Image from 'img/balloon.jpg';

export const useStyles = makeStyles({
  // authContainer: {
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundImage: `url("${Image}")`,
  //   position: 'relative',
  //   backgroundPosition: 'center',
  //   backgroundSize: 'cover',
  //   backgroundRepeat: 'no-repeat',
  //   '&::before': {
  //     content: '""',
  //     backgroundColor: 'white',
  //     opacity: 0.7,
  //     position: 'absolute',
  //     top: 0,
  //     right: 0,
  //     left: 0,
  //     bottom: 0,
  //   },
  // },
  authContainer: {
    display: 'flex',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    background: 'linear-gradient(-132deg, #ECC371, #6868ac, #E187B8)',
    backgroundSize: '400% 400%',
    animation: 'gradient 15s ease infinite',
  },
  '@global': {
    '@keyframes gradient': {
      '0%': {
        backgroundPosition: '0% 50%',
      },
      '50%': {
        backgroundPosition: '100% 50%',
      },
      '100%': {
        backgroundPosition: '0% 50%',
      },
    },
  },
});
