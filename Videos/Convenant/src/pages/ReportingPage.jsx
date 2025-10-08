import React, { useState } from 'react';
import ReportingFilters from '../components/reporting/ReportingFilters';
import AccountsSummaryCard from '../components/reporting/AccountsSummaryCard';
import BranchesOverview from '../components/reporting/BranchesOverview';
import BankingChannelsChart from '../components/reporting/BankingChannelsChart';

const ReportingPage = () => {
  const [searchValue, setSearchValue] = useState('');

  // Mock data - replace with real data from API
  const accountsData = {
    totalAccounts: 26000,
    statusData: [
      { label: 'Active', count: 15600 },
      { label: 'Inactive', count: 8500 },
      { label: 'Suspended', count: 1900 }
    ]
  };

  const approvalData = {
    totalAccounts: 26000,
    statusData: [
      { label: 'Approved', count: 15600 },
      { label: 'Pending', count: 8500 },
      { label: 'Declined', count: 1900 }
    ]
  };

  const branchData = [
    { name: 'Individual Current', value: 14760, percentage: '18' },
    { name: 'Staff Current', value: 11480, percentage: '14' },
    { name: 'Corporate Current', value: 9840, percentage: '12' },
    { name: 'Joint Current', value: 8200, percentage: '10' },
    { name: 'Salary Current', value: 7380, percentage: '9' },
    { name: 'Current Account Society', value: 6560, percentage: '8' },
    { name: 'Individual Savings', value: 5740, percentage: '7' },
    { name: 'Covenant Daily Investment', value: 4920, percentage: '6' },
    { name: 'Covenant Shiloh Savings', value: 4100, percentage: '5' },
    { name: 'Joint Savings', value: 3280, percentage: '4' },
    { name: 'Salary Savings', value: 2050, percentage: '2.50' },
    { name: 'Savings Account Group', value: 1230, percentage: '1.50' },
    { name: 'Covenant Children Savings', value: 820, percentage: '1' },
    { name: 'Step Up Target Savings', value: 1640, percentage: '2' }
  ];

  const bankingChannelsData = {
    approvedAccounts: [40000, 42000, 41000],
    flaggedAccounts: [5000, 3000, 4000]
  };

  const handleSearch = (value) => {
    setSearchValue(value);
    // Implement search logic
  };

  const handleDateFilter = () => {
    // Implement date filter logic
    console.log('Date filter clicked');
  };

  const handleChannelFilter = (channel) => {
    // Implement channel filter logic
    console.log('Channel filter:', channel);
  };

  const handleBranchFilter = (branch) => {
    // Implement branch filter logic
    console.log('Branch filter:', branch);
  };

  const handleAccountTypeFilter = (type) => {
    // Implement account type filter logic
    console.log('Account type filter:', type);
  };

  const handleDownload = (format) => {
    // Implement download logic
    console.log('Download format:', format);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Reporting</h1>
          <p className="text-gray-600">Monitor reports and analytics here</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Filters */}
        <ReportingFilters
          searchValue={searchValue}
          onSearchChange={handleSearch}
          onDateFilter={handleDateFilter}
          onChannelFilter={handleChannelFilter}
          onBranchFilter={handleBranchFilter}
          onAccountTypeFilter={handleAccountTypeFilter}
          onDownload={handleDownload}
        />

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <AccountsSummaryCard
            title="All Accounts"
            totalLabel="Total Number Of Accounts"
            totalAccounts={accountsData.totalAccounts}
            statusData={accountsData.statusData}
          />
          <AccountsSummaryCard
            title="All Accounts"
            totalLabel="Total Number Of Accounts"
            totalAccounts={approvalData.totalAccounts}
            statusData={approvalData.statusData}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
  <div className="lg:col-span-3">
    <BranchesOverview
      totalAmount="73,276,931.28"
      percentageChange="11.2%"
      branchData={branchData}
    />
  </div>
  <div className="lg:col-span-2">
    <BankingChannelsChart
      approvedAccounts={bankingChannelsData.approvedAccounts}
      flaggedAccounts={bankingChannelsData.flaggedAccounts}
    />
  </div>
</div>

      </div>
    </div>
  );
};

export default ReportingPage;