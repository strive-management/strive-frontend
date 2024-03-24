import React from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="flex flex-col bg-gray-200 border-2 border-gray-500 p-10 dark:bg-gray-800 rounded-lg dark:border-gray-300 dark:border">
        <div className="text-gray-600 dark:text-gray-300 p-4 rounded-lg shadow-lg flex flex-col items-center space-y-4">
          <p>{message}</p>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="inline-block rounded bg-blue-300 hover:bg-blue-500 dark:bg-transparent dark:border-2 dark:border-blue-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-gray-600 dark:text-blue-400 shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:bg-blue-300 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
