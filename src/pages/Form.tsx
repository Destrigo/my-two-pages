import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

interface EspositoreItem {
  enabled: boolean;
  pieces: string;
}

interface CampioniItem {
  enabled: boolean;
  pieces: string;
}

interface ProductItem {
  enabled: boolean;
  quantity: string;
  discount: string;
  omaggio: string;
}

interface ProductInfo {
  name: string;
  price: number;
}

const PRODUCTS: Record<string, ProductInfo> = {
  prodotto1: { name: "Water Bank", price: 19.5 },
  prodotto2: { name: "Essential", price: 28.0 },
  prodotto3: { name: "Age Alchemy", price: 36.5 },
  prodotto4: { name: "Skin Heart", price: 39.0 },
  prodotto5: { name: "The Hero", price: 44.5 },
  prodotto6: { name: "Pure Skin", price: 20.0 },
  prodotto7: { name: "Radiance Renew", price: 18.0 },
  prodotto8: { name: "Eye Rescue", price: 22.5 },
  prodotto9: { name: "Sun Kiss", price: 25.0 },
  prodotto10: { name: "Leg Relief", price: 19.0 },
  prodotto11: { name: "Powerful Milk", price: 18.0 },
  prodotto12: { name: "Balance Myst", price: 16.0 },
};

// Import product images dynamically
const getProductImage = (productKey: string): string | null => {
  try {
    // Try to import the image - Vite will handle this at build time
    return new URL(`../photo_products/${productKey}.jpg`, import.meta.url).href;
  } catch {
    return null;
  }
};

const Form = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [agentName, setAgentName] = useState("");

  const [formData, setFormData] = useState({
    ragioneSociale: "",
    isNuovoCliente: false,
    indirizzo: "",
    cap: "",
    localita: "",
    provincia: "",
    codiceFiscale: "",
    partitaIva: "",
    datiBancari: "",
    codiceSdi: "",
    indirizzoSpedizione: "",
    note: "",
  });

  const [espositori, setEspositori] = useState<Record<string, EspositoreItem>>({
    skinimalism: { enabled: false, pieces: "" },
    sensitive: { enabled: false, pieces: "" },
    sunPassion: { enabled: false, pieces: "" },
    careYouBody: { enabled: false, pieces: "" },
  });

  const [campioni, setCampioni] = useState<Record<string, CampioniItem>>({
    theHero: { enabled: false, pieces: "" },
    skinHeart: { enabled: false, pieces: "" },
    eyeRescue: { enabled: false, pieces: "" },
    botoxLikeSerum: { enabled: false, pieces: "" },
    restoringCream: { enabled: false, pieces: "" },
    legsRelief: { enabled: false, pieces: "" },
  });

  const [products, setProducts] = useState<Record<string, ProductItem>>({
    prodotto1: { enabled: false, quantity: "", discount: "", omaggio: "" },
    prodotto2: { enabled: false, quantity: "", discount: "", omaggio: "" },
    prodotto3: { enabled: false, quantity: "", discount: "", omaggio: "" },
    prodotto4: { enabled: false, quantity: "", discount: "", omaggio: "" },
    prodotto5: { enabled: false, quantity: "", discount: "", omaggio: "" },
    prodotto6: { enabled: false, quantity: "", discount: "", omaggio: "" },
    prodotto7: { enabled: false, quantity: "", discount: "", omaggio: "" },
    prodotto8: { enabled: false, quantity: "", discount: "", omaggio: "" },
    prodotto9: { enabled: false, quantity: "", discount: "", omaggio: "" },
    prodotto10: { enabled: false, quantity: "", discount: "", omaggio: "" },
    prodotto11: { enabled: false, quantity: "", discount: "", omaggio: "" },
    prodotto12: { enabled: false, quantity: "", discount: "", omaggio: "" },
  });

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const storedAgentName = localStorage.getItem("agentName");

    if (!isAuthenticated) {
      navigate("/");
      return;
    }

    if (storedAgentName) {
      setAgentName(storedAgentName);
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.ragioneSociale.trim()) {
      toast({
        title: "Errore",
        description: "Ragione Sociale Cliente è obbligatoria",
        variant: "destructive",
      });
      return;
    }

    try {
      const serviceId = "service_42azew6";
      const templateId = "template_usxk8pp";
      const publicKey = "Sh8iwu-lvTx6-nLOQ";

      const buildOrderSummary = (): string => {
        const lines: string[] = [];

        lines.push(`CLIENTE: ${formData.ragioneSociale}`);
        lines.push(`NUOVO CLIENTE: ${formData.isNuovoCliente ? "Sì" : "No"}`);
        lines.push("");

        if (formData.isNuovoCliente) {
          lines.push("DATI NUOVO CLIENTE:");
          lines.push(`Indirizzo: ${formData.indirizzo}, ${formData.cap} ${formData.localita} (${formData.provincia})`);
          lines.push(`Codice Fiscale: ${formData.codiceFiscale}`);
          if (formData.partitaIva) lines.push(`Partita IVA: ${formData.partitaIva}`);
          lines.push(`Dati Bancari: ${formData.datiBancari}`);
          lines.push(`Codice SDI: ${formData.codiceSdi}`);
          if (formData.indirizzoSpedizione) lines.push(`Indirizzo Spedizione: ${formData.indirizzoSpedizione}`);
          lines.push("");
        }

        lines.push("PRODOTTI:");
        const selectedProducts = Object.entries(products).filter(([_, item]) => item.enabled && item.quantity);
        if (selectedProducts.length > 0) {
          selectedProducts.forEach(([key, item]) => {
            const product = PRODUCTS[key];
            const discount = item.discount ? parseInt(item.discount) : 0;
            const omaggio = item.omaggio || "0";
            lines.push(`- ${product.name}: ${item.quantity} pz x €${product.price.toFixed(2)} (Sconto: ${discount}%, Omaggio: ${omaggio} pz)`);
          });
        } else {
          lines.push("Nessuno");
        }
        lines.push("");

        lines.push("ESPOSITORI:");
        const espositoriNames: Record<string, string> = {
          skinimalism: "SKINIMALISM",
          sensitive: "SENSITIVE",
          sunPassion: "SUN PASSION",
          careYouBody: "CAREyouBODY",
        };
        const selectedEspositori = Object.entries(espositori).filter(([_, item]) => item.enabled && item.pieces);
        if (selectedEspositori.length > 0) {
          selectedEspositori.forEach(([key, item]) => {
            lines.push(`- ${espositoriNames[key]}: ${item.pieces} pz`);
          });
        } else {
          lines.push("Nessuno");
        }
        lines.push("");

        lines.push("CAMPIONI:");
        const campioniNames: Record<string, string> = {
          theHero: "THE HERO",
          skinHeart: "SKIN HEART",
          eyeRescue: "EYE RESCUE",
          botoxLikeSerum: "BOTOX LIKE SERUM",
          restoringCream: "RESTORING CREAM",
          legsRelief: "LEGS RELIEF",
        };
        const selectedCampioni = Object.entries(campioni).filter(([_, item]) => item.enabled && item.pieces);
        if (selectedCampioni.length > 0) {
          selectedCampioni.forEach(([key, item]) => {
            lines.push(`- ${campioniNames[key]}: ${item.pieces} pz`);
          });
        } else {
          lines.push("Nessuno");
        }
        lines.push("");

        lines.push("NOTE:");
        lines.push(formData.note || "Nessuna");

        return lines.join("\n");
      };

      const orderSummary = buildOrderSummary();

      const templateParams = {
        to_email: "ordini@newcossrl.it",
        from_name: agentName,
        category: formData.isNuovoCliente ? "Nuovo Cliente" : "Cliente Esistente",
        message: orderSummary,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      toast({
        title: "Modulo inviato con successo",
        description: "Il tuo modulo è stato inviato via email.",
      });

      // Reset form
      setFormData({
        ragioneSociale: "",
        isNuovoCliente: false,
        indirizzo: "",
        cap: "",
        localita: "",
        provincia: "",
        codiceFiscale: "",
        partitaIva: "",
        datiBancari: "",
        codiceSdi: "",
        indirizzoSpedizione: "",
        note: "",
      });
      setEspositori({
        skinimalism: { enabled: false, pieces: "" },
        sensitive: { enabled: false, pieces: "" },
        sunPassion: { enabled: false, pieces: "" },
        careYouBody: { enabled: false, pieces: "" },
      });
      setCampioni({
        theHero: { enabled: false, pieces: "" },
        skinHeart: { enabled: false, pieces: "" },
        eyeRescue: { enabled: false, pieces: "" },
        botoxLikeSerum: { enabled: false, pieces: "" },
        restoringCream: { enabled: false, pieces: "" },
        legsRelief: { enabled: false, pieces: "" },
      });
      setProducts({
        prodotto1: { enabled: false, quantity: "", discount: "", omaggio: "" },
        prodotto2: { enabled: false, quantity: "", discount: "", omaggio: "" },
        prodotto3: { enabled: false, quantity: "", discount: "", omaggio: "" },
        prodotto4: { enabled: false, quantity: "", discount: "", omaggio: "" },
        prodotto5: { enabled: false, quantity: "", discount: "", omaggio: "" },
        prodotto6: { enabled: false, quantity: "", discount: "", omaggio: "" },
        prodotto7: { enabled: false, quantity: "", discount: "", omaggio: "" },
        prodotto8: { enabled: false, quantity: "", discount: "", omaggio: "" },
        prodotto9: { enabled: false, quantity: "", discount: "", omaggio: "" },
        prodotto10: { enabled: false, quantity: "", discount: "", omaggio: "" },
        prodotto11: { enabled: false, quantity: "", discount: "", omaggio: "" },
        prodotto12: { enabled: false, quantity: "", discount: "", omaggio: "" },
      });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast({
        title: "Errore",
        description: "Invio fallito. Riprova.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("agentName");
    navigate("/");
  };

  const toggleEspositore = (key: string) => {
    setEspositori((prev) => ({
      ...prev,
      [key]: { ...prev[key], enabled: !prev[key].enabled, pieces: !prev[key].enabled ? prev[key].pieces : "" },
    }));
  };

  const toggleCampione = (key: string) => {
    setCampioni((prev) => ({
      ...prev,
      [key]: { ...prev[key], enabled: !prev[key].enabled, pieces: !prev[key].enabled ? prev[key].pieces : "" },
    }));
  };

  const toggleProduct = (key: string) => {
    setProducts((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        enabled: !prev[key].enabled,
        quantity: !prev[key].enabled ? prev[key].quantity : "",
        discount: !prev[key].enabled ? prev[key].discount : "",
        omaggio: !prev[key].enabled ? prev[key].omaggio : "",
      },
    }));
  };

  const espositoreLabels: Record<string, string> = {
    skinimalism: "SKINIMALISM",
    sensitive: "SENSITIVE",
    sunPassion: "SUN PASSION",
    careYouBody: "CAREyouBODY",
  };

  const campioniLabels: Record<string, string> = {
    theHero: "THE HERO",
    skinHeart: "SKIN HEART",
    eyeRescue: "EYE RESCUE",
    botoxLikeSerum: "BOTOX LIKE SERUM",
    restoringCream: "RESTORING CREAM",
    legsRelief: "LEGS RELIEF",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
      <div className="mx-auto max-w-2xl space-y-4 py-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-vibes text-5xl text-primary">He'Be</h1>
            <p className="font-cormorant text-lg text-muted-foreground">Modulo Ordine</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="font-cormorant">
            Esci
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-cormorant">Informazioni Ordine</CardTitle>
            <CardDescription className="font-cormorant">Compila il modulo con i dettagli dell'ordine</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nome Agente - Read Only */}
              <div className="space-y-2">
                <Label htmlFor="nomeAgente" className="font-cormorant font-semibold">
                  NOME AGENTE
                </Label>
                <Input id="nomeAgente" value={agentName} readOnly disabled className="font-cormorant bg-muted" />
              </div>

              {/* Ragione Sociale Cliente */}
              <div className="space-y-2">
                <Label htmlFor="ragioneSociale" className="font-cormorant font-semibold">
                  RAGIONE SOCIALE CLIENTE <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="ragioneSociale"
                  placeholder="Inserisci ragione sociale"
                  value={formData.ragioneSociale}
                  onChange={(e) => setFormData({ ...formData, ragioneSociale: e.target.value })}
                  required
                  className="font-cormorant"
                />
              </div>

              <Separator />

              {/* Se Nuovo Cliente */}
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="nuovoCliente"
                  checked={formData.isNuovoCliente}
                  onCheckedChange={(checked) => setFormData({ ...formData, isNuovoCliente: checked as boolean })}
                />
                <Label htmlFor="nuovoCliente" className="font-cormorant font-semibold cursor-pointer">
                  SE NUOVO CLIENTE
                </Label>
              </div>

              {/* Nuovo Cliente Fields */}
              {formData.isNuovoCliente && (
                <div className="space-y-4 p-4 rounded-lg border bg-muted/30">
                  <p className="font-cormorant text-sm text-muted-foreground">Dati del nuovo cliente</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 space-y-2">
                      <Label className="font-cormorant">Indirizzo (Via)</Label>
                      <Input
                        placeholder="Via Roma 1"
                        value={formData.indirizzo}
                        onChange={(e) => setFormData({ ...formData, indirizzo: e.target.value })}
                        className="font-cormorant"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-cormorant">CAP</Label>
                      <Input
                        placeholder="00100"
                        value={formData.cap}
                        onChange={(e) => setFormData({ ...formData, cap: e.target.value })}
                        className="font-cormorant"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-cormorant">Località</Label>
                      <Input
                        placeholder="Roma"
                        value={formData.localita}
                        onChange={(e) => setFormData({ ...formData, localita: e.target.value })}
                        className="font-cormorant"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-cormorant">Provincia</Label>
                      <Input
                        placeholder="RM"
                        value={formData.provincia}
                        onChange={(e) => setFormData({ ...formData, provincia: e.target.value })}
                        className="font-cormorant"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-cormorant">Codice Fiscale</Label>
                      <Input
                        placeholder="RSSMRA80A01H501Z"
                        value={formData.codiceFiscale}
                        onChange={(e) => setFormData({ ...formData, codiceFiscale: e.target.value })}
                        className="font-cormorant"
                      />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label className="font-cormorant">Partita IVA (se diversa dal CF)</Label>
                      <Input
                        placeholder="12345678901"
                        value={formData.partitaIva}
                        onChange={(e) => setFormData({ ...formData, partitaIva: e.target.value })}
                        className="font-cormorant"
                      />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label className="font-cormorant">Dati Bancari</Label>
                      <Input
                        placeholder="IBAN / Banca"
                        value={formData.datiBancari}
                        onChange={(e) => setFormData({ ...formData, datiBancari: e.target.value })}
                        className="font-cormorant"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-cormorant">Codice SDI</Label>
                      <Input
                        placeholder="0000000"
                        value={formData.codiceSdi}
                        onChange={(e) => setFormData({ ...formData, codiceSdi: e.target.value })}
                        className="font-cormorant"
                      />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label className="font-cormorant">Indirizzo di Spedizione (se diverso)</Label>
                      <Input
                        placeholder="Via alternativa..."
                        value={formData.indirizzoSpedizione}
                        onChange={(e) => setFormData({ ...formData, indirizzoSpedizione: e.target.value })}
                        className="font-cormorant"
                      />
                    </div>
                  </div>
                </div>
              )}

              <Separator />

              {/* Informazioni Riferite all'Ordine Section */}
              <div className="space-y-4">
                <Label className="font-cormorant font-semibold text-lg">INFORMAZIONI RIFERITE ALL'ORDINE</Label>
                <div className="space-y-4">
                  {Object.entries(PRODUCTS).map(([key, product]) => {
                    const imageUrl = getProductImage(key);
                    
                    return (
                      <div key={key} className="p-3 rounded-lg border bg-muted/20">
                        <div className="flex items-start gap-4 mb-2">
                          <Checkbox
                            id={`prod-${key}`}
                            checked={products[key].enabled}
                            onCheckedChange={() => toggleProduct(key)}
                            className="mt-1"
                          />
                          
                          {/* Product Image */}
                          {imageUrl && (
                            <img 
                              src={imageUrl} 
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded-md border"
                              onError={(e) => {
                                // Hide image if it fails to load
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          )}
                          
                          <div className="flex-1">
                            <Label htmlFor={`prod-${key}`} className="font-cormorant cursor-pointer block font-medium">
                              {product.name}
                            </Label>
                            <span className="font-cormorant text-sm text-primary font-semibold">
                              €{product.price.toFixed(2)}
                            </span>
                          </div>
                        </div>
                        
                        {products[key].enabled && (
                          <div className="grid grid-cols-3 gap-3 mt-3 pl-20">
                            <div className="space-y-1">
                              <Label className="font-cormorant text-xs">Quantità (pz)</Label>
                              <Input
                                type="number"
                                placeholder="0"
                                value={products[key].quantity}
                                onChange={(e) =>
                                  setProducts((prev) => ({
                                    ...prev,
                                    [key]: { ...prev[key], quantity: e.target.value },
                                  }))
                                }
                                className="font-cormorant"
                                min="1"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="font-cormorant text-xs">Sconto (%)</Label>
                              <Input
                                type="number"
                                placeholder="0"
                                value={products[key].discount}
                                onChange={(e) => {
                                  const val = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
                                  setProducts((prev) => ({
                                    ...prev,
                                    [key]: { ...prev[key], discount: e.target.value === "" ? "" : val.toString() },
                                  }));
                                }}
                                className="font-cormorant"
                                min="0"
                                max="100"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="font-cormorant text-xs">Omaggio (pz)</Label>
                              <Input
                                type="number"
                                placeholder="0"
                                value={products[key].omaggio}
                                onChange={(e) =>
                                  setProducts((prev) => ({
                                    ...prev,
                                    [key]: { ...prev[key], omaggio: e.target.value },
                                  }))
                                }
                                className="font-cormorant"
                                min="0"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <Separator />

              {/* Espositori Section */}
              <div className="space-y-4">
                <Label className="font-cormorant font-semibold text-lg">ESPOSITORI</Label>
                <div className="grid gap-3">
                  {Object.entries(espositoreLabels).map(([key, label]) => (
                    <div key={key} className="flex items-center gap-4">
                      <Checkbox
                        id={`esp-${key}`}
                        checked={espositori[key].enabled}
                        onCheckedChange={() => toggleEspositore(key)}
                      />
                      <Label htmlFor={`esp-${key}`} className="font-cormorant cursor-pointer min-w-32">
                        {label}
                      </Label>
                      {espositori[key].enabled && (
                        <Input
                          type="number"
                          placeholder="Pezzi"
                          value={espositori[key].pieces}
                          onChange={(e) =>
                            setEspositori((prev) => ({
                              ...prev,
                              [key]: { ...prev[key], pieces: e.target.value },
                            }))
                          }
                          className="font-cormorant w-24"
                          min="1"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Campioni Section */}
              <div className="space-y-4">
                <Label className="font-cormorant font-semibold text-lg">CAMPIONI</Label>
                <div className="grid gap-3">
                  {Object.entries(campioniLabels).map(([key, label]) => (
                    <div key={key} className="flex items-center gap-4">
                      <Checkbox
                        id={`camp-${key}`}
                        checked={campioni[key].enabled}
                        onCheckedChange={() => toggleCampione(key)}
                      />
                      <Label htmlFor={`camp-${key}`} className="font-cormorant cursor-pointer min-w-32">
                        {label}
                      </Label>
                      {campioni[key].enabled && (
                        <Input
                          type="number"
                          placeholder="Pezzi"
                          value={campioni[key].pieces}
                          onChange={(e) =>
                            setCampioni((prev) => ({
                              ...prev,
                              [key]: { ...prev[key], pieces: e.target.value },
                            }))
                          }
                          className="font-cormorant w-24"
                          min="1"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Note */}
              <div className="space-y-2">
                <Label htmlFor="note" className="font-cormorant font-semibold">
                  NOTE
                </Label>
                <Textarea
                  id="note"
                  placeholder="Note aggiuntive (facoltativo)..."
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  rows={4}
                  className="font-cormorant"
                />
              </div>

              <Button type="submit" className="w-full font-cormorant text-base" size="lg">
                Invia Ordine
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Form;