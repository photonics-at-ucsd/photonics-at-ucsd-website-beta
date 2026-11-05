// A detector: a rectangular body with an opening in the middle of its front (+x) end. It switches on
// when a beam of its own color passes through the opening travelling along its axis (into the
// detector, i.e. in the -x direction) within settings.detector.angleTolerance. Every other part of
// the body absorbs.

import { dot, fromAngle, rectangle, toDeg, toWorld } from '../geometry.js';
import { Piece, edges, size, tracePolygon } from './piece.js';

export class Detector extends Piece {
  static label = 'detector';

  constructor(spec, settings) {
    super(spec, settings);
    this.color = spec.color;
  }

  localOutline() {
    return rectangle(size(this, 'length'), size(this, 'width'));
  }

  /** Ends of the opening, in board coordinates. */
  aperture() {
    const L = size(this, 'length'), a = size(this, 'apertureWidth');
    return [toWorld(this.pose, { x: L / 2, y: -a / 2 }), toWorld(this.pose, { x: L / 2, y: a / 2 })];
  }

  surfaces() {
    // Edge 0 of the rectangle is the front end; split it into wall, opening, wall.
    const [front, ...rest] = edges(this.outline(), this, () => 'absorb');
    const [p, q] = this.aperture();
    return [
      { ...front, b: p },
      { ...front, a: p, b: q, kind: 'detect' },
      { ...front, a: q },
      ...rest,
    ];
  }

  /**
   * What a beam of `color` travelling in unit direction `dir` does on reaching the opening.
   * `angleError` (degrees off the detector's axis) is only given for the right color.
   */
  detect(color, dir) {
    if (color !== this.color) return { active: false, angleError: null };
    const inward = fromAngle(this.pose.angle + 180);
    const angleError = toDeg(Math.acos(Math.max(-1, Math.min(1, dot(dir, inward)))));
    return { active: angleError <= this.settings.detector.angleTolerance, angleError };
  }

  draw(ctx, view) {
    const active = view.detection?.active;
    tracePolygon(ctx, this.outline());
    ctx.fillStyle = active ? view.colorOf(this.color) : '#ddd';
    ctx.fill();
    ctx.lineWidth = 2 * view.px;
    ctx.strokeStyle = view.colorOf(this.color);
    ctx.stroke();
    // The opening
    const [p, q] = this.aperture();
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(q.x, q.y);
    ctx.lineWidth = 3 * view.px;
    ctx.strokeStyle = '#000';
    ctx.stroke();
    if (active) {
      ctx.fillStyle = '#fff';
      ctx.font = `bold ${12 * view.px}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('ON', this.pose.x, this.pose.y);
    }
  }
}
