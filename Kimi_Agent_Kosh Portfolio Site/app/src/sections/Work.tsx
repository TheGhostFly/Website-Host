import { useNavigate } from 'react-router';
import ScrollReveal from '@/components/ScrollReveal';

const WORK_ITEMS = [
  {
    tag: 'Content Writing',
    title: 'Brand Voice Bible for a D2C Brand',
    desc: 'A 40-page strategic document defining tone, vocabulary, and messaging frameworks.',
    accent: '#c9a84c',
  },
  {
    tag: 'AI Experiment',
    title: 'Prompt of the Week Newsletter',
    desc: 'Weekly AI prompts for writers, built and curated using Claude. 200+ subscribers.',
    accent: '#e8d5a3',
  },
  {
    tag: 'Editorial',
    title: '30-Day Social Media Calendar',
    desc: 'Full content calendar with captions, hashtags, and visual direction for a lifestyle brand.',
    accent: 'rgba(201, 168, 76, 0.3)',
  },
  {
    tag: 'Video',
    title: 'YouTube Editing Pipeline Setup',
    desc: 'End-to-end workflow: raw footage to polished upload, built for a growing creator.',
    accent: '#8a6f2a',
  },
];

export default function Work() {
  const navigate = useNavigate();

  return (
    <section id="work" className="section-padding">
      <div className="container-main">
        <ScrollReveal>
          <h2 className="font-dm font-medium text-2xl md:text-[2.5rem] leading-tight md:leading-[1.2] tracking-[-0.02em] text-white-primary mb-12 md:mb-16">
            SELECTED WORK
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {WORK_ITEMS.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.12} distance={50}>
              <div className="group bg-charcoal border border-white-primary/[0.06] rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-gold/20 hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
                {/* Top accent strip */}
                <div
                  className="h-[3px] w-full"
                  style={{ backgroundColor: item.accent }}
                />
                <div className="p-6 md:p-8">
                  {/* Tag */}
                  <span className="inline-block font-dm text-[10px] font-medium uppercase tracking-[0.06em] bg-gold/10 text-gold px-3 py-1 rounded mb-4">
                    {item.tag}
                  </span>

                  {/* Title */}
                  <h3 className="font-dm font-medium text-lg md:text-[1.375rem] leading-[1.3] tracking-[-0.01em] text-white-primary mb-2">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="font-serif text-sm md:text-base leading-relaxed text-white-primary/70 mb-6">
                    {item.desc}
                  </p>

                  {/* Link - now navigates to /blogs */}
                  <button
                    onClick={() => navigate('/blogs')}
                    className="inline-block font-dm text-xs font-medium text-gold tracking-[0.02em] transition-all duration-300 group-hover:tracking-[0.08em] bg-transparent border-none p-0"
                  >
                    View &rarr;
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
