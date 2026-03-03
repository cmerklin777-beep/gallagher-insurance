# Mascot Chat Widget Design

## Overview

Replace the floating green circle chat bubble with an animated mascot character that walks onto the screen on first visit, offers help via a speech bubble, and opens the existing chat panel when clicked.

## Assets

- `public/images/mascot-sprite.png` — 2048x2048 RGBA PNG, 12 frames in 4x3 grid (~512x512 per frame), transparent background
- `public/images/mascot.png` — Static waving pose (fallback), moved from repo root `Mascot.png`
- Frame layout: Row 1 (frames 1-4) wave start, Row 2 (frames 5-8) wave-to-walk transition, Row 3 (frames 9-12) walk cycle

## Animation Sequences

### Entrance (first visit per session, ~2s total)

1. Mascot slides in from off-screen right using CSS `translateX`, playing walk cycle frames (frames 7-12) via `background-position` stepping with `steps(6)`
2. Walk animation plays for ~1.2s while mascot translates to final position
3. Walk stops, switches to wave sequence (frames 1-6, plays once, ~0.8s)
4. Speech bubble fades in with "Need help?" text (0.3s fade, 0.3s delay after wave ends)

### Idle (after entrance or on return visits)

- Static frame 1 (waving pose)
- Gentle CSS bob animation (2-3px vertical oscillation, 2s cycle, infinite)
- Speech bubble remains visible

### Chat open

- Speech bubble hides
- Chat panel appears (existing panel, unchanged)
- Mascot remains visible behind/below chat panel

### Chat close

- Chat panel closes
- Returns to idle state (mascot + speech bubble)

## Session Tracking

- `sessionStorage.setItem('mascotEntered', 'true')` after entrance completes
- On mount: check `sessionStorage.getItem('mascotEntered')`
  - If absent: play full entrance sequence
  - If present: skip to idle state immediately

## Component States

```
type MascotState = 'entering' | 'waving' | 'idle' | 'chatOpen';
```

State transitions:
- Mount (first visit) -> `entering` -> `waving` -> `idle`
- Mount (return visit) -> `idle`
- Click speech bubble or mascot -> `chatOpen`
- Close chat -> `idle`

## CSS Keyframes (in globals.css)

1. `@keyframes mascotSlideIn` — translateX(120%) to translateX(0), ease-out
2. `@keyframes mascotWalk` — steps through walk frames (row 3) via background-position
3. `@keyframes mascotWave` — steps through wave frames (rows 1-2) via background-position
4. `@keyframes mascotBob` — subtle translateY oscillation for idle
5. `@keyframes bubbleFadeIn` — opacity 0 to 1, slight scale

## Sprite Sheet Technique

```css
.mascot-sprite {
  width: 100px;
  height: 100px;
  background: url('/images/mascot-sprite.png') no-repeat;
  background-size: 400% 300%; /* 4 cols x 3 rows */
}

/* Walk cycle: frames 9-12 (row 3, first 4 frames) */
@keyframes mascotWalk {
  from { background-position: 0% 200%; }
  to { background-position: 300% 200%; }
}

.walking {
  animation: mascotWalk 0.5s steps(4) infinite;
}
```

## Speech Bubble

- Positioned above the mascot with CSS
- White background, rounded corners, small triangle pointer
- Text: "Need help?"
- Clickable (cursor: pointer)
- On click: opens chat panel

## Files Changed

1. `src/components/chat/ChatWidget.tsx` — Replace floating circle with sprite mascot + speech bubble + state machine
2. `src/app/globals.css` — Add keyframes for mascotSlideIn, mascotWalk, mascotWave, mascotBob, bubbleFadeIn
3. `public/images/mascot-sprite.png` — Already placed
4. `public/images/mascot.png` — Move from repo root Mascot.png (static fallback)

## Unchanged

- Chat panel UI, message rendering, API integration — all remain exactly as-is
- Chat API route (`/api/chat/route.ts`) — untouched
- Chatbot knowledge base — untouched

## Performance

- Sprite sheet is a single 6.2MB PNG (could be optimized with compression)
- All animations use CSS transforms (GPU-accelerated)
- No JavaScript animation libraries
- sessionStorage check is synchronous and fast
