import { expect, test } from 'vitest';
import { createMessage } from './index';

test('createMessage generates uuid', () => {
  const message = createMessage('user', 'hello');
  expect(message.id).toBeDefined();
  expect(typeof message.id).toBe('string');
  expect(message.role).toBe('user');
  expect(message.content).toBe('hello');
});

test('createMessage uses provided id', () => {
  const id = '123';
  const message = createMessage('user', 'hello', id);
  expect(message.id).toBe(id);
});