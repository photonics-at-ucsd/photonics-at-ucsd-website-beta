// A flat mirror: a thin rectangle whose reflective face is the +x side (facing pose.angle). With
// `sides: 2` the opposite face reflects too. The other faces absorb.

import { rectangle } from '../geometry.js';
import { Piece, edges, size, tracePolygon } from './piece.js';

const FRONT = 0, BACK = 2; // rectangle() edge indices of the +x and -x faces

export class Mirror extends Piece {
  static movable = true;

  constructor(spec, settings) {
    super(spec, settings);
    this.twoSided = spec.sides === 2;
  }

  get label() {
    return this.twoSided ? 'two-sided mirror' : 'one-sided mirror';
  }

  localOutline() {
    return rectangle(size(this, 'thickness'), size(this, 'length'));
  }

  surfaces() {
    return edges(this.outline(), this, (i) => (i === FRONT || (i === BACK && this.twoSided) ? 'reflect' : 'absorb'));
  }

  draw(ctx, view) {
    const poly = this.outline();
    tracePolygon(ctx, poly);
    ctx.fillStyle = '#222';
    ctx.fill();
    // Reflective faces in silver-blue
    ctx.lineWidth = 2.5 * view.px;
    ctx.strokeStyle = '#9cf';
    for (const i of this.twoSided ? [FRONT, BACK] : [FRONT]) {
      const a = poly[i], b = poly[(i + 1) % 4];
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
  }
}
