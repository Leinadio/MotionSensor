import { launchAuthentication } from './src/services/authentication';
import Hardware from './src/hardware';
import { Board } from "./src/hardware/board";
import five from "johnny-five";
import Motion from "./src/hardware/motion";
import { capturePicture } from "./src/hardware/camera";
import { upload } from "./src/services/graphql/upload/upload";

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

export default async function () {
  const { statusCode, data } = await launchAuthentication();
  if (statusCode === 401) {
    console.log(`Error Message : ${data.error} - ${data.result_description}`);
    return false;
  }

  const accessToken = data.access_token;
  console.log('accessToken : ', accessToken);

  if (accessToken) {
    Board.on('ready', () => {
      const motion = new five.Motion(7);
      console.log('The Board is ready');
      motion.on('calibrated', calibrated);
      motion.on('motionstart', motionstart);
      motion.on('motionend', motionend);
    })
  }
}
