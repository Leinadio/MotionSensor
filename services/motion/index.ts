import { launchBoard } from '../../setup/hardware/board';
import * as events from './events'
import { motion } from '../../setup/hardware/motion'
import { capturePicture } from "../camera";
import { upload } from '../graphql/upload/upload';

export function onCalibrated({ status, description}: any) {
  console.log('status : ', status);
  console.log('description : ', description);
  return;
}

export function onMotionStart({ accessToken }: { accessToken: string}) {
  return async ({ status, description }: any) => {
    console.log('status : ', status);
    console.log('description : ', description);
    const data = await capturePicture();
    if (!data) {
      return;
    }
    await upload({ data });
    return;
  }
}

export function onMotionEnd({ status, description}: any) {
  console.log('status : ', status);
  console.log('description : ', description);
  return;
}

export function launchMotion({ accessToken }: { accessToken: string}) {
  launchBoard(() => {
    events.calibrated({ motion, callback: onCalibrated });
    events.motionStart({ motion, callback: onMotionStart({ accessToken }) });
    events.motionEnd({ motion, callback: onMotionEnd });
  });
}
