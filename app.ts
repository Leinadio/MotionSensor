import { launchAuthentication } from './src/services/authentication';
import Hardware from './src/hardware'

(async function () {
  const { statusCode, data } = await launchAuthentication();
  if (statusCode === 401) {
    console.log(`Error Message : ${data.error} - ${data.result_description}`);
    return false;
  }

  const accessToken = data.access_token;

  if (accessToken) {
    Hardware()
  }
})();
