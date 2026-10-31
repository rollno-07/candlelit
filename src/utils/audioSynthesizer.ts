/**
 * Web Audio API Sound Synthesizer
 * Provides gentle low-volume romantic ambient melody, balloon pops, candle blows, and chimes.
 */

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isBgmPlaying: boolean = false;
  private listeners: Set<(isPlaying: boolean, isMuted: boolean) => void> = new Set();

  private bgmGainNode: GainNode | null = null;
  private melodyIntervalId: any = null;
  private currentStepIndex: number = 0;

  constructor() {
    // Audio will unlock on first user interaction
  }

  private initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master BGM gain node (Soft, low volume)
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(this.isMuted ? 0 : 0.14, this.ctx.currentTime);
      gain.connect(this.ctx.destination);
      this.bgmGainNode = gain;
    }

    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  public subscribe(cb: (isPlaying: boolean, isMuted: boolean) => void) {
    this.listeners.add(cb);
    cb(this.isBgmPlaying, this.isMuted);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.isBgmPlaying, this.isMuted));
  }

  public isPlaying(): boolean {
    return this.isBgmPlaying && !this.isMuted;
  }

  /**
   * Unlock Audio on interaction and start gentle ambient melody
   */
  public unlockAudio() {
    this.initContext();
    if (!this.isBgmPlaying) {
      this.startAmbientMelody();
    }
  }

  public playBGM() {
    this.unlockAudio();
  }

  public toggleMute(): boolean {
    this.initContext();
    this.isMuted = !this.isMuted;

    if (this.bgmGainNode && this.ctx) {
      const targetVolume = this.isMuted ? 0.0001 : 0.14;
      this.bgmGainNode.gain.cancelScheduledValues(this.ctx.currentTime);
      this.bgmGainNode.gain.linearRampToValueAtTime(targetVolume, this.ctx.currentTime + 0.3);
    }

    if (!this.isBgmPlaying && !this.isMuted) {
      this.startAmbientMelody();
    } else {
      this.notify();
    }

    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Gentle, soothing, low-volume romantic piano & music-box melody generator
   */
  private startAmbientMelody() {
    if (this.melodyIntervalId || typeof window === "undefined") return;

    this.isBgmPlaying = true;
    this.notify();

    // 4-Bar Romantic Chord Progression (Dmaj9 -> Bm7 -> Gmaj7 -> A7sus4)
    const chords = [
      // Dmaj9 (Warm, open, tender)
      { bass: 146.83, pad: [220.0, 277.18, 369.99], melody: [440.0, 554.37, 659.25, 739.99] },
      // Bm7 (Reflective, gentle)
      { bass: 123.47, pad: [185.0, 220.0, 293.66], melody: [587.33, 440.0, 493.88, 369.99] },
      // Gmaj7 (Hopeful, sweet)
      { bass: 98.0, pad: [146.83, 196.0, 246.94, 369.99], melody: [493.88, 587.33, 739.99, 659.25] },
      // A7sus4 / Aadd9 (Resolving with warmth)
      { bass: 110.0, pad: [164.81, 220.0, 277.18, 329.63], melody: [554.37, 440.0, 493.88, 440.0] },
    ];

    let chordIndex = 0;
    let step = 0;

    const playStep = () => {
      if (!this.ctx || !this.bgmGainNode || this.isMuted) return;

      const now = this.ctx.currentTime;
      const currentChord = chords[chordIndex];

      // At step 0 of each chord, strike the gentle bass & warm pad chord
      if (step === 0) {
        this.synthesizeSoftPianoNote(currentChord.bass, now, 3.8, 0.4);
        currentChord.pad.forEach((freq, idx) => {
          this.synthesizeSoftPianoNote(freq, now + idx * 0.05, 3.2, 0.25);
        });
      }

      // Sparkle individual melody notes at steps 0, 1, 2, 3
      const melodyFreq = currentChord.melody[step % currentChord.melody.length];
      if (melodyFreq) {
        this.synthesizeMusicBoxNote(melodyFreq, now + 0.1, 1.8, 0.35);
      }

      step = (step + 1) % 4;
      if (step === 0) {
        chordIndex = (chordIndex + 1) % chords.length;
      }
    };

    // Run first step immediately
    playStep();

    // Loop steps every 950ms (peaceful ~63 BPM tempo)
    this.melodyIntervalId = setInterval(playStep, 950);
  }

  /**
   * Synthesize a warm, velvety acoustic piano tone
   */
  private synthesizeSoftPianoNote(freq: number, startTime: number, duration: number, volumeFactor: number) {
    if (!this.ctx || !this.bgmGainNode) return;

    try {
      const osc = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startTime);

      // Subtle detune for rich acoustic depth
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(freq, startTime);
      osc2.detune.setValueAtTime(3.5, startTime);

      // Warm low-pass filter (removes any harsh high end)
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(850, startTime);
      filter.frequency.exponentialRampToValueAtTime(350, startTime + duration);

      // Smooth piano decay envelope
      const baseGain = 0.12 * volumeFactor;
      noteGain.gain.setValueAtTime(0.0001, startTime);
      noteGain.gain.linearRampToValueAtTime(baseGain, startTime + 0.04);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(filter);
      osc2.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(this.bgmGainNode);

      osc.start(startTime);
      osc2.start(startTime);
      osc.stop(startTime + duration + 0.1);
      osc2.stop(startTime + duration + 0.1);
    } catch {
      // Audio error
    }
  }

  /**
   * Synthesize a delicate music-box chime note
   */
  private synthesizeMusicBoxNote(freq: number, startTime: number, duration: number, volumeFactor: number) {
    if (!this.ctx || !this.bgmGainNode) return;

    try {
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startTime);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1600, startTime);
      filter.frequency.exponentialRampToValueAtTime(600, startTime + duration);

      const baseGain = 0.08 * volumeFactor;
      noteGain.gain.setValueAtTime(0.0001, startTime);
      noteGain.gain.linearRampToValueAtTime(baseGain, startTime + 0.015);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(this.bgmGainNode);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.05);
    } catch {
      // Audio error
    }
  }

  /**
   * Crisp, satisfying balloon pop sound effect
   */
  public playPopSound() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      const bufferSize = this.ctx.sampleRate * 0.08;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1200, now);
      filter.Q.setValueAtTime(2, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.35, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.09);

      oscGain.gain.setValueAtTime(0.45, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(oscGain);
      oscGain.connect(this.ctx.destination);

      whiteNoise.start(now);
      osc.start(now);
      whiteNoise.stop(now + 0.08);
      osc.stop(now + 0.1);
    } catch {
      // Ignore
    }
  }

  /**
   * Sparkling celebration chimes & fanfare
   */
  public playCheerSound() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 1.3);
      }, idx * 100);
    });
  }

  /**
   * Delicate swoosh for transitions
   */
  public playSwooshSound() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.15);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.22);
    } catch {
      // Audio error
    }
  }

  /**
   * Realistic breath/blow whoosh for extinguishing candles
   */
  public playBlowSound() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.45;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.7;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(650, now);
      filter.frequency.exponentialRampToValueAtTime(150, now + 0.4);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.28, now + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 0.45);
    } catch {
      // Audio error
    }
  }

  /**
   * Crisp, sweet slice sound for cutting the cake
   */
  public playSliceSound() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.18);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch {
      // Audio error
    }
  }
}

export const soundManager = new SoundManager();
