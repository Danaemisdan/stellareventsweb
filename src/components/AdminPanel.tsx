import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, Plus, Calendar, MapPin, Clock } from 'lucide-react';

export type EventData = {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  bannerObjUrl: string;
}

export const DEFAULT_EVENTS: EventData[] = [
  {
    id: '1',
    title: 'Aura Music Festival',
    location: 'Central Park West',
    date: '2026-07-15',
    time: '4:00 PM',
    bannerObjUrl: 'https://images.unsplash.com/photo-1540039155732-6761b54cbce7?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: 'Midnight Gala',
    location: 'The Grand Hotel',
    date: '2026-08-01',
    time: '8:00 PM',
    bannerObjUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800'
  }
];

export function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [events, setEvents] = useState<EventData[]>([]);
  
  // New event form state
  const [newTitle, setNewTitle] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newBannerUrl, setNewBannerUrl] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('stellar_events');
    if (stored) {
      try {
        setEvents(JSON.parse(stored));
      } catch (e) {
        setEvents(DEFAULT_EVENTS);
      }
    } else {
      setEvents(DEFAULT_EVENTS);
      localStorage.setItem('stellar_events', JSON.stringify(DEFAULT_EVENTS));
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'Stellar2026!!') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  const saveEvents = (updatedEvents: EventData[]) => {
    setEvents(updatedEvents);
    localStorage.setItem('stellar_events', JSON.stringify(updatedEvents));
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newLocation || !newDate || !newTime || !newBannerUrl) {
      alert('Please fill out all fields');
      return;
    }

    const newEvent: EventData = {
      id: Date.now().toString(),
      title: newTitle,
      location: newLocation,
      date: newDate,
      time: newTime,
      bannerObjUrl: newBannerUrl
    };

    saveEvents([...events, newEvent]);
    
    // Clear form
    setNewTitle('');
    setNewLocation('');
    setNewDate('');
    setNewTime('');
    setNewBannerUrl('');
  };

  const handleDeleteEvent = (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      saveEvents(events.filter(evt => evt.id !== id));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background ambient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[40vh] h-[40vh] bg-fuchsia-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[40vh] h-[40vh] bg-purple-600/20 rounded-full blur-[100px]" />

        <Card className="w-full max-w-md p-8 relative bg-white/5 border-white/10 backdrop-blur-xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-purple-400">
              Admin Portal
            </h1>
            <p className="text-zinc-400 mt-2">Sign in to manage events</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-zinc-300">Username</Label>
              <Input 
                type="text" 
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="bg-black/50 border-white/10 text-white" 
                placeholder="Enter admin username"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-300">Password</Label>
              <Input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="bg-black/50 border-white/10 text-white" 
                placeholder="Enter password"
              />
            </div>
            {error && <p className="text-red-400 text-sm font-medium">{error}</p>}
            <Button type="submit" className="w-full bg-[#d600ff] hover:bg-[#b000d6] text-white border-none h-12">
              Login securely
            </Button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <a href="/" className="text-sm text-zinc-500 hover:text-white transition-colors">
              &larr; Return to main site
            </a>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-purple-400">
              Manage Events
            </h1>
            <p className="text-zinc-400 mt-1">Add, edit, or remove upcoming events</p>
          </div>
          <div className="flex gap-4">
             <Button variant="outline" className="border-white/10" onClick={() => window.location.href = '/'}>
              View Live Site
             </Button>
             <Button variant="destructive" onClick={() => setIsAuthenticated(false)}>
              Log out
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Event Form */}
          <Card className="p-6 bg-zinc-900 border-white/10 lg:col-span-1 h-fit">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-fuchsia-500" />
              Add New Event
            </h2>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <div className="space-y-2">
                <Label>Event Title</Label>
                <Input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="e.g. Summer Gala 2026" className="bg-black/50 border-white/10" />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input value={newLocation} onChange={e => setNewLocation(e.target.value)} placeholder="e.g. The Grand Hotel" className="bg-black/50 border-white/10" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} className="bg-black/50 border-white/10 text-white [color-scheme:dark]" />
                </div>
                <div className="space-y-2">
                  <Label>Time</Label>
                  <Input type="time" value={newTime} onChange={e => setNewTime(e.target.value)} className="bg-black/50 border-white/10 text-white [color-scheme:dark]" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Banner Image URL</Label>
                <Input value={newBannerUrl} onChange={e => setNewBannerUrl(e.target.value)} placeholder="https://..." className="bg-black/50 border-white/10" />
                <p className="text-xs text-zinc-500">Paste a direct link to an image (Unsplash, Imgur, etc.)</p>
              </div>
              <Button type="submit" className="w-full bg-[#d600ff] hover:bg-[#b000d6] text-white border-none mt-4">
                Add Event to Carousel
              </Button>
            </form>
          </Card>

          {/* Current Events List */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold mb-6">Active Events ({events.length})</h2>
            
            {events.length === 0 ? (
              <div className="p-8 text-center border border-white/10 border-dashed rounded-xl bg-zinc-900/50">
                <p className="text-zinc-500">No upcoming events. Add one to see it on the site!</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {events.map((evt) => (
                  <Card key={evt.id} className="overflow-hidden bg-zinc-900 border-white/10 flex flex-col group">
                    <div className="h-40 relative overflow-hidden">
                      <img src={evt.bannerObjUrl} alt={evt.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <Button 
                        size="icon" 
                        variant="destructive" 
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleDeleteEvent(evt.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-bold text-lg mb-2 text-white">{evt.title}</h3>
                      <div className="space-y-2 text-sm text-zinc-400 mt-auto">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-fuchsia-500 shrink-0" />
                          <span className="truncate">{evt.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-fuchsia-500 shrink-0" />
                          <span>{evt.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-fuchsia-500 shrink-0" />
                          <span>{evt.time}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
            
            <div className="p-4 bg-fuchsia-950/30 border border-fuchsia-800/50 rounded-lg mt-8">
              <h3 className="text-fuchsia-400 font-semibold mb-1">Developer Note</h3>
              <p className="text-sm text-fuchsia-200/70">
                These events are currently saved to your browser's local storage for demonstration purposes. If you change devices or clear your cache, these events will disappear. Ask your developer to connect a database for permanent cloud storage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
