import React from 'react';

interface CommonPopupProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const CommonPopup: React.FC<CommonPopupProps> = ({
  message,
  isVisible,
  onClose,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-lg sm:max-w-xl lg:max-w-2xl mx-4 sm:mx-auto border border-gray-300">
        <p className="text-gray-700 mb-8 text-lg sm:text-xl text-center">
          {message}
        </p>
        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default CommonPopup;
