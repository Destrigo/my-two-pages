import type { Handler } from "@netlify/functions";

const handler: Handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    if (!event.body) {
      return { statusCode: 400, body: "Missing request body" };
    }

    const token = process.env.GITHUB_TOKEN;
    const repo = process.env.GITHUB_REPO;
    const username = process.env.GITHUB_USERNAME;

    if (!token || !repo || !username) {
      return { statusCode: 500, body: "Missing GitHub credentials" };
    }

    const { agents } = JSON.parse(event.body);
    if (!agents) {
      return { statusCode: 400, body: "Missing agents payload" };
    }

    const filePath = "agents.json";
    const branch = "main";
    const apiUrl = `https://api.github.com/repos/${username}/${repo}/contents/${filePath}`;

    // Fetch existing file to get SHA (if it exists)
    let sha: string | undefined;

    const getRes = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    });

    if (getRes.ok) {
      const data = await getRes.json();
      sha = data.sha;
    } else if (getRes.status !== 404) {
      return {
        statusCode: 500,
        body: "Failed to fetch existing file from GitHub",
      };
    }

    // Encode content
    const content = Buffer.from(
      JSON.stringify(agents, null, 2),
      "utf8"
    ).toString("base64");

    const putBody: any = {
      message: "Aggiornamento agents.json",
      content,
      branch,
    };

    if (sha) {
      putBody.sha = sha;
    }

    const updateRes = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(putBody),
    });

    if (!updateRes.ok) {
      const errText = await updateRes.text();
      return {
        statusCode: 500,
        body: `GitHub error: ${errText}`,
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Agents salvati" }),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      body: `Server error: ${err.message ?? err}`,
    };
  }
};

export { handler };
