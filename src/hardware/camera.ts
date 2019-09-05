import { Raspistill } from 'node-raspistill';
import moment from 'moment';

const camera = new Raspistill({
  fileName: moment().format(),
});

export async function capturePicture() {
  try {
    const photo = await camera.takePhoto();
    return photo;
  } catch (e) {
    return null;
  }
}
