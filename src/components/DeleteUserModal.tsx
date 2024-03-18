import React from 'react';

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (e:React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
}


const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-300 dark:bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-300 dark:bg-gray-800 rounded-lg p-4">
        <h2 className="text-lg font-semibold">Confirm Deletion</h2>
        <p>Are you sure you want to delete this record?</p>
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
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
