import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TradingCardList from '../../src/components/TradingCardList';
import { mockedTradingCards } from '../../src/mocks/mockedTradingCard';

describe('CardsList', () => {
  beforeEach(() => {
    render(<TradingCardList cards={mockedTradingCards} headlineType={'h2'} />);
  });

  it('renders unordered list', () => {
    expect(screen.getByRole('list'));
  });

  it('renders with given list items', () => {
    expect(screen.getAllByRole('listitem')).toHaveLength(
      mockedTradingCards.length
    );
  });

  it('matches snapshot', () => {
    expect(screen.getByRole('list')).toMatchSnapshot();
  });
});
