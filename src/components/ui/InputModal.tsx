import { useState } from 'react';

interface InputModalProps {
  onSubmit: (newValue: string, type: string) => void;
  onClose: () => void;
  type: string;
}

const InputModal: React.FC<InputModalProps> = ({ onSubmit, onClose, type }) => {
  const [newValue, setNewValue] = useState('');

  const handleSubmit = () => {
    onSubmit(newValue, type);
    onClose();
  };

  return (
    <>
      <div className="w-full bg-white">
        <div className="absolute text-center transform -translate-x-1/2 -translate-y-1/2 top-40 left-1/2 bg-[rgba(211,217,236,.877)] w-400px h-600px m-28 auto rounded-lg backdrop-blur-lg shadow-[0px_11px_35px_2px_rgba(0,0,0,.14)]">
          <input
            type="text"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder={`Enter new ${type}`}
          />
          <button
            className="mt-10 text-black bg-blue-200 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="mt-10 text-black bg-blue-200 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default InputModal;
