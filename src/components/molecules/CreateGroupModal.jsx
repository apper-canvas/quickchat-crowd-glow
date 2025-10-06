import { useState } from "react";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";

const CreateGroupModal = ({ isOpen, onClose, onGroupCreated }) => {
  const [groupName, setGroupName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!groupName.trim()) {
      toast.error("Group name is required");
      return;
    }

    try {
      setIsSubmitting(true);
      await onGroupCreated(groupName.trim());
      setGroupName("");
      onClose();
      toast.success("Group created successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to create group");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setGroupName("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-card shadow-xl max-w-md w-full p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Create New Group</h2>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <ApperIcon name="X" size={20} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="groupName" className="block text-sm font-medium text-gray-700 mb-2">
              Group Name
            </label>
            <Input
              id="groupName"
              type="text"
              placeholder="Enter group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              disabled={isSubmitting}
              autoFocus
              className="w-full"
            />
          </div>

          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting || !groupName.trim()}
              className="flex-1"
            >
              {isSubmitting ? "Creating..." : "Create Group"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;