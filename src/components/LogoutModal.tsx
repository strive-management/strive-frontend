import React from 'react';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (e:React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
}


const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 bg-gray-300 dark:bg-gray-800 flex justify-center items-center">
      <div className="bg-gray-300 dark:bg-gray-800 rounded-lg p-4">
        <h2 className="text-lg font-semibold">Logout</h2>
        <p>Are you sure you want to log out?</p>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="bg-gray-400 hover:bg-gray-300 rounded px-4 py-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2"
            onClick={onConfirm}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
