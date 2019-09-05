import gql from "graphql-tag";
import { client } from '../';

export async function upload({ data }: any) {
  const response = await client.mutate({
    mutation: gql`
    mutation singleUpload($file: Upload!) {
      singleUpload(file: $file) {
        filename
      }
    }
  `,
    variables: { file: data },
  });
  console.log('response : ', response);
  return response;
}
