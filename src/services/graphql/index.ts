import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import { setContext } from 'apollo-link-context';
import { createUploadLink } from 'apollo-upload-client';
import fetch from 'node-fetch';

const uploadLink = createUploadLink({
  uri: 'http://192.168.1.43:8080/',
  fetch
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const token = localStorage.getItem('token');
  const token = '';
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  // ølink: ApolloLink.from([uploadLink, authLink]),
  link: uploadLink.concat(authLink),
});
