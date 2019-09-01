import { Raspistill } from 'node-raspistill';
import FormData from 'form-data';
import moment from 'moment';

const camera = new Raspistill({
  fileName: moment().format(),
});

export async function capturePicture() {
  try {
    const photo = await camera.takePhoto();
    console.log('photo : ', photo);
    // const formData = new FormData();
    // formData.append('file', photo, 'laphoto');
    return photo;
  } catch (e) {
    return null;
  }
}
