// npm run laser-boards: checks every laser puzzle board in src/data/laser-puzzle/boards/.
// Each board must load, must start legal and unsolved, and, if it lists a `solution:`, that solution must
// be a legal placement that switches every detector on. Exits with an error if any board fails.

import { readFileSync, readdirSync } from 'node:fs';
import { parse } from 'yaml';
import { Board } from '../src/scripts/laser-puzzle/board.js';
import { traceBoard } from '../src/scripts/laser-puzzle/trace.js';

const dir = new URL('../src/data/laser-puzzle/', import.meta.url);
const settings = parse(readFileSync(new URL('settings.yaml', dir), 'utf8'));
const files = readdirSync(new URL('boards/', dir)).filter((f) => f.endsWith('.yaml'));

const describe = (detections) =>
  [...detections].map(([id, d]) => `${id} ${d.active ? 'ON' : 'off'}${d.angleError === null ? '' : ` (${d.angleError.toFixed(2)}° off-axis)`}`).join(', ');

let failures = 0;
for (const file of files) {
  const id = file.replace(/\.yaml$/, '');
  const problems = [];
  try {
    const board = new Board({ id, ...parse(readFileSync(new URL(`boards/${file}`, dir), 'utf8')) }, settings);
    for (const p of board.pieces) if (p.movable && !board.canPlace(p, p.pose)) problems.push(`${p.id} starts somewhere it can't go`);
    if (traceBoard(board).solved) problems.push('starts already solved');
    if (board.hasSolution) {
      board.showSolution();
      for (const p of board.pieces) if (p.movable && !board.canPlace(p, p.pose)) problems.push(`solution puts ${p.id} somewhere it can't go`);
      const result = traceBoard(board);
      if (!result.solved) problems.push(`solution doesn't solve it: ${describe(result.detections)}`);
      else console.log(`${id}: solution OK: ${describe(result.detections)}`);
    } else {
      console.log(`${id}: loads OK (no solution listed)`);
    }
  } catch (e) {
    problems.push(e.message);
  }
  for (const p of problems) console.error(`${id}: ${p}`);
  if (problems.length) failures++;
}
if (failures) process.exit(1);
