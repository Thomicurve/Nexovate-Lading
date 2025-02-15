"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedSection } from "@/components/animated-section"
import Calendar from "@/components/calendar"
import { useToast } from "@/hooks/use-toast"
import { Loader } from "lucide-react"


export default function Contact() {
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const validateForm = (formData: FormData) => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!name) newErrors.name = "El nombre es requerido.";
    if (!email) {
      newErrors.email = "El email es requerido.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "El formato del email es incorrecto.";
    }
    if (!message) newErrors.message = "El mensaje es requerido.";

    return newErrors;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const newErrors = validateForm(formData);

    if (Object.keys(newErrors).length === 0) {
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');

      setIsLoading(true);

      setErrors({});
      fetch(process.env.NEXT_PUBLIC_CONTACT_FORM_URL as string, {
        method: "POST",
        body: JSON.stringify({ name, email, message })
      }).then(() => {
        toast({
          title: "Mensaje enviado ✅",
          variant: "default",
          description: "Nos pondremos en contacto contigo lo antes posible."
        })
      }).catch(() => {
        toast({
          title: "Error al enviar el mensaje",
          variant: "destructive",
          description: "Por favor, inténtelo de nuevo más tarde."
        })
      }).finally(() => {
        setIsLoading(false);
      });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <section id="contact" className="py-24 border-t z-20 relative">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          <AnimatedSection delay={100}>
            Contactanos
          </AnimatedSection>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          <Card className="md:col-span-2 relative min-h-[80vh]">
            <CardHeader>
              <CardTitle>Envíanos un mensaje</CardTitle>
              <CardDescription>Llena el formulario y nos pondremos en contacto contigo lo antes posible.</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nombre</Label>
                  <Input id="name" name="name" placeholder="Tu nombre" required />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="Tu email" required />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="message">Mensaje</Label>
                  <Textarea id="message" name="message" placeholder="Tu mensaje" required />
                  {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                </div>

                <div className="flex items-center gap-2">
                  <Button type="submit" disabled={isLoading} >Enviar mensaje</Button>
                  {isLoading && <Loader className="animate-spin w-5 h-5" />}
                </div>

              </form>
            </CardContent>
          </Card>
          <Card id="calendar" className="md:col-span-4 p-0 m-0 min-h-[80vh]">
            <CardHeader>
              <CardTitle>Agenda una reunión</CardTitle>
              <CardDescription>
                Elige una fecha para tu reunión y nos pondremos en contacto contigo para confirmar el horario.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

