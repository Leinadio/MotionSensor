/**
 * "motionend" events are fired following a "motionstart" event
 * when no movement has occurred in X ms
 * @param motion
 * @param callback
 */
export function motionEnd({ motion, callback }: { motion: any, callback: ({ status, description }: any) => void }) {
  motion.on("motionend", function() {
    callback({
      status: 3,
      description: 'The movement was stopped'
    });
  });
}
