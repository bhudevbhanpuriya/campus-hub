import Link from "next/link";
import { Users, ArrowRight } from "lucide-react";

interface ClubCardProps {
    id: string;
    name: string;
    description: string;
    memberCount: number;
}

export function ClubCard({
    id,
    name,
    description,
    memberCount,
}: ClubCardProps) {
    return (
        <Link href={`/clubs/${id}`} className="group block">
            <article className="space-y-4 transition-smooth hover:opacity-70">
                {/* Title - Large */}
                <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                    {name}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-base leading-relaxed line-clamp-3">
                    {description}
                </p>

                {/* Metadata */}
                <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{memberCount} members</span>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>
            </article>
        </Link>
    );
}
