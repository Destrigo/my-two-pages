import type { Handler } from "@netlify/functions";

const username = process.env.GITHUB_USERNAME!;
const repo = process.env.GITHUB_REPO!;
const token = process.env.GITHUB_TOKEN!;

const API_URL = `https://api.github.com/repos/${username}/${repo}/contents/agents.json`;

export const handler: Handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    if (!event.body) {
      return { statusCode: 400, body: "Missing body" };
    }

    const agents = JSON.parse(event.body);

    // Get current SHA (if file exists)
    let sha: string | undefined;

    const getRes = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    });

    if (getRes.ok) {
      const data = await getRes.json();
      sha = data.sha;
    } else if (getRes.status !== 404) {
      throw new Error("Failed to fetch current file");
    }

    const content = Buffer
      .from(JSON.stringify(agents, null, 2))
      .toString("base64");

    const putBody: any = {
      message: `Update agents.json - ${new Date().toISOString()}`,
      content,
    };

    if (sha) {
      putBody.sha = sha;
    }

    const putRes = await fetch(API_URL, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(putBody),
    });

    if (!putRes.ok) {
      const err = await putRes.json();
      return {
        statusCode: 500,
        body: err.message || "GitHub API error",
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true }),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: error.message,
    };
  }
};
