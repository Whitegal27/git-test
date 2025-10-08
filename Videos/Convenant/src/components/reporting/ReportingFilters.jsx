import React from 'react';
import { Search, Filter, Calendar, Download, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const ReportingFilters = ({ 
  searchValue, 
  onSearchChange, 
  onDateFilter, 
  onChannelFilter, 
  onBranchFilter, 
  onAccountTypeFilter,
  onDownload 
}) => {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      {/* Search */}
      <div className="relative flex-1 min-w-32">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search with account number or name"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Date Filter */}
      <Button 
        variant="outline" 
        onClick={onDateFilter}
        className="flex items-center gap-2"
      >
        <Filter className="w-4 h-4" />
        Date Filter
        <Calendar className="w-4 h-4" />
      </Button>

      {/* All Channels Filter */}
      <Select onValueChange={onChannelFilter}>
        <SelectTrigger className="w-30">
          <SelectValue placeholder="All Channels" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Channels</SelectItem>
          <SelectItem value="internet">Internet</SelectItem>
          <SelectItem value="mobile">Mobile</SelectItem>
          <SelectItem value="branch">Branch</SelectItem>
        </SelectContent>
      </Select>

      {/* All Branches Filter */}
      <Select onValueChange={onBranchFilter}>
        <SelectTrigger className="w-30">
          <SelectValue placeholder="All Branches" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Branches</SelectItem>
          <SelectItem value="main">Main Branch</SelectItem>
          <SelectItem value="victoria-island">Victoria Island</SelectItem>
          <SelectItem value="ikeja">Ikeja</SelectItem>
        </SelectContent>
      </Select>

      {/* Account Type Filter */}
      <Select onValueChange={onAccountTypeFilter}>
        <SelectTrigger className="w-30">
          <SelectValue placeholder="Account Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="savings">Savings</SelectItem>
          <SelectItem value="current">Current</SelectItem>
          <SelectItem value="fixed">Fixed Deposit</SelectItem>
        </SelectContent>
      </Select>

      {/* Download Button */}
      <Select onValueChange={onDownload}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Download" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pdf">PDF</SelectItem>
          <SelectItem value="excel">Excel</SelectItem>
          <SelectItem value="csv">CSV</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ReportingFilters;