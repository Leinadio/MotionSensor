import axios from "axios";

export async function connectToApi() {
  const response = await axios({
    method: 'POST',
    url: 'https://dashbardleinadio.eu.auth0.com/oauth/token',
    headers: { 'content-type': 'application/json' },
    data: {
      client_id:"YnMr32CjcdKUY7SFJryEnZlelzGP1pDa",
      client_secret:"1p7y-q72RRdmhaC7ZDLshuALVfTPRKvWTqiQscj6PUP9EKAIjf5C7UjHcdFTcair",
      audience:"home-automation",
      grant_type:"client_credentials"
    }
  });
  console.log('response : ', response.data);
  return response.data;
}
