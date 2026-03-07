"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  MapPin,
  Mail,
  Menu,
  Phone,
  Send,
  X,
  MoveRight,
} from "lucide-react";

function Header() {
  const navigationItems = [
    {
      title: "Home",
      href: "/",
      description: "",
    },
    {
      title: "Services",
      description: "Explore our event planning services",
      items: [
        {
          title: "Corporate Events",
          href: "#services",
        },
        {
          title: "Weddings",
          href: "#services",
        },
        {
          title: "Social Events",
          href: "#services",
        },
        {
          title: "Virtual Events",
          href: "#services",
        },
      ],
    },
    {
      title: "About",
      description: "Learn more about our company",
      items: [
        {
          title: "Our Story",
          href: "#about",
        },
        {
          title: "Team",
          href: "#about",
        },
        {
          title: "Testimonials",
          href: "#about",
        },
        {
          title: "Contact",
          href: "#contact",
        },
      ],
    },
  ];

  const [isOpen, setOpen] = React.useState(false);

  return (
    <header className="w-full z-40 fixed top-0 left-0 bg-background/95 backdrop-blur-sm border-b">
      <div className="container relative mx-auto min-h-20 flex gap-4 flex-row lg:grid lg:grid-cols-3 items-center">
        <div className="justify-start items-center gap-4 lg:flex hidden flex-row">
          <NavigationMenu className="flex justify-start items-start">
            <NavigationMenuList className="flex justify-start gap-4 flex-row">
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.href ? (
                    <>
                      <NavigationMenuLink>
                        <Button variant="ghost">{item.title}</Button>
                      </NavigationMenuLink>
                    </>
                  ) : (
                    <>
                      <NavigationMenuTrigger className="font-medium text-sm">
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="!w-[450px] p-4">
                        <div className="flex flex-col lg:grid grid-cols-2 gap-4">
                          <div className="flex flex-col h-full justify-between">
                            <div className="flex flex-col">
                              <p className="text-base">{item.title}</p>
                              <p className="text-muted-foreground text-sm">
                                {item.description}
                              </p>
                            </div>
                            <Button size="sm" className="mt-10">
                              Book consultation
                            </Button>
                          </div>
                          <div className="flex flex-col text-sm h-full justify-end">
                            {item.items?.map((subItem) => (
                              <NavigationMenuLink
                                href={subItem.href}
                                key={subItem.title}
                                className="flex flex-row justify-between items-center hover:bg-muted py-2 px-4 rounded"
                              >
                                <span>{subItem.title}</span>
                                <MoveRight className="w-4 h-4 text-muted-foreground" />
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex lg:justify-center">
          <img src="/Fontpart.svg" alt="Stellar Events" className="h-16 w-auto object-contain drop-shadow-lg" />
        </div>
        <div className="flex justify-end gap-6 w-full items-center">
          <a href="#services" className="hidden md:inline text-sm font-medium hover:underline underline-offset-4 decoration-2 cursor-pointer transition-all">
            Services
          </a>
          <a href="#about" className="text-sm font-medium hover:underline underline-offset-4 decoration-2 cursor-pointer transition-all">
            About
          </a>
          <Button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm font-medium hover:underline underline-offset-4 decoration-2 cursor-pointer transition-all bg-[#d600ff] hover:bg-[#b000d6] text-white">
            Plan Event
          </Button>
        </div>
        <div className="flex w-12 shrink lg:hidden items-end justify-end">
          <Button variant="ghost" onClick={() => setOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          {isOpen && (
            <div className="absolute top-20 border-t flex flex-col w-full right-0 bg-background shadow-lg py-4 container gap-8">
              {navigationItems.map((item) => (
                <div key={item.title}>
                  <div className="flex flex-col gap-2">
                    {item.href ? (
                      <a
                        href={item.href}
                        className="flex justify-between items-center"
                      >
                        <span className="text-lg">{item.title}</span>
                        <MoveRight className="w-4 h-4 stroke-1 text-muted-foreground" />
                      </a>
                    ) : (
                      <p className="text-lg">{item.title}</p>
                    )}
                    {item.items &&
                      item.items.map((subItem) => (
                        <a
                          key={subItem.title}
                          href={subItem.href}
                          className="flex justify-between items-center"
                        >
                          <span className="text-muted-foreground">
                            {subItem.title}
                          </span>
                          <MoveRight className="w-4 h-4 stroke-1" />
                        </a>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

import { ParallaxScrollSecond } from "@/components/ui/parallax-scroll";

const parallaxImages = [
  "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1540039155733-56f1dea0ac11?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800",
];

function HeroSection() {
  const [showContent, setShowContent] = React.useState(false);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const heroSlides = [
    "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=2000"
  ];

  React.useEffect(() => {
    // Reveal text shortly before the mask zoom animation finishes
    const timer = setTimeout(() => setShowContent(true), 1200);

    // Slideshow interval
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearInterval(slideInterval);
    };
  }, [heroSlides.length]);

  const words = [
    { text: "Create", wordClass: "", letterClass: "text-white font-bold" },
    { text: "Unforgettable", wordClass: "animate-gradient-flow italic font-serif font-medium pr-2 md:pr-4", letterClass: "text-transparent" },
    { text: "Moments", wordClass: "", letterClass: "text-white font-bold" },
  ];

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-transparent">
      <style>{`
        .hero-mask-container {
          -webkit-mask-image: url('/Mainlogopart.svg'), linear-gradient(black, black);
          mask-image: url('/Mainlogopart.svg'), linear-gradient(black, black);
          -webkit-mask-position: center, center;
          mask-position: center, center;
          -webkit-mask-repeat: no-repeat, no-repeat;
          mask-repeat: no-repeat, no-repeat;
          -webkit-mask-size: 15vh, 100% 100%;
          mask-size: 15vh, 100% 100%;
          -webkit-mask-composite: destination-out;
          mask-composite: exclude;
          animation: maskZoom 1.5s cubic-bezier(0.8, 0, 0.4, 1) 0.5s forwards;
        }
        @keyframes maskZoom {
          0% {
            -webkit-mask-size: 15vh, 100% 100%;
            mask-size: 15vh, 100% 100%;
          }
          15%, 25% {
            -webkit-mask-size: 15vh, 100% 100%;
            mask-size: 15vh, 100% 100%;
          }
          100% {
            -webkit-mask-size: 3000vh, 100% 100%;
            mask-size: 3000vh, 100% 100%;
          }
        }
        .animate-gradient-flow {
          background: linear-gradient(to right, #8A2BE2, #800080, #800000, #FFFFFF, #800000, #800080, #8A2BE2);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: gradientFlow 3s linear infinite;
        }
        @keyframes gradientFlow {
          to {
            background-position: 200% center;
          }
        }
      `}</style>

      {/* LAYER 1: Background Slideshow (Bottom-most) */}
      <div className="absolute inset-0 z-0 bg-black">
        {heroSlides.map((slide, index) => (
          <motion.img
            key={slide}
            src={slide}
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSlide === index ? 0.9 : 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ))}
      </div>

      {/* LAYER 2: Intense, Highly Colorful Gradient Orbs directly blending with the Slideshow */}
      <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-100">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-purple-600/70 blur-[130px] animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-pink-500/60 blur-[110px] animate-pulse" style={{ animationDelay: '1s', animationDuration: '5s' }} />
        <div className="absolute bottom-[-10%] left-[20%] w-[70%] h-[70%] rounded-full bg-indigo-600/60 blur-[140px] animate-pulse" style={{ animationDelay: '2s', animationDuration: '6s' }} />
        <div className="absolute top-[40%] left-[40%] w-[50%] h-[50%] rounded-full bg-fuchsia-600/50 blur-[130px] animate-pulse" style={{ animationDelay: '3s', animationDuration: '7s' }} />
      </div>

      {/* LAYER 3: The Stencil Mask Curtain (Solid Purple with a Logo cutout zooming infinitely) */}
      <div className="absolute inset-0 z-10 bg-[#2d0b30] hero-mask-container pointer-events-none" />

      {/* LAYER 3: Dark Overlay to ensure text legibility once fully revealed, keeping it vibrant */}
      <motion.div
        className="absolute inset-0 z-10 bg-[#1a051d]/40 backdrop-blur-[2px] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 1 }}
      />

      <div className="relative z-20 container mx-auto px-4 md:px-6 text-center pointer-events-none mt-20 md:mt-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: showContent ? 1 : 0, scale: showContent ? 1 : 0.95 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto pointer-events-auto"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tighter text-white flex flex-wrap justify-center items-center drop-shadow-md">
            {words.map((wordObj, wordIndex) => (
              <span key={wordIndex} className={`inline-block mr-3 md:mr-6 last:mr-0 py-2 ${wordObj.wordClass || ""}`}>
                {wordObj.text.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: showContent ? 0 : 100, opacity: showContent ? 1 : 0 }}
                    transition={{
                      delay: showContent ? wordIndex * 0.1 + letterIndex * 0.03 : 0,
                      type: "spring",
                      stiffness: 150,
                      damping: 25,
                    }}
                    className={`inline-block ${wordObj.letterClass || "text-white font-bold"}`}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
            transition={{ delay: showContent ? 1.2 : 0, duration: 0.8 }}
          >
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-lg">
              From intimate gatherings to grand celebrations, we bring your vision to life with creativity, precision, and passion.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
            transition={{ delay: showContent ? 1.5 : 0, duration: 0.8 }}
          >
            <Button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} size="lg" className="w-full sm:w-auto text-lg h-14 px-8 group relative overflow-hidden text-white hover:text-white bg-[#d600ff] hover:bg-[#b000d6] border-none" variant="default">
              <span className="relative z-10 flex items-center gap-2">
                Plan Your Event
                <MoveRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 border-none bg-white text-black hover:bg-white/90 hover:text-black transition-colors duration-300">
              Contact Us
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div >
  );
}

import {
  ProgressSlider,
  SliderBtn,
  SliderBtnGroup,
  SliderContent,
  SliderWrapper,
} from "@/components/ui/progressive-carousel";

const serviceItems = [
  {
    img: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1169&auto=format&fit=crop",
    title: "Corporate Events",
    desc: "Professional conferences, team building, and corporate celebrations tailored for your business.",
    sliderName: "corporate",
  },
  {
    img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1170&auto=format&fit=crop",
    title: "Weddings",
    desc: "Dream weddings tailored to your unique love story with elegant arrangements and warm romantic lighting.",
    sliderName: "weddings",
  },
  {
    img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1169&auto=format&fit=crop",
    title: "Social Events",
    desc: "Lively and elegant social events, cocktail parties, and special celebrations.",
    sliderName: "social",
  },
  {
    img: "https://images.unsplash.com/photo-1519750783826-e2420f4d687f?q=80&w=1170&auto=format&fit=crop",
    title: "Venue Selection",
    desc: "Breathtaking locations and architectural masterpieces for every occasion and budget.",
    sliderName: "venue",
  },
];

function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Curating the <span className="animate-gradient-flow italic font-serif">Extraordinary</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive event planning solutions for every occasion
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <ProgressSlider
            vertical={false}
            activeSlider="corporate"
            className="overflow-hidden rounded-xl shadow-2xl relative"
          >
            <SliderContent>
              {serviceItems.map((item, index) => (
                <SliderWrapper key={index} value={item.sliderName}>
                  <img
                    className="w-full rounded-xl h-[600px] md:h-[700px] object-cover"
                    src={item.img}
                    alt={item.desc}
                  />
                  {/* Overlay gradient to ensure text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-xl" />
                </SliderWrapper>
              ))}
            </SliderContent>

            <SliderBtnGroup className="absolute bottom-0 w-full h-fit dark:text-white text-white bg-black/40 backdrop-blur-md overflow-hidden grid grid-cols-2 lg:grid-cols-4 rounded-b-xl border-t dark:border-white/10 border-white/20">
              {serviceItems.map((item, index) => (
                <SliderBtn
                  key={index}
                  value={item.sliderName}
                  className="text-left cursor-pointer p-4 transition-all hover:bg-[#d600ff]/10"
                  progressBarClass="bg-[#d600ff] h-1 top-0 left-0 w-full opacity-100"
                >
                  <h2 className="relative px-3 py-1 text-[10px] md:text-xs font-bold rounded-full w-fit bg-[#d600ff] text-white mb-2 shadow-md shrink-0">
                    {item.title}
                  </h2>
                  <p className="text-[10px] md:text-sm font-medium line-clamp-2 md:line-clamp-none opacity-90 text-white drop-shadow-md leading-tight md:leading-normal">
                    {item.desc}
                  </p>
                </SliderBtn>
              ))}
            </SliderBtnGroup>
          </ProgressSlider>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section id="contact" className="py-20 bg-transparent">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">Let's Create <span className="animate-gradient-flow italic font-serif">Magic</span> Together</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Ready to start planning your next unforgettable event? Contact us today for a free consultation.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Call Us</h3>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Email Us</h3>
                  <p className="text-muted-foreground">hello@stellarevents.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Visit Us</h3>
                  <p className="text-muted-foreground">123 Event Avenue<br />New York, NY 10001</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eventType">Event Type</Label>
                  <Input
                    id="eventType"
                    name="eventType"
                    placeholder="e.g., Wedding, Corporate Event"
                    value={formData.eventType}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your event..."
                    className="min-h-[120px]"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button type="submit" className="w-full gap-2 bg-[#d600ff] hover:bg-[#d600ff]/90 text-white">
                  Send Message
                  <Send className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-background/50 backdrop-blur-md">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <img src="/Mainlogopart.svg" alt="Stellar Events Logo" className="h-20 md:h-28 w-auto mb-6" />
            <p className="text-sm text-muted-foreground">
              Creating unforgettable moments since 2010. Your trusted partner in event planning excellence.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <nav className="space-y-2 text-sm">
              <a href="#" className="block transition-colors hover:text-primary">
                Home
              </a>
              <a href="#" className="block transition-colors hover:text-primary">
                Services
              </a>
              <a href="#" className="block transition-colors hover:text-primary">
                Portfolio
              </a>
              <a href="#" className="block transition-colors hover:text-primary">
                Contact
              </a>
            </nav>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Services</h3>
            <nav className="space-y-2 text-sm">
              <a href="#" className="block transition-colors hover:text-primary">
                Corporate Events
              </a>
              <a href="#" className="block transition-colors hover:text-primary">
                Weddings
              </a>
              <a href="#" className="block transition-colors hover:text-primary">
                Social Events
              </a>
              <a href="#" className="block transition-colors hover:text-primary">
                Virtual Events
              </a>
            </nav>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe for event planning tips and exclusive offers.
            </p>
            <form className="relative">
              <Input
                type="email"
                placeholder="Enter your email"
                className="pr-12"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8 rounded-full"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2024 Stellar Events. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm">
            <a href="#" className="transition-colors hover:text-primary">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              Terms of Service
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function EventPlanningHomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="relative z-10 w-full h-full">
        <Header />
        <HeroSection />
        {/* Acertenity Parallax Scroll Component mapped directly below Hero full-width with extra spacing to prevent bleed */}
        <div id="about" className="w-full bg-transparent pt-32 pb-16">
          <ParallaxScrollSecond images={parallaxImages} className="bg-transparent" />
        </div>
        <ServicesSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}

export default EventPlanningHomePage;
