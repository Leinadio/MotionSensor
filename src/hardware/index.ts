import { Board } from './board';
import Motion from './motion';
import five from "johnny-five";

export default () => Board.on('ready', () => {
  const motion = new five.Motion(7);
  console.log('The Board is ready');
  Motion(motion);
});

// export function start() {
//   console.log('ok')
//   Board.on('ready', () => {
//     console.log('The Board is ready');
//     Motion();
//   });
// }

