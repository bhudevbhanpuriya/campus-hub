"use client";

import { useState } from "react";
import Link from "next/link";
import { Users } from "lucide-react";
import { EventCard } from "@/components/event-card";
import { GradientOrb } from "@/components/gradient-orb";

// Mock function to get club by ID
function getClubById(id: string) {
    const clubs = {
        "1": {
            id: "1",
            name: "Tech Club",
            avatar: "/img.png",
            description: "Building the future through code, collaboration, and innovation. Join us for workshops, hackathons, and tech talks.",
            memberCount: 245,
            category: "Technology",
            founded: "2018",
            fullDescription: "The Tech Club is a community of students passionate about technology and innovation. We organize regular coding workshops, hackathons, and tech talks featuring industry experts.\n\nWhether you're a beginner learning your first programming language or an experienced developer working on complex projects, there's a place for you here.\n\nOur members have gone on to intern at top tech companies and launch successful startups. Join us to level up your skills and connect with fellow tech enthusiasts.",
            events: [
                {
                    id: "1",
                    title: "Web Development Workshop",
                    clubName: "Tech Club",
                    date: "January 15, 2026",
                    venue: "Room 301",
                    status: "Upcoming" as const,
                },
                {
                    id: "3",
                    title: "Hackathon 2026",
                    clubName: "Tech Club",
                    date: "February 1, 2026",
                    venue: "Innovation Lab",
                    status: "Upcoming" as const,
                },
            ],
        },
        "2": {
            id: "2",
            name: "Photography Society",
            avatar: "/img.png",
            description: "Capture moments, tell stories. A creative community for photographers of all skill levels.",
            memberCount: 189,
            category: "Arts & Media",
            founded: "2016",
            fullDescription: "The Photography Society brings together students who share a passion for visual storytelling. From street photography to studio portraits, we explore all facets of the craft.\n\nOur activities include photo walks, exhibitions, critiques, and workshops covering both technical skills and creative vision.\n\nMembers have access to club equipment and studio space. We also organize annual exhibitions to showcase student work.",
            events: [
                {
                    id: "4",
                    title: "Photography Exhibition",
                    clubName: "Photography Club",
                    date: "February 10, 2026",
                    venue: "Art Gallery",
                    status: "Upcoming" as const,
                },
            ],
        },
        "3": {
            id: "3",
            name: "Entrepreneurship Club",
            avatar: "/img.png",
            description: "Turn ideas into reality. Connect with innovators, learn from founders, and build your startup.",
            memberCount: 156,
            category: "Business",
            founded: "2019",
            fullDescription: "The Entrepreneurship Club is where aspiring founders connect, learn, and build. We host pitch competitions, startup workshops, and networking events with successful entrepreneurs and investors.\n\nOur mentorship program pairs students with experienced founders who provide guidance on everything from ideation to fundraising.\n\nMany of our members have launched successful startups, raised funding, and created meaningful impact. Join us to turn your ideas into reality.",
            events: [
                {
                    id: "6",
                    title: "Startup Meetup",
                    clubName: "Entrepreneurship Club",
                    date: "February 20, 2026",
                    venue: "Conference Hall",
                    status: "Upcoming" as const,
                },
            ],
        },
    };

    return clubs[id as keyof typeof clubs] || null;
}

interface ClubDetailPageProps {
    params: Promise<{ id: string }>;
}

export default async function ClubDetailPage({ params }: ClubDetailPageProps) {
    const { id } = await params;
    const club = getClubById(id);

    if (!club) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2>Club Not Found</h2>
                </div>
            </div>
        );
    }

    return (
        <ClubDetailClient club={club} />
    );
}

function ClubDetailClient({ club }: { club: ReturnType<typeof getClubById> }) {
    const [isJoined, setIsJoined] = useState(false);

    if (!club) return null;

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Floating Gradient Orb */}
            <GradientOrb color="blue" size={550} top="10%" left="-12%" animation="float" />

            {/* Hero Section */}
            <section className="container mx-auto px-4 pt-24 md:pt-32 pb-16">
                <div className="max-w-5xl mx-auto space-y-8">
                    {/* Club Avatar */}
                    <img
                        src={club.avatar}
                        alt={club.name}
                        className="w-20 h-20 rounded-full object-cover"
                    />

                    {/* Club Name - Massive */}
                    <h1 className="text-display leading-tight">
                        {club.name}
                    </h1>

                    {/* Description */}
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl">
                        {club.description}
                    </p>

                    {/* Metadata & Join */}
                    <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-2 text-base md:text-lg text-muted-foreground">
                            <Users className="h-5 w-5" />
                            <span>{club.memberCount} members</span>
                        </div>
                        <button
                            onClick={() => setIsJoined(!isJoined)}
                            className={`inline-flex items-center justify-center h-12 px-8 text-base font-medium rounded-md transition-all duration-300 ${isJoined
                                    ? "bg-white/10 border border-white/20 hover:bg-white/20"
                                    : "bg-white text-black hover:bg-white/90"
                                }`}
                        >
                            {isJoined ? "Leave Club" : "Join Club"}
                        </button>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="container mx-auto px-4 pb-16">
                <div className="max-w-5xl mx-auto space-y-8">
                    <h3 className="text-2xl md:text-3xl font-bold">About</h3>
                    {club.fullDescription.split('\n').map((paragraph, idx) => (
                        paragraph && (
                            <p key={idx} className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                                {paragraph}
                            </p>
                        )
                    ))}
                </div>
            </section>

            {/* Events Section */}
            {club.events && club.events.length > 0 && (
                <section className="container mx-auto px-4 pb-32">
                    <div className="max-w-5xl mx-auto space-y-12">
                        <h3 className="text-2xl md:text-3xl font-bold">Upcoming Events</h3>
                        <div className="space-y-16">
                            {club.events.map((event) => (
                                <EventCard key={event.id} {...event} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
