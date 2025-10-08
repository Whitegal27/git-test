import React,{useState,useEffect} from 'react';
// import { useAuth } from '@/contexts/AuthContext';
import { Tabs } from "@/components/ui/tablist";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { BranchOverviewPage } from '../Branch/BranchOverviewPage';
import { BranchAccountsPage } from '../Branch/BranchAccountsPage';
import BranchService from "../../services/branchService";

export function BranchDetailsPage() {
  const { branchId } = useParams();
  const [branch, setBranch] = useState(null);

  useEffect(() => {
    const fetchBranch = async () => {
      try {
        if (!branchId) return;
  
        const data = await BranchService.getBranchById(branchId);
        console.log("Fetched branch data:", data);
        setBranch(data); // assuming API already returns the branch object
      } catch (err) {
        console.error("Failed to fetch branch:", err);
      }
    };
  
    fetchBranch();
  }, [branchId]);
  
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-gray-900">
          {branch ? branch.name : "Loading..."}
        </h1>
        <p className="text-gray-600">ID: {branchId || ""}</p>
      </div>

      <Tabs defaultTab={0}>
        <Tabs.Tab label="Overview">
          <BranchOverviewPage />
        </Tabs.Tab>
        <Tabs.Tab label="Accounts">
          <BranchAccountsPage />
        </Tabs.Tab>
      </Tabs>
    </div>
  );
}