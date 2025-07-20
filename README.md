# Data Analysis MCP Server

A simple Model Context Protocol (MCP) server that allows LLMs to create and manage user entries in a JSON file system database.

## Features

- **Create Users**: Add new user entries with validation
- **Retrieve Users**: Get all users from the database
- **JSON File Storage**: Simple file-based data persistence
- **Schema Validation**: Zod-powered input validation
- **MCP Compatible**: Works with any MCP-compatible LLM client

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

## Installation

1. Clone or download this repository
2. Install dependencies:

```bash
npm install
```

## Usage

### Development Mode

Run the server in development mode with auto-recompilation:

```bash
npm run dev
```

### Production Mode

1. Build the TypeScript files:

```bash
npm run build
```

2. Start the server:

```bash
npm start
```

### Inspector Mode

Use the MCP Inspector to test and debug your server:

```bash
npm run inspector
```

This will start the server with the MCP Inspector interface for easy testing.

## Server Capabilities

### Tools

#### `create-user`
Creates a new user in the database.

**Parameters:**
- `name` (string, required): User's full name (minimum 1 character)
- `email` (string, required): Valid email address
- `address` (string, optional): User's address
- `phone` (string, optional): User's phone number

**Example Usage:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "address": "123 Main St, City, State",
  "phone": "+1-555-0123"
}
```

### Resources

#### `users://all`
Retrieves all users from the database.

**Resource URI:** `users://all`
**MIME Type:** `application/json`
**Description:** Get all users from the database

## Project Structure

```
├── server.ts              # Main server file
├── tools/
│   └── createUserTool.ts  # User creation tool implementation
├── resources/
│   └── getAllUsers.ts     # User retrieval resource implementation
├── build/                 # Compiled JavaScript files
├── package.json          # Project configuration
└── README.md            # This file
```

## Data Schema

Users are validated against the following schema:

```typescript
{
  name: string (required, min length: 1)
  email: string (required, valid email format)
  address?: string (optional)
  phone?: string (optional)
}
```

## Configuration

The server runs with the following configuration:

- **Name**: `data-analysis-server`
- **Version**: `1.0.0`
- **Transport**: Standard I/O (stdio)
- **Capabilities**: Tools and Resources enabled

## Development

### Building

```bash
npm run build
```

### Type Checking

The project uses TypeScript for type safety. The main types are:

- `User`: Inferred from the Zod schema for user validation

### Scripts

- `npm start`: Run the compiled server
- `npm run build`: Compile TypeScript to JavaScript
- `npm run dev`: Development mode with watch compilation
- `npm run inspector`: Run with MCP Inspector for debugging

## Dependencies

### Runtime Dependencies
- `@modelcontextprotocol/sdk`: MCP SDK for server implementation
- `zod`: Schema validation library

### Development Dependencies
- `@modelcontextprotocol/inspector`: MCP debugging tool
- `@types/node`: Node.js type definitions
- `typescript`: TypeScript compiler

## Connecting to LLM Clients

This server uses the Model Context Protocol standard and can be connected to any MCP-compatible LLM client. The server communicates via standard I/O (stdio) transport.

## Error Handling

The server includes proper error handling for:
- Invalid user input (schema validation)
- File system operations
- Server startup errors

## License

ISC License

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with the MCP Inspector
5. Submit a pull request

## Troubleshooting

### Common Issues

1. **Server won't start**: Ensure all dependencies are installed with `npm install`
2. **TypeScript errors**: Run `npm run build` to check for compilation errors
3. **Permission errors**: Check file system permissions for the data storage location

### Debug Mode

Use the inspector tool for detailed debugging:

```bash
npm run inspector
```

This provides a web interface to test your MCP server tools and resources.