import { capturePicture } from './camera';
import { upload } from '../services/graphql/upload/upload';
import five from "johnny-five";

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

export default () => {
  const motion = new five.Motion(7);
  motion.on('calibrated', calibrated);
  motion.on('motionstart', motionstart);
  motion.on('motionend', motionend);
}
