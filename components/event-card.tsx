import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";

interface EventCardProps {
    id: string;
    title: string;
    clubName: string;
    date: string;
    venue: string;
    status: "Upcoming" | "Ongoing" | "Past";
}

export function EventCard({
    id,
    title,
    clubName,
    date,
    venue,
    status,
}: EventCardProps) {
    return (
        <Link href={`/events/${id}`} className="group block">
            <article className="space-y-4 transition-smooth hover:opacity-70">
                {/* Status */}
                <div className="flex items-center gap-3">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">
                        {status}
                    </span>
                    <span className="text-xs text-muted-foreground/50">/</span>
                    <span className="text-xs text-muted-foreground/70">{clubName}</span>
                </div>

                {/* Title - Large */}
                <h3 className="text-3xl md:text-4xl font-bold leading-tight line-clamp-2">
                    {title}
                </h3>

                {/* Metadata - Small */}
                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{venue}</span>
                    </div>
                </div>
            </article>
        </Link>
    );
}
