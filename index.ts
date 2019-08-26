import Motion from './services/motion';

function handleMotionValue(val: any) {
  console.log('val : ', val);
}

Motion(handleMotionValue);
