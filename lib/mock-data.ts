export interface Club {
  id: string
  name: string
  description: string
  memberCount: number
  image: string
  avatar: string
  category: string
}

export interface Event {
  id: string
  title: string
  description: string
  club: {
    id: string
    name: string
    avatar: string
  }
  date: string
  time: string
  venue: string
  status: "UPCOMING" | "TODAY" | "PAST"
  image: string
  attendeeCount: number
  interestedCount: number
}

export interface Comment {
  id: string
  author: {
    id: string
    name: string
    avatar: string
  }
  content: string
  createdAt: string
  votes: number
  userVote: "up" | "down" | null
  replies: Comment[]
}

export interface AISummary {
  summary: string
  sentiment: "positive" | "neutral" | "mixed"
  topTopics: string[]
  keyInsights: string[]
}

export const mockClubs: Club[] = [
  {
    id: "1",
    name: "Robotics Society",
    description:
      "Building the future through autonomous systems, competitive robotics, and hands-on engineering. We design, build, and program robots for national and international competitions.",
    memberCount: 142,
    image: "/images/club-1.jpg",
    avatar: "https://api.dicebear.com/9.x/initials/svg?seed=RS&backgroundColor=d97706",
    category: "Engineering",
  },
  {
    id: "2",
    name: "Aperture Club",
    description:
      "A community of visual storytellers exploring photography, cinematography, and visual arts. Weekly workshops, photo walks, and exhibition opportunities.",
    memberCount: 89,
    image: "/images/club-2.jpg",
    avatar: "https://api.dicebear.com/9.x/initials/svg?seed=AC&backgroundColor=7c3aed",
    category: "Arts",
  },
  {
    id: "3",
    name: "CodeCraft",
    description:
      "The premier coding community on campus. From competitive programming to open-source contributions, we push the boundaries of what's possible with code.",
    memberCount: 234,
    image: "/images/club-3.jpg",
    avatar: "https://api.dicebear.com/9.x/initials/svg?seed=CC&backgroundColor=0891b2",
    category: "Technology",
  },
  {
    id: "4",
    name: "Stage Ensemble",
    description:
      "Bringing stories to life through drama, theater, and performing arts. Annual productions, improv nights, and collaborative creative experiences.",
    memberCount: 67,
    image: "/images/club-4.jpg",
    avatar: "https://api.dicebear.com/9.x/initials/svg?seed=SE&backgroundColor=dc2626",
    category: "Arts",
  },
  {
    id: "5",
    name: "Quantum Finance",
    description:
      "Bridging the gap between finance theory and practice. Stock market simulations, case studies, and guest lectures from industry leaders.",
    memberCount: 112,
    image: "/images/event-3.jpg",
    avatar: "https://api.dicebear.com/9.x/initials/svg?seed=QF&backgroundColor=059669",
    category: "Business",
  },
  {
    id: "6",
    name: "EcoVanguard",
    description:
      "Champions of sustainability on campus. We organize clean-up drives, sustainability workshops, and advocate for greener campus policies.",
    memberCount: 78,
    image: "/images/event-4.jpg",
    avatar: "https://api.dicebear.com/9.x/initials/svg?seed=EV&backgroundColor=16a34a",
    category: "Environment",
  },
]

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "HackNova 2026",
    description:
      "A 36-hour hackathon bringing together the brightest minds on campus. Build innovative solutions, learn from mentors, and compete for exciting prizes. Whether you're a seasoned developer or just starting out, HackNova has something for everyone. Teams of 2-4 members can register. Food, beverages, and sleeping arrangements provided.\n\nThis year's themes include AI for Social Good, Sustainable Tech, and FinTech Innovation. Industry mentors from Google, Microsoft, and local startups will be available throughout the event.",
    club: {
      id: "3",
      name: "CodeCraft",
      avatar: "https://api.dicebear.com/9.x/initials/svg?seed=CC&backgroundColor=0891b2",
    },
    date: "2026-03-15",
    time: "10:00 AM - 10:00 PM (Next Day)",
    venue: "Innovation Center, Building 7",
    status: "UPCOMING",
    image: "/images/event-1.jpg",
    attendeeCount: 186,
    interestedCount: 342,
  },
  {
    id: "2",
    title: "Resonance Music Festival",
    description:
      "The annual campus music festival featuring student bands, solo artists, and special guest performances. An evening of rhythm, melody, and community under the stars.\n\nLineup includes The Campus Collective, DJ Prism, Acoustic Avenue, and a surprise headliner. Food trucks and art installations throughout the venue.",
    club: {
      id: "4",
      name: "Stage Ensemble",
      avatar: "https://api.dicebear.com/9.x/initials/svg?seed=SE&backgroundColor=dc2626",
    },
    date: "2026-02-20",
    time: "5:00 PM - 11:00 PM",
    venue: "Central Amphitheater",
    status: "TODAY",
    image: "/images/event-2.jpg",
    attendeeCount: 423,
    interestedCount: 891,
  },
  {
    id: "3",
    title: "Chromatic — Annual Art Exhibition",
    description:
      "A curated exhibition showcasing the best student artworks of the year. From digital art to oil paintings, sculptures to installations, experience the creative pulse of our campus.\n\nFeaturing works from 40+ student artists across all departments. Exhibition runs for 3 days with guided tours and artist talks.",
    club: {
      id: "2",
      name: "Aperture Club",
      avatar: "https://api.dicebear.com/9.x/initials/svg?seed=AC&backgroundColor=7c3aed",
    },
    date: "2026-02-28",
    time: "11:00 AM - 7:00 PM",
    venue: "University Gallery, Arts Block",
    status: "UPCOMING",
    image: "/images/event-3.jpg",
    attendeeCount: 95,
    interestedCount: 210,
  },
  {
    id: "4",
    title: "The Great Debate: AI & Ethics",
    description:
      "An intellectually stimulating debate on the ethical implications of artificial intelligence in modern society. Expert panelists, student debaters, and open Q&A sessions.\n\nTopics include AI in healthcare, autonomous weapons, deepfakes and democracy, and the future of work. Moderated by Prof. Sarah Chen.",
    club: {
      id: "3",
      name: "CodeCraft",
      avatar: "https://api.dicebear.com/9.x/initials/svg?seed=CC&backgroundColor=0891b2",
    },
    date: "2026-01-10",
    time: "2:00 PM - 5:00 PM",
    venue: "Main Auditorium",
    status: "PAST",
    image: "/images/event-4.jpg",
    attendeeCount: 310,
    interestedCount: 156,
  },
  {
    id: "5",
    title: "RoboWars Championship",
    description:
      "The ultimate test of engineering prowess. Watch student-built robots battle it out in the arena. Categories include sumo, line-follower, and freestyle combat.",
    club: {
      id: "1",
      name: "Robotics Society",
      avatar: "https://api.dicebear.com/9.x/initials/svg?seed=RS&backgroundColor=d97706",
    },
    date: "2026-04-05",
    time: "9:00 AM - 6:00 PM",
    venue: "Sports Complex, Hall B",
    status: "UPCOMING",
    image: "/images/club-1.jpg",
    attendeeCount: 78,
    interestedCount: 245,
  },
  {
    id: "6",
    title: "Green Campus Summit",
    description:
      "A day-long summit focused on campus sustainability initiatives, featuring workshops on composting, solar energy, and reducing carbon footprint.",
    club: {
      id: "6",
      name: "EcoVanguard",
      avatar: "https://api.dicebear.com/9.x/initials/svg?seed=EV&backgroundColor=16a34a",
    },
    date: "2026-03-22",
    time: "10:00 AM - 4:00 PM",
    venue: "Environmental Sciences Building",
    status: "UPCOMING",
    image: "/images/event-3.jpg",
    attendeeCount: 56,
    interestedCount: 134,
  },
]

export const mockComments: Comment[] = [
  {
    id: "c1",
    author: {
      id: "u1",
      name: "Arjun Mehta",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Arjun",
    },
    content:
      "This hackathon looks incredible! Will there be hardware kits available for IoT projects, or should we bring our own?",
    createdAt: "2026-02-05T14:30:00Z",
    votes: 12,
    userVote: null,
    replies: [
      {
        id: "c1r1",
        author: {
          id: "u2",
          name: "Priya Sharma",
          avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Priya",
        },
        content:
          "They had Arduino and Raspberry Pi kits last year! Check with the organizers on Discord.",
        createdAt: "2026-02-05T15:10:00Z",
        votes: 8,
        userVote: "up",
        replies: [
          {
            id: "c1r1r1",
            author: {
              id: "u3",
              name: "Rohan K",
              avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Rohan",
            },
            content:
              "Can confirm, they posted on the CodeCraft channel that hardware kits will be provided. Just need to register your interest in the IoT track.",
            createdAt: "2026-02-05T16:45:00Z",
            votes: 5,
            userVote: null,
            replies: [],
          },
        ],
      },
      {
        id: "c1r2",
        author: {
          id: "u4",
          name: "Maya Chen",
          avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Maya",
        },
        content:
          "I'm bringing my own ESP32 boards just in case. Happy to share if anyone needs!",
        createdAt: "2026-02-05T17:20:00Z",
        votes: 6,
        userVote: null,
        replies: [],
      },
    ],
  },
  {
    id: "c2",
    author: {
      id: "u5",
      name: "Kabir Patel",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Kabir",
    },
    content:
      "Last year's HackNova was life-changing for me. Met my co-founder there and we're now building a startup. Can't recommend this enough for anyone on the fence!",
    createdAt: "2026-02-04T10:15:00Z",
    votes: 24,
    userVote: "up",
    replies: [
      {
        id: "c2r1",
        author: {
          id: "u6",
          name: "Sneha R",
          avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sneha",
        },
        content:
          "That's so inspiring! What track did you participate in?",
        createdAt: "2026-02-04T11:00:00Z",
        votes: 3,
        userVote: null,
        replies: [],
      },
    ],
  },
  {
    id: "c3",
    author: {
      id: "u7",
      name: "Aisha Khan",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Aisha",
    },
    content:
      "Is this open to first-year students? I've only been coding for a few months but really want to participate and learn.",
    createdAt: "2026-02-06T09:00:00Z",
    votes: 15,
    userVote: null,
    replies: [
      {
        id: "c3r1",
        author: {
          id: "u8",
          name: "Dev Organizer",
          avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Dev",
        },
        content:
          "Absolutely! HackNova is open to all years. We have a dedicated beginner track with mentors who'll guide you through building your first project. It's one of the best learning experiences you can have!",
        createdAt: "2026-02-06T09:30:00Z",
        votes: 18,
        userVote: null,
        replies: [],
      },
    ],
  },
]

export const mockAISummary: AISummary = {
  summary:
    "The community is highly enthusiastic about HackNova 2026, with particular interest in IoT hardware availability and beginner-friendliness. Alumni testimonials highlight the event's career-changing potential. Key concerns revolve around resource availability and accessibility for newcomers.",
  sentiment: "positive",
  topTopics: ["Hardware Kits", "Beginner Friendly", "Networking", "IoT Track"],
  keyInsights: [
    "Strong demand for IoT and hardware-focused projects",
    "Alumni report significant career impact from past events",
    "First-year students are eager but need reassurance about skill requirements",
    "Community is actively sharing resources and offering help",
  ],
}

export const mockUserRsvps: Record<string, "GOING" | "INTERESTED" | "NOT_GOING"> = {
  "2": "GOING",
  "3": "INTERESTED",
}

export const mockUserClubs: string[] = ["1", "3"]
