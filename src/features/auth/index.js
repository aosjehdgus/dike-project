import { lazy, Suspense, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import {
  APP_PREFIX_PATH,
  LOGIN_PATH,
  REGISTER_PATH,
  VERIFICATION_PATH,
  // TERMS_PATH,
  // KAKAO_CALLBACK_PATH,
} from 'configs/AppConfig';

const Login = lazy(() => import('features/auth/login'));
const Register = lazy(() => import('features/auth/register'));
const Verification = lazy(() => import('features/auth/verification'));
// const kakaoCallback = lazy(() => import('./Login/kakao/kakao-callback'));
// const Terms = lazy(() => import('features/auth/Terms/index'));

const AuthViews = () => {
  const isLoggedIn = localStorage.getItem('IS_LOGGED_IN');
  const history = useHistory();

  useEffect(() => {
    if (isLoggedIn === 'true') {
      history.push(APP_PREFIX_PATH);
    }
  }, []);

  return (
    <Suspense>
      <Switch>
        <Route exact path={LOGIN_PATH} render={() => <Login />} />
        <Route exact path={REGISTER_PATH} render={() => <Register />} />
        <Route exact path={VERIFICATION_PATH} render={() => <Verification />} />
        {/* <Route exact path={KAKAO_CALLBACK_PATH} component={kakaoCallback} /> */}
        {/* <Route exact path={TERMS_PATH} component={Terms} /> */}
      </Switch>
    </Suspense>
  );
};

export default AuthViews;
