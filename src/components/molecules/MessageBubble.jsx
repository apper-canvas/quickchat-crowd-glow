import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import { formatChatTimestamp } from "@/utils/timeFormat";
import { motion } from "framer-motion";

const MessageBubble = ({ message, isOwn }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case "sent":
        return <ApperIcon name="Check" size={14} className="text-gray-400" />;
      case "delivered":
        return (
          <div className="flex -space-x-1">
            <ApperIcon name="Check" size={14} className="text-gray-400" />
            <ApperIcon name="Check" size={14} className="text-gray-400" />
          </div>
        );
      case "read":
        return (
          <div className="flex -space-x-1">
            <ApperIcon name="Check" size={14} className="text-primary" />
            <ApperIcon name="Check" size={14} className="text-primary" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "flex items-end gap-2 mb-4 message-enter",
        isOwn ? "justify-end" : "justify-start"
      )}
    >
      <div className={cn(
        "max-w-[70%] rounded-message px-4 py-2.5 shadow-message",
        isOwn 
          ? "bg-primary text-white" 
          : "bg-secondary text-gray-900"
      )}>
        <p className="text-sm leading-relaxed break-words">{message.content}</p>
        <div className={cn(
          "flex items-center gap-1 mt-1",
          isOwn ? "justify-end" : "justify-start"
        )}>
          <span className={cn(
            "text-xs",
            isOwn ? "text-blue-100" : "text-gray-500"
          )}>
            {formatChatTimestamp(message.timestamp)}
          </span>
          {isOwn && (
            <div className="ml-1">
              {getStatusIcon(message.status)}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;