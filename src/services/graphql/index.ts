import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import { createUploadLink } from 'apollo-upload-client';
import fetch from 'node-fetch';

const uploadLink = createUploadLink({
  uri: 'http://192.168.1.43:8080/',
  fetch
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([uploadLink]),
});
