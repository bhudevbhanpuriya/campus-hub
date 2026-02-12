"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImageUpload } from "@/components/ui/image-upload"

export default function CreateEventPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        venue: "",
        image: "",
        clubId: "",
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
            setError("You must be logged in to create an event")
            return
        }

        setLoading(true)

        try {
            const response = await fetch("/api/events", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    createdBy: userId,
                    date: new Date(formData.date).toISOString(),
                    // Only include image if provided
                    image: formData.image || undefined,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Failed to create event")
            }

            // Redirect to events page on success
            router.push("/events")
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
                        href="/events"
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
                        Back to Events
                    </Link>
                    <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                        Create Event
                    </h1>
                    <p className="mt-3 text-base text-muted-foreground">
                        Share your event with the campus community
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
                            <Label htmlFor="title">Event Title *</Label>
                            <Input
                                id="title"
                                type="text"
                                placeholder="Annual Tech Fest"
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({ ...formData, title: e.target.value })
                                }
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description *</Label>
                            <Textarea
                                id="description"
                                placeholder="Tell us about your event..."
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({ ...formData, description: e.target.value })
                                }
                                required
                                disabled={loading}
                                rows={6}
                            />
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="date">Date & Time *</Label>
                                <Input
                                    id="date"
                                    type="datetime-local"
                                    value={formData.date}
                                    onChange={(e) =>
                                        setFormData({ ...formData, date: e.target.value })
                                    }
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="venue">Venue *</Label>
                                <Input
                                    id="venue"
                                    type="text"
                                    placeholder="Main Auditorium"
                                    value={formData.venue}
                                    onChange={(e) =>
                                        setFormData({ ...formData, venue: e.target.value })
                                    }
                                    required
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <ImageUpload
                            label="Event Image"
                            value={formData.image}
                            onChange={(url) => setFormData({ ...formData, image: url })}
                            folder="campus-hub/events"
                            disabled={loading}
                        />

                        <div className="space-y-2">\n                            <Label htmlFor="clubId">Club ID *</Label>
                            <Input
                                id="clubId"
                                type="text"
                                placeholder="Enter club ID"
                                value={formData.clubId}
                                onChange={(e) =>
                                    setFormData({ ...formData, clubId: e.target.value })
                                }
                                required
                                disabled={loading}
                            />
                            <p className="text-xs text-muted-foreground">
                                The ID of the club hosting this event
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-1"
                                onClick={() => router.push("/events")}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" className="flex-1" disabled={loading}>
                                {loading ? "Creating..." : "Create Event"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
