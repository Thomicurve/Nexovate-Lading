"use client"

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"
import { cn } from "@/lib/utils"
import type React from "react"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function AnimatedSection({ children, className, delay = 0 }: AnimatedSectionProps) {
  const [isIntersecting, ref] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 })

  return (
    <div ref={ref} style={{ animationDelay: `${delay}ms` }}
      className={cn(isIntersecting && "section-enter", className)}>
      {children}
    </div>
  )
}
