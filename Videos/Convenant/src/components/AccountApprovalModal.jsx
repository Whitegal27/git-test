import React, { useState } from 'react';

export function AccountApprovalModal({ isOpen, onClose, onConfirm }) {
  const [verifierComment, setVerifierComment] = useState('');

  if (!isOpen) return null;

  const handleVerify = () => {
    onConfirm(verifierComment);
    setVerifierComment('');
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-2">Approve Account</h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to approve this account?
          </p>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Verifier Comment
            </label>
            <textarea
              value={verifierComment}
              onChange={(e) => setVerifierComment(e.target.value)}
              className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter your comment..."
            />
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
            <button 
              onClick={handleVerify}
              className="flex-1 px-4 py-2 bg-[#007046] text-white rounded-md hover:bg-green-700 font-medium"
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}