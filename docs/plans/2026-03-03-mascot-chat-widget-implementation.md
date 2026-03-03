# Mascot Chat Widget Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the floating green circle chat button with a sprite-animated mascot that walks on screen, waves, shows a "Need help?" speech bubble, and opens the existing chat panel on click.

**Architecture:** CSS sprite sheet animation on a `<div>` with `background-image` pointing at a 4x3 grid PNG (1024x1024, 256px/frame). State machine in React (`entering` -> `waving` -> `idle` -> `chatOpen`) drives CSS class swaps. `sessionStorage` tracks whether the entrance has played this session.

**Tech Stack:** React 19, Next.js 16 App Router, Tailwind CSS v4, CSS `@keyframes` with `steps()` for sprite animation, no new dependencies.

---

### Task 1: Add mascot CSS keyframes to globals.css

**Files:**
- Modify: `src/app/globals.css:123-131` (after the existing `animate-pulse-subtle` block)

**Step 1: Add all mascot keyframes and utility classes**

Append the following after the existing `.animate-pulse-subtle` rule (line 130) in `src/app/globals.css`:

```css
/* ─── Mascot sprite animation ─── */
.mascot-sprite {
  width: 100px;
  height: 100px;
  background: url('/images/mascot-sprite.png') no-repeat;
  background-size: 400% 300%; /* 4 cols x 3 rows */
  background-position: 0% 0%; /* frame 1: top-left */
}

/* Entrance: slide in from off-screen right */
@keyframes mascotSlideIn {
  from { transform: translateX(150%); }
  to { transform: translateX(0); }
}

/* Walk cycle: row 3, frames 9-12 (4 frames) */
@keyframes mascotWalk {
  from { background-position: 0% 200%; }
  to { background-position: 400% 200%; }
}

/* Wave: rows 1-2, frames 1-8 (8 frames across 2 rows)
   We step through: (0%,0%) (100%,0%) (200%,0%) (300%,0%) (0%,100%) (100%,100%) (200%,100%) (300%,100%)
   CSS steps can't wrap rows, so we use a single-row approach: just row 1 frames 1-4 */
@keyframes mascotWave {
  from { background-position: 0% 0%; }
  to { background-position: 400% 0%; }
}

/* Idle bob: gentle float */
@keyframes mascotBob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

/* Speech bubble entrance */
@keyframes bubbleFadeIn {
  from { opacity: 0; transform: translateY(4px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.mascot-entering {
  animation: mascotSlideIn 1.2s ease-out both, mascotWalk 0.4s steps(4) 3;
}

.mascot-waving {
  animation: mascotWave 0.6s steps(4) 2;
}

.mascot-idle {
  animation: mascotBob 2s ease-in-out infinite;
  background-position: 0% 0%; /* frame 1: waving pose */
}

.mascot-bubble {
  animation: bubbleFadeIn 0.3s ease-out both;
}
```

**Step 2: Verify the CSS is valid**

Run: `npx next build --no-lint 2>&1 | head -20` or start the dev server and confirm no CSS parse errors in the console.

**Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add mascot sprite animation keyframes"
```

---

### Task 2: Rewrite ChatWidget with mascot and state machine

**Files:**
- Modify: `src/components/chat/ChatWidget.tsx` (full rewrite of the render section, keep all chat logic)

**Step 1: Rewrite ChatWidget.tsx**

Replace the entire contents of `src/components/chat/ChatWidget.tsx` with:

```tsx
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const WELCOME_MESSAGE: Message = {
  role: 'assistant',
  content:
    "Hi! I'm the eTags Assistant. I can help you learn about our Vehicle Service Contracts, coverage tiers, or navigate the site. What can I help you with?",
};

function renderMessageContent(content: string) {
  const parts = content.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      return (
        <a key={i} href={linkMatch[2]} className="font-medium text-accent underline underline-offset-2 hover:text-accent-hover">
          {linkMatch[1]}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

type MascotState = 'entering' | 'waving' | 'idle' | 'chatOpen';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mascotState, setMascotState] = useState<MascotState>('idle');
  const [showBubble, setShowBubble] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Entrance animation sequence
  useEffect(() => {
    const hasEntered = sessionStorage.getItem('mascotEntered');
    if (hasEntered) {
      setMascotState('idle');
      setShowBubble(true);
      return;
    }

    // Play entrance sequence
    setMascotState('entering');

    // After slide-in completes (1.2s), switch to waving
    const waveTimer = setTimeout(() => {
      setMascotState('waving');
    }, 1200);

    // After waving completes (1.2s + 1.2s wave), switch to idle + show bubble
    const idleTimer = setTimeout(() => {
      setMascotState('idle');
      setShowBubble(true);
      sessionStorage.setItem('mascotEntered', 'true');
    }, 2400);

    return () => {
      clearTimeout(waveTimer);
      clearTimeout(idleTimer);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const openChat = useCallback(() => {
    setIsOpen(true);
    setMascotState('chatOpen');
    setShowBubble(false);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
    setMascotState('idle');
    setShowBubble(true);
  }, []);

  const handleMascotClick = useCallback(() => {
    if (isOpen) {
      closeChat();
    } else {
      openChat();
    }
  }, [isOpen, openChat, closeChat]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: 'user', content: trimmed };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) throw new Error('Chat request failed');

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      const decoder = new TextDecoder();
      let assistantContent = '';

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantContent += decoder.decode(value, { stream: true });
        const currentContent = assistantContent;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'assistant', content: currentContent };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "Sorry, I'm having trouble responding right now. Please try again or visit our [FAQ](/faq) page." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const spriteClass =
    mascotState === 'entering'
      ? 'mascot-entering'
      : mascotState === 'waving'
        ? 'mascot-waving'
        : 'mascot-idle';

  return (
    <>
      {/* Chat Panel */}
      {isOpen && (
        <div
          className="fixed bottom-28 right-4 z-50 flex w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-2xl sm:w-[400px] sm:right-6"
          style={{ height: 'min(500px, calc(100vh - 160px))' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-navy-900 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="mascot-sprite h-6 w-6 shrink-0" style={{ backgroundSize: '400% 300%', backgroundPosition: '0% 0%' }} />
              <span className="font-semibold text-white">eTags Assistant</span>
            </div>
            <button onClick={closeChat} className="rounded-lg p-1 text-navy-100 transition hover:bg-white/10 hover:text-white" aria-label="Close chat">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-accent text-white rounded-br-md'
                      : 'bg-navy-50 text-navy-900 rounded-bl-md'
                  }`}
                >
                  {msg.role === 'assistant' ? renderMessageContent(msg.content) : msg.content}
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
              <div className="flex justify-start">
                <div className="flex gap-1.5 rounded-2xl rounded-bl-md bg-navy-50 px-4 py-3">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-navy-500" style={{ animationDelay: '0ms' }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-navy-500" style={{ animationDelay: '150ms' }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-navy-500" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-navy-100 bg-white p-3">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question..."
                disabled={isLoading}
                className="flex-1 rounded-xl border border-navy-100 bg-navy-50 px-4 py-2.5 text-sm text-navy-900 placeholder:text-navy-500 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="rounded-xl bg-accent p-2.5 text-white transition hover:bg-accent-hover disabled:opacity-50 disabled:hover:bg-accent"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mascot + Speech Bubble */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end sm:right-6">
        {/* Speech Bubble */}
        {showBubble && !isOpen && (
          <button
            onClick={openChat}
            className="mascot-bubble mb-2 cursor-pointer rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-navy-900 shadow-lg transition hover:shadow-xl"
            aria-label="Open chat assistant"
          >
            Need help?
            {/* Triangle pointer */}
            <span className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 bg-white" />
          </button>
        )}

        {/* Mascot Sprite */}
        <button
          onClick={handleMascotClick}
          className={`mascot-sprite cursor-pointer transition-transform hover:scale-105 ${spriteClass}`}
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
        />
      </div>
    </>
  );
}
```

**Step 2: Verify it compiles**

Run: `npx next build --no-lint 2>&1 | tail -5`
Expected: Build succeeds, no TypeScript errors.

**Step 3: Commit**

```bash
git add src/components/chat/ChatWidget.tsx
git commit -m "feat: replace chat bubble with animated mascot widget"
```

---

### Task 3: Visual verification and tuning

**Files:**
- May modify: `src/app/globals.css` (timing tweaks)
- May modify: `src/components/chat/ChatWidget.tsx` (positioning tweaks)

**Step 1: Start dev server and verify mascot entrance**

Run: `npm run dev`

Open browser to `http://localhost:3000`. Verify:
- Mascot sprite slides in from the right with walk animation
- After walk completes, switches to wave animation
- After wave, speech bubble appears saying "Need help?"
- Mascot gently bobs in idle state

**Step 2: Verify chat interaction**

- Click the speech bubble -> chat panel opens, speech bubble hides
- Close chat -> returns to idle with speech bubble
- Click mascot directly -> toggles chat open/closed

**Step 3: Verify session tracking**

- Reload the page -> mascot should appear in idle state immediately (no walk-in)
- Open a new tab to same URL -> mascot should appear in idle state (same session)
- Close all tabs, open new one -> walk-in should play again (new session)

**Step 4: Tune animation timings if needed**

Adjust CSS durations in `globals.css` and JS timers in `ChatWidget.tsx` if:
- Walk feels too fast/slow (adjust `mascotSlideIn` duration and `mascotWalk` duration)
- Wave feels too fast/slow (adjust `mascotWave` duration)
- Bob feels too subtle/aggressive (adjust `mascotBob` translateY value)
- Speech bubble appears too early/late (adjust timeout in the useEffect)

**Step 5: Verify mobile responsiveness**

Resize browser to mobile width (~375px). Confirm:
- Mascot and speech bubble don't overflow viewport
- Chat panel still works at mobile widths
- Mascot doesn't overlap important content

**Step 6: Commit final adjustments**

```bash
git add src/app/globals.css src/components/chat/ChatWidget.tsx
git commit -m "fix: tune mascot animation timings and positioning"
```

---

### Task 4: Clean up old assets

**Files:**
- Delete: `Gemini_Generated_Image_tbwld5tbwld5tbwl.jpg` (old JPEG sprite attempt)
- Delete: `Gemini_Generated_Image_kk1myvkk1myvkk1m.png` (original unoptimized sprite)

**Step 1: Remove unused files from repo root**

```bash
rm Gemini_Generated_Image_tbwld5tbwld5tbwl.jpg
rm Gemini_Generated_Image_kk1myvkk1myvkk1m.png
```

**Step 2: Verify the sprite sheet in public/images is the optimized version**

```bash
ls -la public/images/mascot-sprite.png
```

Expected: ~600KB file (the optimized 1024x1024 version).

**Step 3: Commit cleanup**

```bash
git add -A
git commit -m "chore: clean up unused mascot image files"
```
