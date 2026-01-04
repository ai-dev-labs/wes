import {
  TextPart,
  ImagePart,
  FilePart,
  ToolCallPart,
  ToolResultPart,
} from 'ai';

export type Role = 'system' | 'user' | 'assistant' | 'tool';

export interface ReasoningPart {
  type: 'reasoning';
  text: string;
}

export type ContentBlock =
  | TextPart
  | ImagePart
  | FilePart
  | ToolCallPart
  | ToolResultPart
  | ReasoningPart;

export interface Message {
  id: string;
  role: Role;
  content: string | ContentBlock[];
}

export interface Tool {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
  execute: (args: any) => Promise<any>;
}

export type EventType =
  | 'agent.generate.start'
  | 'agent.generate.stop'
  | 'agent.message.start'
  | 'agent.message.delta'
  | 'agent.message.stop'
  | 'agent.tool.call.start'
  | 'agent.tool.call.delta'
  | 'agent.tool.call.stop'
  | 'agent.tool.result';

export interface Event {
  type: EventType;
  payload: unknown;
  timestamp: number;
}

export interface ConversationManager {
  addMessage(message: Message): void;
  getHistory(): Message[];
  clear(): void;
}

export { TextPart, ImagePart, FilePart, ToolCallPart, ToolResultPart };
