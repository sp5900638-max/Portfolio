'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, 
  ArrowRight, 
  Lock, 
  Unlock, 
  Wifi, 
  Volume2, 
  VolumeX, 
  Terminal as TerminalIcon, 
  Activity,
  Cpu,
  Layers
} from 'lucide-react';

export default function Preloader({ onLoaded }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);

  const terminalLogs = [
    "[01/10] INITIATING QUANTUM ENCRYPTION TUNNEL...",
    "[02/10] ESTABLISHING UPLINK: NIE_MYSURU_CAMPUS_NET...",
    "[03/10] SCANNING FIREWALL PORTS & BYPASSING IDS LAYER...",
    "[04/10] INJECTING FASTAPI ASYNCHRONOUS WORKER POOLS...",
    "[05/10] MOUNTING QDRANT 1536-D VECTOR EMBEDDING VAULT...",
    "[06/10] CALCULATING COSINE SIMILARITY & HASH KEYS...",
    "[07/10] CRACKING 4096-BIT RSA CRYPTOGRAPHIC SHIELD...",
    "[08/10] DECRYPTING IDENTITY CLEARANCE: PRAVEEN.S...",
    "[09/10] OVERRIDING ROOT KERNEL // ACCESS CONFIRMED...",
    "[10/10] SYSTEM BREACH COMPLETE // WELCOME PRAVEEN.S",
  ];

  // Optional Cyber Sound Effects using Web Audio API
  const playBeep = (freq = 800, type = 'sine', duration = 0.04) => {
    if (!isAudioEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // AudioContext unavailable or blocked
    }
  };

  // Dual-Layer Cyber Matrix Canvas: Glowing Blue Data Streams + Dynamic Interconnected Nodes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Matrix characters: Binary, Hex, and Key Tech tokens
    const characters = '01PRAVEEN.S0123456789ABCDEF$#@*+<>~QDRANT_FASTAPI_NIE_MYSURU';
    const fontSize = 13;
    const columns = Math.floor(width / fontSize);
    const drops = Array(columns).fill(1);

    // Floating Cyber Network Nodes
    const nodeCount = Math.min(32, Math.floor(width / 40));
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      radius: Math.random() * 2 + 1.2,
    }));

    const render = () => {
      // Transparent clear to overlay on top of the hacker photo
      ctx.clearRect(0, 0, width, height);

      // Layer 1: Vertical Raining Blue & Cyan Matrix Code Streams
      ctx.font = `${fontSize}px 'Fira Code', 'Courier New', monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Render 1 in 2 columns to give a breathable, cinematic feel over the background
        if (i % 2 === 0) {
          const text = characters.charAt(Math.floor(Math.random() * characters.length));
          
          const rand = Math.random();
          if (rand > 0.94) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'; // Bright spark
            ctx.shadowColor = '#00f5ff';
            ctx.shadowBlur = 8;
          } else if (rand > 0.45) {
            ctx.fillStyle = 'rgba(0, 245, 255, 0.65)'; // Electric cyan
            ctx.shadowBlur = 0;
          } else {
            ctx.fillStyle = 'rgba(0, 102, 255, 0.5)'; // Deep cyber blue
            ctx.shadowBlur = 0;
          }

          ctx.fillText(text, i * fontSize, drops[i] * fontSize);

          if (drops[i] * fontSize > height && Math.random() > 0.98) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      }

      ctx.shadowBlur = 0;

      // Layer 2: Glowing Interconnected Network Lines
      ctx.fillStyle = 'rgba(0, 245, 255, 0.8)';

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.strokeStyle = `rgba(0, 245, 255, ${0.18 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Increased Time Limit: Extended to ~12-14 seconds with realistic cybersecurity breach tension
  useEffect(() => {
    let tickCount = 0;
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          playBeep(1200, 'triangle', 0.25);
          setTimeout(() => {
            setIsDone(true);
            if (onLoaded) onLoaded();
          }, 950);
          return 100;
        }

        tickCount++;

        // Add subtle tension pauses at critical security decryption hurdles
        const isHurdle = (prev === 28 || prev === 49 || prev === 73 || prev === 91);
        if (isHurdle && Math.random() > 0.45) {
          // Micro-pause on decryption hurdle
          return prev;
        }

        // Steady 1% progression per 95ms (~11-12s total duration)
        const increment = 1;
        const next = prev + increment;
        const capped = Math.min(next, 100);

        // Sound blip on keystrokes
        if (Math.random() > 0.45) {
          playBeep(420 + Math.random() * 550, 'sawtooth', 0.03);
        }

        // Stepper for 10-step log message
        const logIdx = Math.min(
          Math.floor((capped / 100) * terminalLogs.length),
          terminalLogs.length - 1
        );
        setCurrentLogIndex(logIdx);

        return capped;
      });
    }, 95);

    return () => clearInterval(timer);
  }, [onLoaded, isAudioEnabled]);

  const handleSkip = () => {
    setIsDone(true);
    if (onLoaded) onLoaded();
  };

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="hacker-preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.04, 
            filter: 'blur(12px)',
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-[#03050a] text-white p-4 sm:p-8 select-none overflow-hidden font-mono"
        >
          {/* 1. Cinematic Background: The User's Provided Hooded Hacker Photo */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.img
              src="/hacker-intro.jpg"
              alt="Cyber Hacker in Server Room"
              initial={{ scale: 1.10 }}
              animate={{ scale: 1 }}
              transition={{ duration: 14, ease: 'easeOut' }}
              className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.12]"
            />

            {/* Dark Vignettes & Radial Shading for High-Contrast Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#03050a] via-[#03050a]/40 to-[#03050a]/80" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#03050a]/50 to-[#03050a]/90" />
            
            {/* Ambient Cyan & Neon Blue Glow Pulses */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[550px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />

            {/* CRT Horizontal Scanlines Overlay */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.45) 50%)',
                backgroundSize: '100% 4px',
              }}
            />
          </div>

          {/* 2. Interactive Digital Matrix & Network Nodes Canvas Layer */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-1 pointer-events-none mix-blend-screen"
          />

          {/* 3. Top Telemetry Status Header */}
          <div className="relative z-10 w-full max-w-6xl flex items-center justify-between text-xs text-slate-300 border-b border-cyan-500/30 pb-3 pt-2 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-[11px] sm:text-xs">SEC_NET // PROTOCOL 0x7F</span>
              </div>
              <span className="hidden sm:inline text-slate-600">|</span>
              <span className="hidden sm:inline text-slate-300 text-[11px]">NODE: NIE_MYSURU_GATEWAY</span>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              {/* Audio SFX Toggle */}
              <button
                onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/60 border border-slate-700 hover:border-cyan-400 text-slate-300 text-[11px] transition-colors shadow-lg"
                title={isAudioEnabled ? "Mute Cyber SFX" : "Enable Cyber SFX"}
              >
                {isAudioEnabled ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    <span className="text-cyan-300 font-bold">AUDIO ON</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                    <span>AUDIO OFF</span>
                  </>
                )}
              </button>

              <div className="hidden sm:flex items-center gap-1.5 text-emerald-400">
                <Wifi className="w-3.5 h-3.5 animate-pulse" />
                <span className="text-[11px]">ENCRYPTED (10k+ RPS)</span>
              </div>

              {/* Instant Skip Button */}
              <button
                onClick={handleSkip}
                className="group flex items-center gap-1.5 px-3 py-1 rounded bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 hover:border-cyan-300 text-cyan-300 text-[11px] transition-all shadow-glow-cyan"
              >
                <span>ENTER DIRECTLY</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* 4. Centerpiece: Praveen.s Identity & Terminal Logs */}
          <div className="relative z-10 flex flex-col items-center justify-center my-auto w-full max-w-2xl text-center px-4">
            
            {/* Cyber Reticle Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/50 text-cyan-300 text-xs font-bold tracking-widest uppercase mb-4 shadow-glow-cyan backdrop-blur-md"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>SYSTEM INTRUSION // ROOT AUTHORIZED</span>
            </motion.div>

            {/* Exactly Requested Typography: Praveen.s */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-3 mb-6"
            >
              <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight font-display text-white drop-shadow-[0_0_40px_rgba(0,245,255,0.85)] flex items-center justify-center gap-1">
                <span>Praveen</span>
                <span className="text-cyan-400 animate-pulse">.s</span>
              </h1>

              {/* Subtitle */}
              <div className="text-xs sm:text-sm text-slate-200 font-mono tracking-wide drop-shadow-md">
                <span>FULL STACK DEVELOPER</span>
                <span className="text-cyan-400 mx-2">•</span>
                <span className="text-cyan-300">AI &amp; RAG SYSTEMS ARCHITECT</span>
              </div>
              <div className="text-[11px] sm:text-xs text-slate-300 font-mono tracking-wider drop-shadow-md">
                THE NATIONAL INSTITUTE OF ENGINEERING (NIE), MYSURU
              </div>
            </motion.div>

            {/* Cyber Terminal Console Box */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-full max-w-lg bg-[#050a14]/90 border border-cyan-500/40 rounded-xl p-4 sm:p-5 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] text-left mb-6 relative overflow-hidden"
            >
              {/* Corner HUD accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-cyan-500/20 text-[11px] text-slate-400 font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/90 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/90 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90 inline-block" />
                  <span className="ml-2 text-cyan-400 font-bold">praveen.s@cyber-node:~</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
                  <span className="text-cyan-400 font-bold text-xs">{progress}%</span>
                </div>
              </div>

              {/* Stepping Terminal Log Message */}
              <div className="text-xs sm:text-sm font-mono text-cyan-300 flex items-center gap-2 min-h-[26px]">
                <span className="text-slate-500 font-bold">&gt;</span>
                <span className="truncate tracking-wide">{terminalLogs[currentLogIndex]}</span>
                <span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse ml-auto" />
              </div>

              {/* Neon Progress Bar */}
              <div className="w-full bg-slate-900/90 rounded-full h-2 overflow-hidden mt-3.5 border border-cyan-500/30 p-0.5">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 rounded-full shadow-[0_0_15px_rgba(0,245,255,0.8)]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Minor Sub-Status */}
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mt-2 pt-1">
                <span>BUFFER: 10,240 KB</span>
                <span className="text-cyan-400">FASTAPI // QDRANT // DOCKER</span>
              </div>
            </motion.div>

            {/* Bottom Status Callout */}
            <div className="text-xs text-slate-300 font-mono flex items-center justify-center gap-2 drop-shadow">
              <Lock className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="tracking-wider">SYNCHRONIZING PORTFOLIO MAINFRAME...</span>
            </div>

          </div>

          {/* 5. Bottom Security Footer Info */}
          <div className="relative z-10 w-full max-w-6xl flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-300 pt-3 border-t border-cyan-500/20 backdrop-blur-sm">
            <div>
              [SECURITY CLEARANCE: LEVEL 5] • REPOSITORY ACCREDITATION: NIE MYSURU
            </div>
            <div className="text-cyan-400 font-semibold mt-1 sm:mt-0 tracking-wider">
              PRAVEEN.S • 2ND-YEAR CSE UNDERGRADUATE
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
