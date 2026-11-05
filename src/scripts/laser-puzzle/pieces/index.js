// Piece types by the name boards use for them (`type:` in a board file). To add a new kind of optic,
// write a Piece subclass in this folder and list it here.

import { Barrier } from './barrier.js';
import { Detector } from './detector.js';
import { Laser } from './laser.js';
import { Mirror } from './mirror.js';
import { Prism } from './prism.js';

export const PIECE_TYPES = {
  laser: Laser,
  detector: Detector,
  mirror: Mirror,
  prism: Prism,
  barrier: Barrier,
};

export { Barrier, Detector, Laser, Mirror, Prism };
