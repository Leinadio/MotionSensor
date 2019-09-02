import Motion from './services/motion';
import { capturePicture } from './services/camera'
import gql from 'graphql-tag';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link'
import fetch from 'node-fetch';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { createUploadLink } from 'apollo-upload-client';
const axios = require('axios');

let user: any = null;

async function start() {
//   user = await axios({
//     method: 'POST',
//     url: 'https://dashbardleinadio.eu.auth0.com/oauth/token',
//     headers: { 'content-type': 'application/json' },
//     data: {
//       client_id:"YnMr32CjcdKUY7SFJryEnZlelzGP1pDa",
//       client_secret:"1p7y-q72RRdmhaC7ZDLshuALVfTPRKvWTqiQscj6PUP9EKAIjf5C7UjHcdFTcair",
//       audience:"home-automation",
//       grant_type:"client_credentials"
//     }
//   });
  // console.log('user : ', user);

  // const authLink = setContext((_, { headers }) => {
  //   // get the authentication token from local storage if it exists
  //   // const token = localStorage.getItem('token');
  //   console.log('user 2 : ', user);
  //   // return the headers to the context so httpLink can read them
  //   // return {
  //   //   headers: {
  //   //     ...headers,
  //   //     authorization: token ? `Bearer ${token}` : "",
  //   //   }
  //   // }
  //   return null;
  // });

  const uploadLink = createUploadLink({
    uri: 'http://192.168.1.43:8080/',
    fetch
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([uploadLink]),
  });

  async function handleMotionValue({ status, description }: { status: number, description: string}) {
    console.log('description : ', description);
    if (status === 2) {
      const picture = await capturePicture();
      if (!picture) {
        return;
      }

      const UPLOAD_FILE = gql`
        mutation singleUpload($file: Upload!) { 
          singleUpload(file: $file) {
            filename
          }
        }
      `;
      client.mutate({
        mutation: UPLOAD_FILE,
        variables: { file: picture },
      })
        .then((data: any) => console.log('data : ', data))
        .catch((error: any) => console.error('error : ', error));
    }
  }
  Motion(handleMotionValue);
};

start();
