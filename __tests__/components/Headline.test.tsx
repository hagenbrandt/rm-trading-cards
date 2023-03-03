import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Headline from '../../src/components/Headline';
import { HeadlineTypes } from '../../src/types';

describe('Headline', () => {
  const headlineTypes: HeadlineTypes[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  const headlineText = 'This is a headline';
  const headlineClassName = 'headline';
  const component = (
    <Headline
      headlineText={headlineText}
      headlineType='h1'
      headlineClass={headlineClassName}
    />
  );
  it('redners given headline tag with given text', () => {
    headlineTypes.forEach((item) => {
      render(<Headline headlineText={headlineText} headlineType={item} />);
      expect(screen.getByRole('heading').tagName).toBe(item.toUpperCase());
      expect(screen.getByRole('heading')).toHaveTextContent(headlineText);
      cleanup();
    });
  });
  it('returns empty DOM element when no text is given', () => {
    const { container } = render(
      <Headline headlineText='' headlineType='h1' />
    );
    expect(container).toBeEmptyDOMElement();
  });
  it('returns empty DOM element when no headline-type is given', () => {
    const { container } = render(
      <Headline headlineText='' headlineType={'' as HeadlineTypes} />
    );
    expect(container).toBeEmptyDOMElement();
  });
  it('has className when given', () => {
    render(component);
    expect(screen.getByRole('heading')).toHaveClass(headlineClassName);
  });
  it('has no className when not given', () => {
    render(<Headline headlineText={headlineText} headlineType={'h1'} />);
    expect(screen.getByRole('heading')).not.toHaveClass(headlineClassName);
  });
  it('matches snapshot', () => {
    const { container } = render(component);
    expect(container).toMatchSnapshot();
  });
});
