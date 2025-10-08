import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, RefreshCw, Download } from "lucide-react";
import { DataTable } from "@/components/ui/datatable";
import BranchService from "../../services/branchService";
import AuthService from "../../services/authService";

export function BranchPage() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [branchFilter, setBranchFilter] = useState("All Branches");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [currentUser, setCurrentUser] = useState(null);

  // ✅ Fetch branches + user
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const meRes = await AuthService.getUserInfo();
        setCurrentUser(meRes.data);

        const data = await BranchService.getBranch();
        setBranches(data || []); // API returns res.data.data
      } catch (err) {
        console.error("Failed to fetch branches:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBranches();
  }, []);

  // ✅ Permission extraction
  const getUserPermissions = (user) => {
    if (!user?.roles) return [];
    return user.roles.flatMap((role) =>
      role.areas.flatMap((area) =>
        area.permissions.map((p) => `${area.name}:${p.name}`)
      )
    );
  };

  const permissions = useMemo(() => getUserPermissions(currentUser), [currentUser]);

  // 🔑 Helper: check if user has a specific permission
  const hasPermission = (area, action) => {
    return permissions.includes(`${area}:${action}`);
  };

  // ✅ Filter branches
  const filteredBranch = useMemo(() => {
    return branches.filter((branch) => {
      const matchesSearch =
        searchQuery === "" ||
        branch.BranchName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        branch.BranchCode.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesBranch =
        branchFilter === "All Branches" || branch.BranchName === branchFilter;

      return matchesSearch && matchesBranch;
    });
  }, [branches, searchQuery, branchFilter]);

  // ✅ Pagination
  const totalPages = Math.ceil(filteredBranch.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBranch = filteredBranch.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, branchFilter]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // ✅ Columns (match API fields)
  const columns = [
    { key: "BranchCode", label: "Branch Code" },
    { key: "BranchName", label: "Branch Name" },
  ];

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Branches
        </h1>
        <p className="text-gray-600">Here's a list of all branches</p>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col flex-wrap xl:flex-row gap-4 xl:justify-between">
        <div className="flex flex-col flex-wrap lg:flex-row gap-4 flex-1">
          {/* Search */}
          <div className="relative flex-shrink-0 w-full lg:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by branch name or code"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-3 py-2 h-10 rounded border border-gray-300 text-sm bg-white placeholder:text-gray-400 w-full lg:w-auto lg:min-w-[300px]"
            />
          </div>

          {/* Branch Filter */}
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <Select value={branchFilter} onValueChange={setBranchFilter}>
              <SelectTrigger className="w-full sm:w-36 h-[41px] rounded border border-[#DCDEE6] px-6 py-4">
                <SelectValue placeholder="All Branches" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Branches">All Branches</SelectItem>
                {branches.map((b) => (
                  <SelectItem key={b.BranchCode} value={b.BranchName}>
                    {b.BranchName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center flex-shrink-0">
          <div className="flex flex-col sm:flex-row gap-3">
            {hasPermission("Branches", "View") && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.reload()}
                className="w-full sm:w-[147px] h-[41px] gap-2 rounded border border-[#DCDEE6]"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            )}

            {hasPermission("Branches", "Download") && (
              <Button
                variant="outline"
                size="sm"
                className="w-full sm:w-[147px] h-[41px] gap-2 rounded border border-[#DCDEE6]"
              >
                <span>Download</span>
                <Download className="h-4 w-4 mr-2" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Data Table */}
      {loading ? (
        <p>Loading branches...</p>
      ) : (
        <DataTable
          data={currentBranch}
          columns={columns}
          withCheckbox={true}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          // Branches have no unique 'id' field, so we can use BranchCode for key/link
          getRowLink={(branch) => `/branches/${branch.BranchCode}`}
        />
      )}
    </div>
  );
}