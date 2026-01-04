import { describe, it, expect } from 'vitest';
import { Message } from './types/message';

describe('Message', () => {
  it('constructor generates uuid and normalizes content', () => {
    const msg = new Message('user', 'Hello');
    expect(msg.id).toBeDefined();
    expect(msg.role).toBe('user');
    expect(msg.content).toEqual([{ type: 'text', text: 'Hello' }]);
  });

  it('constructor uses provided id', () => {
    const id = '123';
    const msg = new Message('assistant', 'Hi', id);
    expect(msg.id).toBe(id);
  });

  it('constructor handles complex content blocks', () => {
    const content = [
        { type: 'text' as const, text: 'Hello' },
        { type: 'image' as const, image: 'base64...' }
    ];
    const msg = new Message('user', content);
    expect(msg.content).toEqual(content);
  });
});
