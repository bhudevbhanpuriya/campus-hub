"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const navLinks = [
        { href: "/events", label: "Events" },
        { href: "/clubs", label: "Clubs" },
        { href: "/about", label: "About" },
    ];

    return (
        <>
            <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/80 backdrop-blur-md">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                    {/* Logo */}
                    <Link href="/" className="text-xl font-bold tracking-tight transition-all duration-300 hover:opacity-70">
                        CAMPUS-HUB
                    </Link>

                    {/* Hamburger Menu Button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="p-2 hover:bg-white/10 rounded-md transition-all duration-300"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {mobileOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                        onClick={() => setMobileOpen(false)}
                    />

                    {/* Menu Panel */}
                    <div className="fixed top-0 right-0 h-full w-[300px] bg-black border-l border-white/5 z-50 transform transition-transform duration-300">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-12">Menu</h2>
                            <div className="flex flex-col gap-8">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="text-4xl font-bold transition-all duration-300 hover:opacity-70 hover:translate-x-2"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
