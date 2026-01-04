export type Role = 'system' | 'user' | 'assistant' | 'tool';

export type DataContent = string | Uint8Array | ArrayBuffer | Buffer;

export interface TextPart {
  type: 'text';
  text: string;
}

export interface ImagePart {
  type: 'image';
  image: DataContent | URL;
  mediaType?: string;
}

export interface FilePart {
  type: 'file';
  data: DataContent | URL;
  mediaType: string;
}

export interface ToolCallPart {
  type: 'tool-call';
  toolCallId: string;
  toolName: string;
  args: unknown;
}

export interface ToolResultPart {
  type: 'tool-result';
  toolCallId: string;
  toolName: string;
  output: unknown;
  isError?: boolean;
}

export type ContentBlock = TextPart | ImagePart | FilePart | ToolCallPart | ToolResultPart;

export interface Message {
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

export interface WesEvent {
  type: EventType;
  payload: unknown;
  timestamp: number;
}

export interface ConversationManager {
  addMessage(message: Message): void;
  getHistory(): Message[];
  clear(): void;
}
