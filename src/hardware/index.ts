import { Board } from './board';
import Motion from './motion';
console.log('Motion : ', Motion);

export default () => {
  Board.on('ready', () => {
    console.log('The Board is ready');
    Motion();
  });
}

