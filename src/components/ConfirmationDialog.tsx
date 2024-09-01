import React from 'react';

interface ConfirmationDialogProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog = ({
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end gap-2">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
