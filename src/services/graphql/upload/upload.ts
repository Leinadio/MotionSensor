import gql from 'graphql-tag';
import { client } from '../index';

const mutation = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      filename
    }
  }
`;

export async function upload({ data }: any) {
  const response = await client.mutate({
    mutation,
    variables: { file: data },
  });
  console.log('response : ', response);
  return response;
}
