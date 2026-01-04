import {
  TextPart,
  ImagePart,
  FilePart,
  ToolCallPart,
  ToolResultPart,
} from 'ai';

export interface ReasoningPart {
  type: 'reasoning';
  text: string;
}

export type Role = 'system' | 'user' | 'assistant';

export type ContentBlock =
  | TextPart
  | ImagePart
  | FilePart
  | ToolCallPart
  | ToolResultPart
  | ReasoningPart;

export class Message {
  id: string;
  role: Role;
  content: ContentBlock[];

  constructor(role: Role, content: string | ContentBlock[], id?: string) {
    this.id = id || crypto.randomUUID();
    this.role = role;
    this.content = typeof content === 'string' ? [{ type: 'text', text: content }] : content;
  }
}

export {
  TextPart,
  ImagePart,
  FilePart,
  ToolCallPart,
  ToolResultPart,
};