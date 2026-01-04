import { Message, Role, ContentBlock } from './types';

export * from './types';

export function createMessage(
  role: Role,
  content: string | ContentBlock[],
  id?: string
): Message {
  const normalizedContent: ContentBlock[] =
    typeof content === 'string' ? [{ type: 'text', text: content }] : content;

  return {
    id: id || crypto.randomUUID(),
    role,
    content: normalizedContent,
  };
}