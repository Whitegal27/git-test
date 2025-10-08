import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';

const AddRequirementModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    formats: []
  });

  const handleFormatChange = (format, checked) => {
    setFormData(prev => ({
      ...prev,
      formats: checked 
        ? [...prev.formats, format]
        : prev.formats.filter(f => f !== format)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() && formData.formats.length > 0) {
      onSubmit(formData);
      setFormData({ name: '', formats: [] });
    }
  };

  const handleClose = () => {
    setFormData({ name: '', formats: [] });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#000000CC]"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Add New Requirement</h2>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          
          <p className="text-gray-600 mb-6">Provide information for this requirement</p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Document Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Document Name *
              </label>
              <Input
                type="text"
                placeholder="Select reason"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full"
                required
              />
            </div>

            {/* Document Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Document Type *
              </label>
              <div className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pdf"
                    checked={formData.formats.includes('PDF')}
                    onCheckedChange={(checked) => handleFormatChange('PDF', checked)}
                  />
                  <label htmlFor="pdf" className="text-sm text-gray-700">
                    PDF
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="jpeg"
                    checked={formData.formats.includes('JPEG')}
                    onCheckedChange={(checked) => handleFormatChange('JPEG', checked)}
                  />
                  <label htmlFor="jpeg" className="text-sm text-gray-700">
                    JPEG
                  </label>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1 px-8 py-6 "
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#007046] hover:bg-green-700 px-8 py-6 text-white rounded font-semibold text-sm text-center align-middle leading-[180%] tracking-[0px]"
              >
                Create User
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRequirementModal;