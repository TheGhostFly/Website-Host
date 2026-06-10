import ScrollReveal from '@/components/ScrollReveal';

const SKILLS = [
  {
    icon: '\u2726',
    title: 'Content Writing',
    items: [
      'Blog posts & long-form',
      'Video scripts & podcasts',
      'Social copy & captions',
      'SEO-optimized articles',
    ],
    accent: '#c9a84c',
  },
  {
    icon: '\u25C8',
    title: 'Editorial Management',
    items: [
      'Content calendars',
      'Team coordination',
      'Brief writing & feedback',
      'Editorial strategy',
    ],
    accent: '#d4b86a',
  },
  {
    icon: '\u25A3',
    title: 'Video Editing',
    items: [
      'Rough cuts & assembly',
      'Transitions & pacing',
      'Audio sync & cleanup',
      '[Learning \u2014 growing fast]',
    ],
    accent: '#b8993a',
    learning: true,
  },
  {
    icon: '\u25C9',
    title: 'AI & Prompting',
    items: [
      'Prompt engineering',
      'Workflow automation',
      'Tool stacking (Claude, ChatGPT)',
      'AI-assisted first drafts',
    ],
    accent: '#8a6f2a',
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section-padding">
      <div className="container-main">
        <ScrollReveal>
          <h2 className="font-dm font-medium text-2xl md:text-[2.5rem] leading-tight md:leading-[1.2] tracking-[-0.02em] text-white-primary mb-12 md:mb-16">
            WHAT I DO
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS.map((skill, i) => (
            <ScrollReveal key={skill.title} delay={i * 0.1} distance={40}>
              <div
                className="relative bg-charcoal border border-white-primary/[0.06] rounded-lg p-6 md:p-8 h-full"
                style={{ borderLeft: `3px solid ${skill.accent}` }}
              >
                {/* Learning badge */}
                {skill.learning && (
                  <span className="absolute top-4 right-4 font-dm text-[9px] font-medium uppercase bg-gold/15 text-gold px-2 py-0.5 rounded">
                    LEARNING
                  </span>
                )}

                {/* Icon */}
                <span className="block text-2xl text-gold mb-4">{skill.icon}</span>

                {/* Title */}
                <h3 className="font-dm font-medium text-lg text-white-primary mb-4">
                  {skill.title}
                </h3>

                {/* Bullets */}
                <ul className="space-y-2.5">
                  {skill.items.map((item) => (
                    <li
                      key={item}
                      className="font-serif text-sm text-white-primary/70 leading-relaxed flex items-start gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-gold mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
