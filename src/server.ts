import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";
import createUserTool from "./tools/createUserTool";
import getAllUsers from "./resources/getAllUsers";

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().optional(),
  phone: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;

const server = new McpServer({
  name: "data-analysis-server",
  version: "1.0.0",
  capabilities: {
    tools: {},
    resources: {},
  },
});

server.resource(
  "users",
  "users://all",
  {
    description: "get all the users from the database.",
    title: "Get Users",
    mimetype: "application/json",
  },
  getAllUsers
);

server.tool(
  "create-user",
  "Create a new user in the database",
  userSchema.shape,
  {
    title: "Create User",
    destructiveHint: false,
    readOnlyHint: false,
    idempotentHint: false,
    openWorldHint: true,
  },
  createUserTool
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(`Server started successfully`);
}

main().catch((error) => {
  console.error("Error starting server:", error);
  process.exit(1);
});
