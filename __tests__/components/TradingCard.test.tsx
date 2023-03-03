import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TradingCard from '../../src/components/TradingCard';
import { mockedTradingCard } from '../../src/mocks/mockedTradingCard';
import { HeadlineTypes } from '../../src/types';

describe('Card', () => {
  const headlineType: HeadlineTypes = 'h2';

  beforeEach(() => {
    render(
      <TradingCard
        title={{
          headlineText: mockedTradingCard.name,
          headlineType: headlineType,
        }}
        image={{ url: mockedTradingCard.image, width: 300, height: 300 }}
        id={mockedTradingCard.id}
      />
    );
  });

  it('renders a list tag', () => {
    expect(screen.getByRole('listitem')).toBeInTheDocument();
  });

  it('renders a headline with given headline type and content', () => {
    expect(screen.getByRole('heading')).toHaveTextContent(
      mockedTradingCard.name
    );
    expect(screen.getByRole('heading').tagName).toBe(
      headlineType.toLocaleUpperCase()
    );
  });

  it('renders a given img', () => {
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('wraps content in link with given url as href', () => {
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      mockedTradingCard.id
    );
  });

  it('match snapshot', () => {
    expect(screen.getByRole('listitem')).toMatchSnapshot();
  });
});
