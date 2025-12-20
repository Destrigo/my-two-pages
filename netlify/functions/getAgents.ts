import type { Handler } from "@netlify/functions";

const username = process.env.GITHUB_USERNAME!;
const repo = process.env.GITHUB_REPO!;
const token = process.env.GITHUB_TOKEN!;
const filePath = "agents.json";
const branch = "main";
const API_URL = `https://api.github.com/repos/${username}/${repo}/contents/${filePath}`;

export const handler: Handler = async (event) => {
  try {
    if (!username || !repo || !token) {
      return { statusCode: 500, body: "Missing GitHub credentials" };
    }

    // ----------------------
    // POST: update agents.json
    // ----------------------
    if (event.httpMethod === "POST") {
      if (!event.body) return { statusCode: 400, body: "Missing body" };
      const agentsToSave = JSON.parse(event.body);

      // Get current SHA (if file exists)
      let sha: string | undefined;
      const getRes = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" },
      });

      if (getRes.ok) {
        const data = await getRes.json();
        sha = data.sha;
      } else if (getRes.status !== 404) {
        const text = await getRes.text();
        return { statusCode: 500, body: `Failed to fetch current file: ${text}` };
      }

      // Prepare body
      const content = Buffer.from(JSON.stringify(agentsToSave, null, 2)).toString("base64");
      const putBody: any = {
        message: `Update agents.json - ${new Date().toISOString()}`,
        content,
        branch,
      };
      if (sha) putBody.sha = sha;

      // PUT request to update file
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
        const errText = await putRes.text();
        return { statusCode: 500, body: `GitHub error: ${errText}` };
      }

      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ success: true }),
      };
    }

    // ----------------------
    // GET: fetch agents.json
    // ----------------------
    if (event.httpMethod === "GET") {
      const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" },
      });

      if (res.status === 404) {
        return { statusCode: 200, body: JSON.stringify([]) };
      }

      if (!res.ok) {
        const text = await res.text();
        return { statusCode: res.status, body: `Failed to fetch agents.json: ${text}` };
      }

      const data = await res.json();
      const agents = data.content
        ? JSON.parse(Buffer.from(data.content, "base64").toString("utf8"))
        : [];

      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(agents),
      };
    }

    return { statusCode: 405, body: "Method Not Allowed" };
  } catch (err: any) {
    return { statusCode: 500, body: err.message ?? "Server error" };
  }
};
