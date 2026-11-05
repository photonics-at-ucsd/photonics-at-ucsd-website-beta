// A prism: a transparent triangle of `material` (settings.materials). Every face refracts, with
// total internal reflection where Snell's law allows no transmitted beam. x, y is the centroid and
// pose.angle points from the middle of the base to the opposite corner.

import { Piece, edges, size, tracePolygon } from './piece.js';

const SHAPES = {
  // 45-90-45 prism with legs `size`; the base is the hypotenuse
  'right-isosceles': (L) => {
    const h = L / Math.SQRT2; // half the hypotenuse = distance from its middle to the right angle
    return [{ x: (2 * h) / 3, y: 0 }, { x: -h / 3, y: h }, { x: -h / 3, y: -h }];
  },
  // 60-60-60 prism with sides `size`
  equilateral: (L) => {
    const H = (L * Math.sqrt(3)) / 2;
    return [{ x: (2 * H) / 3, y: 0 }, { x: -H / 3, y: L / 2 }, { x: -H / 3, y: -L / 2 }];
  },
};

export class Prism extends Piece {
  static movable = true;
  static label = 'prism';

  constructor(spec, settings) {
    super(spec, settings);
    this.shape = spec.shape ?? 'right-isosceles';
    if (!SHAPES[this.shape]) throw new Error(`${spec.id}: unknown prism shape "${this.shape}" (try ${Object.keys(SHAPES).join(', ')})`);
    this.materialName = spec.material ?? settings.prism.material;
    this.material = settings.materials[this.materialName];
    if (!this.material) throw new Error(`${spec.id}: unknown material "${this.materialName}" (add it to settings.yaml)`);
  }

  localOutline() {
    return SHAPES[this.shape](size(this, 'size'));
  }

  surfaces() {
    return edges(this.outline(), this, () => 'refract');
  }

  draw(ctx, view) {
    tracePolygon(ctx, this.outline());
    ctx.fillStyle = 'rgba(100, 150, 255, 0.35)';
    ctx.fill();
    ctx.lineWidth = view.px;
    ctx.strokeStyle = '#36c';
    ctx.stroke();
  }
}
