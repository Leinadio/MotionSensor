import { Raspistill } from 'node-raspistill';
import FormData from 'form-data';
import moment from 'moment';

const camera = new Raspistill({
  fileName: moment().format(),
});

export async function capturePicture() {
  try {
    const photo = await camera.takePhoto();
    const formData = new FormData();
    formData.append('file', photo, 'laphoto');
    return formData;
  } catch (e) {
    console.log('e : ', e);
    return e;
  }
}
