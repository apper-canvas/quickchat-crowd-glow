import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const MessageInput = ({ onSend, disabled = false, onTypingChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const typingTimeoutRef = useRef(null);
  const fileInputRef = useRef(null);
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
const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    processFiles(files);
  };

  const processFiles = (files) => {
    const validFiles = files.filter(file => {
      const isValidType = [
        'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
        'application/pdf', 'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain', 'application/zip'
      ].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      return isValidType && isValidSize;
    });

    if (validFiles.length + attachments.length > 10) {
      return;
    }

    const newAttachments = validFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      preview: null,
      name: file.name,
      size: file.size,
      type: file.type
    }));

    // Generate previews for images
    newAttachments.forEach(attachment => {
      if (attachment.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setAttachments(prev => prev.map(att => 
            att.id === attachment.id 
              ? { ...att, preview: e.target.result }
              : att
          ));
        };
        reader.readAsDataURL(attachment.file);
      }
    });

    setAttachments(prev => [...prev, ...newAttachments]);
  };

  const removeAttachment = (id) => {
    setAttachments(prev => prev.filter(att => att.id !== id));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataFiles || []);
    processFiles(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();
    if (trimmedValue || attachments.length > 0) {
      onSend(trimmedValue, attachments);
      setInputValue('');
      setAttachments([]);
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
<form onSubmit={handleSubmit} className="flex flex-col gap-3">
    {attachments.length > 0 && <div className="flex flex-wrap gap-2 p-2 bg-gray-50 rounded-xl">
        {attachments.map(attachment => <motion.div
            key={attachment.id}
            initial={{
                opacity: 0,
                scale: 0.9
            }}
            animate={{
                opacity: 1,
                scale: 1
            }}
            className="relative group">
            <div
                className="w-20 h-20 rounded-lg overflow-hidden bg-white border border-gray-200 flex items-center justify-center">
                {attachment.type.startsWith("image/") ? attachment.preview ? <img
                    src={attachment.preview}
                    alt={attachment.name}
                    className="w-full h-full object-cover" /> : <ApperIcon name="Image" size={24} className="text-gray-400" /> : <ApperIcon name="File" size={24} className="text-gray-400" />}
            </div>
            <button
                type="button"
                onClick={() => removeAttachment(attachment.id)}
                className="absolute -top-1 -right-1 w-5 h-5 bg-error text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ApperIcon name="X" size={12} />
            </button>
            <div
                className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
                {attachment.name}
            </div>
        </motion.div>)}
    </div>}
    <div className="flex items-end gap-2">
        <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,application/zip"
            onChange={handleFileSelect}
            className="hidden" />
        <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled}
            variant="ghost"
            size="icon"
            className="shrink-0">
            <ApperIcon name="Paperclip" size={20} />
        </Button>
        <div
            className="flex-1 relative"
            onDragOver={handleDragOver}
            onDrop={handleDrop}>
            <textarea
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                disabled={disabled}
                rows={1}
                className={cn(
                    "w-full px-4 py-3 pr-12 bg-background text-gray-900 placeholder-gray-500 rounded-3xl border-2 border-transparent focus:border-primary focus:bg-white focus:outline-none transition-all duration-200 resize-none",
                    "max-h-32 overflow-y-auto"
                )}
                style={{
                    minHeight: "48px"
                }} />
            <div
                className="absolute right-3 bottom-3 flex items-center gap-1 text-xs text-gray-400">
                {inputValue.length}/1000
                          </div>
        </div>
        <motion.div
            whileHover={{
                scale: inputValue.trim() ? 1.05 : 1
            }}
            whileTap={{
                scale: 0.95
            }}>
            <Button
                type="submit"
                variant="primary"
                size="icon"
                disabled={!inputValue.trim() || disabled}
                className="w-12 h-12 rounded-full">
                <ApperIcon name="Send" size={20} />
            </Button>
        </motion.div>
    </div></form>
  );
};

export default MessageInput;