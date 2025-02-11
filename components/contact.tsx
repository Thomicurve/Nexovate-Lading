"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedSection } from "@/components/animated-section"
export default function Contact() {
  const [date, setDate] = useState<Date | undefined>(undefined)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Handle form submission here
    console.log("Form submitted")
  }

  return (
    <section id="contact" className="py-24 border-t z-20 relative">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          <AnimatedSection delay={100}>
            Contactanos
          </AnimatedSection>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Envíanos un mensaje</CardTitle>
              <CardDescription>Llena el formulario y nos pondremos en contacto contigo lo antes posible.</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nombre</Label>
                  <Input id="name" placeholder="Tu nombre" required />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Tu email" required />
                </div>

                <div>
                  <Label htmlFor="message">Mensaje</Label>
                  <Textarea id="message" placeholder="Tu mensaje" required />
                </div>

                <Button type="submit">Enviar mensaje</Button>
              </form>
            </CardContent>
          </Card>
          <Card>

            <CardHeader>
              <CardTitle>Agenda una reunión</CardTitle>
              <CardDescription>
                Elige una fecha para tu reunión y nos pondremos en contacto contigo para confirmar el horario.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" /> */}
              {date && <p className="mt-4">You selected: {date.toDateString()}</p>}
              <Button className="mt-4" onClick={() => console.log("Schedule meeting for", date)}>
                Schedule Meeting
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

