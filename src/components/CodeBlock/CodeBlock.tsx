import { useEffect, useRef, useState } from 'react';
import { Button } from '../Button';
import './CodeBlock.css';

export interface CodeBlockProps {
  filename?: string;
  code: string;
  language?: string;
  showCopy?: boolean;
}

export function CodeBlock({ filename, code, language, showCopy = true }: CodeBlockProps) {
  const [feedback, setFeedback] = useState<'copied' | 'error' | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  async function copyCode() {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(code);
      setFeedback('copied');
    } catch {
      setFeedback('error');
    }
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setFeedback(null), 2000);
  }

  return (
    <section className="code-block" aria-label={filename ? `Code example: ${filename}` : 'Code example'}>
      {(filename || showCopy) && (
        <header className="code-block__header">
          <span className="code-block__filename">{filename}</span>
          {showCopy && (
            <Button
              variant="tertiary"
              size="sm"
              label={feedback === 'copied' ? 'Copied' : feedback === 'error' ? 'Copy failed' : 'Copy'}
              iconLeft={feedback === 'copied' ? 'check' : 'copy'}
              onClick={copyCode}
            />
          )}
        </header>
      )}
      <pre className="code-block__pre"><code className={language ? `language-${language}` : undefined}>{code}</code></pre>
      <span className="code-block__status" role="status" aria-live="polite">
        {feedback === 'copied' ? 'Copied to clipboard' : feedback === 'error' ? 'Unable to copy code' : ''}
      </span>
    </section>
  );
}
