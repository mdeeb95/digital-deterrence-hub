
import React from 'react';
import { View } from '../types';

interface HeaderProps {
  currentView: View;
  onViewChange: (view: View) => void;
  onSelfDestructTrigger: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange, onSelfDestructTrigger }) => {
  return (
    <header className="flex items-center justify-between border-b-2 border-primary bg-background-dark px-4 lg:px-10 py-3 lg:py-4 shrink-0 z-50">
      <div className="flex items-center gap-2 lg:gap-4">
        <div className="text-primary text-2xl lg:text-4xl">🛡️</div>
        <div className="flex flex-col">
          <h2 className="text-lg lg:text-2xl font-black uppercase tracking-tighter font-display italic leading-none">Deterrence Hub</h2>
          <span className="text-[7px] lg:text-[9px] font-bold text-primary tracking-[0.2em] lg:tracking-[0.3em] uppercase">VER 4.2.0 - ACTIVE</span>
        </div>
      </div>
      
      <div className="flex gap-4 lg:gap-8 items-center">
        <nav className="hidden md:flex items-center gap-6 uppercase text-[11px] font-bold tracking-[0.2em]">
          <button 
            onClick={() => onViewChange(View.DASHBOARD)}
            className={`${currentView === View.DASHBOARD ? 'text-primary border-b border-primary' : 'hover:text-primary'} transition-colors pb-1`}
          >
            Vault
          </button>
        </nav>
        
        <div className="hidden md:block h-10 w-[2px] bg-white/10"></div>
        
        <div className="flex flex-col items-end">
          <button 
            onClick={onSelfDestructTrigger}
            className="flex items-center justify-center border-2 border-primary px-3 py-1 lg:px-4 lg:py-1.5 hover:bg-white hover:text-black text-[9px] lg:text-[10px] font-black uppercase transition-all tracking-widest bg-primary/10 group shadow-[0_0_15px_rgba(255,59,59,0.2)]"
          >
            <span className="hidden sm:inline relative z-10">Initiate Self-Destruct</span>
            <span className="sm:hidden relative z-10">Self-Destruct</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
