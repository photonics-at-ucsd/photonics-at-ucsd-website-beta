// The online laser puzzle page (/demos/laser-puzzle/play/, src/pages/demos/laser-puzzle/play.astro).
// The page embeds the settings and every board as JSON (#lp-data); this file wires them to the
// canvas, the board picker, the buttons and the status text, and redraws after every change.
// The board to show is kept in the URL hash: #board=<id>.

import { Board } from './board.js';
import { Controls } from './controls.js';
import { render } from './render.js';
import { traceBoard } from './trace.js';

const { settings, boards } = JSON.parse(document.getElementById('lp-data').textContent);

const canvas = document.getElementById('lp-canvas');
const picker = document.getElementById('lp-board');
const status = document.getElementById('lp-status');
const selection = document.getElementById('lp-selected');
const resetButton = document.getElementById('lp-reset');
const solutionButton = document.getElementById('lp-solution');

let board = null;
let pending = false; // a redraw is scheduled for the next frame
const controls = new Controls(canvas, () => redraw());

for (const b of boards) picker.add(new Option(b.name ?? b.id, b.id));
picker.addEventListener('change', () => (location.hash = `board=${picker.value}`));
window.addEventListener('hashchange', () => loadBoard(boardFromHash()));
window.addEventListener('resize', () => resize());
resetButton.addEventListener('click', () => {
  board.reset();
  redraw();
});
solutionButton.addEventListener('click', () => {
  board.showSolution();
  redraw();
});

loadBoard(boardFromHash());

function boardFromHash() {
  const id = new URLSearchParams(location.hash.slice(1)).get('board');
  return boards.some((b) => b.id === id) ? id : boards[0].id;
}

function loadBoard(id) {
  try {
    board = new Board(boards.find((b) => b.id === id), settings);
  } catch (e) {
    status.textContent = `Couldn't load this board: ${e.message}`;
    return;
  }
  picker.value = id;
  solutionButton.disabled = !board.hasSolution;
  controls.setBoard(board);
  resize();
}

/** Fits the canvas to the window, keeping the board's shape. */
function resize() {
  const maxWidth = canvas.parentElement.clientWidth;
  const maxHeight = window.innerHeight * 0.85;
  const cssWidth = Math.min(maxWidth, (maxHeight * board.width) / board.height);
  canvas.style.width = `${cssWidth}px`;
  canvas.style.height = `${(cssWidth * board.height) / board.width}px`;
  canvas.width = Math.round(cssWidth * devicePixelRatio);
  canvas.height = Math.round((cssWidth * board.height * devicePixelRatio) / board.width);
  redraw();
}

function redraw() {
  if (pending) return;
  pending = true;
  requestAnimationFrame(() => {
    pending = false;
    const result = traceBoard(board);
    render(canvas, board, result, controls.ui);
    showStatus(result);
  });
}

function showStatus(result) {
  const lines = board.detectors.map((d) => {
    const { active, angleError } = result.detections.get(d.id);
    let line = `${d.color} detector: ${active ? 'ON' : 'off'}`;
    if (!active && angleError !== null && settings.detector.showFeedback) {
      line += ` (${d.color} beam arriving ${angleError.toFixed(1)}° off-axis; needs to be within ${settings.detector.angleTolerance}°)`;
    }
    return line;
  });
  if (result.solved) lines.unshift('SOLVED! All detectors are on.');
  status.textContent = lines.join('\n');

  const piece = controls.selected;
  selection.textContent = piece
    ? `Selected: ${piece.label} (${piece.id}) at x = ${piece.pose.x.toFixed(2)}, y = ${piece.pose.y.toFixed(2)}, angle = ${piece.pose.angle.toFixed(1)}°`
    : 'Selected: nothing (click a mirror or prism)';
}
