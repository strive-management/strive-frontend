import { ChangeEventHandler, FC } from 'react';

interface InputProps {
  type: string;
  name?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  additionalClasses?: string;
}

const Input: FC<InputProps> = ({
  type,
  name,
  value,
  onChange,
  placeholder = '',
  additionalClasses,
}) => {
  const inputClasses = `bg-gray-50 border border-[#c0f2fc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${additionalClasses}`;

  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={inputClasses}
    />
  );
};

export default Input;
