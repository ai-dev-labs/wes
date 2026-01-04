import { ToolCallPart } from './message';

export interface Tool {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
  execute: (args: any, options?: { signal?: AbortSignal }) => Promise<any>;
  approval?: (toolCall: ToolCallPart) => boolean | Promise<boolean>;
}