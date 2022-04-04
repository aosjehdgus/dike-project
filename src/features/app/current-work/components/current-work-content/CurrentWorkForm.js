/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */

/* React */
import { useState, useEffect } from 'react';
/* Redux & Toolkit */
import { useDispatch, useSelector } from 'react-redux';
import {
  currentWorkAction,
  currentWorkSelector,
} from 'features/app/current-work/slice';
/* Icons */
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import DoneIcon from '@mui/icons-material/Done';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
/* Material UI */
import {
  Grid,
  Radio,
  Button,
  FormLabel,
  IconButton,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from '@mui/material';
import { useStyles } from 'features/app/current-work/components/styles/dike-current-work-content-style';
/* Library */
import { isEmpty } from 'lodash/';

/* Import Comonents */
import { currentWorkFormConfig } from 'features/app/constants/current-work';
import CurrentWorkSubTitle from 'features/app/current-work/components/current-work-content/CurrentWorkSubtitle';
import CurrentWorkParagraph from 'features/app/current-work/components/current-work-content/CurrentWorkParagraph';

export default function CurrentWorkForm() {
  const { loading, task } = useSelector(currentWorkSelector.all);
  const dispatch = useDispatch();
  const classes = useStyles();

  const { no, id, totalCount, type, score, target } = task || {};

  const { GET_NEXT_TASK, GET_PREV_TASK, UPDATE_TASK } = currentWorkAction;

  const [values, setValues] = useState({
    type: '',
    score: 0,
    target: '',
  });

  const passBtn = () => {
    dispatch(
      UPDATE_TASK({
        id,
        type: '',
        score: 0,
        target: '',
        status: 'done',
        direction: 'next',
      }),
    );
  };

  const movePrevTaskBtn = () => {
    /* NOTE : value값이 모두 선택되어야만 status를 done으로 업데이트한다 */
    /* Store 값 그대로 or value가 하나라도 비어있는 경우 x */
    if (
      type === values.type &&
      score === Number(values.score) &&
      target === values.target
    ) {
      if (
        type !== values.type ||
        score !== Number(values.score) ||
        target !== values.target
      ) {
        dispatch(
          UPDATE_TASK({
            id,
            type: values.type,
            score: Number(values.score),
            target: values.target,
            status: 'waiting',
            direction: 'prev',
          }),
        );
      }
      dispatch(GET_PREV_TASK({ id }));
    } else {
      dispatch(
        UPDATE_TASK({
          id,
          type: values.type,
          score: Number(values.score),
          target: values.target,
          status: 'done',
          direction: 'prev',
        }),
      );
    }
  };

  const handleOnChange = e => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const moveNextTaskBtn = e => {
    e.preventDefault();
    /* NOTE : 기존 값에서 변화가 없을 때는 다음 단계로 이동시 업데이트 진행하지 않는다. */
    if (
      type === values.type &&
      score === Number(values.score) &&
      target === values.target
    ) {
      dispatch(GET_NEXT_TASK({ id }));
    } else {
      dispatch(
        UPDATE_TASK({
          id,
          type: values.type,
          score: Number(values.score),
          target: values.target,
          status: 'done',
          direction: 'next',
        }),
      );
    }
  };

  const disabledState = () => {
    if (type && score && target) {
      return false;
    }
    if (values.type && Number(values.score) && values.target) {
      return false;
    }

    return true;
  };

  // };
  // disabled가 false인 case
  // 1. values.type, values.score, values.target 3개가 모두 채워졌을 때
  // 2. type, score, target 값이 존재할 때

  useEffect(() => {
    setValues({
      ...values,
      type: type || '',
      score: score || 0,
      target: target || '',
    });
  }, [task]);

  return (
    <>
      <form onSubmit={moveNextTaskBtn} className={classes.currentWorkForm}>
        <Grid container direction="row" justifyContent="space-between">
          <Grid
            item
            xs={12}
            md={12}
            lg
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              // overflow: 'auto',
              border: '1px solid rgba(73, 80, 87, 0.1)',
              borderRadius: 5,
              m: 0.5,
              p: 1,
            }}
          >
            <CurrentWorkParagraph />
          </Grid>

          <Grid
            item
            xs
            md
            lg={5}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              p: 1,
              m: 0.5,
              border: '1px solid rgba(73, 80, 87, 0.1)',
              borderRadius: 5,
            }}
          >
            <Grid
              item
              sx={{
                m: 1,
              }}
            >
              <CurrentWorkSubTitle />
            </Grid>
            {currentWorkFormConfig.map(data => {
              const { title, name, key, radioConfig } = data;

              return (
                <Grid
                  item
                  key={`box${key}`}
                  sx={{
                    p: 1,
                    ml: 1,
                    mr: 1,
                  }}
                >
                  <FormControl
                    key={`formControl${key}`}
                    component="fieldset"
                    sx={{ width: '100%' }}
                  >
                    <FormLabel
                      key={`formLabel${key}`}
                      component="legend"
                      required
                      sx={{
                        fontSize: { sm: 16, xs: 14 },
                      }}
                    >
                      {title}
                    </FormLabel>
                    <RadioGroup
                      row
                      className={classes.radioGroup}
                      onChange={handleOnChange}
                      key={key}
                      name={name}
                      value={values[name]}
                    >
                      {radioConfig.map(radio => {
                        return (
                          <FormControlLabel
                            key={radio.key}
                            value={radio.value || ''}
                            label={radio.label}
                            disabled={loading || isEmpty(task)}
                            control={<Radio size="small" color="info" />}
                            sx={{
                              '&.MuiFormControlLabel-root': {
                                color: 'rgba(57, 70, 49, 0.9)',
                              },
                            }}
                          />
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                </Grid>
              );
            })}
            <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
              <IconButton
                sx={{
                  color: 'rgba(98, 92, 96, 1)',
                  border: '1px solid rgba(98, 92, 96, 0.5)',
                  ml: 1,
                  mr: 1,
                }}
                onClick={movePrevTaskBtn}
                disabled={loading || no === 1 || isEmpty(task)}
              >
                <ArrowBackIosOutlinedIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: 'rgba(98, 92, 96, 1)',
                  border: '1px solid rgba(98, 92, 96, 0.5)',
                  ml: 1,
                  mr: 1,
                }}
                onClick={passBtn}
              >
                <AssignmentTurnedInOutlinedIcon />
              </IconButton>

              <IconButton
                type="submit"
                sx={{
                  color: 'rgba(98, 92, 96, 1)',
                  border: '1px solid rgba(98, 92, 96, 0.5)',
                  ml: 1,
                  mr: 1,
                }}
                disabled={disabledState()}
              >
                {no === totalCount ? (
                  <DoneIcon />
                ) : (
                  <ArrowForwardIosOutlinedIcon />
                )}
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
