import { Board } from './board';
import Motion from './motion';
console.log('Motion : ', Motion);
console.log('Board : ', Board);

export default Board.on('ready', () => {
  console.log('The Board is ready');
  Motion();
});

// export function start() {
//   console.log('ok')
//   Board.on('ready', () => {
//     console.log('The Board is ready');
//     Motion();
//   });
// }

