/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */

/* Material UI */
import { Grid, Button, Divider } from '@mui/material';
import { useStyles } from 'features/auth/login/components/styles/dike-social-login-style';
/* Import Components and Variables */
import kakaoSymbol from 'img/kakaoSymbol.png';
import naverSymbol from 'img/naverSymbol.png';
import googleSymbol from 'img/googleSymbol.png';
import { KAKAO_LOGIN_URL, KAKAO_CALLBACK_PATH } from 'configs/AppConfig';

export default function SocialLoginButton() {
  const classes = useStyles();

  const onKakaoLogin = () => {
    // console.log('Click Kakao login:', window.location);
    const callbackURL = encodeURI(
      `${window.location.origin}${KAKAO_CALLBACK_PATH}`,
    );
    // console.log('[SocialLogin]callbackURL :', callbackURL);
    const href = `${KAKAO_LOGIN_URL}?callbackURL=${callbackURL}`;
    // console.log('[SocialLogin]href :', href);
    window.location.href = href;
  };

  const onNaverLogin = () => {
    // console.log('Click Kakao login:', window.location);
    console.log('네아로');
  };

  return (
    <>
      <Divider />

      <Grid className={classes.socialBtnContainer}>
        <Button
          className={classes.kakaoSymbolBtn}
          onClick={() => onKakaoLogin()}
        >
          <Grid container>
            <Grid className={classes.symbolItem} item>
              <img
                className={classes.kakaoSymbol}
                src={kakaoSymbol}
                alt="kakao"
              />
            </Grid>
            <Grid className={classes.textItem} item>
              <span>카카오 계정으로 로그인</span>
            </Grid>
          </Grid>
        </Button>
        <Button
          className={classes.naverSymbolBtn}
          onClick={() => onNaverLogin()}
        >
          <Grid container>
            <Grid className={classes.symbolItem} item>
              <img
                className={classes.naverSymbol}
                src={naverSymbol}
                alt="naver"
              />
            </Grid>
            <Grid className={classes.textItem} item>
              <span>네이버 계정으로 로그인</span>
            </Grid>
          </Grid>
        </Button>
        <Button
          className={classes.googleSymbolBtn}
          onClick={() => onNaverLogin()}
        >
          <Grid container>
            <Grid className={classes.symbolItem} item>
              <img
                className={classes.googleSymbol}
                src={googleSymbol}
                alt="google"
              />
            </Grid>
            <Grid className={classes.textItem} item>
              <span>구글 계정으로 로그인</span>
            </Grid>
          </Grid>
        </Button>
      </Grid>
      <Divider />
    </>
  );
}
