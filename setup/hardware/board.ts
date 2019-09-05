import five from 'johnny-five'
import { RaspiIO } from 'raspi-io';

export function launchBoard(callback: () => void) {
  const Board = new five.Board({
    io: new RaspiIO()
  });
  Board.on('ready', () => {
    console.log('The Board is ready');
    callback();
  })
}

