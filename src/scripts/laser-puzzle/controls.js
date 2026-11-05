// Mouse, touch and keyboard control of the movable pieces:
//   drag a piece to move it; drag the round handle of the selected piece to rotate it
//   mouse wheel over a piece rotates it (Shift: finer)
//   with a piece selected: arrow keys move it, Q / E rotate it (Shift: finer), Esc deselects
// A piece can't be put down where the board forbids (overlapping a barrier, ...): while dragging
// there it stays at its last allowed spot and a red outline shows where the pointer is.

import { add, angleOf, fromAngle, length, scale, sub } from './geometry.js';

const HANDLE_GAP = 3; // board units between a piece and its rotation handle
const HANDLE_RADIUS = 1.5;

export class Controls {
  constructor(canvas, onChange) {
    this.canvas = canvas;
    this.onChange = onChange;
    this.board = null;
    this.selected = null;
    this.ghost = null;
    this.gesture = null; // { kind: 'drag', offset } or { kind: 'rotate', startAngle, startPointer }

    canvas.addEventListener('pointerdown', (e) => this.pointerDown(e));
    canvas.addEventListener('pointermove', (e) => this.pointerMove(e));
    canvas.addEventListener('pointerup', () => this.pointerUp());
    canvas.addEventListener('pointercancel', () => this.pointerUp());
    canvas.addEventListener('wheel', (e) => this.wheel(e), { passive: false });
    window.addEventListener('keydown', (e) => this.key(e));
  }

  setBoard(board) {
    this.board = board;
    this.selected = this.ghost = this.gesture = null;
  }

  get settings() {
    return this.board.settings.controls;
  }

  /** What render() needs to draw the selection. */
  get ui() {
    return { selected: this.selected, ghost: this.ghost, handle: this.selected && this.handle(), handleRadius: HANDLE_RADIUS };
  }

  overHandle(p) {
    return !!this.selected && length(sub(p, this.handle().to)) <= HANDLE_RADIUS + this.settings.pickMargin;
  }

  /** The rotation handle of the selected piece: a stalk from its centre out along its angle. */
  handle() {
    const piece = this.selected;
    const reach = Math.max(...piece.outline().map((v) => length(sub(v, piece.pose))));
    return { from: piece.pose, to: add(piece.pose, scale(fromAngle(piece.pose.angle), reach + HANDLE_GAP)) };
  }

  toBoard(e) {
    const r = this.canvas.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * this.board.width, y: ((e.clientY - r.top) / r.height) * this.board.height };
  }

  pointerDown(e) {
    if (!this.board) return;
    const p = this.toBoard(e);
    const { pickMargin } = this.settings;
    if (this.overHandle(p)) {
      this.gesture = { kind: 'rotate', startAngle: this.selected.pose.angle, startPointer: angleOf(sub(p, this.selected.pose)) };
    } else {
      this.selected = this.board.movableAt(p, pickMargin);
      this.gesture = this.selected && { kind: 'drag', offset: sub(this.selected.pose, p) };
    }
    if (this.gesture) this.canvas.setPointerCapture(e.pointerId);
    this.canvas.focus();
    e.preventDefault();
    this.onChange();
  }

  pointerMove(e) {
    if (!this.board) return;
    const p = this.toBoard(e);
    if (!this.gesture) {
      this.canvas.style.cursor = this.overHandle(p) ? 'crosshair' : this.board.movableAt(p, this.settings.pickMargin) ? 'grab' : '';
      return;
    }
    const piece = this.selected;
    const pose =
      this.gesture.kind === 'drag'
        ? { ...piece.pose, ...add(p, this.gesture.offset) }
        : { ...piece.pose, angle: this.gesture.startAngle + angleOf(sub(p, piece.pose)) - this.gesture.startPointer };
    this.tryMove(pose);
  }

  pointerUp() {
    if (!this.gesture) return;
    this.gesture = this.ghost = null;
    this.onChange();
  }

  wheel(e) {
    if (!this.board) return;
    const piece = this.board.movableAt(this.toBoard(e), this.settings.pickMargin);
    if (!piece) return; // let the page scroll
    e.preventDefault();
    this.selected = piece;
    const step = e.shiftKey ? this.settings.fineRotateStep : this.settings.rotateStep;
    this.tryMove({ ...piece.pose, angle: piece.pose.angle + Math.sign(e.deltaY) * step });
    this.ghost = null;
    this.onChange();
  }

  key(e) {
    if (!this.selected || e.target.closest?.('input, select, textarea, button')) return;
    const { pose } = this.selected;
    const move = e.shiftKey ? this.settings.fineNudgeStep : this.settings.nudgeStep;
    const turn = e.shiftKey ? this.settings.fineRotateStep : this.settings.rotateStep;
    const next = {
      ArrowLeft: { ...pose, x: pose.x - move },
      ArrowRight: { ...pose, x: pose.x + move },
      ArrowUp: { ...pose, y: pose.y - move },
      ArrowDown: { ...pose, y: pose.y + move },
      q: { ...pose, angle: pose.angle - turn },
      e: { ...pose, angle: pose.angle + turn },
    }[e.key.length === 1 ? e.key.toLowerCase() : e.key];
    if (e.key === 'Escape') this.selected = null;
    else if (!next) return;
    else this.tryMove(next);
    this.ghost = null;
    e.preventDefault();
    this.onChange();
  }

  /** Moves the selected piece if allowed; otherwise remembers where it was headed, to draw in red. */
  tryMove(pose) {
    const moved = this.board.move(this.selected, pose);
    this.ghost = moved ? null : this.selected.outline(pose);
    this.onChange();
  }
}
