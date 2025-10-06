import { Outlet, useParams } from "react-router-dom";
import ConversationList from "@/components/organisms/ConversationList";

const Layout = () => {
  const { conversationId } = useParams();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Layout */}
      <div className="hidden lg:flex w-full h-full">
        {/* Conversations Sidebar */}
        <div className="w-[380px] border-r border-gray-200 flex-shrink-0">
          <ConversationList />
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden w-full h-full">
        {conversationId ? (
          <Outlet />
        ) : (
          <ConversationList />
        )}
      </div>
    </div>
  );
};

export default Layout;