
import React, { useRef, useState } from 'react';
import { Asset } from '../types';

interface DashboardProps {
  assets: Asset[];
  onUpload: (file: File) => void;
  onSelect: (id: string) => void;
  onDownload: (asset: Asset) => void;
  selectedId: string | null;
}

const Dashboard: React.FC<DashboardProps> = ({ assets, onUpload, onSelect, onDownload, selectedId }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onUpload(file);
      }
    }
  };

  const handleAssetClick = (asset: Asset) => {
    if (asset.isTainted) {
      onDownload(asset);
    } else {
      onSelect(asset.id);
    }
  };

  return (
    <div 
      className="px-4 lg:px-10 pt-6 lg:pt-10 relative z-10 pb-20 min-h-full transition-colors duration-300"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Drag and Drop Overlay */}
      {isDragging && (
        <div className="fixed inset-0 lg:absolute inset-0 z-50 bg-primary/20 backdrop-blur-sm border-4 border-dashed border-primary flex items-center justify-center pointer-events-none">
          <div className="bg-black/80 p-6 lg:p-10 border-2 border-primary shadow-[0_0_50px_rgba(255,59,59,0.5)] flex flex-col items-center gap-4 animate-pulse">
            <span className="text-4xl lg:text-6xl">📥</span>
            <h2 className="text-xl lg:text-3xl font-black uppercase italic tracking-tighter text-white">Drop Evidence</h2>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start mb-6 lg:mb-8 gap-4 lg:gap-0">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl lg:text-5xl font-black leading-none tracking-tighter uppercase font-display italic leading-none">Evidence Vault</h1>
          <div className="h-1 w-16 lg:w-24 bg-primary"></div>
          <p className="text-slate-400 text-xs lg:text-sm font-medium mt-1 lg:mt-2 max-w-xl italic">
            Secure markers for visual assets.
          </p>
        </div>
        <div className="flex flex-col items-stretch md:items-end w-full md:w-auto">
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            onChange={handleFileChange} 
            accept="image/*"
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="bg-primary text-black px-6 py-3 lg:py-2 font-black uppercase text-xs italic tracking-widest glitch-border hover:bg-white transition-all transform active:scale-95 mb-2 shadow-[0_0_15px_rgba(255,59,59,0.3)] w-full md:w-auto"
          >
            Upload 📁
          </button>
        </div>
      </div>

      <div className="relative mb-6 lg:mb-8 border-2 border-primary bg-primary/5 p-4 lg:p-8 overflow-hidden">
        <div className="absolute inset-0 taint-overlay pointer-events-none opacity-40"></div>
        <div className="absolute inset-0 scanline pointer-events-none opacity-50"></div>
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 lg:gap-6 w-full">
            <div className="w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center bg-primary text-black text-2xl lg:text-4xl shadow-[0_0_20px_rgba(255,59,59,0.6)] shrink-0">🛡️</div>
            <div>
              <h3 className="text-lg lg:text-3xl font-black uppercase italic tracking-tighter">Imprinting Protocol</h3>
              <p className="text-[10px] font-bold text-primary/80 uppercase tracking-widest mt-0.5">Saturation: Active</p>
            </div>
          </div>
        </div>
      </div>

      {assets.length === 0 && (
        <div className="border-2 border-dashed border-white/10 h-48 lg:h-64 flex flex-col items-center justify-center text-slate-600 bg-white/5 p-4 text-center">
          <span className="text-4xl mb-2 opacity-20">📂</span>
          <p className="uppercase font-black text-[10px] lg:text-xs tracking-widest italic opacity-40">Drop Evidence or Use Button</p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {assets.map((asset) => (
          <div 
            key={asset.id} 
            onClick={() => handleAssetClick(asset)}
            className={`high-contrast-card p-2 lg:p-3 transition-all relative group overflow-hidden cursor-pointer ${selectedId === asset.id ? 'border-primary ring-2 ring-primary ring-opacity-50' : 'border-white/5'}`}
          >
            <div className={`absolute inset-0 transition-opacity pointer-events-none z-20 ${asset.isTainted ? 'opacity-40 lg:group-hover:opacity-70 taint-overlay' : 'opacity-0'}`}></div>
            <div 
              className={`relative aspect-square sm:aspect-[4/3] overflow-hidden grayscale lg:group-hover:grayscale-0 transition-all duration-500 border border-white/10 bg-cover bg-center`}
              style={{ backgroundImage: `url(${asset.url})` }}
            >
              {asset.status === 'PROCESSING' && (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-40 backdrop-blur-sm">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                    <span className="text-[8px] lg:text-[10px] font-black text-primary uppercase tracking-[0.2em] animate-pulse">Imprinting...</span>
                  </div>
                </div>
              )}
              
              {asset.isTainted && (
                <div className="absolute top-0 right-0 p-1 lg:p-2 bg-primary text-black font-black text-[8px] lg:text-[10px] uppercase z-30 tracking-widest shadow-lg">
                  SECURED
                </div>
              )}
            </div>
            <div className="mt-2 lg:mt-3 flex flex-col sm:flex-row justify-between sm:items-center px-1 gap-1">
              <span className="text-[8px] lg:text-[10px] font-black uppercase text-slate-400 tracking-widest truncate font-mono">{asset.filename}</span>
              <div className="flex items-center gap-2">
                <span className={`text-[8px] lg:text-[10px] font-black ${asset.isTainted ? 'text-primary' : 'text-slate-600'}`}>
                  {asset.isTainted ? 'LOCKED' : 'OPEN'}
                </span>
                <span className="text-primary text-xs shrink-0">{asset.isTainted ? '🔒' : '🔓'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
