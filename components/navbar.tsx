"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
import { GlobeIcon } from "@phosphor-icons/react/dist/csr/Globe"
import BrandLogo from "@/components/brand-logo"
import { Button } from "@/components/ui/button"
import { locales } from "@/app/i18n"

const sections = ["hero", "solutions", "about", "process", "contact"]

function MenuLines({ open }: { open: boolean }) {
  return (
    <span className="relative block h-6 w-6" aria-hidden="true">
      <span className={`absolute left-0 top-2 h-0.5 w-6 bg-current transition-transform duration-300 ease-landing ${open ? "translate-y-1 rotate-45" : ""}`} />
      <span className={`absolute left-0 top-4 h-0.5 w-6 bg-current transition-transform duration-300 ease-landing ${open ? "-translate-y-1 -rotate-45" : ""}`} />
    </span>
  )
}

export default function Navbar() {
  const t = useTranslations("navbar")
  const a11y = useTranslations("accessibility")
  const locale = useLocale()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const scrollLockRef = useRef<string | null>(null)
  const destinationRef = useRef<string | null>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navigation = [
    { id: "solutions", label: t("solutions"), description: a11y("solutionsHeading") },
    { id: "about", label: t("about"), description: a11y("aboutHeading") },
    { id: "process", label: t("process"), description: a11y("processHeading") },
  ]
  const localeHref = (language: string) => `/${language}${pathname.replace(/^\/[^/]+/, "")}`
  const otherLocale = locale === "es" ? "en" : "es"

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return
    const intersecting = new Set<string>()
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) intersecting.add(entry.target.id)
        else intersecting.delete(entry.target.id)
      })
      const current = sections.findLast((id) => intersecting.has(id))
      if (current) setActiveSection(current)
    }, { rootMargin: "-15% 0px -65% 0px" })
    sections.forEach((id) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [])

  const finishClose = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    closeTimerRef.current = null
    dialogRef.current?.close()
    if (scrollLockRef.current !== null) {
      document.body.style.overflow = scrollLockRef.current
      scrollLockRef.current = null
    }
    const destination = destinationRef.current
    destinationRef.current = null
    if (destination) {
      const section = document.getElementById(destination)
      if (section) {
        const previousTabIndex = section.getAttribute("tabindex")
        section.setAttribute("tabindex", "-1")
        section.focus({ preventScroll: true })
        section.addEventListener("blur", () => {
          if (previousTabIndex === null) section.removeAttribute("tabindex")
          else section.setAttribute("tabindex", previousTabIndex)
        }, { once: true })
        window.location.hash = destination
        section.scrollIntoView({ behavior: "auto", block: "start" })
      }
    } else triggerRef.current?.focus({ preventScroll: true })
  }, [])

  const closeMenu = useCallback((destination?: string) => {
    destinationRef.current = destination ?? null
    setMenuOpen(false)
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduceMotion) finishClose()
    else closeTimerRef.current = setTimeout(finishClose, 300)
  }, [finishClose])

  function openMenu() {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    destinationRef.current = null
    setMenuOpen(true)
  }

  function trapFocus(event: React.KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return
    const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"))
    const first = controls[0]
    const last = controls[controls.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last?.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first?.focus()
    }
  }

  useEffect(() => {
    if (!menuOpen) return
    const dialog = dialogRef.current
    if (!dialog) return
    if (scrollLockRef.current === null) scrollLockRef.current = document.body.style.overflow
    document.body.style.overflow = "hidden"
    if (!dialog.open) dialog.showModal()
    const desktop = window.matchMedia("(min-width: 1024px)")
    const onResize = () => { if (desktop.matches) closeMenu() }
    desktop.addEventListener("change", onResize)
    return () => desktop.removeEventListener("change", onResize)
  }, [menuOpen, closeMenu])

  useEffect(() => () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    if (scrollLockRef.current !== null) document.body.style.overflow = scrollLockRef.current
  }, [])

  return (
    <>
      <header className="fixed inset-x-4 top-6 z-40 mx-auto max-w-6xl rounded-full border border-border bg-background/90 backdrop-blur-xl">
        <div className="flex min-h-16 items-center gap-4 px-4 lg:px-6">
          <Link href="#hero" aria-label={a11y("heroHeading")} className="shrink-0 rounded-lg">
            <BrandLogo />
          </Link>
          <nav className="ml-auto hidden items-center gap-2 lg:flex" aria-label={a11y("mainNavigation")}>
            {navigation.map(({ id, label, description }) => (
              <a key={id} href={`#${id}`} aria-label={id === "process" ? `${label}: ${description}` : description}
                aria-current={activeSection === id ? "location" : undefined}
                className={`rounded-full px-3 py-2 text-sm font-semibold transition-colors duration-300 ease-landing hover:bg-secondary ${activeSection === id ? "bg-secondary text-foreground" : "text-muted-foreground"}`}>
                {label}
              </a>
            ))}
          </nav>
          <a href={localeHref(otherLocale)} hrefLang={otherLocale} lang={otherLocale}
            aria-label={`${a11y("languageSelector")}: ${otherLocale === "es" ? "Español" : "English"}`}
            className="ml-auto flex min-h-10 items-center gap-2 rounded-full px-3 text-sm font-semibold transition-colors duration-300 ease-landing hover:bg-secondary lg:ml-0">
            <GlobeIcon className="h-4 w-4" aria-hidden="true" />
            {otherLocale === "es" ? "ES" : "EN"}
          </a>
          <Button asChild size="sm" className="hidden rounded-full lg:inline-flex">
            <a href="#contact" aria-label={a11y("scheduleHeading")} aria-current={activeSection === "contact" ? "location" : undefined}>{t("schedule")}</a>
          </Button>
          <button ref={triggerRef} type="button" onClick={openMenu}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full hover:bg-secondary lg:hidden"
            aria-label={a11y("menuOpen")} aria-expanded={menuOpen} aria-controls="mobile-menu">
            <MenuLines open={menuOpen} />
          </button>
        </div>
      </header>
      <dialog ref={dialogRef} onKeyDown={trapFocus} id="mobile-menu" aria-label={a11y("mobileNavigation")}
        onCancel={(event) => { event.preventDefault(); closeMenu() }}
        className={`mobile-navigation fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-background/95 p-0 text-foreground backdrop-blur-3xl ${menuOpen ? "menu-enter" : "menu-exit"}`}>
        <div className="landing-container flex min-h-full flex-col pb-8 pt-6">
          <div className="flex min-h-16 items-center justify-between">
            <BrandLogo />
            <button type="button" onClick={() => closeMenu()}
              className="flex h-12 w-12 items-center justify-center rounded-full hover:bg-secondary"
              aria-label={a11y("menuClose")}>
              <MenuLines open={menuOpen} />
            </button>
          </div>
          <nav className="my-auto flex flex-col gap-4 py-12" aria-label={a11y("mobileNavigation")}>
            {navigation.map(({ id, label, description }) => (
              <a key={id} href={`#${id}`} onClick={(event) => { event.preventDefault(); closeMenu(id) }}
                aria-label={id === "process" ? `${label}: ${description}` : description} aria-current={activeSection === id ? "location" : undefined}
                className="menu-link rounded-lg py-2 text-3xl font-semibold tracking-tight hover:text-muted-foreground">
                {label}
              </a>
            ))}
            <Button asChild className="mt-4 self-start">
              <a href="#contact" onClick={(event) => { event.preventDefault(); closeMenu("contact") }}>{t("schedule")}</a>
            </Button>
          </nav>
          <div className="flex items-center gap-4 border-t border-border pt-6 text-sm">
            <span className="text-muted-foreground">{t("language")}</span>
            {locales.map((language) => (
              <a key={language} href={localeHref(language)} hrefLang={language} lang={language}
                aria-current={locale === language ? "page" : undefined}
                className="rounded-lg px-3 py-2 font-semibold hover:bg-secondary">
                {language === "es" ? "Español" : "English"}
              </a>
            ))}
          </div>
        </div>
      </dialog>
    </>
  )
}
