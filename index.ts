import Motion from './services/motion';
import { capturePicture } from './services/camera'

async function handleMotionValue({ status, description }: { status: number, description: string}) {
  if (status === 2) {
    const picture = await capturePicture();
    console.log('picture : ', picture);
  }

}

Motion(handleMotionValue);
