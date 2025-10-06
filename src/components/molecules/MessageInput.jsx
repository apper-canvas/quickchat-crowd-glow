import { useState } from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

const MessageInput = ({ onSend, disabled }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2">
      <div className="flex-1 relative">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          disabled={disabled}
          rows={1}
          className={cn(
            "w-full px-4 py-3 pr-12 bg-background text-gray-900 placeholder-gray-500 rounded-3xl border-2 border-transparent focus:border-primary focus:bg-white focus:outline-none transition-all duration-200 resize-none",
            "max-h-32 overflow-y-auto"
          )}
          style={{ minHeight: "48px" }}
        />
        <div className="absolute right-3 bottom-3 flex items-center gap-1 text-xs text-gray-400">
          {message.length}/1000
        </div>
      </div>
      
      <motion.div whileHover={{ scale: message.trim() ? 1.05 : 1 }} whileTap={{ scale: 0.95 }}>
        <Button
          type="submit"
          variant="primary"
          size="icon"
          disabled={!message.trim() || disabled}
          className="w-12 h-12 rounded-full"
        >
          <ApperIcon name="Send" size={20} />
        </Button>
      </motion.div>
    </form>
  );
};

export default MessageInput;