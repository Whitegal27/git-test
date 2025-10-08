import React from 'react';
import { Button } from './ui/button';

const DeleteRequirementModal = ({ isOpen, onClose, onConfirm, requirement }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#000000CC]"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-sm mx-4">
        <div className="p-6">
          {/* Header */}
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Delete Document Requirement
          </h2>
          
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this document requirement?
          </p>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 px-8 py-6"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={onConfirm}
              className="flex-1 bg-[#B80A0A] px-8 py-6  hover:bg-red-700 text-white"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteRequirementModal;