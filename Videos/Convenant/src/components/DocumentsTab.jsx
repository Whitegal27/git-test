import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, Upload, Trash2 } from 'lucide-react';
import { DocumentModal } from './DocumentModal';
import { UploadModal } from './UploadModal';
import { ApprovalModal } from './ApprovalModal';
import UserImage from "../assets/user.png";
import Doc1Image from "../assets/doc1.png";
import Doc2Image from "../assets/doc2.png";
import Doc3Image from "../assets/doc3.png";

export function DocumentsTab({ userData }) {
  const [documentFilter, setDocumentFilter] = useState('uploaded');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  
  const documents = [
    {
      id: 1,
      name: 'Profile Photo.jpg',
      type: 'Profile Picture',
      status: 'Approved',
      thumbnail: UserImage,
      isDraft: false
    },
    {
      id: 2,
      name: 'NIN Slip',
      type: 'Proof of Identity',
      status: 'Pending',
      thumbnail: Doc1Image,
      isDraft: true
    },
    {
      id: 3,
      name: 'Electricity Bill.jpg',
      type: 'Proof of Address',
      status: 'Pending',
      thumbnail: Doc2Image,
      isDraft: true
    },
    {
      id: 4,
      name: 'CAC.jpg',
      type: 'Business Certificate',
      status: 'Approved',
      thumbnail: Doc3Image,
      isDraft: false
    }
  ];

  const filteredDocuments = documents.filter(doc => 
    documentFilter === 'uploaded' ? !doc.isDraft : doc.isDraft
  );

  const hasDrafts = documents.some(doc => doc.isDraft);

  const handleDocumentClick = (document) => {
    setSelectedDocument(document);
    setShowDocumentModal(true);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Documents Section */}
      <div className="xl:col-span-2">
        <div className="bg-white border border-gray-200 shadow-sm rounded-lg">
          {/* Documents Header */}
          <div className="p-6 border-b border-gray-200">
            
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Documents</h2>
              <button 
                onClick={() => setShowUploadModal(true)}
                className="flex items-center justify-center bg-white text-[#007046] gap-2 font-medium text-sm leading-5 rounded-md border border-gray-200 opacity-100 px-8 py-2"
              >
                <Upload className="h-4 w-4" />
                Upload Document
              </button>
            </div>

            <div className='flex justify-between items-center'>
            
            {/* Document Filter Tabs */}
            <div className="flex gap-2">
              <button
                onClick={() => setDocumentFilter('uploaded')}
                className={`px-4 py-2 rounded-[16px] text-sm font-medium transition-colors ${
                  documentFilter === 'uploaded'
                    ? 'bg-[#007046] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Uploaded Documents
              </button>
              <button
                onClick={() => setDocumentFilter('drafts')}
                className={`px-4 py-2 rounded-[16px] text-sm font-medium transition-colors ${
                  documentFilter === 'drafts'
                    ? 'bg-[#007046] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Drafts {documents.filter(doc => doc.isDraft).length > 0 && (
                  <span className="ml-1 bg-white bg-opacity-20 px-1.5 py-0.5 rounded text-xs text-black">
                    {documents.filter(doc => doc.isDraft).length}
                  </span>
                )}
              </button>
            </div>

             {/* Approve/Decline Buttons */}
            {documentFilter === 'uploaded' && (
              <div className="flex gap-2">
                <Button variant="outline" className="text-red-600 border-[#E5E7EB] rounded-sm">
                  ✕ Decline
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setShowApprovalModal(true)}
                  className="text-green-600 rounded-sm border-[#E5E7EB]"
                >
                  ✓ Approve
                </Button>
              </div>
            )}
            </div>
          </div>
          
          {/* Document Grid */}
          <div className="p-6 flex flex-wrap gap-8">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="relative border border-gray-200 rounded-lg overflow-hidden" style={{ width: '245.74px' }}>
                <div 
                  className="bg-gray-100 relative cursor-pointer opacity-100"
                  style={{ width: '245.74px', height: '235.51px', transform: 'rotate(0deg)' }}
                  onClick={() => handleDocumentClick(doc)}
                >
                  <img 
                    src={doc.thumbnail} 
                    alt={doc.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Status Badge */}
                  <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium ${
                    doc.status === 'Approved' 
                      ? 'bg-[#F0FDF4] text-[#047857]' 
                      : 'bg-[#FEFCE8] text-[#A16207]'
                  }`}>
                    {doc.status}
                  </div>
                  {/* Delete Button */}
                  <button 
                    className="absolute top-2 right-2 w-6 h-6 text-[#DC2626] flex items-center justify-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle delete
                    }}
                  >
                    <Trash2 className="h-[18px] w-4" />
                  </button>
                </div>
                <div className="p-3 bg-[#F3F4F6]">
                  <h3 className="font-medium text-gray-900">{doc.name}</h3>
                  <p className="text-sm text-gray-500">{doc.type}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Action Buttons - Only Submit button for drafts */}
          {documentFilter === 'drafts' && hasDrafts && (
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <Button className="bg-[#007046] px-16 py-4 ">
                Submit
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Right Sidebar - Same as User Details */}
      <div className="space-y-6">
        {/* Linked Accounts */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">Linked Accounts</CardTitle>
            <p className="text-sm text-gray-500">All accounts tied to users BVN</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {userData.linkedAccounts.map((account, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Wallet className="h-4 w-4 text-black" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{account.accountNumber}</p>
                    <p className="text-xs text-gray-500">{account.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">{account.status}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Verification */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">Verification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Description</span>
                <span className="text-sm text-gray-500">Verified By</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">{userData.verification.kycStatus}</span>
                <span className="font-medium text-gray-900">{userData.verification.kycVerifiedBy}</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Status</span>
                <span className="text-sm text-gray-500">Date</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">{userData.verification.bvnStatus}</span>
                <span className="font-medium text-gray-900">{userData.verification.bvnVerifiedOn}</span>
              </div>
            </div>

            <div>
              <span className="text-sm text-gray-500">Verified On</span>
              <p className="font-medium text-gray-900">{userData.verification.lastVerifiedOn}</p>
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" size="sm" className="flex-1 text-red-600">
                ✕ Decline
              </Button>
              <Button size="sm" variant="outline" className="flex-1 bg-white text-green-600">
                ✓ Approve
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <DocumentModal 
        document={selectedDocument}
        isOpen={showDocumentModal}
        onClose={() => setShowDocumentModal(false)}
      />
      
      <UploadModal 
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
      />
      
      <ApprovalModal 
        isOpen={showApprovalModal}
        onClose={() => setShowApprovalModal(false)}
        onConfirm={() => {
          setShowApprovalModal(false);
          // Handle approval logic
        }}
      />
    </div>
  );
}