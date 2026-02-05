import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Animated Gradient Orbs Background - CRZ.STUDIO Style */}
      <div className="fixed inset-0 -z-10">
        {/* Large Purple Orb - Top Right */}
        <div 
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-30 blur-[120px] animate-float-slow"
          style={{
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.8) 0%, rgba(147, 51, 234, 0.4) 40%, transparent 70%)',
            animationDelay: '0s'
          }}
        />
        
        {/* Large Orange Orb - Bottom Left */}
        <div 
          className="absolute -bottom-40 -left-40 w-[700px] h-[700px] rounded-full opacity-30 blur-[120px] animate-float-slow"
          style={{
            background: 'radial-gradient(circle, rgba(249, 115, 22, 0.8) 0%, rgba(249, 115, 22, 0.4) 40%, transparent 70%)',
            animationDelay: '2s'
          }}
        />
        
        {/* Medium Purple Orb - Center Left */}
        <div 
          className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full opacity-20 blur-[100px] animate-float-medium"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.7) 0%, rgba(168, 85, 247, 0.3) 50%, transparent 70%)',
            animationDelay: '1s'
          }}
        />
        
        {/* Medium Orange Orb - Center Right */}
        <div 
          className="absolute top-1/2 right-1/3 w-[500px] h-[500px] rounded-full opacity-25 blur-[110px] animate-float-medium"
          style={{
            background: 'radial-gradient(circle, rgba(251, 146, 60, 0.7) 0%, rgba(251, 146, 60, 0.3) 50%, transparent 70%)',
            animationDelay: '3s'
          }}
        />
        
        {/* Small Purple Accent - Top Center */}
        <div 
          className="absolute top-20 left-1/2 w-[300px] h-[300px] rounded-full opacity-15 blur-[80px] animate-float-fast"
          style={{
            background: 'radial-gradient(circle, rgba(192, 132, 252, 0.6) 0%, rgba(192, 132, 252, 0.2) 60%, transparent 80%)',
            animationDelay: '4s'
          }}
        />
        
        {/* Small Orange Accent - Bottom Right */}
        <div 
          className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full opacity-20 blur-[90px] animate-float-fast"
          style={{
            background: 'radial-gradient(circle, rgba(253, 186, 116, 0.6) 0%, rgba(253, 186, 116, 0.2) 60%, transparent 80%)',
            animationDelay: '5s'
          }}
        />

        {/* Subtle Grain Overlay for Texture */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Hero Section - Massive Text */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-6xl space-y-8">
          <h1 className="text-7xl md:text-9xl font-black tracking-tight leading-none">
            <span className="block bg-gradient-to-r from-purple-400 via-orange-400 to-purple-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              CAMPUS-HUB
            </span>
            <span className="block text-white/90 mt-4 px-2 text-7xl md:text-2xl">
              EVENTS & CLUBS
            </span>
          </h1>
          
          <Button 
            size="lg" 
            className="group bg-gradient-to-r from-purple-600 to-orange-600 hover:from-purple-700 hover:to-orange-700 text-white border-0 px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(147,51,234,0.5)]"
          >
            EXPLORE
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Services Section - Minimal List */}
      <section className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto space-y-24">
          {/* Feature 1 */}
          <div className="group border-t border-white/10 pt-8 hover:border-purple-500/50 transition-all duration-500">
            <div className="flex items-start justify-between gap-8">
              <span className="text-6xl font-light text-white/30 group-hover:text-purple-400 transition-colors duration-500">01</span>
              <div className="flex-1 space-y-4">
                <h3 className="text-4xl font-bold text-white group-hover:translate-x-2 transition-transform duration-500">Events</h3>
                <p className="text-lg text-white/60 max-w-2xl group-hover:text-white/80 transition-colors duration-500">
                  Discover campus events, workshops, and gatherings. RSVP and connect with your community.
                </p>
              </div>
              <ArrowRight className="h-8 w-8 text-white/20 group-hover:text-orange-400 group-hover:translate-x-2 transition-all duration-500 mt-2" />
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group border-t border-white/10 pt-8 hover:border-orange-500/50 transition-all duration-500">
            <div className="flex items-start justify-between gap-8">
              <span className="text-6xl font-light text-white/30 group-hover:text-orange-400 transition-colors duration-500">02</span>
              <div className="flex-1 space-y-4">
                <h3 className="text-4xl font-bold text-white group-hover:translate-x-2 transition-transform duration-500">Clubs</h3>
                <p className="text-lg text-white/60 max-w-2xl group-hover:text-white/80 transition-colors duration-500">
                  Join student organizations. Build skills, make friends, and create lasting connections.
                </p>
              </div>
              <ArrowRight className="h-8 w-8 text-white/20 group-hover:text-purple-400 group-hover:translate-x-2 transition-all duration-500 mt-2" />
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group border-t border-white/10 pt-8 hover:border-purple-500/50 transition-all duration-500">
            <div className="flex items-start justify-between gap-8">
              <span className="text-6xl font-light text-white/30 group-hover:text-purple-400 transition-colors duration-500">03</span>
              <div className="flex-1 space-y-4">
                <h3 className="text-4xl font-bold text-white group-hover:translate-x-2 transition-transform duration-500">Community</h3>
                <p className="text-lg text-white/60 max-w-2xl group-hover:text-white/80 transition-colors duration-500">
                  Connect with like-minded students and make the most of your campus experience.
                </p>
              </div>
              <ArrowRight className="h-8 w-8 text-white/20 group-hover:text-orange-400 group-hover:translate-x-2 transition-all duration-500 mt-2" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Minimal */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-5xl md:text-6xl font-bold leading-tight">
            Start Exploring
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/events">
              <Button 
                size="lg" 
                className="bg-purple-600 hover:bg-purple-700 text-white border-0 px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(147,51,234,0.4)]"
              >
                View Events
              </Button>
            </Link>
            <Link href="/clubs">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]"
              >
                Browse Clubs
              </Button>
            </Link>
          </div>
        </div>
      </section>


    </div>
  );
}