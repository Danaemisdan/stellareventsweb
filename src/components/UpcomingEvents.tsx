import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Clock, MoveRight } from 'lucide-react';
import type { EventData } from './AdminPanel';

export function UpcomingEvents() {
  const [events, setEvents] = useState<EventData[]>([]);

  useEffect(() => {
    const fetchEvents = () => {
      const stored = localStorage.getItem('stellar_events');
      if (stored) {
        try {
          setEvents(JSON.parse(stored));
        } catch (e) {
          // Fallback to empty
        }
      }
    };

    fetchEvents();
    // Allow reactivity to localStorage changes in the same window (mostly for development)
    window.addEventListener('storage', fetchEvents);
    return () => window.removeEventListener('storage', fetchEvents);
  }, []);

  if (events.length === 0) {
    return null; // Don't show the section at all if there are no events
  }

  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Decorative gradient background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-fuchsia-900/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-t from-purple-900/10 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Upcoming <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-purple-400">Events</span>
            </h2>
            <p className="text-lg text-zinc-400">
              Join us at these spectacular upcoming events. Experience the magic of Stellar Events firsthand.
            </p>
          </div>
          <Button variant="outline" className="border-white/20 text-white hover:bg-white hover:text-black transition-colors rounded-full px-6">
            View All Events
          </Button>
        </div>

        <div className="flex overflow-x-auto pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 gap-6 snap-x snap-mandatory hide-scrollbar">
          {events.map((evt) => (
            <Card 
              key={evt.id} 
              className="min-w-[300px] w-[85vw] sm:w-[400px] shrink-0 snap-center bg-zinc-900/50 border-white/10 overflow-hidden group hover:border-fuchsia-500/50 transition-colors"
            >
              <div className="h-64 relative overflow-hidden">
                <img 
                  src={evt.bannerObjUrl} 
                  alt={evt.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                
                {/* Date Badge */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 text-white px-3 py-2 rounded-xl text-center shadow-xl">
                  <div className="text-2xl font-bold text-fuchsia-400 leading-none">
                    {new Date(evt.date).getDate() || '--'}
                  </div>
                  <div className="text-xs uppercase font-medium tracking-wider text-zinc-300 mt-1">
                    {new Date(evt.date).toLocaleString('default', { month: 'short' }) || 'TBD'}
                  </div>
                </div>
              </div>
              
              <div className="p-6 relative">
                {/* Decorative floating button */}
                <button className="absolute -top-6 right-6 w-12 h-12 bg-[#d600ff] hover:bg-[#b000d6] text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(214,0,255,0.4)] transition-transform hover:scale-110">
                  <MoveRight className="w-5 h-5 -rotate-45" />
                </button>

                <h3 className="text-2xl font-bold text-white mb-4 pr-10">{evt.title}</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-zinc-400">
                    <div className="w-8 h-8 rounded-full bg-fuchsia-500/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-fuchsia-400" />
                    </div>
                    <span className="text-sm font-medium truncate">{evt.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-zinc-400">
                    <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
                      <Calendar className="w-4 h-4 text-purple-400" />
                    </div>
                    <span className="text-sm font-medium">{evt.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-zinc-400">
                    <div className="w-8 h-8 rounded-full bg-pink-500/10 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4 text-pink-400" />
                    </div>
                    <span className="text-sm font-medium">{evt.time}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
