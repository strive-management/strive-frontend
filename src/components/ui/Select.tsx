interface SelectProps {
  name: string;
  value: string | [];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { id: number; name: string }[];
  defaultOption?: string;
}

const Select: React.FC<SelectProps> = ({
  name,
  value,
  onChange,
  options,
  defaultOption = 'Select option',
}) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="select-class-names"
    >
      <option value="">{defaultOption}</option>
      {options.map((option) => (
        <option key={option.id} value={option.name}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default Select;
