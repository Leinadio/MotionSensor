/**
 * "calibrated" occurs once, at the beginning of a session,
 * @param motion
 * @param callback
 */
export function calibrated({ motion, callback }: { motion: any, callback: ({ status, description }: any) => void }) {
  motion.on("calibrated", function() {
    callback({
      status: 1,
      description: 'The device is calibrated'
    });
  });
}
