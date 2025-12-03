import { GITHUB_CONFIG } from "./githubConfig";

export interface Agent {
  id: string;
  fullName: string;
  password: string;
}

const { username, repo, token } = GITHUB_CONFIG;
const API_URL = `https://api.github.com/repos/${username}/${repo}/contents/agents.json`;

const headers = {
  Authorization: `Bearer ${token}`,
  Accept: "application/vnd.github+json",
  "Content-Type": "application/json",
};

export async function getAgents(): Promise<Agent[]> {
  try {
    const response = await fetch(API_URL, { headers });
    
    if (response.status === 404) {
      // File doesn't exist yet, return empty array
      return [];
    }
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const data = await response.json();
    const content = atob(data.content);
    return JSON.parse(content) as Agent[];
  } catch (error) {
    console.error("Error fetching agents from GitHub:", error);
    throw error;
  }
}

export async function saveAgents(agents: Agent[]): Promise<void> {
  try {
    // First, get the current file SHA (required for updates)
    let sha: string | undefined;
    
    try {
      const getResponse = await fetch(API_URL, { headers });
      if (getResponse.ok) {
        const data = await getResponse.json();
        sha = data.sha;
      }
    } catch {
      // File doesn't exist, that's fine
    }
    
    const content = btoa(JSON.stringify(agents, null, 2));
    
    const body: {
      message: string;
      content: string;
      sha?: string;
    } = {
      message: `Update agents.json - ${new Date().toISOString()}`,
      content,
    };
    
    if (sha) {
      body.sha = sha;
    }
    
    const response = await fetch(API_URL, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `GitHub API error: ${response.status}`);
    }
  } catch (error) {
    console.error("Error saving agents to GitHub:", error);
    throw error;
  }
}
