import { Message } from './message';

export interface ConversationManager {
  addMessage(message: Message): void;
  getHistory(): Message[];
  clear(): void;
}
