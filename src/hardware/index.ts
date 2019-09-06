import { Board } from './board';
import Motion from './motion';

export default () => {
  const board = Board();
  return board.on('ready', () => {
    console.log('The Board is ready');
    Motion();
  });
}

