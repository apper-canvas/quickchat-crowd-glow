import conversationsData from "@/services/mockData/conversations.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ConversationService {
  constructor() {
    this.conversations = [...conversationsData];
  }

  async getAll() {
    await delay(300);
    return [...this.conversations].sort((a, b) => 
      new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
    );
  }

  async getById(id) {
    await delay(200);
    const conversation = this.conversations.find(c => c.Id === parseInt(id));
    return conversation ? { ...conversation } : null;
  }

  async search(query) {
    await delay(300);
    const lowercaseQuery = query.toLowerCase();
    return this.conversations
      .filter(c => 
        c.participantName.toLowerCase().includes(lowercaseQuery) ||
        c.lastMessage.toLowerCase().includes(lowercaseQuery)
      )
      .map(c => ({ ...c }));
  }

  async updateLastMessage(id, message, timestamp) {
    await delay(200);
    const conversation = this.conversations.find(c => c.Id === parseInt(id));
    if (conversation) {
      conversation.lastMessage = message;
      conversation.lastMessageTime = timestamp;
      return { ...conversation };
    }
    return null;
  }

  async markAsRead(id) {
    await delay(100);
    const conversation = this.conversations.find(c => c.Id === parseInt(id));
    if (conversation) {
      conversation.unreadCount = 0;
      return { ...conversation };
    }
    return null;
  }
}

export default new ConversationService();