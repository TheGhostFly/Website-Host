import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import ScrollReveal from '@/components/ScrollReveal';

gsap.registerPlugin(ScrollTrigger);

interface BlogPost {
  id: string;
  tag: string;
  title: string;
  teaser: string;
  date: string;
  readTime: string;
  borderColor: string;
}

const ALL_POSTS: BlogPost[] = [
  {
    id: '1',
    tag: 'AI',
    title: 'How I Use Claude to 10x My First Draft Speed',
    teaser: 'A complete breakdown of my prompt chain, from ideation to polished outline. The exact templates I use every single day.',
    date: 'Mar 15, 2025',
    readTime: '6 min read',
    borderColor: '#c9a84c',
  },
  {
    id: '2',
    tag: 'Writing',
    title: "The Content Writer's Guide to AI Prompts",
    teaser: "Everything I learned about talking to machines so they write like humans. Prompt engineering isn't magic — it's craft.",
    date: 'Feb 28, 2025',
    readTime: '8 min read',
    borderColor: '#e8d5a3',
  },
  {
    id: '3',
    tag: 'Editing',
    title: 'What Managing a Content Team Taught Me About Writing',
    teaser: 'Writing is solitary. Editing is leadership. Here is what changed when I started managing other writers.',
    date: 'Feb 10, 2025',
    readTime: '5 min read',
    borderColor: 'rgba(201, 168, 76, 0.3)',
  },
  {
    id: '4',
    tag: 'Workflow',
    title: 'Why Every Writer Should Have a Notion OS',
    teaser: 'My second brain for ideas, drafts, and publishing pipelines. How I built a writing system that scales.',
    date: 'Jan 22, 2025',
    readTime: '7 min read',
    borderColor: '#8a6f2a',
  },
  {
    id: '5',
    tag: 'AI',
    title: 'Building a Newsletter with Claude: Behind the Scenes',
    teaser: 'From zero to 200+ subscribers. How I automated research, writing, and formatting with AI tools.',
    date: 'Jan 5, 2025',
    readTime: '10 min read',
    borderColor: '#c9a84c',
  },
  {
    id: '6',
    tag: 'Strategy',
    title: 'Brand Voice: How to Build One That Actually Sticks',
    teaser: 'The framework I use to create brand voice bibles for D2C brands. Tone, vocabulary, and messaging that scales.',
    date: 'Dec 18, 2024',
    readTime: '9 min read',
    borderColor: '#d4b86a',
  },
  {
    id: '7',
    tag: 'Video',
    title: 'From Script to Screen: My Video Editing Journey',
    teaser: 'Six months of learning DaVinci Resolve. The mistakes, the wins, and what I would do differently.',
    date: 'Dec 2, 2024',
    readTime: '6 min read',
    borderColor: '#b8993a',
  },
  {
    id: '8',
    tag: 'AI',
    title: 'ChatGPT vs Claude: A Writer\'s Honest Comparison',
    teaser: 'I used both for 30 days straight. Here is my unfiltered take on which one actually helps writers.',
    date: 'Nov 15, 2024',
    readTime: '7 min read',
    borderColor: '#c9a84c',
  },
  {
    id: '9',
    tag: 'Writing',
    title: 'The Art of the First Sentence',
    teaser: 'Hook readers in 10 words or less. Techniques from copywriting, fiction, and journalism that I use daily.',
    date: 'Oct 30, 2024',
    readTime: '5 min read',
    borderColor: '#e8d5a3',
  },
];

const CATEGORIES = ['All', 'AI', 'Writing', 'Editing', 'Workflow', 'Strategy', 'Video'];

export default function BlogShowcase() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Page load fade
    document.fonts.ready.then(() => {
      document.body.classList.add('loaded');
    });

    // Refresh ScrollTrigger
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
    };
  }, []);

  const filteredPosts = useMemo(() => {
    let posts = ALL_POSTS;
    if (activeCategory !== 'All') {
      posts = posts.filter((p) => p.tag === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.teaser.toLowerCase().includes(q) ||
          p.tag.toLowerCase().includes(q)
      );
    }
    return posts;
  }, [activeCategory, searchQuery]);

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-[100dvh] bg-near-black">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-[1000] bg-near-black/80 backdrop-blur-md border-b border-white-primary/5">
        <div className="container-main flex items-center justify-between py-5 md:py-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 font-dm text-sm font-medium text-white-primary/70 hover:text-gold transition-colors duration-300 group"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:-translate-x-1"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Portfolio
          </button>

          <span className="font-dm font-bold text-lg tracking-[0.12em] text-white-primary">
            KOSH
          </span>

          <span className="font-dm text-xs font-medium uppercase tracking-[0.08em] text-gold">
            Blog
          </span>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="container-main">
          <ScrollReveal>
            <span className="font-dm text-xs font-medium uppercase tracking-[0.08em] text-gold mb-6 block">
              THE ARCHIVE
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="font-dm font-bold text-4xl md:text-6xl lg:text-7xl tracking-[-0.03em] text-white-primary mb-4">
              Thoughts & Writing
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="font-serif text-base md:text-lg text-white-primary/70 max-w-[520px] mb-10">
              Essays on AI, writing craft, editorial workflows, and the tools
              that power modern creators. Written with curiosity, edited with
              discipline.
            </p>
          </ScrollReveal>

          {/* Search */}
          <ScrollReveal delay={0.3}>
            <div className="relative max-w-md">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white-primary/25"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-charcoal border border-white-primary/[0.06] rounded-lg pl-11 pr-4 py-3 font-dm text-sm text-white-primary placeholder:text-white-primary/25 focus:outline-none focus:border-gold/30 transition-colors duration-300"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Category Filter */}
      <section className="pb-10">
        <div className="container-main">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-dm text-xs font-medium uppercase tracking-[0.06em] px-4 py-2 rounded-md transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-gold text-near-black'
                    : 'bg-charcoal text-white-primary/50 border border-white-primary/[0.06] hover:text-white-primary hover:border-white-primary/15'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-24 md:pb-32">
        <div className="container-main">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-serif text-lg text-white-primary/40 italic">
                No articles found. Try a different search or category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, i) => (
                <ScrollReveal key={post.id} delay={i * 0.08} distance={40}>
                  <article
                    className="group bg-charcoal border border-white-primary/[0.06] rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-gold/15 hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)] h-full flex flex-col"
                  >
                    {/* Accent strip */}
                    <div
                      className="h-[3px] w-full"
                      style={{ backgroundColor: post.borderColor }}
                    />

                    <div className="p-6 flex flex-col flex-grow">
                      {/* Meta row */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="font-dm text-[10px] font-medium uppercase tracking-[0.06em] bg-gold/10 text-gold px-2.5 py-1 rounded">
                          {post.tag}
                        </span>
                        <span className="font-mono text-[10px] text-white-primary/30">
                          {post.date}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-dm font-medium text-base md:text-lg text-white-primary leading-[1.3] mb-3 group-hover:text-gold transition-colors duration-300">
                        {post.title}
                      </h3>

                      {/* Teaser */}
                      <p className="font-serif text-sm text-white-primary/60 leading-relaxed mb-6 flex-grow">
                        {post.teaser}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-white-primary/[0.06]">
                        <span className="font-mono text-[10px] text-white-primary/30">
                          {post.readTime}
                        </span>
                        <span className="font-dm text-xs font-medium text-gold tracking-[0.02em] transition-all duration-300 group-hover:tracking-[0.08em]">
                          Read &rarr;
                        </span>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-24 md:pb-32">
        <div className="container-main">
          <div className="bg-charcoal border border-gold/10 rounded-lg p-8 md:p-12 text-center max-w-2xl mx-auto">
            <h3 className="font-dm font-medium text-xl md:text-2xl text-white-primary mb-3">
              Want me to write for you?
            </h3>
            <p className="font-serif text-sm text-white-primary/60 mb-6">
              I take on select content writing and editorial projects.
              Let's talk about what you're building.
            </p>
            <button
              onClick={handleBack}
              className="font-dm text-xs font-medium uppercase tracking-[0.06em] bg-gold text-near-black px-8 py-3 rounded transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(201,168,76,0.3)]"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white-primary/[0.06] py-8">
        <div className="container-main">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-dm text-xs text-white-primary/30">
              &copy; 2025 Kosh. All words are original.
            </p>
            <button
              onClick={handleBack}
              className="font-dm text-xs font-medium uppercase tracking-[0.08em] text-white-primary/25 hover:text-gold transition-colors duration-300"
            >
              &larr; Back to Portfolio
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
