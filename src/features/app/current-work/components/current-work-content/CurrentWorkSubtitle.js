/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */

/* React */
import { useState, useEffect } from 'react';
/* Redux & Toolkit */
import { useDispatch, useSelector } from 'react-redux';
import {
  currentWorkAction,
  currentWorkSelector,
} from 'features/app/current-work/slice';
/* Material UI */
import {
  Box,
  Chip,
  Paper,
  Stack,
  Divider,
  TextField,
  IconButton,
  Typography,
  InputAdornment,
} from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
/* Icons */
import ImportExportIcon from '@mui/icons-material/ImportExport';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
/* Library */
import { isNil, isEmpty } from 'lodash/';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 400],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

export default function CurrentWorkSubTitle() {
  const { loading, task } = useSelector(currentWorkSelector.all);
  const { no, doneCount, totalCount, expression } = task || {};

  const { sentenceId } = expression || {};
  const { GET_SELECTED_TASK } = currentWorkAction;

  const dispatch = useDispatch();
  const [values, setValues] = useState({ number: '' });
  const [inputControl, setInputControl] = useState(true);
  const progress = parseInt((doneCount / totalCount) * 100, 10);

  const handleOnChange = e => {
    const { value } = e.target;

    if (Number(value) >= 0 && Number(value) <= totalCount) {
      setValues({ ...values, number: value });
    }
  };

  const handleMoveTask = () => {
    setInputControl(prevState => !prevState);

    if (values.number === '0') {
      setValues({ number: '' });
    }

    if (Number(values.number) <= 0 || no === Number(values.number)) {
      return;
    }

    dispatch(GET_SELECTED_TASK({ number: values.number }));
  };

  const handleOnKeyPress = e => {
    if (values.number === '0') {
      setValues({ number: '' });
    }

    if (
      e.key !== 'Enter' ||
      Number(values.number) <= 0 ||
      no === Number(values.number)
    ) {
      return;
    }

    dispatch(GET_SELECTED_TASK({ number: values.number }));
  };

  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 15,
    },
  }));

  useEffect(() => {
    setInputControl(true);
    setValues({ ...values, number: no });
  }, [task, task.no]);

  return loading ? (
    <Paper
      elevation={3}
      sx={{
        width: '100%',
        p: 1,
        borderRadius: 3,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Stack
        sx={{
          width: '100%',
        }}
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Chip
          variant="outlined"
          color="info"
          sx={{
            width: '100px',
            padding: 1,
          }}
          label=""
        />

        <TextField
          label="No"
          type="number"
          disabled
          value={0}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ width: '101px' }}
          variant="standard"
          InputProps={{
            disableUnderline: true,

            endAdornment: (
              <InputAdornment position="end">
                <IconButton disabled>
                  <ImportExportIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LightTooltip
          title={
            <>
              <Typography variant="p">전체 작업 : {totalCount}</Typography>
              <br />
              <Typography variant="p">완료 작업 : {doneCount}</Typography>
              <br />
              <Typography variant="p">
                남은 작업 : {totalCount - doneCount}
              </Typography>
            </>
          }
          placement="bottom"
          leaveDelay={300}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row', mr: 2, ml: 2 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  p: 1,
                  fontWeight: 500,
                  color: 'rgba(57, 70, 49, 0.8)',
                  fontSize: 15,
                }}
              >
                진행률 0%
              </Typography>

              <BorderLinearProgress variant="determinate" value={0} />
            </Box>
          </Box>
        </LightTooltip>
      </Stack>
    </Paper>
  ) : (
    <Paper
      elevation={3}
      sx={{
        width: '100%',
        p: 1,
        borderRadius: 3,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Stack
        sx={{
          width: '100%',
        }}
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <LightTooltip
          title={`문장 ID : ${!isNil(sentenceId) && sentenceId}`}
          placement="bottom"
          leaveDelay={300}
        >
          <Chip
            variant="outlined"
            color="info"
            sx={{
              fontSize: { md: 14, sm: 13, xs: 12 },
              fontWeight: 500,
              padding: 1,
            }}
            label={
              !isNil(sentenceId) && sentenceId.slice(0, 4) === 'ESRW'
                ? `웹-SNS`
                : !isNil(sentenceId) && sentenceId.slice(0, 4) === 'EBRW'
                ? `웹-블로그`
                : !isNil(sentenceId) && sentenceId.slice(0, 4) === 'EPRW'
                ? `웹-게시판`
                : !isNil(sentenceId) && sentenceId.slice(0, 4) === 'ERRW'
                ? '웹-리뷰'
                : !isNil(sentenceId) && sentenceId.slice(0, 4) === 'MDRW'
                ? '2인-메신저 대화'
                : !isNil(sentenceId) && sentenceId.slice(0, 4) === 'MMRW'
                ? '다자-메신저 대화'
                : `기타`
            }
          />
        </LightTooltip>

        <TextField
          label="No"
          type="number"
          value={values.number || ''}
          InputLabelProps={{
            shrink: true,
          }}
          inputRef={input => input && input.focus()}
          onKeyPress={handleOnKeyPress}
          onChange={handleOnChange}
          variant="standard"
          InputProps={{
            readOnly: inputControl,
            disableUnderline: true,
            inputProps: {
              min: 1,
              max: totalCount,
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  color="info"
                  disabled={isEmpty(task)}
                  onClick={handleMoveTask}
                >
                  {inputControl ? (
                    <ImportExportIcon />
                  ) : (
                    <CheckCircleOutlineIcon />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LightTooltip
          title={
            <>
              <Typography variant="p">전체 작업 : {totalCount}</Typography>
              <br />
              <Typography variant="p">완료 작업 : {doneCount}</Typography>
              <br />
              <Typography variant="p">
                남은 작업 : {totalCount - doneCount}
              </Typography>
            </>
          }
          placement="bottom"
          leaveDelay={300}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  pb: 1,
                  fontWeight: 500,
                  color: 'rgba(57, 70, 49, 0.8)',
                  fontSize: { md: 14, sm: 13, xs: 13 },
                }}
              >
                진행률 {`${progress || 0}%`}
              </Typography>

              <BorderLinearProgress variant="determinate" value={progress} />
            </Box>
          </Box>
        </LightTooltip>
      </Stack>
    </Paper>
  );
}
