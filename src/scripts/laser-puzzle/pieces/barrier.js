// A barrier: a wall from (x1, y1) to (x2, y2), settings.barrier.thickness wide, that absorbs light.

import { angleOf, length, rectangle, sub } from '../geometry.js';
import { Piece, size, tracePolygon } from './piece.js';

export class Barrier extends Piece {
  static label = 'barrier';

  constructor(spec, settings) {
    const a = { x: spec.x1, y: spec.y1 }, b = { x: spec.x2, y: spec.y2 };
    super({ ...spec, x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, angle: angleOf(sub(b, a)) }, settings);
    this.length = length(sub(b, a));
  }

  localOutline() {
    return rectangle(this.length, size(this, 'thickness'));
  }

  draw(ctx) {
    tracePolygon(ctx, this.outline());
    ctx.fillStyle = '#f60';
    ctx.fill();
  }
}
