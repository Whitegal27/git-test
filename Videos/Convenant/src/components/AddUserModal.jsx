import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { XIcon } from "lucide-react";
import UserService from "../services/userService";
import BranchService from "../services/branchService";
import RoleService from "../services/rolesService";
import { useToast } from "../components/ui/use-toast"; // ✅ import useToast

const AddUserModal = ({ isOpen, onClose, onUserCreated }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phoneNumber: "",
    role: "",
    branch: "",
  });

  const [roles, setRoles] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast(); // ✅ initialize toast

  // Fetch roles & branches when modal opens
  useEffect(() => {
    if (isOpen) {
      const fetchData = async () => {
        try {
          const [rolesRes, branchesRes] = await Promise.all([
            RoleService.getRoles(),
            BranchService.getBranch(),
          ]);
          setRoles(rolesRes);
          setBranches(branchesRes);
        } catch (err) {
          console.error("Failed to fetch roles/branches:", err);
          toast({
            title: "Fetch Error",
            description:
              err.response?.data?.message || "Failed to load roles or branches",
            variant: "destructive",
          });
        }
      };
      fetchData();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        fullName: formData.fullName,
        username: formData.username || formData.email.split("@")[0], // fallback
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        roles: [formData.role], // must be array of IDs
        branches: [formData.branch], // must be array of IDs
      };

      const res = await UserService.createUser(payload);
      console.log("User created:", res);

      if (res.success) {
        toast({
          title: "User Created",
          description: res.message || `${formData.fullName} was successfully created.`,
          variant: "default",
        });

        onUserCreated(res.data);
        onClose();
        setFormData({
          fullName: "",
          username: "",
          email: "",
          phoneNumber: "",
          role: "",
          branch: "",
        });
      } else {
        toast({
          title: "Creation Failed",
          description: res.message || "Failed to create user.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Failed to create user:", err);
      toast({
        title: "Error",
        description:
          err.response?.data?.message || err.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onClose();
    setFormData({
      fullName: "",
      username: "",
      email: "",
      phoneNumber: "",
      role: "",
      branch: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "#000000CC" }}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Create User</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Provide required information to create a user
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <Input
              type="text"
              value={formData.fullName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, fullName: e.target.value }))
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <Input
              type="text"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  phoneNumber: e.target.value,
                }))
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assign Role *
            </label>
            <Select
              value={formData.role}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, role: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Branch *
            </label>
            <Select
              value={formData.branch}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, branch: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Branch" />
              </SelectTrigger>
              <SelectContent>
                {(Array.isArray(branches) ? branches : []).map((branch) => (
                  <SelectItem key={branch.id} value={branch.id}>
                    {branch.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#007046] hover:bg-[#005a37] text-white"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create User"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
