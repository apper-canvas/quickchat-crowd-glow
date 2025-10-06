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

  async filterByGroup(groupId) {
    await delay(300);
    const groupService = (await import('./groupService.js')).default;
    const group = await groupService.getById(groupId);
    
    if (!group) {
      return [];
    }

    return this.conversations
      .filter(c => group.conversationIds.includes(c.Id))
      .map(c => ({ ...c }))
      .sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));
  }

  async addToGroup(conversationId, groupId) {
    await delay(200);
    const groupService = (await import('./groupService.js')).default;
    await groupService.addConversation(groupId, conversationId);
    return true;
  }

  async removeFromGroup(conversationId, groupId) {
    await delay(200);
    const groupService = (await import('./groupService.js')).default;
    await groupService.removeConversation(groupId, conversationId);
    return true;
  }
}

export default new ConversationService();