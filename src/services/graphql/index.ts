import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink, concat } from "apollo-link";
import { setContext } from 'apollo-link-context';
import { createUploadLink } from 'apollo-upload-client';
import fetch from 'node-fetch';

const uploadLink = createUploadLink({
  uri: 'http://192.168.1.43:8080/',
  fetch
});

// const authLink = new ApolloLink((operation: any, forward: any) => {
//   operation.setContext(({ headers }: any) => {
//     console.log('headers : ', headers)
//     return {
//       headers: {
//         authorization: '', // however you get your token
//         ...headers
//       }
//     }}
//   );
//   return forward(operation);
// });

const authLink = setContext((_, { headers }) => {
  const token = process.env.ACCESS_TOKEN;
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
    }
  }
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([authLink, uploadLink]),
});
