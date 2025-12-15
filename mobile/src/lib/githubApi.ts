export interface Agent {
  id: string;
  fullName: string;
  password: string;
}

// Client chiama solo le funzioni serverless
export async function getAgents(): Promise<Agent[]> {
  const res = await fetch("/.netlify/functions/getAgents");
  if (!res.ok) throw new Error("Impossibile caricare gli agenti");
  return res.json();
}

export async function saveAgents(agents: Agent[]): Promise<void> {
  const res = await fetch("/.netlify/functions/saveAgents", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(agents),
  });
  if (!res.ok) throw new Error("Impossibile salvare gli agenti");
}
