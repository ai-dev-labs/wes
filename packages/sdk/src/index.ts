import { Message, Role, ContentBlock } from './types';

export * from './types';

export function createMessage(
  role: Role,
  content: string | ContentBlock[],
  id?: string
): Message {
  return {
    id: id || crypto.randomUUID(),
    role,
    content,
  };
}
