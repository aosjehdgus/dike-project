/* eslint-disable no-unused-vars */
import { Button, Grid, Box, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import Image from 'img/pinkblue.jpg';
import { APP_NAME, APP_PREFIX_PATH } from 'configs/AppConfig';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Error404() {
  const history = useHistory();

  const handleTitleClick = () => {
    history.push(APP_PREFIX_PATH);
  };

  return (
    <Grid
      direction="column"
      container
      style={{
        backgroundImage: `url("${Image}")`,
        position: 'relative',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        borderRadius: 8,
        '&::before': {
          content: '""',
          backgroundColor: 'white',
          opacity: 0.9,
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        },
      }}
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid
        lg={3}
        md={3}
        sm={3}
        item
        sx={{
          width: '100%',
          p: 1,
        }}
      />
      <Grid
        lg
        md
        sm
        item
        sx={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'rgba(255,255,255, 0.5)',
          height: '100%',
          position: 'relative',
          borderRadius: 12,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            borderRadius: 12,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'flex-start',
            }}
          >
            <Button
              onClick={handleTitleClick}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(241, 237, 233, 0.1)',
                },
              }}
            >
              <img
                style={{ width: 'auto', height: 25 }}
                src="/img/dike-icon.png"
                alt="dike project"
              />
              <Typography
                sx={{
                  textTransform: 'capitalize',
                  fontWeight: 800,
                  fontFamily: 'Nanum Gothic',
                  fontSize: 23,
                  color: '#625c60',
                  letterSpacing: '0.1em',
                  ml: 1,
                }}
              >
                {APP_NAME}
              </Typography>
            </Button>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: 150,
                fontWeight: 700,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                color: 'rgba(98,92,96,1)',
                pr: 5,
                pl: 5,
              }}
            >
              404
            </Typography>
            <Box sx={{ p: 3 }}>
              <Typography
                variant="subtitle"
                sx={{
                  display: 'flex',

                  fontSize: 20,
                  fontWeight: 700,
                  color: 'rgba(98,92,96,1)',
                  p: 1,
                  mb: 1,
                }}
              >
                페이지를 찾을 수 없습니다
              </Typography>
              <Typography
                variant="body"
                sx={{
                  display: 'flex',
                  color: 'rgba(98,92,96,1)',
                  lineHeight: 2,
                  p: 1,
                  mb: 2,
                }}
              >
                죄송합니다. 해당 경로를 찾아봤으나, <br />
                올바르지 않은 경로였습니다.
                <br />
                올바른 경로로 돌아가기 위해 <br />
                아래의 버튼을 눌러주세요.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Button
                  onClick={handleTitleClick}
                  startIcon={<ArrowBackIcon />}
                  sx={{
                    color: 'white',
                    fontSize: 15,
                    fontWeight: 800,
                    backgroundColor: 'rgba(98, 92, 96, 1)',
                    '&:hover': {
                      backgroundColor: 'rgba(98, 92, 96, 0.8)',
                    },
                    borderRadius: 5,
                    width: 150,
                    padding: '10px 12px',
                  }}
                >
                  GO HOME
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid
        lg={2}
        md={2}
        sm={2}
        item
        sx={{
          mt: 5,
          display: 'flex',
          backgroundColor: 'rgba(241, 237, 233, 0.2)',
          borderRadius: 1,
          alignItems: 'center',
          width: '100%',
          p: 1,
          // borderTop: '1px solid rgba(98,92,96,0.2)',
        }}
      >
        <Typography
          sx={{
            p: 2,
            fonWeight: 'bold',
            fontSize: 15,
            color: 'rgba(98,92,96,1)',
          }}
        >
          ⓒ 2021. media<strong>CORPUS</strong> INC. All rights reserved.
        </Typography>
      </Grid>
    </Grid>
  );
}
