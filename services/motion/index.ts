import { launchBoard } from '../../hardware/board';
import * as events from './events'
import five from 'johnny-five';

export function onCalibrated({ status, description}: any) {
  console.log('status : ', status);
  console.log('description : ', description);
}

export function onMotionStart({ status, description}: any) {
  return ({ accessToken }: { accessToken: string}) => {
    console.log('accessToken : ', accessToken);
    console.log('status : ', status);
    console.log('description : ', description);
  }
}

export function onMotionEnd({ status, description}: any) {
  console.log('status : ', status);
  console.log('description : ', description);
}

export function launchMotion({ accessToken }: { accessToken: string}) {
  launchBoard(() => {
    const motion = new five.Motion(7);
    events.calibrated({ motion, callback: onCalibrated });
    events.motionStart({ motion, callback: onMotionStart({ accessToken }) });
    events.motionEnd({ motion, callback: onMotionEnd });
  });
}
