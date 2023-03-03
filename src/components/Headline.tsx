import { HeadlineTypes } from '../types';

export type HeadlineProps = {
  headlineText: string;
  headlineType: HeadlineTypes;
  headlineClass?: string;
};

const Headline = ({
  headlineText,
  headlineType,
  headlineClass,
}: HeadlineProps) => {
  if (!headlineText || !headlineType) {
    return <></>;
  }

  const headlineWithText = {
    h1: <h1 className={headlineClass ?? ''}>{headlineText}</h1>,
    h2: <h2 className={headlineClass ?? ''}>{headlineText}</h2>,
    h3: <h3 className={headlineClass ?? ''}>{headlineText}</h3>,
    h4: <h4 className={headlineClass ?? ''}>{headlineText}</h4>,
    h5: <h5 className={headlineClass ?? ''}>{headlineText}</h5>,
    h6: <h6 className={headlineClass ?? ''}>{headlineText}</h6>,
  };

  return headlineWithText[headlineType] || headlineWithText['h1'];
};

export default Headline;
