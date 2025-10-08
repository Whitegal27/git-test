import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, RefreshCw, Download } from 'lucide-react';
import { accountsData, channelOptions } from '@/data/accountsData';
import { DataTable } from "@/components/ui/datatable";
import { StatusTabs } from '@/components/ui/statusTabs';

export function BranchAccountsPage({ accountsFilter }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [channelFilter, setChannelFilter] = useState('All Channels');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const filteredAccounts = useMemo(() => {
    return accountsData.filter(account => {
      const matchesSearch = searchQuery === '' || 
        account.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        account.accountNumber.includes(searchQuery) ||
        account.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesChannel = channelFilter === 'All Channels' || account.channel === channelFilter;
      const matchesSidebarFilter =
        !accountsFilter || account.status.toLowerCase() === accountsFilter.toLowerCase();
      return matchesSearch && matchesChannel && matchesSidebarFilter;
    });
  }, [searchQuery, channelFilter]);
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
  }, [searchQuery, channelFilter]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden">
      {/* Search and Filters */}
      {/* <Card className="border-0 bg-transparent shadow-none"> */}
        {/* <CardContent className="p-4 lg:p-6"> */}
          <div className="flex flex-col flex-wrap xl:flex-row gap-4 xl:justify-between">
            <div className='flex flex-col flex-wrap lg:flex-row gap-4 flex-1'>
              {/* Search - Original layout */}
              <div className="relative flex-shrink-0 w-full lg:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search with account number or name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-3 py-2
                              h-10
                              rounded
                              border
                              border-gray-300
                              transition
                              text-sm
                              bg-white
                              placeholder:text-gray-400
                              outline-none
                              w-full lg:w-auto lg:min-w-[300px]"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 flex-1">
                <Select value={channelFilter} onValueChange={setChannelFilter}>
                  <SelectTrigger className="w-full sm:w-40 min-w-[147px] h-[41px] opacity-100 rounded border border-[#DCDEE6] px-6 py-4">
                    <SelectValue placeholder="All Channels" />
                  </SelectTrigger>
                  <SelectContent>
                    {channelOptions.map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

              </div>
            </div>  

            {/* Filters - Stack on mobile, inline on larger screens */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center flex-shrink-0">     
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 sm:flex-none w-full sm:w-[147px] h-[41px] opacity-100 gap-2 rounded border border-[#DCDEE6] px-6 py-4"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  <span className="">Refresh</span>
                </Button>

                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 sm:flex-none w-full sm:w-[147px] h-[41px] opacity-100 gap-2 rounded border border-[#DCDEE6] px-6 py-4"
                >
                  <span className="">Download</span>
                  <Download className="h-4 w-4 mr-2" />
                </Button>
              </div>
            </div>
          </div>
        {/* </CardContent> */}
      {/* </Card> */}
      <StatusTabs
      tabs={[
        { label: "Pending", value: "pending", count: 8 },
        { label: "Approved", value: "approved", count: 90 },
      ]}
      defaultTab={0}
      onChange={(status) => {
        console.log("Selected status:", status);
        // 🔑 filter your currentAccounts here by status if needed
      }}
    />
      {/* Accounts Table */}
      <DataTable
        data={currentAccounts}
        columns={columns}
        withCheckbox={true}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
