import config from './config';
import { launchAuthentication } from './services/authentication';
import { launchMotion } from './services/motion';

export default async function () {
  const { statusCode, data } = await launchAuthentication();
  if (statusCode === 401) {
    console.log(`Error Message : ${data.error} - ${data.result_description}`);
    return false;
  }

  const accessToken = data.access_token;

  if (accessToken) {
    launchMotion({ accessToken })
  }
}
