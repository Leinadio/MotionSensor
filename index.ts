import Motion from './services/motion';
import { capturePicture } from './services/camera'
import { connectToApi } from "./services/authentication";
import axios from 'axios';

let connected: any = null;

async function handleMotionValue({ status, description }: { status: number, description: string}) {
  if (status === 2) {
    const picture = await capturePicture();
    if (!connected) {
      connected = await connectToApi();
    }
    console.log('connected : ', connected);
    // console.log('connected : ', connected);
    const response = await axios({
      method: 'POST',
      url: 'http://192.168.1.43:8080/fileSend',
      data: picture.getBuffer(),
      headers: picture.getHeaders(),
    });
    // console.log('response : ', response);
  }
}

Motion(handleMotionValue);
