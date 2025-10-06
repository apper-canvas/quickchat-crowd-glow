import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import TypingIndicator from "@/components/molecules/TypingIndicator";
import MessageBubble from "@/components/molecules/MessageBubble";
import MessageInput from "@/components/molecules/MessageInput";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Loading from "@/components/ui/Loading";
import Avatar from "@/components/atoms/Avatar";
import Button from "@/components/atoms/Button";
import messageService from "@/services/api/messageService";
import conversationService from "@/services/api/conversationService";

const ChatWindow = () => {
  const { conversationId } = useParams();
  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [conversationData, messagesData] = await Promise.all([
        conversationService.getById(conversationId),
        messageService.getByConversationId(conversationId)
      ]);

      if (!conversationData) {
        setError("Conversation not found");
        return;
      }

      setConversation(conversationData);
      setMessages(messagesData);
      
      // Mark conversation as read
      await conversationService.markAsRead(conversationId);
    } catch (err) {
      setError("Failed to load chat. Please try again.");
      console.error("Error loading chat:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (conversationId) {
      loadData();
    }
  }, [conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content) => {
    try {
      setSending(true);
      
      const newMessage = await messageService.create({
        conversationId,
        content
      });

      setMessages(prev => [...prev, newMessage]);
      
      // Update conversation's last message
      await conversationService.updateLastMessage(
        conversationId,
        content,
        newMessage.timestamp
      );

      // Simulate typing indicator
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }, 1000);

toast.success("Message sent!");
    } catch (err) {
      setError(err.message || 'Failed to send message');
      toast.error('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const handleTypingChange = (typing) => {
    // Update local typing state if needed for future enhancements
    // Currently using existing isTyping state for mock simulation
  };

  if (loading) return <Loading />;

  if (error) {
    return <Error message={error} onRetry={loadData} />;
  }

  if (!conversation) {
    return <Empty message="Conversation not found" />;
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <Avatar 
            src={conversation.participantAvatar}
            alt={conversation.participantName}
            size="md"
            isOnline={conversation.isOnline}
          />
          <div>
            <h2 className="font-semibold text-gray-900">
              {conversation.participantName}
            </h2>
            <p className="text-sm text-gray-500">
              {conversation.isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="icon" size="icon">
            <ApperIcon name="Phone" size={20} />
          </Button>
          <Button variant="icon" size="icon">
            <ApperIcon name="Video" size={20} />
          </Button>
          <Button variant="icon" size="icon">
            <ApperIcon name="Info" size={20} />
          </Button>
        </div>
      </div>

{/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {messages.length === 0 ? (
          <Empty 
            message="No messages yet"
            description="Start the conversation by sending a message"
          />
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isOwn={message.senderId === 'current-user-id'}
              />
            ))}
            {isTyping && (
              <TypingIndicator participantName={conversation.participantName} />
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Message Input */}
      <div className="px-6 py-4 border-t border-gray-200 bg-white">
        <MessageInput onSend={handleSendMessage} disabled={sending} />
      </div>
    </div>
  );
};

export default ChatWindow;