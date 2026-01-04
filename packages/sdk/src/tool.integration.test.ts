import { describe, it, expect, vi } from 'vitest';
import { Tool, ToolCallPart } from './types/index';

describe('Tool Interface Integration', () => {
  it('should allow defining a tool with execute and approval', async () => {
    const mockExecute = vi.fn().mockResolvedValue('success');
    const mockApproval = vi.fn().mockReturnValue(true);

    const myTool: Tool = {
      name: 'testTool',
      description: 'A test tool',
      parameters: { type: 'object', properties: { foo: { type: 'string' } } },
      execute: mockExecute,
      approval: mockApproval
    };

    expect(myTool.name).toBe('testTool');
    
    // Simulate usage
    const args = { foo: 'bar' };
    const result = await myTool.execute(args);
    expect(result).toBe('success');
    expect(mockExecute).toHaveBeenCalledWith(args);

    const toolCall: ToolCallPart = { 
        type: 'tool-call', 
        toolCallId: '123', 
        toolName: 'testTool', 
        args: args 
    } as unknown as ToolCallPart;
    
    if (myTool.approval) {
        const approved = await myTool.approval(toolCall);
        expect(approved).toBe(true);
        expect(mockApproval).toHaveBeenCalledWith(toolCall);
    }
  });

  it('should support AbortSignal in execute', async () => {
     const mockExecute = vi.fn(async (args: any, options?: { signal?: AbortSignal }) => {
        if (options?.signal?.aborted) {
            throw new Error('Aborted');
        }
        return 'done';
     });

     const myTool: Tool = {
        name: 'abortTool',
        description: 'Tool that supports abort',
        parameters: {},
        execute: mockExecute
     };

     const controller = new AbortController();
     const signal = controller.signal;
     
     // Test normal execution
     await expect(myTool.execute({}, { signal })).resolves.toBe('done');

     // Test aborted execution (simulation)
     controller.abort();
     await expect(myTool.execute({}, { signal })).rejects.toThrow('Aborted');
  });
});
