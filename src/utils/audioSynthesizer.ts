/**
 * Web Audio API Sound Synthesizer & MP3 Player
 * Provides rich romantic ambient BGM, balloon pops, and celebratory chimes.
 */

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private bgmAudio: HTMLAudioElement | null = null;
  private isBgmPlaying: boolean = false;
  private listeners: Set<(isPlaying: boolean, isMuted: boolean) => void> = new Set();

  constructor() {
    if (typeof window !== "undefined") {
      this.initBgmAudio();
    }
  }

  private initBgmAudio() {
    if (!this.bgmAudio && typeof window !== "undefined") {
      const audio = new Audio("/audio/bgm.mp3");
      audio.loop = true;
      audio.volume = 0.7;
      audio.preload = "auto";
      this.bgmAudio = audio;

      audio.addEventListener("play", () => {
        this.isBgmPlaying = true;
        this.notify();
      });

      audio.addEventListener("pause", () => {
        this.isBgmPlaying = false;
        this.notify();
      });
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
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

  public unlockAudio() {
    this.initContext();
    this.initBgmAudio();

    if (this.bgmAudio) {
      this.bgmAudio.muted = this.isMuted;
      const playPromise = this.bgmAudio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isBgmPlaying = true;
            this.notify();
          })
          .catch(() => {
            // Auto-play was prevented by the browser. Waiting for user interaction.
            this.isBgmPlaying = false;
            this.notify();
          });
      }
    }
  }

  public playBGM() {
    this.unlockAudio();
  }

  public toggleMute(): boolean {
    this.initBgmAudio();
    this.isMuted = !this.isMuted;

    if (this.bgmAudio) {
      this.bgmAudio.muted = this.isMuted;
      if (!this.isMuted) {
        this.bgmAudio
          .play()
          .then(() => {
            this.isBgmPlaying = true;
            this.notify();
          })
          .catch(() => {});
      } else {
        this.notify();
      }
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
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

      // Noise buffer for snap
      const bufferSize = this.ctx.sampleRate * 0.08;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      // Filter for sharp pop
      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1200, now);
      filter.Q.setValueAtTime(2, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.4, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      // Low frequency sub-thump
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.09);

      oscGain.gain.setValueAtTime(0.5, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(oscGain);
      oscGain.connect(this.ctx.destination);

      whiteNoise.start(now);
      osc.start(now);
      whiteNoise.stop(now + 0.08);
      osc.stop(now + 0.1);
    } catch {
      // Ignore audio error
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

        gain.gain.setValueAtTime(0.2, now);
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
      // Soft knife glide tone
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
