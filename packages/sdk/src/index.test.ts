import { expect, test } from 'vitest';
import { Message } from './index';

test('Message constructor generates uuid and normalizes content', () => {
  const message = new Message('user', 'hello');
  expect(message.id).toBeDefined();
  expect(typeof message.id).toBe('string');
  expect(message.role).toBe('user');
  expect(message.content).toEqual([{ type: 'text', text: 'hello' }]);
});

test('Message constructor uses provided id', () => {
  const id = '123';
  const message = new Message('user', 'hello', id);
  expect(message.id).toBe(id);
});