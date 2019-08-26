import Motion from './services/motion';
import { capturePicture } from './services/camera'

function handleMotionValue({ status, description }: { status: number, description: string}) {
  if (status === 2) {
    const picture = capturePicture();
    console.log('picture : ', picture);
  }

}

Motion(handleMotionValue);
