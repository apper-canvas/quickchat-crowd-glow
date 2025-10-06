import { cn } from "@/utils/cn";
import Avatar from "@/components/atoms/Avatar";
import Badge from "@/components/atoms/Badge";
import { formatMessageTime } from "@/utils/timeFormat";
import { motion } from "framer-motion";

const ConversationCard = ({ conversation, isActive, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.15 }}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 p-4 cursor-pointer transition-all duration-200 rounded-card",
        isActive 
          ? "bg-primary bg-opacity-10 border-l-4 border-l-primary" 
          : "hover:bg-gray-100"
      )}
    >
      <Avatar 
        src={conversation.participantAvatar}
        alt={conversation.participantName}
        size="md"
        isOnline={conversation.isOnline}
      />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-gray-900 truncate">
            {conversation.participantName}
          </h3>
          <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
            {formatMessageTime(conversation.lastMessageTime)}
          </span>
        </div>
        <p className="text-sm text-gray-600 truncate">
          {conversation.lastMessage}
        </p>
      </div>
      
      {conversation.unreadCount > 0 && (
        <Badge variant="primary">
          {conversation.unreadCount}
        </Badge>
      )}
    </motion.div>
  );
};

export default ConversationCard;