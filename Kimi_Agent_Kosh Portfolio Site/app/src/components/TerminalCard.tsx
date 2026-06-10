import { useTypewriter } from '@/hooks/useTypewriter';
import { useEffect, useState } from 'react';

interface TerminalCardProps {
  startTyping?: boolean;
}

export default function TerminalCard({ startTyping = false }: TerminalCardProps) {
  const terminalText = `> name: "Kosh"
> role: ["Content Writer", "Editor", "AI Enthusiast"]
> status: "Open to Work"
> vibe: "Creating loudly, learning quietly"
> tools: ["ChatGPT", "Claude", "Notion", "Canva"]`;

  const [typingStarted, setTypingStarted] = useState(false);

  useEffect(() => {
    if (startTyping) {
      const timer = setTimeout(() => {
        setTypingStarted(true);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [startTyping]);

  const { displayedText, isComplete } = useTypewriter({
    text: terminalText,
    speed: 40,
    start: typingStarted,
  });

  return (
    <div className="bg-charcoal border border-gold/15 rounded-lg p-6 md:p-8 shadow-[0_0_60px_rgba(201,168,76,0.05)]">
      {/* Terminal Chrome */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 rounded-full bg-red-500" />
        <div className="w-2 h-2 rounded-full bg-gold" />
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <span className="ml-3 font-mono text-xs text-white-primary/30">
          kosh@portfolio:~
        </span>
      </div>

      {/* Terminal Content */}
      <pre className="font-mono text-[13px] leading-[1.8] overflow-x-auto">
        <code>
          {displayedText.split('\n').map((line, i) => {
            const [keyPart, ...valueParts] = line.split(': ');
            const valuePart = valueParts.join(': ');
            return (
              <div key={i}>
                {keyPart && (
                  <>
                    <span className="text-gold">{keyPart}</span>
                    {valuePart && (
                      <span className="text-white-primary">: {valuePart}</span>
                    )}
                  </>
                )}
              </div>
            );
          })}
          {!isComplete && typingStarted && (
            <span className="animate-caret-blink text-gold">_</span>
          )}
          {isComplete && (
            <span className="animate-caret-blink text-gold">_</span>
          )}
        </code>
      </pre>
    </div>
  );
}
