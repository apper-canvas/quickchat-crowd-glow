import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CreateGroupModal from "@/components/molecules/CreateGroupModal";
import groupService from "@/services/api/groupService";
import ApperIcon from "@/components/ApperIcon";
import ConversationCard from "@/components/molecules/ConversationCard";
import SearchBar from "@/components/molecules/SearchBar";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Loading from "@/components/ui/Loading";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";
import conversationService from "@/services/api/conversationService";

function ConversationList() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const { conversationId } = useParams();
  const [conversations, setConversations] = useState([]);
  const [filteredConversations, setFilteredConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
useEffect(() => {
    loadConversations();
    loadGroups();
  }, []);

  async function loadGroups() {
    try {
      const groupsData = await groupService.getAll();
      setGroups(groupsData);
    } catch (err) {
      console.error("Error loading groups:", err);
    }
  }

async function loadConversations() {
    try {
      setLoading(true);
      setError('');
      
      let data = await conversationService.getAll();
      
      if (selectedGroupId !== null) {
        data = await conversationService.filterByGroup(selectedGroupId);
      }
      
      setConversations(data);
      setFilteredConversations(data);
    } catch (err) {
      setError('Failed to load conversations. Please try again.');
      console.error('Error loading conversations:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadConversations();
  }, [selectedGroupId]);

  const handleCreateGroup = async (name) => {
    await groupService.create({ name });
    await loadGroups();
  };

  const handleSearch = async (query) => {
    try {
      setError('');
      
      if (!query || query.trim() === '') {
        setFilteredConversations(conversations);
        return;
      }
      
      const results = await conversationService.search(query);
      setFilteredConversations(results);
    } catch (err) {
      console.error("Error searching conversations:", err);
      setError('Failed to search conversations. Please try again.');
    }
  };

const handleConversationClick = async (id) => {
    try {
      await conversationService.markAsRead(id);
      setConversations(prev => 
        prev.map(conv => 
          conv.Id === id ? { ...conv, unreadCount: 0 } : conv
        )
      );
      setFilteredConversations(prev => 
        prev.map(conv => 
          conv.Id === id ? { ...conv, unreadCount: 0 } : conv
        )
      );
    } catch (err) {
      console.error("Error marking conversation as read:", err);
    }
    navigate(`/conversations/${id}`);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadConversations} />;
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 border-b border-gray-200">
<div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <Button 
            variant="primary" 
            size="sm"
            onClick={() => setIsGroupModalOpen(true)}
          >
            <ApperIcon name="Plus" size={16} />
            Create Group
          </Button>
        </div>
        <SearchBar onSearch={handleSearch} />

        {/* Group Filter */}
        {groups.length > 0 && (
          <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedGroupId(null)}
              className={cn(
                "px-3 py-1.5 rounded-pill text-sm font-medium transition-colors whitespace-nowrap",
                selectedGroupId === null
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              All
            </button>
            {groups.map((group) => (
              <button
                key={group.Id}
                onClick={() => setSelectedGroupId(group.Id)}
                className={cn(
                  "px-3 py-1.5 rounded-pill text-sm font-medium transition-colors whitespace-nowrap",
                  selectedGroupId === group.Id
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                {group.name} ({group.conversationIds.length})
              </button>
            ))}
</div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <Empty 
            message="No conversations found"
            description="Start a new conversation to see it here"
          />
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredConversations.map((conversation) => (
              <ConversationCard
                key={conversation.Id}
                conversation={conversation}
                isActive={conversationId === String(conversation.Id)}
                onClick={() => handleConversationClick(conversation.Id)}
              />
            ))}
          </div>
        )}
</div>

      <CreateGroupModal
        isOpen={isGroupModalOpen}
        onClose={() => setIsGroupModalOpen(false)}
        onCreateGroup={handleCreateGroup}
      />
    </div>
  );
}
export default ConversationList;