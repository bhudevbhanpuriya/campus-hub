"use client"

import { useState, useRef } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ImageUploadProps {
    label: string
    value: string
    onChange: (url: string) => void
    folder?: string
    disabled?: boolean
    required?: boolean
}

export function ImageUpload({
    label,
    value,
    onChange,
    folder = "campus-hub",
    disabled = false,
    required = false,
}: ImageUploadProps) {
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState("")
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validate file type
        if (!file.type.startsWith("image/")) {
            setError("Please select an image file")
            return
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError("File size must be less than 5MB")
            return
        }

        setError("")
        setUploading(true)

        try {
            const formData = new FormData()
            formData.append("file", file)
            formData.append("folder", folder)

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Failed to upload image")
            }

            onChange(data.url)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setUploading(false)
        }
    }

    const handleRemove = () => {
        onChange("")
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    return (
        <div className="space-y-2">
            <Label>
                {label} {required && "*"}
            </Label>

            {value ? (
                <div className="space-y-3">
                    <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border bg-muted">
                        <Image
                            src={value}
                            alt="Preview"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleRemove}
                        disabled={disabled}
                        className="w-full"
                    >
                        Remove Image
                    </Button>
                </div>
            ) : (
                <div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={disabled || uploading}
                        className="hidden"
                        id={`file-${label.replace(/\s+/g, "-").toLowerCase()}`}
                    />
                    <label
                        htmlFor={`file-${label.replace(/\s+/g, "-").toLowerCase()}`}
                        className={`
              flex flex-col items-center justify-center
              w-full h-32 rounded-lg border-2 border-dashed
              cursor-pointer transition-colors
              ${disabled || uploading
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:border-primary hover:bg-accent"
                            }
            `}
                    >
                        {uploading ? (
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                                <p className="text-sm text-muted-foreground">Uploading...</p>
                            </div>
                        ) : (
                            <div className="text-center">
                                <svg
                                    className="mx-auto h-8 w-8 text-muted-foreground mb-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                                <p className="text-sm text-muted-foreground">
                                    Click to upload image
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    PNG, JPG, GIF up to 5MB
                                </p>
                            </div>
                        )}
                    </label>
                </div>
            )}

            {error && (
                <p className="text-sm text-destructive">{error}</p>
            )}
            {!required && !error && (
                <p className="text-xs text-muted-foreground">Optional</p>
            )}
        </div>
    )
}
