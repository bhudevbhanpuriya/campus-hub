import { EventCard } from "@/components/event-card";
import { GradientOrb } from "@/components/gradient-orb";

export default function EventsPage() {
    // Mock data
    const events = [
        {
            id: "1",
            title: "Web Development Workshop",
            clubName: "Tech Club",
            date: "January 15, 2026",
            venue: "Room 301",
            status: "Upcoming" as const,
        },
        {
            id: "2",
            title: "Annual Cultural Fest",
            clubName: "Cultural Society",
            date: "January 20, 2026",
            venue: "Main Auditorium",
            status: "Upcoming" as const,
        },
        {
            id: "3",
            title: "Hackathon 2026",
            clubName: "Computer Science Club",
            date: "February 1, 2026",
            venue: "Innovation Lab",
            status: "Upcoming" as const,
        },
        {
            id: "4",
            title: "Photography Exhibition",
            clubName: "Photography Club",
            date: "February 10, 2026",
            venue: "Art Gallery",
            status: "Upcoming" as const,
        },
        {
            id: "5",
            title: "Music Night",
            clubName: "Music Society",
            date: "February 14, 2026",
            venue: "Campus Theater",
            status: "Ongoing" as const,
        },
        {
            id: "6",
            title: "Startup Meetup",
            clubName: "Entrepreneurship Club",
            date: "February 20, 2026",
            venue: "Conference Hall",
            status: "Upcoming" as const,
        },
    ];

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Floating Gradient Orbs */}
            <GradientOrb color="orange" size={500} top="5%" right="-10%" animation="float-slow" />
            <GradientOrb color="blue" size={450} bottom="20%" left="-5%" animation="float" />

            {/* Hero Section */}
            <section className="container mx-auto px-4 pt-24 md:pt-32 pb-16 md:pb-24">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-hero mb-6">EVENTS</h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
                        Discover what's happening on campus
                    </p>
                </div>
            </section>

            {/* Events List */}
            <section className="container mx-auto px-4 pb-32">
                <div className="max-w-6xl mx-auto space-y-24 md:space-y-32">
                    {events.map((event, index) => (
                        <div key={event.id} className="flex gap-8 md:gap-12">
                            {/* Number */}
                            <div className="text-4xl md:text-5xl font-mono text-muted-foreground/20 pt-2">
                                {String(index + 1).padStart(2, "0")}
                            </div>
                            {/* Event Card */}
                            <div className="flex-1">
                                <EventCard {...event} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
