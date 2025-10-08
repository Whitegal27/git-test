import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

export function UploadModal({ isOpen, onClose }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentType, setDocumentType] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Upload Document</h3>
          <p className="text-gray-600 mb-4">Please select document to upload</p>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Document *</label>
            <select 
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select</option>
              <option value="id">ID Document</option>
              <option value="proof-address">Proof of Address</option>
              <option value="business">Business Certificate</option>
            </select>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
            <div className="flex items-center justify-center gap-2">
              <Upload className="w-5 h-5 text-green-600" />
              <p className="text-green-600 font-medium">Click to upload</p> <span>or drag and drop</span>
            </div>
            <p className="text-sm text-gray-500">SVG, PNG, JPG or PDF (max. 800x400px)</p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button className="flex-1 bg-[#007046] hover:bg-green-700">
              Upload
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}