
import React from 'react';
import { Asset } from '../types';

interface SidebarProps {
  onSelfDestructTrigger: () => void;
  selectedAsset?: Asset;
  onProcess: () => void;
  onDownload: () => void;
  assetCount: number;
  watermarkName: string;
  setWatermarkName: (name: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  onSelfDestructTrigger, 
  selectedAsset, 
  onProcess, 
  onDownload,
  assetCount,
  watermarkName,
  setWatermarkName
}) => {
  return (
    <aside className="w-full lg:w-96 border-t-2 lg:border-t-0 lg:border-l-2 border-primary bg-black flex flex-col shrink-0 overflow-y-auto max-h-[70vh] lg:max-h-none">
      <div className="p-6 lg:p-8 flex flex-col gap-6 lg:gap-8">
        <div className="flex items-center justify-between">
          <h2 className="text-primary text-lg lg:text-xl font-black uppercase italic tracking-tight flex items-center gap-2">
            <span className="text-xl">⚙️</span> Control Unit
          </h2>
          <span className="text-[8px] font-black bg-primary/20 text-primary px-2 py-0.5 border border-primary/30 animate-pulse">
            MAX AGGRESSION
          </span>
        </div>

        <div className="space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Subject Ownership</p>
          <div className="relative">
            <input 
              type="text"
              value={watermarkName}
              onChange={(e) => setWatermarkName(e.target.value.toUpperCase())}
              placeholder="ENTER NAME"
              className="w-full bg-white/5 border border-primary/20 p-3 text-xs font-black uppercase text-white focus:border-primary focus:outline-none italic"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-black text-primary/40 uppercase font-mono">ID_TAG</div>
          </div>
          <div className="bg-primary/10 border-l-2 border-primary p-2">
            <p className="text-[9px] font-bold text-primary uppercase italic leading-tight">
              Projected: PROPERTY OF {watermarkName || "UNKNOWN"}
            </p>
          </div>
        </div>
        
        {selectedAsset ? (
          <div className="space-y-4 border-y border-white/5 py-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Asset Targeted</p>
            <div className={`p-3 flex items-center gap-3 transition-colors ${selectedAsset.isTainted ? 'bg-primary/5' : 'bg-white/5'}`}>
              <div 
                className={`w-12 h-12 lg:w-14 lg:h-14 bg-cover bg-center border ${selectedAsset.isTainted ? 'border-primary' : 'border-white/10'}`} 
                style={{ backgroundImage: `url(${selectedAsset.url})` }}
              ></div>
              <div className="flex flex-col flex-1 overflow-hidden">
                <span className="text-[10px] font-black text-white truncate uppercase italic">{selectedAsset.filename}</span>
                <span className={`text-[9px] font-black uppercase mt-1 ${selectedAsset.status === 'SECURED' ? 'text-primary' : 'text-slate-500'}`}>
                  STATUS: {selectedAsset.status}
                </span>
              </div>
              {selectedAsset.isTainted && (
                <button 
                  onClick={onDownload}
                  className="bg-primary p-2 lg:p-3 hover:bg-white transition-all shadow-[0_0_10px_rgba(255,59,59,0.5)]"
                >
                  <span className="text-black text-lg">📥</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="text-[10px] font-black uppercase text-slate-600 italic border-y border-white/5 py-4 text-center">
            [ SELECT ASSET FROM VAULT ]
          </div>
        )}

        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Insecurity Level</p>
            <span className="text-primary font-black text-lg italic animate-pulse text-right">TOTAL</span>
          </div>
          <input 
            className="w-full h-1 bg-white/10 appearance-none cursor-pointer accent-primary" 
            max="100" 
            min="99" 
            type="range" 
            defaultValue="100"
          />
        </div>

        <div className="space-y-4 lg:space-y-6 pt-2">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 border-b border-white/10 pb-2">Forensic Overlays</p>
          <label className="flex items-start gap-4 cursor-pointer group">
            <div className="relative flex items-center h-5">
              <input defaultChecked className="sr-only peer" type="checkbox"/>
              <div className="w-10 h-5 bg-white/10 border border-white/20 peer-checked:bg-primary peer-checked:border-primary transition-all"></div>
              <div className="absolute left-1 top-1 w-3 h-3 bg-white peer-checked:translate-x-5 transition-all"></div>
            </div>
            <div className="flex flex-col -mt-1">
              <span className="text-xs lg:text-sm font-black uppercase text-slate-200 group-hover:text-primary transition-colors italic">Saturate View</span>
            </div>
          </label>
          <label className="flex items-start gap-4 cursor-pointer group">
            <div className="relative flex items-center h-5">
              <input defaultChecked className="sr-only peer" type="checkbox"/>
              <div className="w-10 h-5 bg-white/10 border border-white/20 peer-checked:bg-primary peer-checked:border-primary transition-all"></div>
              <div className="absolute left-1 top-1 w-3 h-3 bg-white peer-checked:translate-x-5 transition-all"></div>
            </div>
            <div className="flex flex-col -mt-1">
              <span className="text-xs lg:text-sm font-black uppercase text-slate-200 group-hover:text-primary transition-colors italic">Maximum Taint</span>
            </div>
          </label>
        </div>
      </div>

      <div className="mt-auto bg-primary/10 border-t-2 border-primary sticky bottom-0 z-40 bg-black">
        <div className="p-4 lg:p-8 flex flex-col gap-4 lg:gap-6">
          <div className="hidden lg:flex justify-between items-end border-l-2 border-primary pl-4">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest leading-none mb-1">Stockpile</span>
              <span className="text-2xl font-black text-white italic">{assetCount} SAMPLES</span>
            </div>
          </div>

          {selectedAsset?.isTainted ? (
            <button 
              onClick={onDownload}
              className="w-full flex flex-col items-center justify-center gap-0 py-4 lg:h-24 bg-white text-black uppercase tracking-tighter italic transition-all glitch-border group relative overflow-hidden active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              <div className="absolute inset-0 taint-overlay opacity-20 pointer-events-none"></div>
              <div className="relative z-10 flex items-center gap-3">
                <span className="text-2xl lg:text-3xl">📥</span>
                <span className="text-xl lg:text-2xl font-black">GET TAINTED JPG</span>
              </div>
            </button>
          ) : (
            <button 
              onClick={onProcess}
              disabled={!selectedAsset || selectedAsset.status === 'PROCESSING'}
              className="w-full flex flex-col items-center justify-center gap-0 py-4 lg:h-24 bg-primary disabled:bg-slate-800 disabled:text-slate-600 hover:bg-white text-black uppercase tracking-tighter italic transition-all glitch-border group relative overflow-hidden active:scale-95 shadow-[0_0_30px_rgba(255,59,59,0.3)]"
            >
              <div className="absolute inset-0 taint-overlay opacity-20 group-hover:opacity-40 pointer-events-none"></div>
              <div className="relative z-10 flex items-center gap-3">
                <span className="text-2xl lg:text-3xl">{selectedAsset?.status === 'PROCESSING' ? '⚛️' : '🔒'}</span>
                <span className="text-xl lg:text-2xl font-black">
                  {selectedAsset?.status === 'PROCESSING' ? 'IMPRINTING...' : 'APPLY TAINT'}
                </span>
              </div>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
