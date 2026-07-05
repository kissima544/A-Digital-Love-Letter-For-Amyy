import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Sparkles, Play, Pause } from "lucide-react";

export default function AudioPlayer({ isExperienceStarted }: { isExperienceStarted: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthIntervalsRef = useRef<number[]>([]);
  const masterVolumeRef = useRef<GainNode | null>(null);

  // Initialize sound when user starts experience
  useEffect(() => {
    if (isExperienceStarted && !isPlaying && !isMuted) {
      startSound();
    }
    return () => stopSound();
  }, [isExperienceStarted]);

  // Adjust synthesizer volume when mute toggled
  useEffect(() => {
    if (masterVolumeRef.current) {
      masterVolumeRef.current.gain.value = isMuted ? 0 : 0.45;
    }
  }, [isMuted]);

  const initSynth = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Master gain
      const masterGain = ctx.createGain();
      masterGain.gain.value = isMuted ? 0 : 0.45;
      masterGain.connect(ctx.destination);
      masterVolumeRef.current = masterGain;

      // Romantic chord progressions (warm frequencies in Hz)
      const chords = [
        [174.61, 220.00, 261.63, 329.63], // Fmaj7
        [130.81, 196.00, 261.63, 293.66, 329.63], // Cmaj9
        [110.00, 220.00, 261.63, 329.63, 392.00], // Am7
        [146.83, 196.00, 246.94, 293.66, 392.00], // G6
      ];

      let currentChordIndex = 0;

      const playPadNote = (freq: number, duration: number, delayTime: number) => {
        if (!ctx || ctx.state === "suspended") return;

        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gainNode = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + delayTime);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(400, ctx.currentTime + delayTime);
        filter.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + delayTime + duration * 0.5);
        filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + delayTime + duration);
        filter.Q.setValueAtTime(3, ctx.currentTime + delayTime);

        gainNode.gain.setValueAtTime(0, ctx.currentTime + delayTime);
        gainNode.gain.linearRampToValueAtTime(0.06, ctx.currentTime + delayTime + 2.0);
        gainNode.gain.setValueAtTime(0.06, ctx.currentTime + delayTime + duration - 2.0);
        gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + delayTime + duration);

        osc.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(masterGain);

        osc.start(ctx.currentTime + delayTime);
        osc.stop(ctx.currentTime + delayTime + duration);
      };

      const playChime = () => {
        if (!ctx || ctx.state === "suspended") return;

        const baseFreq = 800 + Math.random() * 1200;
        const duration = 1.5 + Math.random() * 2;
        
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gainNode = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(baseFreq * 0.98, ctx.currentTime + duration);

        filter.type = "bandpass";
        filter.frequency.setValueAtTime(baseFreq, ctx.currentTime);
        filter.Q.setValueAtTime(1.5, ctx.currentTime);

        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.025, ctx.currentTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

        osc.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(masterGain);

        osc.start();
        osc.stop(ctx.currentTime + duration);
      };

      const triggerChordProgression = () => {
        const chordNotes = chords[currentChordIndex];
        const noteDuration = 10;
        
        chordNotes.forEach((freq) => {
          playPadNote(freq, noteDuration, 0);
        });

        currentChordIndex = (currentChordIndex + 1) % chords.length;
      };

      triggerChordProgression();

      const padInterval = window.setInterval(triggerChordProgression, 8000);
      const chimeInterval = window.setInterval(() => {
        if (Math.random() > 0.3) {
          playChime();
        }
      }, 3500);

      synthIntervalsRef.current = [padInterval, chimeInterval];
    } catch (e) {
      console.error("Web Audio initialization failed:", e);
    }
  };

  const startSound = async () => {
    setIsPlaying(true);

    if (!audioCtxRef.current) {
      initSynth();
    } else if (audioCtxRef.current.state === "suspended") {
      await audioCtxRef.current.resume();
    }
  };

  const stopSound = () => {
    setIsPlaying(false);
    if (audioCtxRef.current && audioCtxRef.current.state === "running") {
      audioCtxRef.current.suspend();
    }
  };

  const togglePlayback = () => {
    if (isPlaying) {
      stopSound();
    } else {
      startSound();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div
      id="sound-control-widget"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-2.5 bg-white/80 hover:bg-white backdrop-blur-md rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-rose-100/60 transition-all duration-500 hover:scale-[1.02] select-none"
    >
      {/* Equalizer animation bar */}
      <div className="flex items-center gap-[3px] h-4 px-1.5 cursor-pointer" onClick={togglePlayback}>
        {[1, 2, 3, 4].map((bar) => (
          <div
            key={bar}
            className={`w-[3px] bg-rose-400 rounded-full transition-all duration-300 ${
              isPlaying && !isMuted ? "animate-pulse" : "h-1.5"
            }`}
            style={{
              height: isPlaying && !isMuted ? "100%" : "30%",
              animationDuration: isPlaying && !isMuted ? `${bar * 0.25 + 0.3}s` : "0s",
              animationDelay: `${bar * 0.15}s`,
            }}
          />
        ))}
      </div>

      {/* Mode identifier */}
      <div className="flex flex-col border-r border-rose-100/50 pr-3 text-left">
        <div
          className="text-[10px] uppercase tracking-wider font-sans font-medium text-amber-800/60 flex items-center gap-0.5 py-0.5 font-semibold"
          title="Celestial Synthesizer Sound"
        >
          <Sparkles className="w-2.5 h-2.5 text-rose-400 animate-pulse" />
          <span>Celestial Synth</span>
        </div>
      </div>

      {/* Simple toggle playback button */}
      <button
        onClick={togglePlayback}
        className="p-1.5 text-rose-500 hover:text-rose-600 rounded-full hover:bg-rose-50/50 transition-all duration-300 cursor-pointer"
        title={isPlaying ? "Pause melody" : "Play romantic melody"}
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </button>

      {/* Mute Button */}
      <button
        onClick={toggleMute}
        className="p-1.5 text-rose-500 hover:text-rose-600 rounded-full hover:bg-rose-50/50 transition-all duration-300 cursor-pointer"
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX className="w-4 h-4 text-rose-400/70" /> : <Volume2 className="w-4 h-4" />}
      </button>
    </div>
  );
}
