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
