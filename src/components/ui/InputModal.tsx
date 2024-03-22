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
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="bg-gray-200 border-2 border-gray-500 p-10 dark:bg-gray-800 rounded-lg dark:border-gray-300 dark:border">
          <div className='flex flex-col m-10'>
          <input
            type="text"
            className='bg-gray-50 border border-[#c0f2fc] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder={`Enter new ${type}`}
          />
            <br/>
            <br/>
            <div className='flex flex-row gap-4'>
          
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
        </div>
      </div>
    </>
  );
};

export default InputModal;
