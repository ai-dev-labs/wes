# Agent Guidelines

## Operational Guidelines

### 1. Code Push Restrictions
**CRITICAL:** Agents operating within this repository must **NOT** push any code changes to the upstream remote repository unless explicitly and directly asked to do so by the user. All git operations should be local (commits) until a specific `push` instruction is received.

## Development Workflow

This repository is a **TypeScript Monorepo** managed with **npm workspaces** and **Turbo**.

### Build System
- **Build All**: `npm run build` (Runs `turbo run build`)
- **Build Specific Package**: `turbo run build --filter=<package_name>`
  - Example: `turbo run build --filter=@ai-dev-labs/wes-sdk`

### Testing
- **Run All Tests**: `npm run test` (Runs `turbo run test`)
- **Run Specific Package**: 
  - `npm test -w <package_name>` 
  - OR `turbo run test --filter=<package_name>`

### Dependency Management
- **Install Root Dev Dependency**: `npm install <package> -D`
- **Install Package Dependency**: `npm install <package> -w <package_name>`
  - **Important:** Always use the workspace flag `-w` when adding dependencies to specific packages.
  - Example: `npm install ai -w @ai-dev-labs/wes-sdk`

### Project Structure
- **Root**: Configuration files (`package.json`, `turbo.json`, `tsconfig.json`).
- **`packages/sdk`** (`@ai-dev-labs/wes-sdk`): The core library containing types (`Message`, `Tool`, `Event`) and logic.
- **`packages/cli`** (`@ai-dev-labs/wes`): The command-line interface.

## SDK Capabilities Reference

The `@ai-dev-labs/wes-sdk` package provides the following core capabilities:

### Core Types (`packages/sdk/src/types/`)

- **Message** (`message.ts`): 
  - Class implementing `Message` interface.
  - Usage: `new Message('user', 'Hello')` (Auto-generates UUID).
  - Content is strictly `ContentBlock[]`.

- **ContentBlock** (`message.ts`):
  - `TextPart`, `ImagePart`, `FilePart` (Documents), `ToolCallPart`, `ToolResultPart`, `ReasoningPart`.
  - Imported from `ai` package where possible for compatibility.

- **Tool** (`tool.ts`): Interface for defining executable tools.
- **Event** (`event.ts`): Standardized event structure (`agent.generate.start`, etc.).