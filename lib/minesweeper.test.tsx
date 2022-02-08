import React from 'react';
import { MineSweeper } from './MineSweeper';
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// import '@testing-library/jest-dom/extend-expect'

describe('It loads the test', () => {
  it('Renders', () => {
    render(<div data-testid="reset"><MineSweeper /></div>)
    expect(screen.getByTitle('increment')).toBeTruthy();
    expect(screen.getByTitle('decrement')).toBeTruthy();
    expect(screen.getByTitle('current-score')).toBeTruthy();
    expect(screen.getByTitle('newgame')).toBeTruthy();
    expect(screen.getByTitle('x4y4')).toBeTruthy();
    expect(screen.getByTitle('x4y9')).toBeTruthy();
  })
})
