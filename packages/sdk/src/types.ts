export interface TextContent {
  type: 'text';
  text: string;
}

export interface ImageContent {
  type: 'image';
  source: {
    type: 'base64';
    media_type: string;
    data: string;
  };
}

export interface DocumentContent {
  type: 'document';
  source: {
    type: 'base64';
    media_type: string;
    data: string;
  };
}

export type ContentBlock = TextContent | ImageContent | DocumentContent;

export interface Message {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string | ContentBlock[];
  name?: string;
  tool_call_id?: string;
  tool_calls?: ToolCall[];
}

export interface ToolCall {
  id: string;
  type: 'function';
  function: {
    name: string;
    arguments: string;
  };
}

export interface ToolResult {
  tool_call_id: string;
  output: string;
}

export interface Tool {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
  execute: (args: Record<string, unknown>) => Promise<string>;
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