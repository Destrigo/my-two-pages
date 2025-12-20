import type { Handler } from "@netlify/functions";

const username = process.env.GITHUB_USERNAME!;
const repo = process.env.GITHUB_REPO!;
const token = process.env.GITHUB_TOKEN!;
const API_URL = `https://api.github.com/repos/${username}/${repo}/contents/agents.json`;

export const handler: Handler = async (event) => {
  try {
    if (event.httpMethod !== "GET" && event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    // Only parse body if POST
    let agentsToSave;
    if (event.httpMethod === "POST") {
      if (!event.body) return { statusCode: 400, body: "Missing body" };
      agentsToSave = JSON.parse(event.body);
      // handle updating GitHub file here
    }

    // Fetch agents.json from GitHub
    const res = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    });

    if (!res.ok) {
      return { statusCode: res.status, body: "Failed to fetch agents.json" };
    }

    const data = await res.json();

    let agents: any[] = [];
    if (data.content) {
      const decoded = Buffer.from(data.content, "base64").toString("utf8");
      agents = JSON.parse(decoded);
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(agents),
    };
  } catch (err: any) {
    return { statusCode: 500, body: err.message ?? "Server error" };
  }
};
