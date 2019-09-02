import Motion from './services/motion';
import { capturePicture } from './services/camera'
import gql from 'graphql-tag';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link'
import fetch from 'node-fetch';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([createUploadLink({
    uri: 'http://192.168.1.43:8080/',
    fetch
  })]),
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
