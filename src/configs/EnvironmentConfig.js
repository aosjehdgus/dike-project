/* eslint-disable import/prefer-default-export */

const dev = {
  // API_ENDPOINT_URL: 'https://jsonplaceholder.typicode.com'
  API_ENDPOINT_URL: 'http://hp-server.gigworks.ai:1337',
  // API_ENDPOINT_URL: 'http://hp.gigworksdev.io/',
  // API_ENDPOINT_URL: 'http://localhost.gigworks.ai:1337',
  // API_ENDPOINT_URL: 'http://hp:1337',
  // API_ENDPOINT_URL: 'http://192.168.0.239:1337',
  // API_ENDPOINT_URL: 'http://hp.gigworksdev.io',
  // API_ENDPOINT_URL: 'https://hp.gigworksdev.io',
};

const prod = {
  API_ENDPOINT_URL: 'https://api.gigworks.ai:11410',
};

const test = {
  API_ENDPOINT_URL: 'https://api-test.gigworks.ai:11410',
};

const getEnv = () => {
  // switch (process.env.NODE_ENV) {
  switch (process.env.REACT_APP_ENV || process.env.NODE_ENV) {
    case 'development':
      return dev;
    case 'production':
      return prod;
    case 'test':
      return test;
    default:
      break;
  }
  return null;
};

export const env = getEnv();
