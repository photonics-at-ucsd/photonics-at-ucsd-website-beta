// A board: its size and pieces, built from a board file (src/data/laser-puzzle/boards/*.yaml), and
// the rules for where movable pieces may go. Knows nothing about drawing or the mouse.

import { convexOverlap, pointPolygonDistance, wrapAngle } from './geometry.js';
import { PIECE_TYPES } from './pieces/index.js';

export class Board {
  /** `spec` is a parsed board file, `settings` the parsed settings.yaml. */
  constructor(spec, settings) {
    this.spec = spec;
    this.settings = settings;
    this.name = spec.name ?? spec.id;
    this.width = spec.width;
    this.height = spec.height;
    if (!(this.width > 0 && this.height > 0)) throw new Error(`board ${spec.id}: needs a positive width and height`);

    const ids = new Set();
    this.pieces = (spec.pieces ?? []).map((p, i) => {
      const Type = PIECE_TYPES[p.type];
      if (!Type) throw new Error(`board ${spec.id}, piece ${i + 1}: unknown type "${p.type}" (try ${Object.keys(PIECE_TYPES).join(', ')})`);
      if (p.color !== undefined && !settings.colors[p.color]) throw new Error(`board ${spec.id}, piece ${p.id}: unknown color "${p.color}"`);
      const id = p.id ?? `${p.type}-${i + 1}`;
      if (ids.has(id)) throw new Error(`board ${spec.id}: two pieces are called "${id}"`);
      ids.add(id);
      return new Type({ ...p, id }, settings);
    });
  }

  piece(id) {
    return this.pieces.find((p) => p.id === id);
  }

  get lasers() {
    return this.pieces.filter((p) => p.type === 'laser');
  }

  get detectors() {
    return this.pieces.filter((p) => p.type === 'detector');
  }

  /** Whether `piece` may sit at `pose`: on the board and (with noOverlap) not overlapping anything. */
  canPlace(piece, pose) {
    const outline = piece.outline(pose);
    if (outline.some((v) => v.x < 0 || v.y < 0 || v.x > this.width || v.y > this.height)) return false;
    if (!this.settings.controls.noOverlap) return true;
    return this.pieces.every((other) => other === piece || !convexOverlap(outline, other.outline()));
  }

  /** Moves a movable piece if it may go there; returns whether it moved. */
  move(piece, pose) {
    const next = { ...pose, angle: wrapAngle(pose.angle) };
    if (!piece.movable || !this.canPlace(piece, next)) return false;
    piece.pose = next;
    return true;
  }

  /** The topmost movable piece within `margin` of point p, or null. */
  movableAt(p, margin) {
    let best = null, bestDistance = margin;
    for (const piece of this.pieces) {
      if (!piece.movable) continue;
      const d = pointPolygonDistance(p, piece.outline());
      if (d <= bestDistance) [best, bestDistance] = [piece, d];
    }
    return best;
  }

  /** Puts every piece back where the board file starts it. */
  reset() {
    for (const piece of this.pieces) piece.pose = { x: piece.spec.x, y: piece.spec.y, angle: wrapAngle(piece.spec.angle ?? 0) };
  }

  get hasSolution() {
    return !!this.spec.solution;
  }

  /** Moves the pieces named in the board's `solution:` to their solved positions (no overlap checks). */
  showSolution() {
    for (const [id, pose] of Object.entries(this.spec.solution ?? {})) {
      const piece = this.piece(id);
      if (!piece) throw new Error(`board ${this.spec.id}: solution names unknown piece "${id}"`);
      piece.pose = { x: pose.x, y: pose.y, angle: wrapAngle(pose.angle ?? 0) };
    }
  }
}
