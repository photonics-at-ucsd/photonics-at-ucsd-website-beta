// Ray tracing: follows each laser's beam from surface to surface until it is absorbed, leaves the
// board or reaches settings.trace.maxSegments, and works out which detectors are on.

import { add, dot, raySegment, scale } from './geometry.js';
import { reflect, refract, refractiveIndex } from './optics.js';

const EPSILON = 1e-7; // ignore hits closer than this, so a beam doesn't re-hit the surface it just left

/**
 * Returns {
 *   beams:      [{ laser, color, points: [{x, y}, ...] }]   the path of each laser's beam
 *   detections: Map(detector id → { active, angleError })   angleError: degrees off-axis of the
 *               best-aligned beam of the right color to reach the opening, or null if none did
 *   solved:     true if every detector is on
 * }
 */
export function traceBoard(board) {
  const { settings } = board;
  const surfaces = [...walls(board), ...board.pieces.flatMap((p) => p.surfaces())];
  const detections = new Map(board.detectors.map((d) => [d.id, { active: false, angleError: null }]));

  const beams = board.lasers.map((laser) => {
    const wavelength = settings.colors[laser.color].wavelength;
    let { origin, dir } = laser.emitter();
    const points = [origin];

    for (let segment = 0; segment < settings.trace.maxSegments; segment++) {
      // Nearest surface along the beam
      let hit = null, tHit = Infinity;
      for (const s of surfaces) {
        const t = raySegment(origin, dir, s.a, s.b);
        if (t > EPSILON && t < tHit) [hit, tHit] = [s, t];
      }
      if (!hit) break; // can't happen inside the walls, but just in case
      origin = add(origin, scale(dir, tHit));
      points.push(origin);

      if (hit.kind === 'reflect') {
        dir = reflect(dir, hit.normal);
      } else if (hit.kind === 'refract') {
        const n = refractiveIndex(hit.piece.material, wavelength);
        const entering = dot(dir, hit.normal) < 0;
        dir = refract(dir, hit.normal, entering ? 1 : n, entering ? n : 1).dir;
      } else {
        if (hit.kind === 'detect') record(detections, hit.piece.id, hit.piece.detect(laser.color, dir));
        break; // absorbed
      }
    }
    return { laser, color: laser.color, points };
  });

  const solved = board.detectors.length > 0 && [...detections.values()].every((d) => d.active);
  return { beams, detections, solved };
}

/** Keeps the best result for each detector: on beats off, then the smallest angle error. */
function record(detections, id, result) {
  const best = detections.get(id);
  if (result.active && !best.active) detections.set(id, result);
  else if (result.active === best.active && result.angleError !== null && !(best.angleError <= result.angleError)) {
    detections.set(id, result);
  }
}

/** The edges of the board, which absorb. */
function walls({ width: w, height: h }) {
  const corners = [{ x: 0, y: 0 }, { x: w, y: 0 }, { x: w, y: h }, { x: 0, y: h }];
  return corners.map((a, i) => ({ a, b: corners[(i + 1) % 4], kind: 'absorb', piece: null }));
}
