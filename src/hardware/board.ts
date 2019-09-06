import five from 'johnny-five'
import { RaspiIO } from 'raspi-io';

export function Board() {
  return new five.Board({
    io: new RaspiIO()
  });
}
