import Motion from './services/motion';
import { capturePicture } from './services/camera'
import gql from 'graphql-tag';
import ApolloClient from 'apollo-client';
import fetch from 'node-fetch';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';

// let connected: any = null;

// const client = new ApolloClient({
//   uri: 'http://192.168.1.43:8080/',
//   fetch,
// });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createUploadLink({
    uri: 'http://192.168.1.43:8080/',
    fetch
  })
});

async function handleMotionValue({ status, description }: { status: number, description: string}) {
  if (status === 2) {
    const picture = await capturePicture();
    console.log('picture : ', picture);
    const file: any = new Blob([picture], { type: 'image/png' });
    file.name = `hello.png`;
    // if (!connected) {
    //   connected = await connectToApi();
    // }
    const UPLOAD_FILE = gql`
      mutation singleUpload($file: Upload!) {
        singleUpload(file: $file) {
          filename
        }
      }
    `;
    // console.log('picture.getBuffer() : ', picture.getBuffer());
    client.mutate({
      mutation: UPLOAD_FILE,
      variables: { file: picture },
    })
      .then((data: any) => console.log('data : ', data))
      .catch((error: any) => console.error(error));    // console.log('connected : ', connected);
    // const response = await axios({
    //   method: 'POST',
    //   url: 'http://192.168.1.43:8080/',
    //   data: `{"query":"mutation {\\n  Image(id: 2, name: "lol"}){\\n    id,\\n    title\\n  }\\n}","variables":null}`,
    //   // data: picture.getBuffer(),
    //   headers: picture.getHeaders(),
    // });
    // console.log('response : ', response);
  }
}

Motion(handleMotionValue);
