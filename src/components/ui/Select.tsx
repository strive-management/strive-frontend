interface Option {
  id: number;
  [key: string]: string | number;
}
interface SelectProps {
  name: string;
  value: string | [];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  defaultOption?: string;
  includeAddNew?: boolean; // New prop to conditionally include an "Add new..." option
  onAddNew?: () => void; // Handler for when "Add new..." is selected
}

const Select: React.FC<SelectProps> = ({
  name,
  value,
  onChange,
  options,
  defaultOption = 'Select option',
  includeAddNew = false,
  onAddNew,
}) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'Add new...') {
      onAddNew?.();
    } else {
      onChange(e);
    }
  };

  return (
    <select
      name={name}
      value={value}
      onChange={handleOnChange}
      className="select-class-names"
    >
      <option value="">{defaultOption}</option>
      {options.map((option) => (
        <option key={option.id} value={option.name}>
          {option.name}
        </option>
      ))}
      {includeAddNew && <option value="Add new...">Add new...</option>}
    </select>
  );
};

export default Select;
