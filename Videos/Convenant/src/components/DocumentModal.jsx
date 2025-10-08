import React from 'react';
import { X, Check } from 'lucide-react';

export function DocumentModal({ document, isOpen, onClose }) {
  if (!isOpen || !document) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-5xl w-[892px] max-h-[513px] overflow-auto relative">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-[#007046] text-white rounded-full flex items-center justify-center hover:bg-green-700 z-10"
        >
          <X className="h-5 w-5" />
        </button>
        
        {/* Document Content */}
        <div className="p-6 w-[100%]">
          <img 
            src={document.thumbnail} 
            alt={document.name}
            className="w-full h-[428.935546875px]"
          />
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-center gap-6 p-6 bg-gray-50">
          <button className="flex items-center gap-3 px-8 py-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <X className="h-6 w-6 text-red-600" />
            <span className="text-red-600 font-medium text-lg">Decline</span>
          </button>
          <button className="flex items-center gap-3 px-8 py-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Check className="h-6 w-6 text-green-600" />
            <span className="text-green-600 font-medium text-lg">Approve</span>
          </button>
        </div>
      </div>
    </div>
  );
}