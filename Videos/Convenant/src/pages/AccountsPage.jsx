import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, RefreshCw, Download } from 'lucide-react';
import { accountsData, channelOptions, statusOptions, branchOptions } from '@/data/accountsData';
import { DataTable } from "@/components/ui/datatable";

export function AccountsPage({ accountsFilter }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [channelFilter, setChannelFilter] = useState('All Channels');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [branchFilter, setBranchFilter] = useState('All Branches');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const filteredAccounts = useMemo(() => {
    return accountsData.filter(account => {
      const matchesSearch = searchQuery === '' || 
        account.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        account.accountNumber.includes(searchQuery) ||
        account.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesChannel = channelFilter === 'All Channels' || account.channel === channelFilter;
      const matchesBranch = branchFilter === 'All Branches' || account.branch === branchFilter;
      const matchesSidebarFilter =
        !accountsFilter || account.status.toLowerCase() === accountsFilter.toLowerCase();
      return matchesSearch && matchesChannel && matchesBranch && matchesSidebarFilter;
    });
  }, [searchQuery, channelFilter, branchFilter, statusFilter]);
  const columns = [
    { key: "date", label: "Date" },
    { key: "fullName", label: "Full Name", className: "text-gray-900 font-semibold" },
    { key: "phone", label: "Phone Number" },
    { key: "email", label: "Email" },
    { key: "bvn", label: "BVN", className: "font-mono" },
    { key: "accountNumber", label: "Account Number", className: "font-mono" },
    { key: "accountType", label: "Account Type" },
    {
      key: "tier",
      label: "Tier",
      render: (row) => (
        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold bg-[#FBF7E7] text-[#F9956B] whitespace-nowrap">
          {row.tier}
        </span>
      ),
    },
    { key: "channel", label: "Channel" },
    { key: "branch", label: "Branch" },
  ];

  // Calculate pagination
  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAccounts = filteredAccounts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, channelFilter, statusFilter, branchFilter]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Accounts</h1>
        <p className="text-gray-600">Here's a list of all accounts</p>
      </div>

      {/* Search and Filters */}
      {/* <Card className="border-0 bg-transparent shadow-none"> */}
        {/* <CardContent className="p-4 lg:p-6"> */}
        <div className="flex items-center justify-between gap-4">
  {/* Left side: Search + Filters */}
  <div className="flex items-center gap-3 flex-1">
    {/* Search */}
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        placeholder="Search with account number or name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 pr-3 py-2 h-10 rounded border border-gray-300 text-sm bg-white placeholder:text-gray-400 outline-none w-[200px]"
      />
    </div>

    {/* Filters */}
    <Select value={channelFilter} onValueChange={setChannelFilter}>
      <SelectTrigger className="w-34 h-[41px] rounded border border-[#DCDEE6] px-6 py-4">
        <SelectValue placeholder="All Channels" />
      </SelectTrigger>
      <SelectContent>
        {channelOptions.map((option) => (
          <SelectItem key={option} value={option}>{option}</SelectItem>
        ))}
      </SelectContent>
    </Select>

    <Select value={statusFilter} onValueChange={setStatusFilter}>
      <SelectTrigger className="w-32 h-[41px] rounded border border-[#DCDEE6] px-6 py-4">
        <SelectValue placeholder="All Status" />
      </SelectTrigger>
      <SelectContent>
        {statusOptions.map((option) => (
          <SelectItem key={option} value={option}>{option}</SelectItem>
        ))}
      </SelectContent>
    </Select>

    <Select value={branchFilter} onValueChange={setBranchFilter}>
      <SelectTrigger className="w-36 h-[41px] rounded border border-[#DCDEE6] px-6 py-4">
        <SelectValue placeholder="All Branches" />
      </SelectTrigger>
      <SelectContent>
        {branchOptions.map((option) => (
          <SelectItem key={option} value={option}>{option}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>

  {/* Right side: Buttons */}
  <div className="flex items-center gap-3 flex-shrink-0">
    <Button 
      variant="outline" 
      size="sm" 
      className="w-[130px] h-[41px] rounded border border-[#DCDEE6] flex items-center justify-center gap-2"
    >
      <RefreshCw className="h-4 w-4" />
      <span>Refresh</span>
    </Button>

    <Button 
      variant="outline" 
      size="sm" 
      className="w-[130px] h-[41px] rounded border border-[#DCDEE6] flex items-center justify-center gap-2"
    >
      <Download className="h-4 w-4" />
      <span>Download</span>
    </Button>
  </div>
</div>

        {/* </CardContent> */}
      {/* </Card> */}

      {/* Accounts Table */}
      <DataTable
        data={currentAccounts}
        columns={columns}
        withCheckbox={true}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        getRowLink={(account) => `/account-details/${account.id}`}
      />
    </div>
  );
}
