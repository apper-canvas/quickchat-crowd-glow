import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const MessageInput = ({ onSend, disabled = false, onTypingChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);

  // Detect typing activity with debouncing
  useEffect(() => {
    if (inputValue.trim() && !isTyping) {
      setIsTyping(true);
      onTypingChange?.(true);
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout to stop typing indicator after 500ms of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      if (isTyping) {
        setIsTyping(false);
        onTypingChange?.(false);
      }
    }, 500);

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [inputValue, isTyping, onTypingChange]);
const handleSubmit = (e) => {
    e.preventDefault();
const trimmedValue = inputValue.trim();
    if (trimmedValue) {
      onSend(trimmedValue);
      setInputValue('');
      // Stop typing indicator when message is sent
      setIsTyping(false);
      onTypingChange?.(false);
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
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
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
          {inputValue.length}/1000
        </div>
      </div>
      
<motion.div whileHover={{ scale: inputValue.trim() ? 1.05 : 1 }} whileTap={{ scale: 0.95 }}>
        <Button
          type="submit"
          variant="primary"
          size="icon"
          disabled={!inputValue.trim() || disabled}
          className="w-12 h-12 rounded-full"
        >
          <ApperIcon name="Send" size={20} />
        </Button>
      </motion.div>
    </form>
  );
};

export default MessageInput;