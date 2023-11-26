import {render, screen} from '@testing-library/react';
import Game from '../src/Game';

test('renders Game', () => {
    render(<Game/>);
    const game = screen.getByTestId('game');
    expect(game).toBeInTheDocument();
});

test('shows board rows and clickable squares', () => {
    render(<Game/>);
    for (const i of [...Array(9).slice(1).keys()]) {
        const squareAtIndex = screen.getByTestId(`square-${i}`);
        expect(squareAtIndex).toBeInTheDocument();
    }

    for (const i of Array(3).keys()) {
        const rowAtIndex = screen.getByTestId(`row${i}`);
        expect(rowAtIndex).toBeInTheDocument();
    }
});
