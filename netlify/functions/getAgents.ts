import type { Handler } from "@netlify/functions";

const RAW_URL =
  "https://raw.githubusercontent.com/Destrigo/my-two-pages/main/agents.json";

export const handler: Handler = async () => {
  try {
    const res = await fetch(RAW_URL);

    if (!res.ok) {
      return {
        statusCode: res.status,
        body: "Failed to fetch agents.json",
      };
    }

    const agents = await res.json();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(agents),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      body: err.message,
    };
  }
};
