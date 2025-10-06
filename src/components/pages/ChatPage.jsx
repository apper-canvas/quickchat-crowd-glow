import { useNavigate } from "react-router-dom";
import ChatWindow from "@/components/organisms/ChatWindow";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const ChatPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-full">
      {/* Mobile Back Button */}
      <div className="lg:hidden absolute top-4 left-4 z-10">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate("/conversations")}
          className="bg-white shadow-sm"
        >
          <ApperIcon name="ArrowLeft" size={20} />
        </Button>
      </div>
      
      <ChatWindow />
    </div>
  );
};

export default ChatPage;