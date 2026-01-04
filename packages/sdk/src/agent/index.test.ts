import { describe, it, expect, vi } from 'vitest';
import { Agent } from './index';
import { LanguageModel } from 'ai';
import { Message } from '../types/message';
import { ConversationManager } from '../types/conversation';

describe('Agent Interface', () => {
  it('should allow defining an agent with conversation and conversationManager', () => {
    const mockModel = {} as LanguageModel;
    const mockMessages: Message[] = [new Message('user', 'Hello')];
    const mockConversationManager: ConversationManager = {
      addMessage: vi.fn(),
      getHistory: vi.fn().mockReturnValue(mockMessages),
      clear: vi.fn(),
      apply: vi.fn((msgs) => msgs),
    };

    const myAgent: Agent = {
      id: 'agent-123',
      name: 'Test Agent',
      model: mockModel,
      systemPrompt: 'You are a helpful assistant',
      conversation: mockMessages,
      conversationManager: mockConversationManager,
      generate: vi.fn(),
    };

    expect(myAgent.id).toBe('agent-123');
    expect(myAgent.conversation).toEqual(mockMessages);
    expect(myAgent.conversationManager).toBe(mockConversationManager);
    
    if (myAgent.conversationManager) {
        expect(myAgent.conversationManager.getHistory()).toEqual(mockMessages);
    }
  });

  it('should allow defining an agent without conversation properties', () => {
    const mockModel = {} as LanguageModel;
    const myAgent: Agent = {
      id: 'agent-456',
      name: 'Minimal Agent',
      model: mockModel,
      systemPrompt: 'Minimal',
      generate: vi.fn(),
    };

    expect(myAgent.conversation).toBeUndefined();
    expect(myAgent.conversationManager).toBeUndefined();
  });
});
