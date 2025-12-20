import type { Handler } from "@netlify/functions";

const username = process.env.GITHUB_USERNAME!;
const repo = process.env.GITHUB_REPO!;
const token = process.env.GITHUB_TOKEN!;

const API_URL = `https://api.github.com/repos/${username}/${repo}/contents/agents.json`;

export const handler: Handler = async () => {
  try {
    if (!username || !repo || !token) {
      return { statusCode: 500, body: "Missing GitHub credentials" };
    }

    // Fetch agents.json from GitHub
    const res = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    });

    if (res.status === 404) {
      // File not found → return empty array
      return { statusCode: 200, body: JSON.stringify([]) };
    }

    if (!res.ok) {
      return { statusCode: res.status, body: "Failed to fetch agents.json" };
    }

    const data = await res.json();

    // Safely decode base64 content
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
