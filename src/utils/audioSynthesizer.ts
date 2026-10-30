/**
 * Web Audio API Sound Synthesizer & MP3 Player
 * Provides rich romantic ambient BGM, balloon pops, and celebratory chimes.
 * Automatically falls back to high quality Web Audio synthesis if external audio files are missing!
 */

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private bgmAudio: HTMLAudioElement | null = null;
  private bgmIntervalId: NodeJS.Timeout | null = null;
  private isBgmPlaying: boolean = false;

  private initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public unlockAudio() {
    this.initContext();
    if (!this.isBgmPlaying) {
      this.playBGM();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.bgmAudio) {
      this.bgmAudio.muted = this.isMuted;
    }
    if (this.isMuted) {
      if (this.bgmIntervalId) {
        clearInterval(this.bgmIntervalId);
        this.bgmIntervalId = null;
      }
    } else {
      if (!this.isBgmPlaying || !this.bgmAudio) {
        this.startSynthBGM();
      }
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playBGM() {
    if (this.isMuted) return;
    this.initContext();
    this.isBgmPlaying = true;

    // Try HTML5 Audio for /audio/bgm.mp3 first
    if (typeof window !== "undefined") {
      const audio = new Audio("/audio/bgm.mp3");
      audio.loop = true;
      audio.volume = 0.45;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.bgmAudio = audio;
          })
          .catch(() => {
            // File not found or unplayable: fallback to synthesized romantic piano arpeggio!
            this.startSynthBGM();
          });
      } else {
        this.startSynthBGM();
      }
    }
  }

  /**
   * Synthesizes a soft, romantic ambient chord progression (Cmaj9 - Am9 - Fmaj7 - Gadd9)
   * reminiscent of gentle music box and piano notes.
   */
  private startSynthBGM() {
    if (this.bgmIntervalId) return;

    // Chord note frequencies (Hz):
    // Cmaj9: C4 (261.6), E4 (329.6), G4 (392.0), B4 (493.9), D5 (587.3)
    // Am9:   A3 (220.0), C4 (261.6), E4 (329.6), G4 (392.0), B4 (493.9)
    // Fmaj7: F3 (174.6), A3 (220.0), C4 (261.6), E4 (329.6), A4 (440.0)
    // Gsus4: G3 (196.0), C4 (261.6), D4 (293.7), G4 (392.0), B4 (493.9)
    const chords = [
      [261.63, 329.63, 392.0, 493.88, 587.33, 659.25],
      [220.0, 261.63, 329.63, 392.0, 493.88, 523.25],
      [174.61, 220.0, 261.63, 329.63, 440.0, 523.25],
      [196.0, 261.63, 293.66, 392.0, 493.88, 587.33],
    ];

    let chordIdx = 0;
    let step = 0;

    const tick = () => {
      if (this.isMuted || !this.ctx) return;
      const currentChord = chords[chordIdx];
      const noteFreq = currentChord[step % currentChord.length];

      this.playGentleNote(noteFreq, 0.035, 1.8);

      step++;
      if (step >= currentChord.length) {
        step = 0;
        chordIdx = (chordIdx + 1) % chords.length;
      }
    };

    tick();
    this.bgmIntervalId = setInterval(tick, 600);
  }

  private playGentleNote(freq: number, gainValue: number, duration: number) {
    if (!this.ctx || this.isMuted) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(gainValue, this.ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.00001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration + 0.05);
    } catch {
      // AudioContext state error handler
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

    // Arpeggiated cheerful bells
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
}

export const soundManager = new SoundManager();
