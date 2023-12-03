import {fireEvent, render, screen} from '@testing-library/react';
import Game from '../src/Game';

test('renders Game', () => {
    render(<Game/>);
    const game = screen.getByTestId('game');
    expect(game).toBeInTheDocument();
});

test('shows board rows, clickable squares and game status', () => {
    render(<Game/>);
    for (const i of [...Array(9).keys()]) {
        const squareAtIndex = screen.getByTestId(`square-${i}`);
        expect(squareAtIndex).toBeInTheDocument();
    }

    for (const i of Array(3).keys()) {
        const rowAtIndex = screen.getByTestId(`row${i}`);
        expect(rowAtIndex).toBeInTheDocument();
    }

    const status = screen.getByTestId('status');
    expect(status).toBeInTheDocument();

});

test('shows status of next player and current move', () => {
    render(<Game/>);
    const status = screen.getByTestId('status');
    const moveIndicator = screen.getByTestId('move-indicator');
    expect(status).toHaveTextContent('Next player is X');
    expect(moveIndicator).toHaveTextContent('You are at move 1');
});

test('shows status of winner and highlights winning line', () => {
    render(<Game/>);
    const status = screen.getByTestId('status');
    expect(status).toHaveTextContent('Next player is X');
    const square0 = screen.getByTestId('square-0');
    fireEvent.click(square0);
    expect(status).toHaveTextContent('Next player is O');
    const square1 = screen.getByTestId('square-1');
    fireEvent.click(square1);
    expect(status).toHaveTextContent('Next player is X');
    const square4 = screen.getByTestId('square-4');
    fireEvent.click(square4);
    expect(status).toHaveTextContent('Next player is O');
    const square2 = screen.getByTestId('square-2');
    fireEvent.click(square2);
    expect(status).toHaveTextContent('Next player is X');
    const square8 = screen.getByTestId('square-8');
    fireEvent.click(square8);
    expect(status).toHaveTextContent('Winner is X');
    expect(square0).toHaveClass('winner-square');
    expect(square4).toHaveClass('winner-square');
    expect(square8).toHaveClass('winner-square');

    expect(square1).toHaveClass('square');
    expect(square2).toHaveClass('square');
    const moveIndicator = screen.getByTestId('move-indicator');
    expect(moveIndicator).toHaveTextContent('Game Over');
});

test('shows status of draw and game result', () => {
    render(<Game/>);
    const status = screen.getByTestId('status');
    expect(status).toHaveTextContent('Next player is X');
    const square0 = screen.getByTestId('square-0');
    fireEvent.click(square0);
    expect(status).toHaveTextContent('Next player is O');
    const square1 = screen.getByTestId('square-1');
    fireEvent.click(square1);
    expect(status).toHaveTextContent('Next player is X');
    const square2 = screen.getByTestId('square-2');
    fireEvent.click(square2);
    expect(status).toHaveTextContent('Next player is O');
    const square3 = screen.getByTestId('square-3');
    fireEvent.click(square3);
    expect(status).toHaveTextContent('Next player is X');
    const square5 = screen.getByTestId('square-5');
    fireEvent.click(square5);
    expect(status).toHaveTextContent('Next player is O');
    const square4 = screen.getByTestId('square-4');
    fireEvent.click(square4);
    expect(status).toHaveTextContent('Next player is X');
    const square6 = screen.getByTestId('square-6');
    fireEvent.click(square6);
    expect(status).toHaveTextContent('Next player is O');
    const square8 = screen.getByTestId('square-8');
    fireEvent.click(square8);
    expect(status).toHaveTextContent('Next player is X');
    const square7 = screen.getByTestId('square-7');
    fireEvent.click(square7);
    expect(status).toHaveTextContent('Draw');
    const moveIndicator = screen.getByTestId('move-indicator');
    expect(moveIndicator).toHaveTextContent('Game Over');
});
