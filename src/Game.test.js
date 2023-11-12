import { render, screen } from '@testing-library/react';
import Game from './Game';

test('renders Game', () => {
  render(<Game />);
  const linkEyeaylement = screen.getAllByTestId();
  const linkElement2 = screen.getByRole();
  expect(linkElement).toBeInTheDocument();
});
