/* eslint-disable import/no-cycle */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */

import { useState } from 'react';

import { Box, Checkbox, Typography, FormControlLabel } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { createTheme, ThemeProvider } from '@mui/styles';

import { useStyles } from 'features/auth/register/components/styles/dike-register-content-style';
import TermsScrollDialog from './Dialog';

export default function ProjectTerms() {
  const classes = useStyles();

  const [checked, setChecked] = useState({
    main1: false,
    sub1: false,
    sub2: false,
    sub3: false,
    sub4: false,
    main2: false,
    sub5: false,
    sub6: false,
  });

  const theme = createTheme({
    typography: {
      overline: {
        fontSize: 14,
        fontWeight: 600,
        color: '#454c53',
      },
    },
  });

  const termsMap = {
    main1: '프로젝트 필수 항목 모두 동의',
    title: {
      sub1: '(필수) 개인정보 제공 및 활용 동의서',
      sub2: '(필수) 프로젝트 참가 동의서',
      sub3: '(필수) 회사 및 프로젝트 비밀 유지 보안서 서약서',
      sub4: '(필수) 지적재산권 이용 허락 계약서',
      sub5: '',
      sub6: '',
    },
    contents: {
      sub1: '개인정보 제공 및 활용 동의서에 대한 내용',
      sub2: '프로젝트 참가 동의서에 대한 내용',
      sub3: '회사 및 프로젝트 비밀 유지 보안서 서약서에 대한 내용',
      sub4: '지적재산권 이용 허락 계약서에 대한 내용',
      sub5: '',
      sub6: '',
    },
  };

  // const [checked, setChecked] = useState([true, false]);
  const handleChangeAll = prop => {
    if (prop === 'main1') {
      setChecked({
        ...checked,
        sub1: !checked.sub1,
        sub2: !checked.sub2,
        sub3: !checked.sub3,
        sub4: !checked.sub4,
      });
    }
  };

  const handleChangeEach = prop => {
    setChecked({ ...checked, [prop]: !checked[prop] });
  };

  const children = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          ml: 2,
          justifyContent: 'space-between',
        }}
      >
        <FormControlLabel
          label={
            <Typography variant="overline">{termsMap.title.sub1}</Typography>
          }
          control={
            <Checkbox
              checked={checked.sub1}
              onChange={() => handleChangeEach('sub1')}
              icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
              checkedIcon={<CheckBoxIcon fontSize="small" />}
            />
          }
        />
        <TermsScrollDialog
          title={termsMap.title.sub1}
          contents={termsMap.contents.sub1}
          setChecked={() => handleChangeEach('sub1')}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          ml: 2,
          justifyContent: 'space-between',
        }}
      >
        <FormControlLabel
          label={
            <Typography variant="overline">{termsMap.title.sub2}</Typography>
          }
          control={
            <Checkbox
              checked={checked.sub2}
              onChange={() => handleChangeEach('sub2')}
              icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
              checkedIcon={<CheckBoxIcon fontSize="small" />}
            />
          }
        />
        <TermsScrollDialog
          title={termsMap.title.sub2}
          contents={termsMap.contents.sub2}
          setChecked={() => handleChangeEach('sub2')}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          ml: 2,
          justifyContent: 'space-between',
        }}
      >
        <FormControlLabel
          label={
            <Typography variant="overline">{termsMap.title.sub3}</Typography>
          }
          control={
            <Checkbox
              checked={checked.sub3}
              onChange={() => handleChangeEach('sub3')}
              icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
              checkedIcon={<CheckBoxIcon fontSize="small" />}
            />
          }
        />
        <TermsScrollDialog
          title={termsMap.title.sub3}
          contents={termsMap.contents.sub3}
          setChecked={() => handleChangeEach('sub3')}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          ml: 2,
          justifyContent: 'space-between',
        }}
      >
        <FormControlLabel
          label={
            <Typography variant="overline">{termsMap.title.sub4}</Typography>
          }
          control={
            <Checkbox
              checked={checked.sub4}
              value="seventh"
              onChange={() => handleChangeEach('sub4')}
              icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
              checkedIcon={<CheckBoxIcon fontSize="small" />}
            />
          }
        />
        <TermsScrollDialog
          title={termsMap.title.sub4}
          contents={termsMap.contents.sub4}
          setChecked={() => handleChangeEach('sub4')}
        />
      </Box>
    </>
  );

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <FormControlLabel
          label={
            <Typography variant="overline">&nbsp;{termsMap.main1}</Typography>
          }
          control={
            <Checkbox
              name="entire"
              color="primary"
              checked={
                checked.sub1 && checked.sub2 && checked.sub3 && checked.sub4
              }
              onChange={() => handleChangeAll('main1')}
              // indeterminate={
              //   checked.sub1 !== checked.sub2 ||
              //   checked.sub1 !== checked.sub3 ||
              //   checked.sub2 !== checked.sub3
              // }
              icon={<CheckBoxOutlineBlankIcon />}
              checkedIcon={<CheckBoxIcon />}
            />
          }
        />

        {children}
      </ThemeProvider>
    </>
  );
}
