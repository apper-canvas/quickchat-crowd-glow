const TypingIndicator = ({ participantName }) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="bg-secondary rounded-message px-4 py-3 shadow-message">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot" />
          <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot" />
          <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot" />
        </div>
      </div>
      <span className="text-xs text-gray-500">{participantName} is typing...</span>
    </div>
  );
};

export default TypingIndicator;