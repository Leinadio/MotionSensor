import { Board } from './board';
import Motion from './motion';
import five from "johnny-five";

export default () => {
  const board = Board();
  return board.on('ready', () => {
    const motion = new five.Motion(7);
    console.log('The Board is ready');
    Motion(motion);
  });
}

