// Draws a board, its beams and the selection onto a canvas. Each piece draws itself (pieces/*.js);
// this file sets up the board-unit coordinate system and draws everything else.

import { tracePolygon } from './pieces/piece.js';

/**
 * `result` is from traceBoard(); `ui` is { selected, ghost, handle } from Controls: the selected
 * piece, the outline of where it's being dragged to if that spot isn't allowed, and the rotation
 * handle { from, to } (board coordinates).
 */
export function render(canvas, board, result, ui) {
  const ctx = canvas.getContext('2d');
  const s = canvas.width / board.width; // device pixels per board unit
  const px = canvas.width / canvas.getBoundingClientRect().width / s; // one CSS pixel in board units
  const colorOf = (name) => board.settings.colors[name]?.display ?? '#888';

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.setTransform(s, 0, 0, s, 0, 0);

  for (const piece of board.pieces) piece.draw(ctx, { px, colorOf, detection: result.detections.get(piece.id) });

  ctx.lineWidth = 2 * px;
  ctx.lineJoin = 'round';
  for (const beam of result.beams) {
    ctx.beginPath();
    beam.points.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
    ctx.strokeStyle = colorOf(beam.color);
    ctx.stroke();
  }

  if (ui.selected) {
    ctx.setLineDash([4 * px, 3 * px]);
    ctx.lineWidth = px;
    ctx.strokeStyle = '#000';
    tracePolygon(ctx, ui.selected.outline());
    ctx.stroke();
    ctx.setLineDash([]);
    const { from, to } = ui.handle;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(to.x, to.y, ui.handleRadius, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.stroke();
  }
  if (ui.ghost) {
    ctx.setLineDash([4 * px, 3 * px]);
    ctx.lineWidth = 1.5 * px;
    ctx.strokeStyle = '#d00';
    tracePolygon(ctx, ui.ghost);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#000';
  ctx.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);
}
