import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Trash2, UserPlus, Loader2 } from "lucide-react";
import { getAgents, saveAgents as saveAgentsToGitHub, Agent } from "@/lib/githubApi";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [newAgentName, setNewAgentName] = useState("");
  const [newAgentPassword, setNewAgentPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      navigate("/admin-login");
      return;
    }
    
    loadAgents();
  }, [navigate]);

  const loadAgents = async () => {
    setIsLoading(true);
    try {
      const fetchedAgents = await getAgents();
      setAgents(fetchedAgents);
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile caricare gli agenti da GitHub",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveAgents = async (newAgents: Agent[]) => {
    setIsSaving(true);
    try {
      await saveAgentsToGitHub(newAgents);
      setAgents(newAgents);
      return true;
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile salvare gli agenti su GitHub",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newAgentName.trim() || !newAgentPassword.trim()) {
      toast({
        title: "Errore",
        description: "Inserisci nome e password",
        variant: "destructive",
      });
      return;
    }

    const existingAgent = agents.find(
      a => a.fullName.toLowerCase() === newAgentName.toLowerCase()
    );
    
    if (existingAgent) {
      toast({
        title: "Errore",
        description: "Esiste già un agente con questo nome",
        variant: "destructive",
      });
      return;
    }

    const newAgent: Agent = {
      id: Date.now().toString(),
      fullName: newAgentName.trim(),
      password: newAgentPassword,
    };

    const success = await saveAgents([...agents, newAgent]);
    
    if (success) {
      setNewAgentName("");
      setNewAgentPassword("");
      toast({
        title: "Agente creato",
        description: `${newAgent.fullName} è stato aggiunto`,
      });
    }
  };

  const handleDeleteAgent = async (id: string) => {
    const updatedAgents = agents.filter(a => a.id !== id);
    const success = await saveAgents(updatedAgents);
    
    if (success) {
      toast({
        title: "Agente eliminato",
        description: "L'agente è stato rimosso",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin-login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
      <div className="mx-auto max-w-2xl space-y-6 py-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-vibes text-5xl text-primary">He'Be</h1>
            <p className="font-cormorant text-lg text-muted-foreground">Pannello Amministratore</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="font-cormorant">
            Esci
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="font-cormorant flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Crea Nuovo Agente
            </CardTitle>
            <CardDescription className="font-cormorant">
              Aggiungi un nuovo agente che potrà accedere al sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddAgent} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="agentName" className="font-cormorant">Nome Completo</Label>
                <Input
                  id="agentName"
                  placeholder="Mario Rossi"
                  value={newAgentName}
                  onChange={(e) => setNewAgentName(e.target.value)}
                  className="font-cormorant"
                  disabled={isSaving}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="agentPassword" className="font-cormorant">Password</Label>
                <Input
                  id="agentPassword"
                  type="password"
                  placeholder="••••••••"
                  value={newAgentPassword}
                  onChange={(e) => setNewAgentPassword(e.target.value)}
                  className="font-cormorant"
                  disabled={isSaving}
                />
              </div>
              <Button type="submit" className="w-full font-cormorant" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvataggio...
                  </>
                ) : (
                  "Aggiungi Agente"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-cormorant">Agenti Registrati</CardTitle>
            <CardDescription className="font-cormorant">
              {isLoading ? "Caricamento..." : agents.length === 0 ? "Nessun agente registrato" : `${agents.length} agente/i`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="space-y-3">
                {agents.map((agent) => (
                  <div
                    key={agent.id}
                    className="flex items-center justify-between p-3 rounded-lg border bg-card"
                  >
                    <span className="font-cormorant font-medium">{agent.fullName}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteAgent(agent.id)}
                      className="text-destructive hover:text-destructive"
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
