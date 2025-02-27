"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Loader } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const chatContainerRef = useRef<HTMLDivElement | null>(null)

  const toggleChat = () => setIsOpen(!isOpen)

  // Manejador para cerrar el chat cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen && 
        chatContainerRef.current && 
        !chatContainerRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('button')
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, sender: "user" }])
      setInputValue("")
      setIsLoading(true)

      try {
        const response = await fetch(process.env.CHAT_BOT_URL as string || "https://thomicurve09.app.n8n.cloud/webhook-test/d4e83207-2d03-4f91-8b15-9fb6c40e14f5", {
          method: "POST",
          body: JSON.stringify({ message: inputValue }),
        })

        const data = await response.json()
        setMessages((prev) => [...prev, { text: data[0].output, sender: "bot" }])
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          { text: "Hubo un error al procesar tu mensaje. Intentelo en otro momento.", sender: "bot" },
        ])
        console.error("Error al enviar el mensaje:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button className="rounded-full w-14 h-14 inset-5" onClick={toggleChat}>
        {isOpen ? <X size={30} /> : <MessageCircle size={30} />}
      </Button>
      <div
        ref={chatContainerRef}
        className={cn(
          "absolute bottom-16 right-0 w-96 bg-background border border-border rounded-lg shadow-xl transition-all duration-300 ease-in-out",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
        )}
      >
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold">Chatea con uno de nuestros agentes</h2>
        </div>
        <div className="h-96 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "max-w-[80%] p-2 rounded-lg",
                message.sender === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-secondary",
              )}
            >
              {message.text}
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-center items-center">
              <Loader className="animate-spin" />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSendMessage} className="p-4 border-t border-border flex items-center">
          <Input
            type="text"
            placeholder="Escribe un mensaje..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-grow mr-2"
          />
          <Button type="submit" size="icon">
            <Send size={16} />
          </Button>
        </form>
      </div>
    </div>
  )
}

