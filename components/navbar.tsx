"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/clubs", label: "Clubs" },
  { href: "/me", label: "Dashboard" },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userName, setUserName] = useState("")

  useEffect(() => {
    // Check if user is logged in
    const userId = localStorage.getItem("userId")
    const storedName = localStorage.getItem("userName")
    setIsAuthenticated(!!userId)
    setUserName(storedName || "User")
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("userId")
    localStorage.removeItem("userName")
    localStorage.removeItem("userEmail")
    setIsAuthenticated(false)
    window.location.href = "/"
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center">
          <span className="text-lg font-bold tracking-tight text-foreground">
            Campus
          </span>
          <span className="text-lg font-bold tracking-tight text-primary">
            Hub
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative px-4 py-2 text-sm font-medium tracking-wide uppercase transition-colors",
                pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute bottom-0 left-1/2 h-px w-6 -translate-x-1/2 bg-primary" />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">{userName}</span>
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary">
                <img
                  src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${userName}`}
                  alt="User avatar"
                  className="h-7 w-7 rounded-full"
                />
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/auth/login"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={cn(
              "h-px w-6 bg-foreground transition-all duration-300",
              mobileOpen && "translate-y-[7px] rotate-45"
            )}
          />
          <span
            className={cn(
              "h-px w-6 bg-foreground transition-all duration-300",
              mobileOpen && "opacity-0"
            )}
          />
          <span
            className={cn(
              "h-px w-6 bg-foreground transition-all duration-300",
              mobileOpen && "-translate-y-[7px] -rotate-45"
            )}
          />
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-border/50 bg-background/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col px-6 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "border-b border-border/30 py-4 text-lg font-medium tracking-wide transition-colors",
                  pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
