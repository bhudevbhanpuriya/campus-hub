import { ClubCard } from "@/components/club-card";
import { GradientOrb } from "@/components/gradient-orb";

export default function ClubsPage() {
    // Mock data
    const clubs = [
        {
            id: "1",
            name: "Tech Club",
            description: "Exploring technology through workshops, hackathons, and collaborative projects. Build the future with us.",
            memberCount: 245,
        },
        {
            id: "2",
            name: "Photography Society",
            description: "Capture moments, tell stories. Join us for photo walks, exhibitions, and masterclasses.",
            memberCount: 189,
        },
        {
            id: "3",
            name: "Entrepreneurship Club",
            description: "Turn ideas into reality. Connect with fellow innovators, learn from founders, and build your startup.",
            memberCount: 156,
        },
        {
            id: "4",
            name: "Music Collective",
            description: "From classical to contemporary. Jam sessions, concerts, and music production workshops.",
            memberCount: 203,
        },
        {
            id: "5",
            name: "Design Guild",
            description: "Visual design, UX/UI, and creative expression. Portfolio reviews, design sprints, and collaborations.",
            memberCount: 178,
        },
        {
            id: "6",
            name: "Debate Society",
            description: "Sharpen your argumentation skills. Weekly debates, public speaking workshops, and competitions.",
            memberCount: 134,
        },
    ];

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Floating Gradient Orbs */}
            <GradientOrb color="purple" size={550} top="8%" left="-10%" animation="float" />
            <GradientOrb color="yellow" size={480} bottom="15%" right="-8%" animation="float-reverse" />

            {/* Hero Section */}
            <section className="container mx-auto px-4 pt-24 md:pt-32 pb-16 md:pb-24">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-hero mb-6">CLUBS</h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
                        Find your community and connect with like-minded students
                    </p>
                </div>
            </section>

            {/* Clubs List */}
            <section className="container mx-auto px-4 pb-32">
                <div className="max-w-6xl mx-auto space-y-24 md:space-y-32">
                    {clubs.map((club, index) => (
                        <div key={club.id} className="flex gap-8 md:gap-12">
                            {/* Number */}
                            <div className="text-4xl md:text-5xl font-mono text-muted-foreground/20 pt-2">
                                {String(index + 1).padStart(2, "0")}
                            </div>
                            {/* Club Card */}
                            <div className="flex-1">
                                <ClubCard {...club} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
