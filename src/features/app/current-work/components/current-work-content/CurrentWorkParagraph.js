/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */

// NOTE : 이전으로 이동할 때 value 값 변경했을 때 업데이트를 할 지 말지 결정하고,
// 업데이트를 한다면 개발을 달리해야함

/* Redux & Toolkit */
import { useSelector } from 'react-redux';
import { currentWorkSelector } from 'features/app/current-work/slice';
/* Material UI */
import { Box, Paper, Typography } from '@mui/material';
/* Library */
import { isEmpty } from 'lodash/';

import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';
import { useStyles } from 'features/app/current-work/components/styles/dike-current-work-content-style';

export default function CurrentWorkParagraph() {
  const classes = useStyles();
  const { loading, task } = useSelector(currentWorkSelector.all);
  const { expression } = task || {};

  const { sentences, text, start, end, sentenceId } = expression || {};

  const speakerConfig = [
    {
      key: '1',
      icon: <img className={classes.speaker} src="/img/speaker1.jpg" alt="" />,
    },
    {
      key: '2',
      icon: <img className={classes.speaker} src="/img/speaker2.jpg" alt="" />,
    },
    {
      key: '3',
      icon: <img className={classes.speaker} src="/img/speaker3.jpg" alt="" />,
    },
    {
      key: '4',
      icon: <img className={classes.speaker} src="/img/speaker4.jpg" alt="" />,
    },
    {
      key: '5',
      icon: <img className={classes.speaker} src="/img/speaker5.jpg" alt="" />,
    },
    {
      key: '6',
      icon: <img className={classes.speaker} src="/img/speaker6.jpg" alt="" />,
    },
    {
      key: '7',
      icon: <img className={classes.speaker} src="/img/speaker7.jpg" alt="" />,
    },
    {
      key: '8',
      icon: <img className={classes.speaker} src="/img/speaker8.jpg" alt="" />,
    },
    {
      key: '9',
      icon: <img className={classes.speaker} src="/img/speaker9.jpg" alt="" />,
    },
  ];

  const MakeColorBlock = ({ targetSentence }) => {
    /* 타겟 문장 */
    let tag;
    let beforeTag;
    let afterTag;
    const speaker =
      sentenceId.slice(0, 1) === 'E' ? '' : targetSentence.slice(0, 3);

    if (targetSentence.slice(start, end) !== text) {
      const findTagStartIndex = targetSentence.indexOf(text);
      const findTagEndIndex = targetSentence.indexOf(text) + text.length;

      beforeTag =
        sentenceId.slice(0, 1) === 'E'
          ? targetSentence.slice(0, findTagStartIndex)
          : targetSentence.slice(3, findTagStartIndex);
      tag = targetSentence.slice(findTagStartIndex, findTagEndIndex);
      afterTag = targetSentence.slice(findTagEndIndex, targetSentence.length);
    } else {
      /* Tag가 정상적인 위치에 있을 때 */
      beforeTag =
        sentenceId.slice(0, 1) === 'E'
          ? targetSentence.slice(0, start)
          : targetSentence.slice(3, start);
      tag = targetSentence.slice(start, end);
      afterTag = targetSentence.slice(end, targetSentence.length);
    }

    return (
      <Box
        sx={{
          display: 'flex',
          color: 'rgba(98, 92, 96, 1)',
        }}
      >
        {speakerConfig.map(data => {
          const { key, icon } = data;
          return speaker.slice(0, 1) === key ? (
            <Box
              sx={{ display: 'inline-block', justifyContent: 'center', mr: 1 }}
              key={key}
            >
              {icon}
            </Box>
          ) : (
            ''
          );
        })}
        <Box>
          {beforeTag}
          <Box
            component="span"
            sx={{
              fontWeight: 700,
              fontSize: { lg: 20, md: 18, sm: 17, xs: 16 },
              // Paradise Pink
              color: '#e63e62',
            }}
          >
            {tag}
          </Box>
          {afterTag}
        </Box>
      </Box>
    );
  };

  return loading || isEmpty(sentences) ? (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}
    >
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: theme =>
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 500],
          animationDuration: '700ms',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={25}
      />
    </Box>
  ) : sentenceId.slice(0, 1) === 'E' ? (
    <Box
      sx={{
        p: 2,
        height: '100%',
        animation: 'fadein 1s',
        '@keyframes fadein': {
          from: {
            opacity: 0,
            transform: 'translateY(20px)',
          },
          to: {
            opacity: 1,
          },
        },
      }}
    >
      {sentences.map((sentence, index) => {
        return index === 2 ? (
          <Paper
            key={sentence}
            elevation={8}
            sx={{
              fontSize: { lg: 20, md: 18, sm: 17, xs: 16 },
              p: 2,
              mt: 2,
              mb: 2,
              fontWeight: 700,
              backgroundColor: 'rgba(241, 237, 233, 0.3)',
              borderRadius: 2,
            }}
          >
            <MakeColorBlock targetSentence={sentence} />
          </Paper>
        ) : (
          <Typography
            key={`${sentence} + ${index + 1}`}
            variant="body1"
            component="span"
            sx={{
              fontSize: { lg: 19, md: 17, sm: 16, xs: 15 },
              p: 1,
              mb: 1,
              color: 'rgba(98, 92, 96, 1)',
              borderRadius: 2,
            }}
          >
            {sentence}
          </Typography>
        );
      })}
    </Box>
  ) : (
    /* 메신저 대화 */
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        p: 2,
        height: '100%',
        animation: 'fadein 1s',
        '@keyframes fadein': {
          from: {
            opacity: 0,
            transform: 'translateY(20px)',
          },
          to: {
            opacity: 1,
          },
        },
      }}
    >
      {sentences.map((sentence, index) => {
        const speaker = sentence.slice(0, 3);
        const afterSpeaker = sentence.slice(3, sentence.length);

        return index === 2 ? (
          <Paper
            key={sentence}
            elevation={8}
            sx={{
              fontSize: { lg: 20, md: 18, sm: 17, xs: 16 },
              p: 2,
              mt: 2,
              mb: 2,
              fontWeight: 700,
              backgroundColor: 'rgba(241, 237, 233, 0.3)',
              borderRadius: 2,
            }}
          >
            <MakeColorBlock targetSentence={sentence} />
          </Paper>
        ) : (
          <Box
            sx={{ display: 'flex', alignItems: 'center', p: 1, mb: 1 }}
            key={`${sentence} + ${index + 1}`}
          >
            {speakerConfig.map(data => {
              const { key, icon } = data;

              return speaker.slice(0, 1) === key ? (
                <Box
                  sx={{
                    display: 'inline-block',
                    justifyContent: 'center',
                    mr: 1,
                  }}
                  key={key}
                >
                  {icon}
                </Box>
              ) : (
                ''
              );
            })}
            <Typography
              variant="body1"
              component="span"
              sx={{
                fontSize: { lg: 19, md: 17, sm: 16, xs: 15 },
                color: 'rgba(98, 92, 96, 1)',
              }}
            >
              {afterSpeaker}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
