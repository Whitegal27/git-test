import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { UserDetailsTab } from '../components/UserDetailsTab';
import { DocumentsTab } from '../components/DocumentsTab';
import UserImage from "../assets/user.png";

export function AccountDetailsPage() {
  const [activeTab, setActiveTab] = React.useState('user-details');
  
  const handleBack = () => {
    window.history.back();
  };

  const userData = {
    personal: {
      firstName: "Adeola",
      middleName: "Oluwaseun",
      lastName: "James",
      gender: "Female",
      dateOfBirth: "13th August 1990",
      bvn: "22227778899",
      nin: "00111222344",
      profileImage: UserImage
    },
    contact: {
      phone: "08031234567",
      email: "mail@example.com",
      address: "295 James Ibori Street, Ikeja, Lagos",
      state: "Lagos"
    },
    account: {
      accountNumber: "8031234567",
      accountType: "Savings",
      tier: "Tier 1",
      dateCreated: "13th May, 2023",
      activatedOn: "13th May, 2023",
      branch: "Ado Odo Ota",
      channel: "Bank Branch"
    },
    linkedAccounts: [
      {
        accountNumber: "0987654321",
        type: "Savings",
        status: "Active"
      },
      {
        accountNumber: "1234567890",
        type: "Current",
        status: "Active"
      }
    ],
    verification: {
      kycStatus: "Completed",
      kycVerifiedBy: "Isaiah Victoria",
      bvnStatus: "Successfully verified",
      bvnVerifiedOn: "23/05/2022, 05:78:45",
      lastVerifiedOn: "23/05/2022, 05:78:45"
    }
  };

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      {/* Navigation Tabs */}
      <div className="inline-flex bg-gray-100 rounded-lg p-1">
        <button 
          onClick={() => setActiveTab('user-details')}
          className={`px-6 py-2 rounded-md font-medium transition-all ${
            activeTab === 'user-details' 
              ? 'bg-white text-gray-900 shadow-sm px-16' 
              : 'text-gray-600 hover:text-gray-800 px-16'
          }`}
        >
          User Details
        </button>
        <button 
          onClick={() => setActiveTab('documents')}
          className={`px-6 py-2 rounded-md font-medium transition-all ${
            activeTab === 'documents' 
              ? 'bg-white text-gray-900 shadow-sm px-16' 
              : 'text-gray-600 hover:text-gray-800 px-16'
          }`}
        >
          Documents
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'user-details' && (
        <UserDetailsTab userData={userData} />
      )}
      
      {activeTab === 'documents' && (
        <DocumentsTab userData={userData} />
      )}
    </div>
  );
}