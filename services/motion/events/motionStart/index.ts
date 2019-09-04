/**
 * "motionstart" events are fired when the "calibrated"
 * proximal area is disrupted, generally by some form of movement
 * @param motion
 * @param callback
 */
export function motionStart({ motion, callback }: { motion: any, callback: ({ status, description }: any) => void }) {
  motion.on("motionstart", function() {
    callback({
      status: 2,
      description: 'A movement is detected'
    });
  });
}
