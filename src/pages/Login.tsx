import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (email && password) {
      // Store login state
      localStorage.setItem("isAuthenticated", "true");
      toast({
        title: "Accesso effettuato",
        description: "Bentornato!",
      });
      navigate("/form");
    } else {
      toast({
        title: "Errore",
        description: "Inserisci email e password",
        variant: "destructive",
      });
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
                <Label htmlFor="email" className="font-cormorant">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nome@esempio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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
                  className="font-cormorant"
                />
              </div>
              <Button type="submit" className="w-full font-cormorant text-base">
                Accedi
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
