import Motion from './services/motion';
import { capturePicture } from './services/camera'

function handleMotionValue({ status, description }: { status: number, description: string}) {
  if (status === 2) {
    capturePicture((val) => {
      console.log('val : ', val)
    })
  }

}

Motion(handleMotionValue);
