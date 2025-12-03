import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { getAgents, Agent } from "@/lib/githubApi";

const Login = () => {
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const agents: Agent[] = await getAgents();
      
      const agent = agents.find(
        a => a.fullName.toLowerCase() === fullName.toLowerCase() && a.password === password
      );
      
      if (agent) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("agentName", agent.fullName);
        toast({
          title: "Accesso effettuato",
          description: `Bentornato, ${agent.fullName}!`,
        });
        navigate("/form");
      } else {
        toast({
          title: "Errore",
          description: "Nome o password non validi",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile verificare le credenziali",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-secondary to-muted p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <h1 className="font-vibes text-8xl text-primary animate-fade-in">
            He'Be
          </h1>
          <p className="font-cormorant text-xl italic text-muted-foreground animate-fade-in" style={{ animationDelay: '0.2s' }}>
            No Age Skin
          </p>
        </div>
        
        <Card className="shadow-lg border-border/50 backdrop-blur-sm bg-card/95 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-cormorant font-medium">Benvenuto</CardTitle>
            <CardDescription className="font-cormorant">Inserisci le tue credenziali per continuare</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="font-cormorant">Nome Completo</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Mario Rossi"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  disabled={isLoading}
                  className="font-cormorant"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="font-cormorant">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="font-cormorant"
                />
              </div>
              <Button type="submit" className="w-full font-cormorant text-base" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifica...
                  </>
                ) : (
                  "Accedi"
                )}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <Button variant="link" onClick={() => navigate("/admin-login")} className="font-cormorant text-muted-foreground text-sm">
                Accesso Amministratore
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
