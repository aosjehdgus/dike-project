/* eslint-disable react/jsx-props-no-spreading */
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';

export const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#6868ac' : '#1a90ff',
  },
}));

export default function TycheCircularProgress() {
  return (
    <Box sx={{ position: 'relative' }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: theme =>
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        }}
        size={20}
        thickness={1}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: theme => (theme.palette.mode === 'light' ? 'white' : 'white'),
          animationDuration: '1000ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={20}
        thickness={3}
      />
    </Box>
  );
}
