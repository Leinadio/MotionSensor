import { capturePicture } from './camera';
import { upload } from '../services/graphql/upload/upload';

function calibrated() {
  console.log('status : 1');
  console.log('description : The device is calibrated');
}

async function motionstart() {
  console.log('status : 2');
  console.log('description : A movement is detected');
  const data = await capturePicture();
  if (!data) {
    return;
  }
  await upload({ data });
}

function motionend() {
  console.log('status : 3');
  console.log('description : The movement was stopped');
}

export default (Motion: any) => {
  Motion.on('calibrated', calibrated);
  Motion.on('motionstart', motionstart);
  Motion.on('motionend', motionend);
}
