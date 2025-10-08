import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import { AccountApprovalModal } from './AccountApprovalModal';

export function UserDetailsTab({ userData }) {
  const [showApprovalModal, setShowApprovalModal] = useState(false);

  const handleApproveAccount = (verifierComment) => {
    console.log('Approving account with comment:', verifierComment);
    setShowApprovalModal(false);
  
  };
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Left Column - Main Details */}
      <div className="xl:col-span-2 space-y-6">
        {/* Personal Details */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-gray-900">Personal Details</CardTitle>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Active</span>
                <span className="bg-gray-900 text-white text-xs px-2 py-1 rounded">Tier 2</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden">
                  <img 
                    src={userData.personal.profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm text-gray-500">First Name</label>
                  <p className="font-medium text-gray-900">{userData.personal.firstName}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Middle Name</label>
                  <p className="font-medium text-gray-900">{userData.personal.middleName}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Last Name</label>
                  <p className="font-medium text-gray-900">{userData.personal.lastName}</p>
                </div>
                <div></div>
                <div>
                  <label className="text-sm text-gray-500">Gender</label>
                  <p className="font-medium text-gray-900">{userData.personal.gender}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Date of Birth</label>
                  <p className="font-medium text-gray-900">{userData.personal.dateOfBirth}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">BVN</label>
                  <p className="font-medium text-gray-900">{userData.personal.bvn}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">NIN</label>
                  <p className="font-medium text-gray-900">{userData.personal.nin}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Details */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-gray-900">Contact Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-sm text-gray-500">Phone Number</label>
                <p className="font-medium text-gray-900">{userData.contact.phone}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <p className="font-medium text-gray-900">{userData.contact.email}</p>
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm text-gray-500">Address</label>
                <p className="font-medium text-gray-900">{userData.contact.address}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">State</label>
                <p className="font-medium text-gray-900">{userData.contact.state}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Details */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-gray-900">Account Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <div>
                <label className="text-sm text-gray-500">Account Number</label>
                <p className="font-medium text-gray-900">{userData.account.accountNumber}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Account Type</label>
                <p className="font-medium text-gray-900">{userData.account.accountType}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Tier</label>
                <p className="font-medium text-gray-900">{userData.account.tier}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Date Created</label>
                <p className="font-medium text-gray-900">{userData.account.dateCreated}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Activated On</label>
                <p className="font-medium text-gray-900">{userData.account.activatedOn}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Branch</label>
                <p className="font-medium text-gray-900">{userData.account.branch}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Channel</label>
                <p className="font-medium text-gray-900">{userData.account.channel}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Sidebar */}
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
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1 bg-white text-green-600"
                onClick={() => setShowApprovalModal(true)}
              >
                ✓ Approve
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Approval Modal */}
      <AccountApprovalModal 
        isOpen={showApprovalModal}
        onClose={() => setShowApprovalModal(false)}
        onConfirm={handleApproveAccount}
      />
    </div>
  );
}