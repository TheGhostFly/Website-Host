import { useNavigate } from 'react-router';
import ScrollReveal from '@/components/ScrollReveal';

const POSTS = [
  {
    tag: 'AI',
    title: 'How I Use Claude to 10x My First Draft Speed',
    teaser: 'A breakdown of my exact prompt chain for blog outlines.',
    borderColor: '#c9a84c',
  },
  {
    tag: 'Writing',
    title: "The Content Writer's Guide to AI Prompts",
    teaser: 'Everything I learned about talking to machines so they write like humans.',
    borderColor: '#e8d5a3',
  },
  {
    tag: 'Editing',
    title: 'What Managing a Content Team Taught Me',
    teaser: 'Writing is solitary. Editing is leadership. Here is what changed.',
    borderColor: 'rgba(201, 168, 76, 0.3)',
  },
  {
    tag: 'Workflow',
    title: 'Why Every Writer Should Have a Notion OS',
    teaser: 'My second brain for ideas, drafts, and publishing pipelines.',
    borderColor: '#8a6f2a',
  },
];

export default function Blog() {
  const navigate = useNavigate();

  return (
    <section id="blog" className="section-padding">
      <div className="container-main">
        <div className="flex items-end justify-between mb-12">
          <ScrollReveal>
            <h2 className="font-dm font-medium text-2xl md:text-[2.5rem] leading-tight md:leading-[1.2] tracking-[-0.02em] text-white-primary">
              THOUGHTS & WRITING
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <button
              onClick={() => navigate('/blogs')}
              className="hidden md:inline-block font-dm text-xs font-medium text-gold tracking-[0.02em] transition-all duration-300 hover:tracking-[0.08em] bg-transparent border-none p-0"
            >
              View All &rarr;
            </button>
          </ScrollReveal>
        </div>

        {/* Horizontal scroll container */}
        <div
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {POSTS.map((post, i) => (
            <ScrollReveal
              key={post.title}
              direction="right"
              delay={i * 0.1}
              distance={60}
            >
              <article
                className="flex-shrink-0 w-[300px] md:w-[320px] bg-charcoal p-6 snap-start transition-all duration-300 hover:bg-charcoal/80"
                style={{ borderLeft: `3px solid ${post.borderColor}` }}
              >
                {/* Tag */}
                <span className="font-dm text-[10px] font-medium uppercase tracking-[0.06em] text-white-primary/40 mb-3 block">
                  {post.tag}
                </span>

                {/* Title */}
                <h3 className="font-dm font-medium text-base md:text-lg text-white-primary leading-[1.3] mb-2">
                  {post.title}
                </h3>

                {/* Teaser */}
                <p className="font-serif text-sm text-white-primary/60 leading-relaxed mb-4">
                  {post.teaser}
                </p>

                {/* Link - navigates to blog page */}
                <button
                  onClick={() => navigate('/blogs')}
                  className="inline-block font-dm text-xs font-medium text-gold tracking-[0.02em] transition-all duration-300 hover:tracking-[0.08em] bg-transparent border-none p-0"
                >
                  Read &rarr;
                </button>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile View All link */}
        <div className="mt-6 md:hidden text-center">
          <button
            onClick={() => navigate('/blogs')}
            className="font-dm text-xs font-medium text-gold tracking-[0.02em] transition-all duration-300 hover:tracking-[0.08em] bg-transparent border-none p-0"
          >
            View All Articles &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}
