const five = require("johnny-five");
const fs = require('fs');
const Raspi = require('raspi-io').RaspiIO;
const Raspistill = require('node-raspistill').Raspistill;
const FormData = require('form-data');
const axios = require('axios');
const moment = require('moment');
const camera = new Raspistill({
  fileName: moment().format(),
});
const board = new five.Board({
  io: new Raspi()
});

board.on("ready", function() {

  // Create a new `motion` hardware instance.
  const motion = new five.Motion('7');

  // "calibrated" occurs once, at the beginning of a session,
  motion.on("calibrated", function() {
    console.log("calibrated");
  });

  // "motionstart" events are fired when the "calibrated"
  // proximal area is disrupted, generally by some form of movement
  motion.on("motionstart", function() {
    console.log("motionstart");
    console.log('capture photos start');
    camera.takePhoto()
      .then((photo) => {
        const formData = new FormData();
        formData.append('file', photo, 'laphoto');
        axios({
          method: 'POST',
          url: 'http://192.168.1.43:8080/fileSend',
          data: formData.getBuffer(),
          headers: formData.getHeaders(),
        }).then((response) => {
          // TODO: Après avoir envoyé la photo, supprimer la photo du repertoire d'uploads
          console.log('response : ', response);
        }).catch((e) => {
          console.log('e : ', e);
        })
      })
      .catch((err) => {
        console.log('err : ', err)
      });
  });

  // "motionend" events are fired following a "motionstart" event
  // when no movement has occurred in X ms
  motion.on("motionend", function() {
    console.log("motionend");
  });

  // motion.on("data", function(data) {
  //   console.log(data);
  // });
});
