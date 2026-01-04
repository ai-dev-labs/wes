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
