import five from 'johnny-five'
import { RaspiIO } from 'raspi-io';

export const Board = new five.Board({
  io: new RaspiIO()
});

export function launchBoard(callback: () => void) {
  Board.on('ready', () => {
    console.log('The Board is ready');
    callback();
  })
}
