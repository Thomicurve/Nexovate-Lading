"use client"

import { useEffect, useState, useRef } from "react"

interface UseIntersectionObserverProps {
  threshold?: number
  root?: Element | null
  rootMargin?: string
}

export function useIntersectionObserver<T extends HTMLElement>({
  threshold = 0,
  root = null,
  rootMargin = "0%",
}: UseIntersectionObserverProps = {}): [boolean, React.RefObject<T>] {
  const [isIntersecting, setIntersecting] = useState(false)
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIntersecting(true)
        observer.disconnect()
      }
    }, { threshold, root, rootMargin })
    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, root, rootMargin])

  return [isIntersecting, ref]
}
