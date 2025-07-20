import type { ReadResourceResult } from "@modelcontextprotocol/sdk/types";
import type { URL } from "node:url";
import fs from "node:fs";
import path from "node:path";

export default async function getAllUsers(
  url: URL
): Promise<ReadResourceResult> {
  try {
    const userdata = await fs.readFileSync(
      path.join(__dirname, "..", "data", "users.json"),
      "utf-8"
    );
    if (!userdata) {
      return {
        contents: [
          {
            text: "No users found.",
            mimeType: "application/json",
            uri: url.href,
          },
        ],
      };
    }

    return {
      contents: [
        {
          uri: url.href,
          text: userdata,
          mimeType: "application/json",
        },
      ],
    };
  } catch (error) {
    return {
      contents: [
        {
          text: "An error occurred while fetching users.",
          mimeType: "application/json",
          uri: url.href,
        },
      ],
    };
  }
}
