# Agent Guidelines

## Available Tools & SDK Capabilities

The `@ai-dev-labs/wes-sdk` package provides the following core capabilities for building agents. These types and classes align with the `ai-sdk` (Core) standards.

### Core Types (`@ai-dev-labs/wes-sdk`)

- **Message**: The fundamental unit of communication.
  - **Structure**: Class implementing `Message` interface.
  - **Fields**: 
    - `id`: `string` (UUID, auto-generated on instantiation).
    - `role`: `'system' | 'user' | 'assistant'`.
    - `content`: `ContentBlock[]` (Strictly typed array).
  - **Usage**: `const msg = new Message('user', 'Hello');`

- **ContentBlock**: A discriminated union of supported content parts.
  - **TextPart**: `{ type: 'text', text: string }`
  - **ImagePart**: `{ type: 'image', image: DataContent | URL, mediaType?: string }`
  - **FilePart** (Documents): `{ type: 'file', data: DataContent | URL, mediaType: string }`
  - **ToolCallPart**: `{ type: 'tool-call', toolCallId: string, toolName: string, args: unknown }`
  - **ToolResultPart**: `{ type: 'tool-result', toolCallId: string, toolName: string, output: unknown, isError?: boolean }`
  - **ReasoningPart**: `{ type: 'reasoning', text: string }`

- **Tool**: Interface for defining executable tools.
  - **Fields**: `name`, `description`, `parameters` (Schema), `execute` (Function).

- **Event**: Standardized event structure for agent lifecycle hooks.
  - **Events**: `agent.generate.start`, `agent.message.start`, `agent.tool.call.start`, etc.

- **ConversationManager**: Interface for managing message history.

## Operational Guidelines

### 1. Code Push Restrictions
**CRITICAL:** Agents operating within this repository must **NOT** push any code changes to the upstream remote repository unless explicitly and directly asked to do so by the user. All git operations should be local (commits) until a specific `push` instruction is received.
