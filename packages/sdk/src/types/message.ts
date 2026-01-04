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

export interface Message {
  id: string;
  role: Role;
  content: ContentBlock[];
}

export {
  TextPart,
  ImagePart,
  FilePart,
  ToolCallPart,
  ToolResultPart,
};
