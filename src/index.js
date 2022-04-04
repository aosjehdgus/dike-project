import ReactDOM from 'react-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './index.css';
import createStore from 'store';
import { Provider } from 'react-redux';
import { koKR } from '@mui/x-data-grid';
import App from './App';
import reportWebVitals from './reportWebVitals';

const theme = createTheme(
  {
    palette: {
      primary: { main: 'rgba(57, 70, 49, 1)' },
    },
  },

  koKR,
);

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,

  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
