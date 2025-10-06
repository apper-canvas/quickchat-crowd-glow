import { useNavigate } from "react-router-dom";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";

const ConversationsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="hidden lg:flex items-center justify-center h-full bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="text-center max-w-md px-6">
        <div className="mb-6 inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary to-purple-500 shadow-lg">
          <ApperIcon name="MessageCircle" size={48} className="text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Select a Conversation
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Choose a conversation from the list to start chatting with your contacts
        </p>
        <div className="flex items-center justify-center gap-3 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>Real-time messaging</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <ApperIcon name="Check" size={14} className="text-primary" />
            <span>Read receipts</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationsPage;