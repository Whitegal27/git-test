import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { 
  AddRequirementModal, 
  EditRequirementModal, 
  DeleteRequirementModal 
} from '../components';

const INITIAL_REQUIREMENTS = [
  { id: 1, name: 'Profile Photo', format: 'JPEG, PDF' },
  { id: 2, name: 'Proof of Identification', format: 'JPEG, PDF' },
  { id: 3, name: 'Proof of Address', format: 'JPEG, PDF' },
  { id: 4, name: 'CAC', format: 'JPEG, PDF' },
];

const SettingsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Required Documents');
  const [requirements, setRequirements] = useState(INITIAL_REQUIREMENTS);
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState(null);

  const tabs = ['General Info', 'Security', 'Required Documents'];

  // Close dropdown menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdowns = document.querySelectorAll('.absolute.right-0');
      dropdowns.forEach(dropdown => {
        if (!dropdown.contains(event.target) && !dropdown.previousElementSibling.contains(event.target)) {
          dropdown.classList.add('hidden');
        }
      });
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleAddRequirement = (newRequirement) => {
    const requirement = {
      id: Date.now(),
      name: newRequirement.name,
      format: newRequirement.formats.join(', ')
    };
    setRequirements([...requirements, requirement]);
    setIsAddModalOpen(false);
  };

  const handleEditRequirement = (updatedRequirement) => {
    setRequirements(requirements.map(req => 
      req.id === selectedRequirement.id 
        ? { ...req, name: updatedRequirement.name, format: updatedRequirement.formats.join(', ') }
        : req
    ));
    setIsEditModalOpen(false);
    setSelectedRequirement(null);
  };

  const handleDeleteRequirement = () => {
    setRequirements(requirements.filter(req => req.id !== selectedRequirement.id));
    setIsDeleteModalOpen(false);
    setSelectedRequirement(null);
  };

  const openEditModal = (requirement) => {
    setSelectedRequirement(requirement);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (requirement) => {
    setSelectedRequirement(requirement);
    setIsDeleteModalOpen(true);
  };

  const RequiredDocumentsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Required Documents</h3>
        <Button 
          onClick={() => setIsAddModalOpen(true)}
          variant="outline"
          className="w-[196px] h-10 rounded-md border border-[#E4E4E7] text-[#007046] hover:bg-[#007046] hover:text-white px-4 py-2 gap-2 text-sm font-medium leading-5 tracking-normal shadow-sm"
          style={{ boxShadow: '0px 1px 2px 0px #1018280D' }}
        >
          <Plus className="w-4 h-4" />
          Add New Requirement
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="font-medium text-gray-700 text-sm px-6 py-3 w-auto">
                Document Name
              </TableHead>
              <TableHead className="font-medium text-gray-700 text-sm px-6 py-3 w-auto text-left">
                Document Format
              </TableHead>
              <TableHead className="font-medium text-gray-700 text-sm px-6 py-3 w-auto text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requirements.map((requirement) => (
              <TableRow key={requirement.id}>
                <TableCell className="px-6 py-4 w-auto">
                  <div className="text-gray-900 font-medium">{requirement.name}</div>
                </TableCell>
                <TableCell className="px-6 py-4 w-auto text-left">
                  <div className="text-gray-600">{requirement.format}</div>
                </TableCell>
                <TableCell className="px-6 py-4 w-auto">
                  <div className="flex items-center justify-end text-left">
                    <div className="relative">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          // simple menu toggle
                          const menu = e.currentTarget.nextElementSibling;
                          menu.classList.toggle('hidden');
                        }}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                      <div className="hidden absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                        <button
                          onClick={() => openEditModal(requirement)}
                          className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => openDeleteModal(requirement)}
                          className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
              <p className="text-gray-600">Manage your system settings here.</p>
            </div>
          </div>
          <button 
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg flex gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <Card>
          <CardContent className="p-6">
            {/* Tabs */}
            <div className="flex space-x-1 mb-6 p-1 bg-gray-100 rounded-lg w-fit">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded font-medium text-sm transition-colors w-[231px] h-[34px] px-3 py-1 ${
                    activeTab === tab
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'Required Documents' && <RequiredDocumentsTab />}
            {activeTab === 'General Info' && (
              <div className="text-center py-12 text-gray-500">
                General Info settings coming soon...
              </div>
            )}
            {activeTab === 'Security' && (
              <div className="text-center py-12 text-gray-500">
                Security settings coming soon...
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <AddRequirementModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddRequirement}
      />

      <EditRequirementModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditRequirement}
        requirement={selectedRequirement}
      />

      <DeleteRequirementModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteRequirement}
        requirement={selectedRequirement}
      />
    </div>
  );
};

export default SettingsPage;