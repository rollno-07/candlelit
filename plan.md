 🎂 Project Surprise: Birthday Web Experience (Nov 3)

An interactive, story-driven, 3D luxury web application designed as a birthday surprise for the fiancé. Built using **Next.js**, **Framer Motion**, **Three.js / Spline**, and the **Web Audio API**.

---

## 📌 Executive Summary
* **Target Delivery Date:** November 2, 2024 (Midnight Launch on Nov 3)
* **Target Audience:** The Fiancée (Mobile-first experience)
* **Tone & Theme:** Romantic, luxurious, emotional, magical
* **Color Palette:**
  * Background: Midnight Velvet (`#0a0714`)
  * Accents: Rose Gold (`#e0a96d`), Champagne Glow (`#ffbe53`)
  * Base: Frosted Glass (`rgba(255, 255, 255, 0.08)`)
* **Typography:** `Cormorant Garamond` (Serif / Letter) + `Inter` (UI)

---

## 🛠️ Tech Stack & Dependencies

```bash
# Core framework
npx create-next-app@latest birthday-surprise --typescript --tailwind --app --eslint

# Animations & 3D
npm install framer-motion @splinetool/react-spline @splinetool/runtime
# (Alternative for custom 3D: npm install three @react-three/fiber @react-three/drei)

# Visual Effects & Audio
npm install canvas-confetti howler lucide-react
npm install -D @types/canvas-confetti @types/howler
🎬 Narrative Flow (4-Act Journey)
code
Code
[ Act 1: The Invitation ] ──► [ Act 2: Pop the Memories ]
                                      │
                                      ▼
[ Act 4: The Love Letter ] ◄── [ Act 3: Candle & Cake ]
Act 1: The Invitation (Curtain Raiser)
Visuals: Dark starry ambient background with floating starlight particles.
Component: Glassmorphic glowing envelope/card: "A small world made just for you ✨".
Interaction:
Tap button: "Open My Gift".
Solves browser audio policy: Unlocks audio context and starts soft romantic piano BGM.
Camera zooms inward, transitioning to Act 2.
Act 2: Pop the Memories (Interactive Balloons)
Visuals: 5–7 floating pastel/rose-gold balloons bobbing gently via CSS/Framer Motion.
Interaction:
Tap balloon 
→
→
 pops with acoustic pop.mp3 + particle spark.
Each pop reveals a floating polaroid or romantic note:
"Your laugh that brightens my darkest days"
"Our first road trip together"
"My favorite person, my future wife"
Counter tracks pops. When 0 remain: Screen flashes softly into Act 3.
Act 3: The Cake Ceremony (Blow & Slice)
Part A: Candle Blowing (Microphone-Driven)
3D or layered high-end Cake model with lit candles flickering.
Primary Mechanic: Web Audio API analyzes microphone stream (navigator.mediaDevices.getUserMedia).
When input volume threshold 
>
65
dB
>65dB
 (blowing into mic) 
→
→
 flame turns into a smoke puff particle, candle extinguishes!
Fallback Mechanic: "Tap candle to blow" if microphone permission is denied.
Part B: Drag-to-Cut Cake
Guide message: "Draw a line to slice your cake 🍰".
Interaction: Touch/Pointer drag gesture across the cake.
Slicing trail follows finger with a golden glowing path.
Once drag distance 
>
160
px
>160px
, the cake splits in half with a spring physics animation.
Climax: Huge confetti blast (canvas-confetti) + cheering/party sound effect.
Act 4: The Streaming Letter (The Emotional Climax)
Visuals: Warm amber lighting, dimming background, soft glowing embers rising.
Typewriter Effect: Progressive streaming text typed out character-by-character at 
40
ms
40ms
 intervals.
Memory Carousel: 3–5 polaroid photos slowly fade in and float beside the text.
Ending: A final golden button revealing a personal voice message or video from the fiancé.
📂 Project Architecture
code
Text
src/
├── app/
│   ├── layout.tsx         # Font loading, metadata, global styles
│   ├── page.tsx           # State machine controlling Active Scene (1 -> 4)
│   └── globals.css        # Glassmorphism utilities, glow effects
├── components/
│   ├── Scene1Intro.tsx    # Envelope / Start trigger + audio unlock
│   ├── Scene2Balloons.tsx # Interactive floating balloons & pop notes
│   ├── Scene3Cake.tsx     # 3D/2.5D Cake, candle blow, cut gesture
│   ├── Scene4Letter.tsx   # Streaming typewriter letter + polaroids
│   ├── BackgroundFX.tsx   # Ambient floating particles/stars
│   └── MusicPlayer.tsx    # Floating persistent mute/unmute control
├── hooks/
│   ├── useMicrophoneBlow.ts # AudioContext frequency analyzer for mic blow
│   └── useSliceGesture.ts   # Pointer tracking for drag-to-slice
├── public/
│   ├── audio/
│   │   ├── bgm.mp3          # Soft piano love theme
│   │   ├── pop.mp3          # Balloon pop sound
│   │   └── cheer.mp3        # Birthday cheer/party horn
│   └── images/
│       └── polaroids/       # 4-5 photos of the couple
⏱️ Daily Execution Schedule
Day	Goal	Deliverable Tasks
Oct 29	Setup & Act 1	Next.js scaffold, fonts, layout, ambient background, scene state manager.
Oct 30	Act 2: Balloons	Balloon float animation, click-to-pop mechanics, modal memory cards.
Oct 31	Act 3: Cake & Blow	Microphone blow detection hook, drag-to-cut slice physics, confetti explosion.
Nov 01	Act 4: Letter & Assets	Typewriter streaming effect, add real letter text, photos, and music files.
Nov 02	QA & Mobile Polish	Test on real iOS & Android devices (Safari & Chrome). Check touch lag and audio autoplay.
Nov 03	Launch Day	Deliver private Vercel link via QR Code / Bouquet / Midnight Text.
⚠️ Critical Edge Cases & Solutions
iOS Audio Autoplay Policy:
Problem: iPhones block background music from playing automatically.
Solution: Audio initializes strictly on the first user click in Act 1 ("Open My Gift").
Microphone Permission Denied:
Problem: User might decline microphone access.
Solution: If permission is rejected or unsupported, immediately display a fallback prompt: "Tap the candle to blow!".
Mobile Touch Scroll Interference:
Problem: Dragging across the cake might trigger normal webpage scrolling.
Solution: Apply touch-action: none; and event.preventDefault() to the cake slicing container.
Performance on Low-end Phones:
Problem: Heavy 3D rendering can overheat or lag mobile browsers.
Solution: If using Spline/R3F, cap pixel ratio to 1.5 and optimize polycount. Alternatively, build the cake with layered CSS/Canvas 2.5D illustration.
📋 Content Checklist (From the Fiancé)

Background track selected (bgm.mp3)

5 short memories/reasons written (for balloon pop cards)

Heartfelt love letter written (for streaming text in Act 4)

4–5 favorite vertical photos gathered

Optional: 30-second personal voice note or video for the finale