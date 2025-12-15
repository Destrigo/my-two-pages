import { Handler } from "@netlify/functions";
import fetch from "node-fetch";

const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const username = process.env.GITHUB_USERNAME;

  if (!token || !repo || !username) {
    return { statusCode: 500, body: "Missing GitHub credentials" };
  }

  const { agents } = JSON.parse(event.body || "{}");

  try {
    const filePath = "agents.json"; // file nel repo
    const branch = "main";

    // Prendi SHA del file se esiste (necessario per aggiornamento)
    const res = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/${filePath}`, {
      headers: { Authorization: `token ${token}` },
    });

    const data = await res.json();
    let sha;
    if (res.status === 200) sha = data.sha;

    // Aggiorna il file su GitHub
    const updateRes = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/${filePath}`, {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Aggiornamento agents.json",
        content: Buffer.from(JSON.stringify(agents, null, 2)).toString("base64"),
        sha: sha || undefined,
        branch,
      }),
    });

    if (!updateRes.ok) {
      const errText = await updateRes.text();
      return { statusCode: 500, body: `GitHub error: ${errText}` };
    }

    return { statusCode: 200, body: JSON.stringify({ message: "Agents salvati" }) };
  } catch (err) {
    return { statusCode: 500, body: `Server error: ${err}` };
  }
};

export { handler };
