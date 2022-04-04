import { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from 'configs/AppConfig';
import { AuthLayout } from './auth/layout';
import { AppLayout } from './app/index/layout';

// const kakaoCallback = lazy(() => import('./Login/kakao/kakao-callback'));
// const Terms = lazy(() => import('./Terms'));
// const Register = lazy(() => import('./Register'));
// const Verification = lazy(() => import('./Verification'));

export const Views = () => {
  return (
    <Suspense>
      <Switch>
        {/* <Route exact path={KAKAO_CALLBACK_PATH} component={kakaoCallback} /> */}
        <Route path={AUTH_PREFIX_PATH}>
          <AuthLayout />
        </Route>
        <Route path={APP_PREFIX_PATH}>
          <AppLayout />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default Views;
