import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import { formatChatTimestamp } from "@/utils/timeFormat";

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

const getFileIcon = (type) => {
  if (type.startsWith('image/')) return 'Image';
  if (type === 'application/pdf') return 'FileText';
  if (type.includes('word')) return 'FileText';
  if (type === 'text/plain') return 'FileText';
  if (type === 'application/zip') return 'Archive';
  return 'File';
};
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
{message.content && (
          <p className="text-sm leading-relaxed break-words">{message.content}</p>
        )}
        
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 space-y-2">
            {/* Image Attachments */}
            {message.attachments.filter(att => att.type.startsWith('image/')).length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {message.attachments
                  .filter(att => att.type.startsWith('image/'))
.map((attachment, idx) => (
                    <div key={idx} className="relative rounded-lg overflow-hidden bg-gray-100">
                      {attachment.preview ? (
                        <img
                          src={attachment.preview}
                          alt={attachment.name}
                          className="w-full h-32 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                        />
                      ) : (
                        <div className="w-full h-32 flex items-center justify-center">
                          <ApperIcon name="Image" size={32} className="text-gray-400" />
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}
            
            {/* Document Attachments */}
            {message.attachments.filter(att => !att.type.startsWith('image/')).length > 0 && (
              <div className="space-y-1">
                {message.attachments
                  .filter(att => !att.type.startsWith('image/'))
                  .map((attachment, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <div className="w-8 h-8 rounded bg-white flex items-center justify-center">
                        <ApperIcon name={getFileIcon(attachment.type)} size={16} className="text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">{attachment.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(attachment.size)}</p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
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