import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';

import { Button } from '../Button';
import {
  newBoard, getNeighbors, checkNeighbors, MineSweeper,
} from './MineSweeper';

describe('It understands a JSX modules', () => {
  beforeEach(() => {
    render(<Button text="hello there" />);
  });

  it('doesnt render another button', () => {
    const btns = screen.getAllByText(/0 time/);
    expect(btns).toHaveLength(1);
  });
  it('Has new text', async () => {
    const btn = screen.getByText(/hello/);
    userEvent.click(btn);
    await waitFor(() => expect(screen.getByText(/3/)).not.toBeUndefined());
  });
});

describe('It can generate a board', () => {
  it('Generates a 10x10 Board with 100 items', () => {
    const board = newBoard({ size: 10, difficulty: 0.1 });
    expect(board).toHaveLength(100);
  });
  it('It increments by Y axis first', () => {
    const board = newBoard({ size: 10, difficulty: 0.1 });
    expect(board[3].xAxis).toBe(0);
    expect(board[3].yAxis).toBe(3);
  });
  it('Applies difficulty', () => {
    const board = newBoard({ size: 10, difficulty: 0.1 });
    expect(board.filter((item) => item.bomb).length).toBeLessThan(25);
    expect(board.filter((item) => item.bomb).length).toBeGreaterThan(2);
  });
  it('Applies difficulty with ramp', () => {
    const board = newBoard({ size: 10, difficulty: 0.2 });
    const board2 = newBoard({ size: 10, difficulty: 0.2 });
    const board3 = newBoard({ size: 10, difficulty: 0.2 });
    const board4 = newBoard({ size: 10, difficulty: 0.2 });
    const avgBoard = [...board, ...board2, ...board3, ...board4];
    expect(avgBoard.filter((item) => item.bomb).length).toBeGreaterThan(40);
    expect(avgBoard.filter((item) => item.bomb).length).toBeLessThan(140);
  });

  it('Gets some neighbors', () => {
    const axisSize = 10;
    const board = newBoard({ size: axisSize, difficulty: 0.1 });
    const neighbors = getNeighbors(19, axisSize);
    const check = checkNeighbors(board, 19);
    expect(check[0]).toEqual(board[0]);
    expect(neighbors).toHaveLength(5);
  });
  it('Doesnt exceed the board with neighbors', () => {
    const axisSize = 10;
    const board = newBoard({ size: axisSize, difficulty: 0.1 });
    const neighbors = getNeighbors(99, axisSize);
    expect(neighbors).toHaveLength(3);
    const neighbors2 = getNeighbors(98, axisSize);
    expect(neighbors2).toHaveLength(5);
    const check = checkNeighbors(board, 98);
    expect(check).toHaveLength(5);
  });
});

describe('It loads a board initially', () => {
  it('Has 100 squares', () => {
    const axis = 24;
    const difficulty = 0.25;
    render(<MineSweeper size={axis} difficulty={difficulty} />);
    expect(screen.getAllByText(/576/)).toBeDefined();
  });
});
