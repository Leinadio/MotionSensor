import { Raspistill } from 'node-raspistill';
import FormData from 'form-data';
import moment from 'moment';
import axios from 'axios';

const camera = new Raspistill({
  fileName: moment().format(),
});

export default async function(callback) {
  try {
    const photo = await camera.takePhoto();
    const formData = new FormData();
    formData.append('file', photo, 'laphoto');
    callback();
  } catch (e) {
    console.log('e : ', e);
    callback(e);
  }

  // camera.takePhoto()
  //   .then((photo) => {
  //     const formData = new FormData();
  //     formData.append('file', photo, 'laphoto');
  //     axios({
  //       method: 'POST',
  //       url: 'http://192.168.1.43:8080/fileSend',
  //       data: formData.getBuffer(),
  //       headers: formData.getHeaders(),
  //     }).then((response) => {
  //       // TODO: Après avoir envoyé la photo, supprimer la photo du repertoire d'uploads
  //       console.log('response : ', response);
  //     }).catch((e) => {
  //       console.log('e : ', e);
  //     })
  //   })
  //   .catch((err) => {
  //     console.log('err : ', err)
  //   });
}

