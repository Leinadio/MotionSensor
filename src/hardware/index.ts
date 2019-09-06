import { Board } from './board';
import Motion from './motion';
import five from "johnny-five";

export default () => {
  const board = Board();
  return board.on('ready', () => {
    console.log('The Board is ready');
    Motion();
  });
}

