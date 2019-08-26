import five from 'johnny-five';
import { Board } from '../../hardware/board'

function Motion (callback: any) {
  const motionOption = {};
  Board.on("ready", function() {

    // Create a new `motion` hardware instance.
    const motion = new five.Motion(7);

    // "calibrated" occurs once, at the beginning of a session,
    motion.on("calibrated", function() {
      callback({
        ...motionOption,
        status: 1,
        description: 'The device is calibrated'
      });
      console.log("calibrated");
    });

    // "motionstart" events are fired when the "calibrated"
    // proximal area is disrupted, generally by some form of movement
    motion.on("motionstart", function() {
      callback({
        ...motionOption,
        status: 2,
        description: 'A movement is detected'
      });
    });

    // "motionend" events are fired following a "motionstart" event
    // when no movement has occurred in X ms
    motion.on("motionend", function() {
      callback({
        ...motionOption,
        status: 3,
        description: 'The movement was stopped'
      });
    });

    // motion.on("data", function(data) {
    //   callback({
    //     ...motionOption,
    //     status: 'On data'
    //   });
    // });
  });
}

export default Motion;
