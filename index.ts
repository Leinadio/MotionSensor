import Motion from './services/motion';
import { capturePicture } from './services/camera'
import axios from 'axios';

async function handleMotionValue({ status, description }: { status: number, description: string}) {
  if (status === 2) {
    const picture = await capturePicture();
    console.log('picture : ', picture);
    const response = await axios({
      method: 'POST',
      url: 'http://192.168.1.43:8080/fileSend',
      data: picture.getBuffer(),
      headers: picture.getHeaders(),
    })
    console.log('response : ', response);
  }
}

Motion(handleMotionValue);
