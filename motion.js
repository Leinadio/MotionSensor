const five = require("johnny-five");
const fs = require('fs');
const Raspi = require('raspi-io').RaspiIO;
const Raspistill = require('node-raspistill').Raspistill;
const FormData = require('form-data');
const camera = new Raspistill();
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
    camera.takePhoto()
      .then((photo) => {
        const formData = new FormData();
        console.log('formData : ', formData);
        console.log('photo : ', photo);
        formData.append('photo', photo);
        console.log('formData.getBuffer() : ', formData.getBuffer());
        console.log('formData.getHeaders() : ', formData.getHeaders());
      })
      .catch((err) => {
        console.log('err : ', err)
      });
    console.log("motionstart");
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
