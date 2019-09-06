import five from 'johnny-five';
import { capturePicture } from './camera';
import { upload } from '../services/graphql/upload/upload';


//
// export default (Motion: any) => {
//   console.log('pass here')
//   Motion.on('calibrated', calibrated);
//   Motion.on('motionstart', motionstart);
//   Motion.on('motionend', motionend);
// }
