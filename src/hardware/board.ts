import five from 'johnny-five'
import { RaspiIO } from 'raspi-io';

export const Board = new five.Board({
  io: new RaspiIO()
});
