import axios from "axios";
import Config from '../../config';

export async function launchAuthentication() {
  try {
    const res = await axios({
      method: 'POST',
      url: Config.AUTH0_URL,
      headers: {
        'content-type': 'application/json'
      },
      data: {
        client_id: Config.AUTH0_CLIENT_ID,
        client_secret: Config.AUTH0_CLIENT_SECRET,
        audience: Config.AUTH0_AUDIENCE,
        grant_type: Config.AUTH0_GRAND_TYPE
      }
    });
    return {
      statusCode: res.status,
      data: res.data,
    }
  } catch (e) {
    const { response } = e;
    return {
      statusCode: response.status,
      data: response.data,
    }
  }
}
