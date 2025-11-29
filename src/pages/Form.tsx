import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from '@emailjs/browser';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Form = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    category: "",
    message: "",
  });

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const serviceId = 'service_42azew6';
      const templateId = 'template_usxk8pp';
      const publicKey = 'Sh8iwu-lvTx6-nLOQ';
      
      const templateParams = {
        to_email: 'ordini@hebenoageskin.it',
        from_name: formData.fullName,
        category: formData.category,
        message: formData.message,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      toast({
        title: "Modulo inviato con successo",
        description: "Il tuo modulo è stato inviato via email.",
      });
      
      // Reset form
      setFormData({
        fullName: "",
        category: "",
        message: "",
      });
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast({
        title: "Errore",
        description: "Invio fallito. Riprova.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
      <div className="mx-auto max-w-2xl space-y-4 py-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Modulo</h1>
          <Button variant="outline" onClick={handleLogout}>
            Esci
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Informazioni</CardTitle>
            <CardDescription>Compila il modulo qui sotto con i tuoi dettagli</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nome Completo</Label>
                <Input
                  id="fullName"
                  placeholder="Mario Rossi"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                  required
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Seleziona una categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="resell">Rivendita</SelectItem>
                    <SelectItem value="first-sell">Prima Vendita</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Messaggio</Label>
                <Textarea
                  id="message"
                  placeholder="Scrivi qui il tuo messaggio..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  required
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                Finito
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Form;
