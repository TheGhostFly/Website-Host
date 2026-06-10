import ScrollReveal from '@/components/ScrollReveal';

const SERVICES = [
  {
    title: 'Content Writing',
    desc: 'Blog posts, newsletters, scripts, social copy. Words that move people.',
  },
  {
    title: 'Editorial Support',
    desc: 'Content strategy, calendar management, team briefs. Editorial systems that scale.',
  },
  {
    title: 'AI Consulting',
    desc: 'Prompt audits, workflow setup, tool recommendations. Make AI your creative partner.',
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="section-padding"
      style={{
        background:
          'linear-gradient(to bottom, #0a0a0a, #12100a), radial-gradient(ellipse at 50% 0%, rgba(201, 168, 76, 0.04) 0%, transparent 60%)',
        backgroundBlendMode: 'screen',
      }}
    >
      <div className="container-main">
        <div className="text-center mb-16">
          <ScrollReveal>
            <h2 className="font-dm font-medium text-2xl md:text-[2.5rem] leading-tight md:leading-[1.2] tracking-[-0.02em] text-white-primary mb-4">
              WORK WITH KOSH
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="font-serif italic text-lg md:text-xl text-gold">
              Words are strategy. Let's build yours.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1000px] mx-auto">
          {SERVICES.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.15} distance={50}>
              <div className="bg-charcoal border border-gold/10 rounded-lg p-8 md:p-10 h-full flex flex-col">
                <h3 className="font-dm font-medium text-lg md:text-[1.375rem] text-white-primary mb-3">
                  {service.title}
                </h3>
                <p className="font-serif text-sm md:text-base text-white-primary/70 leading-relaxed mb-6 flex-grow">
                  {service.desc}
                </p>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="block w-full text-center font-dm text-[13px] font-medium uppercase tracking-[0.06em] bg-gold text-near-black py-3 rounded transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(201,168,76,0.25)]"
                >
                  Get in Touch
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
