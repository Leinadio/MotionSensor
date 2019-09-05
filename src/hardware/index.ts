import { Board } from './board';
import Motion from './motion';

export default () => {
  Board.on('ready', () => {
    console.log('The Board is ready');
    Motion();
  });
}

