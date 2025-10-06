import messagesData from "@/services/mockData/messages.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class MessageService {
  constructor() {
    this.messages = [...messagesData];
  }

  async getByConversationId(conversationId) {
    await delay(300);
    return this.messages
      .filter(m => m.conversationId === parseInt(conversationId))
      .map(m => ({ ...m }))
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }

  async create(message) {
    await delay(200);
    const maxId = Math.max(...this.messages.map(m => m.Id), 0);
    const newMessage = {
      Id: maxId + 1,
conversationId: parseInt(message.conversationId),
      senderId: "me",
      content: message.content,
      timestamp: new Date().toISOString(),
      status: "sent",
      type: "text",
      attachments: message.attachments || []
    };
    this.messages.push(newMessage);
    
    // Simulate status updates
    setTimeout(() => {
      newMessage.status = "delivered";
    }, 1000);
    
    setTimeout(() => {
      newMessage.status = "read";
    }, 3000);
    
    return { ...newMessage };
  }

  async updateStatus(id, status) {
    await delay(100);
    const message = this.messages.find(m => m.Id === parseInt(id));
    if (message) {
      message.status = status;
      return { ...message };
    }
    return null;
  }

  async delete(id) {
    await delay(200);
    const index = this.messages.findIndex(m => m.Id === parseInt(id));
    if (index !== -1) {
      this.messages.splice(index, 1);
      return true;
    }
    return false;
  }
}

export default new MessageService();