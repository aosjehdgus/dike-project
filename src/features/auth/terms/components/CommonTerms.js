/* eslint-disable import/no-cycle */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */

import {
  Box,
  Checkbox,
  Typography,
  FormControl,
  FormControlLabel,
} from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';

import { useStyles } from 'features/auth/register/components/styles/dike-register-content-style';
import TermsScrollDialog from './Dialog';

export default function CommonTerms() {
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
    main1: 'Tyche 필수 항목 모두 동의',
    main2: '통신사/본인확인 서비스 이용약관',
    title: {
      sub1: '(필수) Tyche 서비스 이용약관',
      sub2: '(필수) 개인정보 취급방침',
      sub3: '(필수) 개인정보 수집 이용',
      sub4: '(필수) 개인정보 제3자 제공 및 위탁처리',
      fifth: '본인 확인 서비스 이용',
      sixth: '개인정보 수집 이용',
      seventh: '고유식별정보 처리',
      eighth: '통신사 이용 약관',
      nineth: '마케팅 정보 수신 동의(선택)',
    },
    contents: {
      sub1: 'Tyche 서비스 이용약관에 대한 내용',
      sub2: '개인정보 취급방침에 대한 내용',
      sub3: '개인정보 수집 이용에 대한 내용',
      sub4: '개인정보 제3자 제공 및 위탁처리에 대한 내용',
      fifth: '본인 확인 서비스 이용에 대한 내용',
      sixth: '개인정보 수집 이용에 대한 내용',
      seventh: '고유식별정보 처리에 대한 내용',
      eighth: '통신사 이용 약관에 대한 내용',
      nineth: '마케팅 정보 수신 동의(선택)에 대한 내용',
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

  // const children2 = (
  //   <>
  //     <Box
  //       sx={{
  //         display: 'flex',
  //         flexDirection: 'row',
  //         ml: 2,
  //         justifyContent: 'space-between',
  //       }}
  //     >
  //       <FormControlLabel
  //         label={
  //           <Typography variant="overline">{termsMap.title.fifth}</Typography>
  //         }
  //         control={
  //           <Checkbox
  //             checked={checked[0]}
  //             onChange={handleChange2}
  //             icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
  //             checkedIcon={<CheckBoxIcon fontSize="small" />}
  //           />
  //         }
  //       />
  //       <TermsScrollDialog
  //         title={termsMap.title.fifth}
  //         contents={termsMap.contents.fifth}
  //       />
  //     </Box>
  //     <Box
  //       sx={{
  //         display: 'flex',
  //         flexDirection: 'row',
  //         ml: 2,
  //         justifyContent: 'space-between',
  //       }}
  //     >
  //       <FormControlLabel
  //         label={
  //           <Typography variant="overline">{termsMap.title.sixth}</Typography>
  //         }
  //         control={
  //           <Checkbox
  //             checked={checked[1]}
  //             onChange={handleChange3}
  //             icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
  //             checkedIcon={<CheckBoxIcon fontSize="small" />}
  //           />
  //         }
  //       />
  //       <TermsScrollDialog
  //         title={termsMap.title.sixth}
  //         contents={termsMap.contents.sixth}
  //       />
  //     </Box>
  //     <Box
  //       sx={{
  //         display: 'flex',
  //         flexDirection: 'row',
  //         ml: 2,
  //         justifyContent: 'space-between',
  //       }}
  //     >
  //       <FormControlLabel
  //         label={
  //           <Typography variant="overline">{termsMap.title.seventh}</Typography>
  //         }
  //         control={
  //           <Checkbox
  //             checked={checked[1]}
  //             onChange={handleChange3}
  //             icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
  //             checkedIcon={<CheckBoxIcon fontSize="small" />}
  //           />
  //         }
  //       />
  //       <TermsScrollDialog
  //         title={termsMap.title.seventh}
  //         contents={termsMap.contents.seventh}
  //       />
  //     </Box>
  //     <Box
  //       sx={{
  //         display: 'flex',
  //         flexDirection: 'row',
  //         ml: 2,
  //         justifyContent: 'space-between',
  //       }}
  //     >
  //       <FormControlLabel
  //         label={
  //           <Typography variant="overline">{termsMap.title.eighth}</Typography>
  //         }
  //         control={
  //           <Checkbox
  //             checked={checked[1]}
  //             onChange={handleChange3}
  //             icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
  //             checkedIcon={<CheckBoxIcon fontSize="small" />}
  //           />
  //         }
  //       />
  //       <TermsScrollDialog
  //         title={termsMap.title.eighth}
  //         contents={termsMap.contents.eighth}
  //       />
  //     </Box>
  //   </>
  // );

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

        {/* <FormControlLabel
          label={
            <Typography variant="overline">
              &nbsp;{termsMap.main.second}
            </Typography>
          }
          control={
            <Checkbox
              name="entire"
              color="primary"
              value="second"
              checked={checked.second}
              onChange={handleChange2}
              icon={<CheckBoxOutlineBlankIcon />}
              checkedIcon={<CheckBoxIcon />}
            />
          }
        />

        {children2}

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <FormControlLabel
            label={
              <Typography variant="overline">
                &nbsp;{termsMap.title.nineth}
              </Typography>
            }
            control={
              <Checkbox
                name="entire"
                color="primary"
                value="third"
                checked={checked.third}
                onChange={handleChange3}
                icon={<CheckBoxOutlineBlankIcon />}
                checkedIcon={<CheckBoxIcon />}
              />
            }
          />

          <TermsScrollDialog
            title={termsMap.title.nineth}
            contents={termsMap.contents.nineth}
          />
        </Box> */}
      </ThemeProvider>
    </>
  );
}
