import React from "react";
import { Button } from "./ui/button";
import { XIcon } from "lucide-react";
import UserService from "../services/userService";

const ActivateUserModal = ({ isOpen, onClose, user, onUserActivated }) => {
  const handleActivate = async () => {
    try {
      const res = await UserService.activateUser(user.id);
      console.log("Activate response:", res);

      if (res.success) {
        // ✅ update parent state immediately
        onUserActivated(user.id);
        onClose();
      } else {
        alert(res.message || "Failed to activate user.");
      }
    } catch (err) {
      console.error("Failed to activate user:", err);
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "#000000CC" }}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Activate User</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Are you sure you want to activate this user?
        </p>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleActivate}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
          >
            Activate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActivateUserModal;