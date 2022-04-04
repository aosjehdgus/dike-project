/* eslint-disable no-unused-vars */

/* React */
import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
/* Import Components */
import {
  APP_PREFIX_PATH,
  MANAGE_USER_PATH,
  CURRENT_WORK_PATH,
} from 'configs/AppConfig';

const Notice = lazy(() => import('features/app/notice'));
const ManageWorker = lazy(() => import('features/app/manage-user'));
const CurrentWork = lazy(() => import('features/app/current-work'));

const AppViews = () => {
  return (
    <Suspense>
      <Switch>
        <Route exact path={APP_PREFIX_PATH} render={() => <Notice />} />
        <Route exact path={MANAGE_USER_PATH} render={() => <ManageWorker />} />
        <Route exact path={CURRENT_WORK_PATH} render={() => <CurrentWork />} />
      </Switch>
    </Suspense>
  );
};

export default AppViews;
