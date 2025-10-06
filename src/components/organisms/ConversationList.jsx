import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ConversationCard from "@/components/molecules/ConversationCard";
import SearchBar from "@/components/molecules/SearchBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import conversationService from "@/services/api/conversationService";

const ConversationList = () => {
  const navigate = useNavigate();
  const { conversationId } = useParams();
  const [conversations, setConversations] = useState([]);
  const [filteredConversations, setFilteredConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadConversations = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await conversationService.getAll();
      setConversations(data);
      setFilteredConversations(data);
    } catch (err) {
      setError("Failed to load conversations. Please try again.");
      console.error("Error loading conversations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConversations();
  }, []);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setFilteredConversations(conversations);
      return;
    }

    try {
      const results = await conversationService.search(query);
      setFilteredConversations(results);
    } catch (err) {
      console.error("Error searching conversations:", err);
    }
  };

  const handleConversationClick = (id) => {
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
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Messages</h1>
        <SearchBar onSearch={handleSearch} />
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
    </div>
  );
};

export default ConversationList;