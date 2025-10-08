import React from 'react';

export function ApprovalModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Approve Documents</h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to approve the selected documents?
          </p>
          
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
            <button 
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-[#007046] text-white rounded-md hover:bg-green-700 font-medium"
            >
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}