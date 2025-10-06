import groupsData from "@/services/mockData/groups.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class GroupService {
  constructor() {
    this.groups = [...groupsData];
    this.nextId = Math.max(...this.groups.map(g => g.Id), 0) + 1;
  }

  async getAll() {
    await delay(300);
    return [...this.groups].sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  async getById(id) {
    await delay(200);
    const group = this.groups.find(g => g.Id === parseInt(id));
    return group ? { ...group } : null;
  }

  async create(data) {
    await delay(400);
    
    if (!data.name || !data.name.trim()) {
      throw new Error("Group name is required");
    }

    const newGroup = {
      Id: this.nextId++,
      name: data.name.trim(),
      createdAt: new Date().toISOString(),
      conversationIds: data.conversationIds || []
    };

    this.groups.push(newGroup);
    return { ...newGroup };
  }

  async update(id, data) {
    await delay(300);
    
    const groupIndex = this.groups.findIndex(g => g.Id === parseInt(id));
    if (groupIndex === -1) {
      throw new Error("Group not found");
    }

    if (data.name !== undefined) {
      if (!data.name.trim()) {
        throw new Error("Group name cannot be empty");
      }
      this.groups[groupIndex].name = data.name.trim();
    }

    if (data.conversationIds !== undefined) {
      this.groups[groupIndex].conversationIds = [...data.conversationIds];
    }

    return { ...this.groups[groupIndex] };
  }

  async delete(id) {
    await delay(300);
    
    const groupIndex = this.groups.findIndex(g => g.Id === parseInt(id));
    if (groupIndex === -1) {
      throw new Error("Group not found");
    }

    this.groups.splice(groupIndex, 1);
    return true;
  }

  async addConversation(groupId, conversationId) {
    await delay(200);
    
    const group = this.groups.find(g => g.Id === parseInt(groupId));
    if (!group) {
      throw new Error("Group not found");
    }

    if (!group.conversationIds.includes(conversationId)) {
      group.conversationIds.push(conversationId);
    }

    return { ...group };
  }

  async removeConversation(groupId, conversationId) {
    await delay(200);
    
    const group = this.groups.find(g => g.Id === parseInt(groupId));
    if (!group) {
      throw new Error("Group not found");
    }

    group.conversationIds = group.conversationIds.filter(id => id !== conversationId);
    return { ...group };
  }
}

export default new GroupService();