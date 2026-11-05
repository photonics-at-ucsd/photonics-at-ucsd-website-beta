// Base class for everything on a board. Each piece type (one file per type in this folder) says
// what shape it is, how each of its surfaces treats light, and how to draw it.
//
// A surface is { a, b, normal, kind, piece }: the segment a–b in board coordinates, its outward unit
// normal, and what happens to light that hits it:
//   absorb   the beam stops
//   reflect  mirror reflection
//   refract  the piece's `material` is on the inner side of the surface (Snell's law)
//   detect   the beam stops and the piece's `detect()` decides whether it switches on

import { centroid, dot, normalize, sub, toWorld, wrapAngle } from '../geometry.js';

export class Piece {
  /** Whether pieces of this type can be moved, unless a board says otherwise with `fixed:`. */
  static movable = false;
  /** Shown in the "Selected:" line. */
  static label = 'piece';

  constructor(spec, settings) {
    this.id = spec.id;
    this.type = spec.type;
    this.spec = spec;
    this.settings = settings;
    this.movable = spec.fixed === undefined ? this.constructor.movable : !spec.fixed;
    this.pose = { x: spec.x ?? 0, y: spec.y ?? 0, angle: wrapAngle(spec.angle ?? 0) };
  }

  get label() {
    return this.constructor.label;
  }

  /** The piece's convex outline in its own frame (local +x along pose.angle). */
  localOutline() {
    throw new Error(`${this.type} has no outline`);
  }

  /** The outline in board coordinates, for picking, overlap checks and drawing. */
  outline(pose = this.pose) {
    return this.localOutline().map((p) => toWorld(pose, p));
  }

  /** Every edge of the outline absorbs, unless a subclass says otherwise. */
  surfaces() {
    return edges(this.outline(), this, () => 'absorb');
  }

  /** Draws the piece; `ctx` is already in board units. `view.px` is the size of one pixel. */
  draw(ctx, view) {
    tracePolygon(ctx, this.outline());
    ctx.fillStyle = '#888';
    ctx.fill();
  }
}

/**
 * The edges of a convex polygon as surfaces with outward normals. `kindOf(i)` gives the kind of
 * edge i (from vertex i to vertex i + 1).
 */
export function edges(poly, piece, kindOf) {
  const c = centroid(poly);
  return poly.map((a, i) => {
    const b = poly[(i + 1) % poly.length];
    const e = sub(b, a);
    let normal = normalize({ x: e.y, y: -e.x });
    if (dot(normal, sub(a, c)) < 0) normal = { x: -normal.x, y: -normal.y };
    return { a, b, normal, kind: kindOf(i), piece };
  });
}

export function tracePolygon(ctx, poly) {
  ctx.beginPath();
  poly.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
  ctx.closePath();
}

/** The settings value for this piece type, unless the board gives the piece its own. */
export function size(piece, key) {
  return piece.spec[key] ?? piece.settings[piece.type][key];
}
