import { CallToolResult } from "@modelcontextprotocol/sdk/types";
import type { User } from "../server";
import fs from "node:fs";
import path from "node:path";

export default async function createUserTool(
  params: User
): Promise<CallToolResult> {
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "data", "users.json"))) {
      await fs.promises.writeFile(
        path.join(__dirname, "..", "data", "users.json"),
        JSON.stringify([], null, 2)
      );
    }
    const userData = await fs.promises.readFile(
      path.join(__dirname, "..", "data", "users.json"),
      "utf-8"
    );
    const users: User[] = JSON.parse(userData);
    const newUser = {
      ...params,
      id: Date.now().toString(),
    };
    users.push(newUser);
    await fs.promises.writeFile(
      path.join(__dirname, "..", "data", "users.json"),
      JSON.stringify(users, null, 2)
    );
    return {
      content: [
        {
          type: "text",
          text: `User ${newUser.name} created successfully with ID ${newUser.id}.`,
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: "An error occurred while creating the user.",
        },
      ],
    };
  }
}
