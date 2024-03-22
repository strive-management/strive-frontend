import { FC } from 'react';

interface LabelProps {
  text: string;
  additionalClasses?: string;
}

const Label: FC<LabelProps> = ({ text, additionalClasses = '' }) => {
  const labelClasses = `block mb-2 text-sm font-medium text-gray-300 dark:text-gray-300 ${additionalClasses}`;

  return <label className={labelClasses}>{text}</label>;
};

export default Label;
