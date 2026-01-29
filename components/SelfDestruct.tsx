
import React, { useState, useEffect } from 'react';

interface SelfDestructProps {
  onAbort: () => void;
  onAnnihilate: () => void;
}

const SelfDestruct: React.FC<SelfDestructProps> = ({ onAbort, onAnnihilate }) => {
  const [timeLeft, setTimeLeft] = useState(15);
  const [isExploding, setIsExploding] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleAnnihilate();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnnihilate = () => {
    setIsExploding(true);
    setTimeout(() => {
      onAnnihilate();
    }, 1500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-6 overflow-hidden transition-all duration-1000 ${isExploding ? 'bg-white scale-150' : ''}`}>
      <div className={`absolute inset-0 crt-flicker z-0 ${isExploding ? 'hidden' : ''}`}></div>
      <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_#ff3b3b22_0%,_transparent_70%)] pointer-events-none ${isExploding ? 'bg-white' : ''}`}></div>
      
      {isExploding && (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center animate-pulse">
           <h2 className="text-black text-9xl font-black italic uppercase tracking-tighter scale-150 rotate-3">BOOM!</h2>
           <p className="text-black text-xl font-black uppercase mt-4">LEVERAGE: ZERO</p>
        </div>
      )}

      <div className={`w-full max-w-5xl flex flex-col items-center text-center relative z-10 transition-opacity ${isExploding ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex items-center gap-6 mb-4">
          <div className="h-[2px] w-32 bg-primary"></div>
          <span className="text-primary text-xl font-black tracking-[0.5em] uppercase">Critical System Override</span>
          <div className="h-[2px] w-32 bg-primary"></div>
        </div>
        
        <h1 className="text-8xl md:text-[12rem] font-black leading-none tracking-tighter uppercase font-display italic text-primary drop-shadow-[0_0_25px_rgba(255,59,59,0.8)] animate-pulse">
          {formatTime(timeLeft)}
        </h1>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-center gap-3">
            <span className="text-primary text-3xl animate-ping">⚠️</span>
            <p className="text-2xl font-black uppercase tracking-widest text-white italic">Self-Destruct Sequence Active</p>
            <span className="text-primary text-3xl animate-ping">⚠️</span>
          </div>
          
          <div className="flex flex-col gap-2 text-primary/70 font-mono text-sm font-bold uppercase tracking-wider">
            <div className="flex justify-center gap-4">
              <span>[ INITIATING TOTAL MEMORY WIPE ]</span>
              <span className="text-white">... STANDBY</span>
            </div>
            <div className="flex justify-center gap-4">
              <span>[ PURGING LOCAL ASSET CACHE ]</span>
              <span className="text-caution-yellow animate-pulse">... QUEUED</span>
            </div>
            <div className="flex justify-center gap-4">
              <span>[ REVERTING TO SINGLE STATUS ]</span>
              <span className="text-primary">... UNAVOIDABLE</span>
            </div>
          </div>
        </div>
      </div>

      <div className={`w-full max-w-4xl mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 px-10 transition-opacity ${isExploding ? 'opacity-0' : 'opacity-100'}`}>
        <button 
          onClick={handleAnnihilate}
          className="group flex flex-col items-center justify-center p-8 bg-primary hover:bg-white text-black transition-all transform hover:-translate-y-1 glitch-border shadow-[0_0_50px_rgba(255,59,59,0.4)]"
        >
          <span className="text-4xl mb-2">💀</span>
          <span className="text-2xl font-black uppercase italic tracking-tighter">Confirm Annihilation</span>
          <span className="text-[11px] font-bold opacity-70 uppercase mt-1 tracking-widest">Nuke it all. Reset the Hub.</span>
        </button>
        <button 
          onClick={onAbort}
          className="group flex flex-col items-center justify-center p-8 border-4 border-white/20 hover:border-primary/50 text-white hover:text-primary transition-all transform hover:-translate-y-1"
        >
          <span className="text-4xl mb-2">🔙</span>
          <span className="text-2xl font-black uppercase italic tracking-tighter">Abort Mission</span>
          <span className="text-[11px] font-bold text-slate-500 uppercase mt-1 tracking-widest">(Not Toxic Enough Yet)</span>
        </button>
      </div>

      <div className={`mt-12 max-w-xl text-center relative z-10 transition-opacity ${isExploding ? 'opacity-0' : 'opacity-100'}`}>
        <div className="bg-primary/10 border border-primary/30 p-4">
          <p className="text-[10px] font-black text-primary uppercase mb-2 tracking-widest italic">Nuclear Deterrence Protocol</p>
          <p className="text-xs text-slate-300 font-medium italic">
            "You better not use these against me later!" — Proceeding will incinerate your evidence vault and release all held 'assets' back into the dating wild. Are you prepared for the consequences of a clean slate?
          </p>
        </div>
      </div>
    </div>
  );
};

export default SelfDestruct;
