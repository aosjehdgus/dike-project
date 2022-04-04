/* eslint-disable no-lone-blocks */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* React */
import { useState, useEffect } from 'react';
/* Redux & Toolkit */
import { useSelector, useDispatch } from 'react-redux';
import { loginSelector } from 'features/auth/login/slice';
import { noticeAction, noticeSelector } from 'features/app/notice/slice';
/* Material UI */
import {
  Box,
  Tab,
  Grid,
  Chip,
  Link,
  Paper,
  Popper,
  Divider,
  Button,
  Typography,
  IconButton,
} from '@mui/material';
import { TabPanel, TabContext, TabList } from '@mui/lab';
import { useStyles } from 'features/app/notice/components/styles/dike-notice-style';
/* Icons */
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BugReportTwoToneIcon from '@mui/icons-material/BugReportTwoTone';
import ConstructionTwoToneIcon from '@mui/icons-material/ConstructionTwoTone';
import AccessAlarmsTwoToneIcon from '@mui/icons-material/AccessAlarmsTwoTone';
import LocalActivityTwoToneIcon from '@mui/icons-material/LocalActivityTwoTone';
/* Library */
import { orderBy } from 'lodash/';
import moment from 'moment';
/* Import Components */
import { noticeTypeConfig } from 'features/app/constants/notice';
import AddNotice from 'features/app/notice/components/add-notice';

export default function NoticeContent() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { notices } = useSelector(noticeSelector.all);
  const { me } = useSelector(loginSelector.all);
  const { level } = me || '';

  const [value, setValue] = useState('all');
  const [noticeId, setNoticeId] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  /* Action */
  const { GET_NOTICE_LIST, DELETE_NOTICE } = noticeAction;

  const sortByNewNotices = orderBy(notices, ['registrationDateTime'], ['desc']);
  // console.log('[sortByNewNotices]:', sortByNewNotices);

  const formatData = sortByNewNotices.map(sortedNotice => {
    const { id, title, type, link, registrationDateTime } = sortedNotice;
    const noticeTime = moment(registrationDateTime).format('YYYY-MM-DD');

    return {
      id,
      title,
      type,
      icon:
        type === 'notice' ? (
          <LocalActivityTwoToneIcon style={{ color: '#4B9B69' }} />
        ) : type === 'bug' ? (
          <BugReportTwoToneIcon style={{ color: '#E63E62' }} />
        ) : type === 'fix' ? (
          <ConstructionTwoToneIcon style={{ color: '#EDC373' }} />
        ) : (
          ''
        ),
      label:
        type === 'notice'
          ? '알림'
          : type === 'bug'
          ? '버그'
          : type === 'fix'
          ? '수정'
          : '',
      link,
      noticeTime,
    };
  });

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const deleteNotice = id => {
    return level === ('manager' || 'admin') ? (
      <>
        <IconButton
          onClick={e => {
            setNoticeId(id);
            setAnchorEl(e.currentTarget);
          }}
          sx={{
            '&.MuiIconButton-root:hover': {
              transform: 'scale(1.1)',
            },
          }}
        >
          <DeleteTwoToneIcon fontSize="small" />
        </IconButton>
        <Popper open={open} anchorEl={anchorEl} placement="top-end">
          <Paper
            variant="outlined"
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  padding: '25px 25px 25px 10px',
                  fontSize: '14px',
                }}
              >
                정말 삭제하시겠습니까?
              </Typography>
              <Divider />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  height: '100%',
                }}
              >
                <Button
                  onClick={() => {
                    setAnchorEl(null);
                    dispatch(DELETE_NOTICE({ noticeId }));
                  }}
                >
                  확인
                </Button>
                <Button onClick={() => setAnchorEl(null)}>취소</Button>
              </Box>
            </Box>
          </Paper>
        </Popper>
      </>
    ) : null;
  };

  const noticeTabGrid = (id, title, icon, label, noticeTime, link) => {
    return (
      <Grid
        container
        justifyContent="space-between"
        sx={{
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
        <Grid item sx={{ alignItems: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <IconButton
              sx={{
                '&.MuiIconButton-root': {
                  cursor: 'inherit',
                },
                '&.MuiIconButton-root:hover': {
                  backgroundColor: 'inherit',
                },
              }}
            >
              {icon}
            </IconButton>
            <Chip
              label={label}
              variant="filled"
              sx={{
                display: { sm: 'flex', xs: 'none' },
                ml: 1,
                mr: 3,
                fontWeight: 700,
                fontSize: { sm: 11, xs: 11 },
              }}
            />
            <Link href={link} underline="none" target="_blank">
              <Typography
                sx={{
                  fontWeight: 500,
                  width: { lg: 600, md: 300, sm: 80, xs: 90 },
                  fontSize: { md: 15, sm: 13, xs: 12 },
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  '&:hover': {
                    opacity: '0.7',
                    overflow: 'visible',
                    whiteSpace: 'break-spaces',
                  },
                }}
              >
                {title}
              </Typography>
            </Link>
          </Box>
        </Grid>
        <Grid
          item
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Typography
            sx={{
              pl: 2,
              pr: 2,
              mr: 1,
              borderLeft: 1,
              borderRight: 1,
              borderColor: 'divider',
              fontWeight: 500,
              fontSize: { md: 13, sm: 10, xs: 11 },
            }}
          >
            {noticeTime}
          </Typography>
          {deleteNotice(id)}
        </Grid>
      </Grid>
    );
  };

  useEffect(() => {
    dispatch(GET_NOTICE_LIST());
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
      }}
    >
      <TabContext value={value}>
        <Grid container flexDirection="column" sx={{ width: '100%' }}>
          <Grid item className={classes.tabContainer}>
            <TabList
              className={classes.tablist}
              onChange={handleChange}
              selectionFollowsFocus
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              sx={{
                '& .MuiTabs-scrollButtons.Mui-disabled': {
                  opacity: { md: 0, xs: 0.3 },
                },
              }}
            >
              {noticeTypeConfig.map(data => {
                return (
                  <Tab
                    value={data.value}
                    label={data.label}
                    key={data.value}
                    sx={{
                      '&.MuiTab-root': {
                        fontSize: { md: 14, sm: 12, xs: 11 },
                      },
                      '&.MuiTab-root:hover': {
                        transform: 'scale(1.1)',
                      },
                      '&.MuiTab-root.Mui-selected': {
                        color: '#625c60',
                        transform: 'scale(1.15)',
                        fontWeight: 700,
                        borderBottom: 0,
                      },
                    }}
                  />
                );
              })}
            </TabList>
          </Grid>
          <Grid
            item
            sx={{
              height: {
                sm: 400,
                xs: 280,
              },
              overflow: 'scroll',
              pt: 1,
            }}
          >
            {formatData.map(data => {
              const { id, title, type, icon, label, noticeTime, link } = data;

              if (value === 'all') {
                return (
                  <TabPanel value="all" key={id} sx={{ p: 2 }}>
                    {noticeTabGrid(id, title, icon, label, noticeTime, link)}
                  </TabPanel>
                );
              }

              return (
                <TabPanel value={type} key={id} sx={{ p: 2 }}>
                  {noticeTabGrid(id, title, icon, label, noticeTime, link)}
                </TabPanel>
              );
            })}
          </Grid>
        </Grid>
      </TabContext>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        {level && level === ('manager' || 'admin') ? <AddNotice /> : null}
      </Box>
    </Box>
  );
}
