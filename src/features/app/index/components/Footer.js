import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      sx={{
        p: 1,
        width: '100%',
        display: 'flex',
        borderRadius: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        borderTop: '1px solid rgba(98,92,96,0.2)',
        backgroundColor: 'rgba(241, 237, 233, 0.3)',
      }}
    >
      <Box sx={{ pt: 1, pb: 2, pl: 1 }}>
        <Typography
          sx={{
            p: 1,
            color: 'rgba(98,92,96,0.8)',
            fontSize: { md: 14, sm: 12, xs: 11 },
          }}
        >
          <strong>사업 이름</strong> : 비윤리적 표현 말뭉치 연구 분석 및 시범
          구축
        </Typography>

        <Typography
          sx={{
            p: 1,
            color: 'rgba(98,92,96,0.8)',
            fontSize: { md: 14, sm: 12, xs: 11 },
          }}
        >
          <strong>주관 기관</strong> : 문화체육관광부 국립국어원
        </Typography>

        <Typography
          sx={{
            p: 1,
            color: 'rgba(98,92,96,0.8)',
            fontSize: { md: 14, sm: 12, xs: 11 },
          }}
        >
          <strong>운영 기관</strong> : 서울교육대학교 , (주)미디어 코퍼스
        </Typography>
      </Box>

      <Typography
        sx={{
          borderTop: 1,
          borderColor: 'divider',
          p: 2,
          fontSize: { md: 14, sm: 12, xs: 11 },
          color: 'rgba(98,92,96,1)',
        }}
      >
        ⓒ 2021.<strong>media</strong>CORPUS INC. All rights reserved.
      </Typography>
    </Box>
  );
}
