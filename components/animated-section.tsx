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
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-700 ease-out",
        isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className,
      )}
    >
      {children}
    </div>
  )
}

