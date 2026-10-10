"use client"

import type { ComponentPropsWithoutRef } from "react"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"

export default function RevealCard({ className = "", children, ...props }: ComponentPropsWithoutRef<"article">) {
  const [entered, ref] = useIntersectionObserver<HTMLElement>({ threshold: 0.1 })

  return (
    <article {...props} ref={ref} className={`${className}${entered ? " card-enter" : ""}`}>
      {children}
    </article>
  )
}
