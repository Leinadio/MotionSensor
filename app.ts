import { launchAuthentication } from './src/services/authentication';
import Hardware from './src/hardware'
import dotenvFlow from 'dotenv-flow';
dotenvFlow.config();

(async function () {
  const { statusCode, data } = await launchAuthentication();
  if (statusCode === 401) {
    console.log(`Error Message : ${data.error} - ${data.result_description}`);
    return false;
  }

  const accessToken = data.access_token;
  process.env.ACCESS_TOKEN = accessToken;
  console.log('process.env.ACCESS_TOKEN : ', process.env.ACCESS_TOKEN);

  if (accessToken) {
    Hardware()
  }
})();
