import { LanguageModel } from 'ai';
import { Event } from '../types/event';
import { Tool } from '../types/tool';

export interface AgentGenerateOptions {
  signal?: AbortSignal;
  [key: string]: unknown;
}

export interface Agent {
  /**
   * Unique identifier for the agent (UUID).
   */
  id: string;

  /**
   * The name of the agent.
   */
  name: string;

  /**
   * A description of the agent's purpose or capabilities.
   */
  description?: string;

  /**
   * The AI SDK model provider instance.
   */
  model: LanguageModel;

  /**
   * The system prompt that defines the agent's persona and instructions.
   */
  systemPrompt: string;

  /**
   * Key-value pairs of cached context strings.
   */
  cachedContext?: Record<string, string>;

  /**
   * List of tools available to the agent.
   */
  tools?: Tool[];

  /**
   * Generates a response stream based on the provided prompt.
   * 
   * @param prompt The input prompt for the agent.
   * @param options Optional configuration for the generation request.
   * @returns An async iterable stream of events.
   */
  generate(prompt: string, options?: AgentGenerateOptions): AsyncIterable<Event>;
}
