"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImageUpload } from "@/components/ui/image-upload"

const categories = ["Technology", "Arts", "Engineering", "Business", "Environment"]

export default function CreateClubPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        logo: "",
        coverImage: "",
    })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [userId, setUserId] = useState<string | null>(null)

    useEffect(() => {
        // Get user ID from localStorage
        const storedUserId = localStorage.getItem("userId")
        if (!storedUserId) {
            // Redirect to login if not authenticated
            router.push("/auth/login")
        } else {
            setUserId(storedUserId)
        }
    }, [router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (!userId) {
            setError("You must be logged in to create a club")
            return
        }

        setLoading(true)

        try {
            const response = await fetch("/api/clubs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    userId,
                    // Only include logo and coverImage if they're provided
                    logo: formData.logo || undefined,
                    coverImage: formData.coverImage || undefined,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Failed to create club")
            }

            // Redirect to clubs page on success
            router.push("/clubs")
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    if (!userId) {
        return null // Don't render form until user is loaded
    }

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="mx-auto max-w-3xl px-6">
                <div className="mb-8">
                    <Link
                        href="/clubs"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
                    >
                        <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                            />
                        </svg>
                        Back to Clubs
                    </Link>
                    <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                        Create Club
                    </h1>
                    <p className="mt-3 text-base text-muted-foreground">
                        Start your own community on campus
                    </p>
                </div>

                <div className="rounded-xl border border-border/50 bg-card/50 p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="rounded-md bg-destructive/15 border border-destructive/50 px-4 py-3 text-sm text-destructive">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="name">Club Name *</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Innovation Lab"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description *</Label>
                            <Textarea
                                id="description"
                                placeholder="Tell us about your club..."
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({ ...formData, description: e.target.value })
                                }
                                required
                                disabled={loading}
                                rows={6}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Category *</Label>
                            <select
                                id="category"
                                value={formData.category}
                                onChange={(e) =>
                                    setFormData({ ...formData, category: e.target.value })
                                }
                                required
                                disabled={loading}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            >
                                <option value="">Select a category</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <ImageUpload
                            label="Club Logo"
                            value={formData.logo}
                            onChange={(url) => setFormData({ ...formData, logo: url })}
                            folder="campus-hub/clubs/logos"
                            disabled={loading}
                        />

                        <ImageUpload
                            label="Cover Image"
                            value={formData.coverImage}
                            onChange={(url) => setFormData({ ...formData, coverImage: url })}
                            folder="campus-hub/clubs/covers"
                            disabled={loading}
                        />

                        <div className="flex gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-1"
                                onClick={() => router.push("/clubs")}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" className="flex-1" disabled={loading}>
                                {loading ? "Creating..." : "Create Club"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
