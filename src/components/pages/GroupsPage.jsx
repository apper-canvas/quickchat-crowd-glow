import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import Group from "@/components/atoms/Group";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import CreateGroupModal from "@/components/molecules/CreateGroupModal";
import ApperIcon from "@/components/ApperIcon";
import groupService from "@/services/api/groupService";

const GroupsPage = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadGroups = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await groupService.getAll();
      setGroups(data);
    } catch (err) {
      setError("Failed to load groups. Please try again.");
      console.error("Error loading groups:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGroups();
  }, []);

  const handleCreateGroup = async (name) => {
    await groupService.create({ name });
    await loadGroups();
  };

  const handleDeleteGroup = async (id) => {
    if (!confirm("Are you sure you want to delete this group?")) {
      return;
    }

    try {
      await groupService.delete(id);
      setGroups(prev => prev.filter(g => g.Id !== id));
      toast.success("Group deleted successfully!");
    } catch (err) {
      toast.error(err.message || "Failed to delete group");
    }
  };

  if (loading) return <Loading />;

  if (error) {
    return <Error message={error} onRetry={loadGroups} />;
  }

  return (
    <div className="h-full bg-white flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/conversations")}
          >
            <ApperIcon name="ArrowLeft" size={20} />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Groups</h1>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          <ApperIcon name="Plus" size={18} />
          Create Group
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        {groups.length === 0 ? (
          <Empty 
            message="No groups yet" 
            description="Create your first group to organize conversations"
          />
        ) : (
          <div className="grid gap-3">
            {groups.map((group) => (
              <div
                key={group.Id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-card hover:bg-gray-100 transition-colors"
              >
                <Group 
                  name={group.name} 
                  count={group.conversationIds.length}
                  variant="primary"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteGroup(group.Id)}
                  className="text-error hover:bg-error/10"
                >
                  <ApperIcon name="Trash2" size={18} />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <CreateGroupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onGroupCreated={handleCreateGroup}
      />
    </div>
  );
};

export default GroupsPage;