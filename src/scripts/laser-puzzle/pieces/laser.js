// A laser: a rectangular body that absorbs on every side and emits a beam from the middle of its
// front (+x) end. The colored cap marks the back.

import { fromAngle, rectangle, toWorld } from '../geometry.js';
import { Piece, size, tracePolygon } from './piece.js';

export class Laser extends Piece {
  static label = 'laser';

  constructor(spec, settings) {
    super(spec, settings);
    this.color = spec.color;
  }

  localOutline() {
    return rectangle(size(this, 'length'), size(this, 'width'));
  }

  /** Where the beam starts and which way it goes. */
  emitter() {
    return { origin: toWorld(this.pose, { x: size(this, 'length') / 2, y: 0 }), dir: fromAngle(this.pose.angle) };
  }

  draw(ctx, view) {
    const L = size(this, 'length'), W = size(this, 'width');
    tracePolygon(ctx, this.outline());
    ctx.fillStyle = '#444';
    ctx.fill();
    // Colored cap at the back
    const cap = 0.15 * L;
    tracePolygon(ctx, rectangle(cap, W).map((p) => toWorld(this.pose, { x: p.x - L / 2 + cap / 2, y: p.y })));
    ctx.fillStyle = view.colorOf(this.color);
    ctx.fill();
  }
}
