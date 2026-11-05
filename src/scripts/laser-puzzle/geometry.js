// 2D vector and polygon helpers. Points/vectors are plain { x, y } objects in board units
// (x right, y down); angles are in degrees clockwise from +x, as in the board files.

export const vec = (x, y) => ({ x, y });
export const add = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });
export const sub = (a, b) => ({ x: a.x - b.x, y: a.y - b.y });
export const scale = (a, s) => ({ x: a.x * s, y: a.y * s });
export const dot = (a, b) => a.x * b.x + a.y * b.y;
export const cross = (a, b) => a.x * b.y - a.y * b.x;
export const length = (a) => Math.hypot(a.x, a.y);
export const normalize = (a) => scale(a, 1 / length(a));

export const toRad = (deg) => (deg * Math.PI) / 180;
export const toDeg = (rad) => (rad * 180) / Math.PI;
export const fromAngle = (deg) => ({ x: Math.cos(toRad(deg)), y: Math.sin(toRad(deg)) });
export const angleOf = (v) => toDeg(Math.atan2(v.y, v.x));

/** Wraps an angle to [0, 360). */
export const wrapAngle = (deg) => ((deg % 360) + 360) % 360;

/** Converts a point from a piece's local frame (local +x along `pose.angle`) to board coordinates. */
export function toWorld(pose, p) {
  const c = Math.cos(toRad(pose.angle));
  const s = Math.sin(toRad(pose.angle));
  return { x: pose.x + p.x * c - p.y * s, y: pose.y + p.x * s + p.y * c };
}

/** Corners of a w (along local x) by h rectangle centred on the local origin, in drawing order. */
export function rectangle(w, h) {
  return [vec(w / 2, -h / 2), vec(w / 2, h / 2), vec(-w / 2, h / 2), vec(-w / 2, -h / 2)];
}

/**
 * Distance t along the ray origin + t·dir to segment a–b, or Infinity if it misses.
 * `dir` needn't be unit length; t is in units of |dir|.
 */
export function raySegment(origin, dir, a, b) {
  const e = sub(b, a);
  const denom = cross(dir, e);
  if (Math.abs(denom) < 1e-12) return Infinity; // parallel
  const ao = sub(a, origin);
  const t = cross(ao, e) / denom;
  const u = cross(ao, dir) / denom;
  return t > 0 && u >= 0 && u <= 1 ? t : Infinity;
}

/** Distance from point p to segment a–b. */
export function pointSegmentDistance(p, a, b) {
  const e = sub(b, a);
  const u = Math.max(0, Math.min(1, dot(sub(p, a), e) / dot(e, e)));
  return length(sub(p, add(a, scale(e, u))));
}

/** True if p is inside the convex or concave polygon `poly` (even-odd rule). */
export function pointInPolygon(p, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const a = poly[i], b = poly[j];
    if (a.y > p.y !== b.y > p.y && p.x < ((b.x - a.x) * (p.y - a.y)) / (b.y - a.y) + a.x) inside = !inside;
  }
  return inside;
}

/** Distance from p to polygon `poly`: 0 inside, otherwise the distance to its nearest edge. */
export function pointPolygonDistance(p, poly) {
  if (pointInPolygon(p, poly)) return 0;
  let d = Infinity;
  for (let i = 0; i < poly.length; i++) d = Math.min(d, pointSegmentDistance(p, poly[i], poly[(i + 1) % poly.length]));
  return d;
}

/** True if two convex polygons overlap (separating axis test). Touching edges don't count. */
export function convexOverlap(p, q) {
  for (const poly of [p, q]) {
    for (let i = 0; i < poly.length; i++) {
      const e = sub(poly[(i + 1) % poly.length], poly[i]);
      const axis = { x: -e.y, y: e.x };
      const [pMin, pMax] = project(p, axis);
      const [qMin, qMax] = project(q, axis);
      if (pMax <= qMin + 1e-9 || qMax <= pMin + 1e-9) return false;
    }
  }
  return true;
}

function project(poly, axis) {
  let min = Infinity, max = -Infinity;
  for (const v of poly) {
    const d = dot(v, axis);
    min = Math.min(min, d);
    max = Math.max(max, d);
  }
  return [min, max];
}

/** Centroid (average of the vertices) of a polygon. */
export function centroid(poly) {
  return scale(poly.reduce(add, vec(0, 0)), 1 / poly.length);
}
