import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import history from 'utils/history';
import { Suspense, lazy } from 'react';
import styles from 'App.module.scss';
import { Box } from '@mui/material';
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';

import { APP_PREFIX_PATH } from 'configs/AppConfig';
import packageJson from '../package.json';

const Views = lazy(() => import('./features/index'));
const Error404 = lazy(() => import('features/auth/errors/404'));

function App() {
  // eslint-disable-next-line no-console
  console.log('TYCHE Version:', packageJson.version);

  return (
    <>
      <div className={styles.app}>
        <Router history={history}>
          <Suspense
            fallback={
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  height: '100vh',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <CircularProgress
                  variant="indeterminate"
                  disableShrink
                  sx={{
                    color: theme =>
                      theme.palette.grey[
                        theme.palette.mode === 'light' ? 200 : 800
                      ],
                    animationDuration: '700ms',
                    left: 0,
                    [`& .${circularProgressClasses.circle}`]: {
                      strokeLinecap: 'round',
                    },
                  }}
                  size={60}
                />
              </Box>
            }
          >
            <Switch>
              <Route path={APP_PREFIX_PATH} render={() => <Views />} />
              <Route>
                <Error404 />
              </Route>
            </Switch>
          </Suspense>
        </Router>
      </div>
    </>
  );
}

export default App;
