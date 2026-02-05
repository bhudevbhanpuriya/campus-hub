import { Calendar, MapPin } from "lucide-react";
import { GradientOrb } from "@/components/gradient-orb";
import { CommentThread } from "@/components/comment-thread";

// Mock function to get event by ID
function getEventById(id: string) {
    const events = {
        "1": {
            id: "1",
            title: "Web Development Workshop",
            clubName: "Tech Club",
            clubAvatar: "/img.png",
            date: "January 15, 2026",
            time: "6:00 PM",
            venue: "Room 301",
            description: "Join us for an intensive workshop on modern web development. Learn React, Next.js, and best practices for building scalable applications.\n\nWe'll cover component architecture, state management, and deployment strategies. Perfect for beginners and intermediate developers looking to level up their skills.\n\nBring your laptop and be ready to code!",
            comments: [
                {
                    id: "1",
                    username: "newjeansbunnie",
                    avatar: "/img.png",
                    timestamp: "1 year ago",
                    text: "I know one thing, Sabrina Carpenter never disappoints",
                    likes: 42000,
                    replies: [
                        {
                            id: "1-1",
                            username: "ashleysheruktroblox",
                            avatar: "/img.png",
                            timestamp: "1 year ago",
                            text: "How are that early but your right ❤️",
                            likes: 21,
                        },
                        {
                            id: "1-2",
                            username: "Funnycontant-",
                            avatar: "/img.png",
                            timestamp: "1 year ago",
                            text: "❤️❤️😊",
                            likes: 6,
                        },
                    ],
                },
                {
                    id: "2",
                    username: "idkwhattosayhere01",
                    avatar: "/img.png",
                    timestamp: "1 year ago",
                    text: "@Haley__ no she did not.. the songs sound nothing alike",
                    likes: 4,
                },
                {
                    id: "3",
                    username: "techEnthusiast23",
                    avatar: "/img.png",
                    timestamp: "2 days ago",
                    text: "Can't wait for this workshop! Been wanting to learn Next.js for a while now 🚀",
                    likes: 15,
                },
                {
                    id: "4",
                    username: "codingNewbie",
                    avatar: "/img.png",
                    timestamp: "3 days ago",
                    text: "Is this beginner-friendly? I only know basic HTML/CSS",
                    likes: 8,
                    replies: [
                        {
                            id: "4-1",
                            username: "TechClub",
                            avatar: "/img.png",
                            timestamp: "3 days ago",
                            text: "Absolutely! We'll cover the fundamentals before diving into advanced topics. Perfect for beginners! 🎯",
                            likes: 12,
                        },
                    ],
                },
            ],
        },
        "2": {
            id: "2",
            title: "Annual Cultural Fest",
            clubName: "Cultural Society",
            clubAvatar: "/img.png",
            date: "January 20, 2026",
            time: "7:00 PM",
            venue: "Main Auditorium",
            description: "Experience the diversity of our campus community. Music, dance, food, and performances from around the world.\n\nThis year's fest features  student performances, cultural exhibitions, and international cuisine. Don't miss the grand finale with fireworks and live band.\n\nFree entry for all students. Invite your friends and family!",
            comments: [],
        },
        "3": {
            id: "3",
            title: "Hackathon 2026",
            clubName: "Computer Science Club",
            clubAvatar: "/img.png",
            date: "February 1, 2026",
            time: "9:00 AM",
            venue: "Innovation Lab",
            description: "24-hour coding marathon. Build something amazing, win prizes, and connect with fellow developers.\n\nCategories include AI/ML, Web3, FinTech, and Social Impact. Mentors from top tech companies will be available for guidance.\n\nForm teams of 2-4 or join as an individual. Registration required.",
            comments: [],
        },
    };

    return events[id as keyof typeof events] || null;
}

interface EventDetailPageProps {
    params: Promise<{ id: string }>;
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
    const { id } = await params;
    const event = getEventById(id);

    if (!event) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2>Event Not Found</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Floating Gradient Orb */}
            <GradientOrb color="purple" size={600} top="15%" right="-15%" animation="float-slow" />

            {/* Hero Section - Massive Title */}
            <section className="container mx-auto px-4 pt-24 md:pt-32 pb-16">
                <div className="max-w-5xl mx-auto space-y-8">
                    {/* Club Info with Avatar */}
                    <div className="flex items-center gap-3">
                        <img
                            src={event.clubAvatar}
                            alt={event.clubName}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <p className="text-sm uppercase tracking-wider text-muted-foreground">
                            {event.clubName}
                        </p>
                    </div>

                    {/* Event Title - Massive */}
                    <h1 className="text-display leading-tight">
                        {event.title}
                    </h1>

                    {/* Metadata */}
                    <div className="flex flex-wrap gap-6 text-base md:text-lg text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            <span>{event.date} • {event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5" />
                            <span>{event.venue}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Description */}
            <section className="container mx-auto px-4 pb-16">
                <div className="max-w-4xl mx-auto space-y-6">
                    {event.description.split('\n').map((paragraph, idx) => (
                        paragraph && (
                            <p key={idx} className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                                {paragraph}
                            </p>
                        )
                    ))}
                </div>
            </section>

            {/* RSVP Section - Minimal */}
            <section className="container mx-auto px-4 pb-16">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="inline-flex items-center justify-center h-12 px-8 text-base font-medium rounded-md bg-white text-black transition-all duration-300 hover:bg-white/90">
                            I'm Going
                        </button>
                        <button className="inline-flex items-center justify-center h-12 px-8 text-base font-medium rounded-md border border-white/20 transition-all duration-300 hover:bg-white hover:text-black">
                            Maybe
                        </button>
                        <button className="inline-flex items-center justify-center h-12 px-8 text-base font-medium rounded-md transition-all duration-300 hover:bg-white/10">
                            Not Interested
                        </button>
                    </div>
                </div>
            </section>

            {/* Comment Thread Section */}
            {event.comments && event.comments.length > 0 && (
                <section className="container mx-auto px-4 pb-32">
                    <div className="max-w-4xl mx-auto">
                        <CommentThread comments={event.comments} />
                    </div>
                </section>
            )}
        </div>
    );
}
