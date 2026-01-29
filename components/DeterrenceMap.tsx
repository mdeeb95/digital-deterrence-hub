
import React from 'react';
import { Territory } from '../types';

const TERRITORIES: Territory[] = [
  { name: 'Tinder Territory', infiltratedPhotos: 42, detectionRisk: 'MINIMAL', status: 'RADIOACTIVE' },
  { name: 'Hinge Sector', infiltratedPhotos: 18, detectionRisk: 'MINIMAL', status: 'RADIOACTIVE' },
  { name: 'Bumble Perimeter', infiltratedPhotos: 31, detectionRisk: 'HIGH', status: 'LURKING' },
];

const DeterrenceMap: React.FC = () => {
  return (
    <div className="flex flex-1 relative bg-background-dark overflow-hidden flex flex-col">
      <div className="absolute top-8 left-10 z-20 pointer-events-none">
        <h1 className="text-5xl font-black leading-none tracking-tighter uppercase font-display italic">Deterrence Deployment Map</h1>
        <p className="text-primary text-xs font-bold mt-2 tracking-widest italic uppercase">"You better not use these against me later!"</p>
        <div className="flex gap-4 mt-6 pointer-events-auto">
          <div className="bg-black/80 border border-primary/40 p-4 backdrop-blur-sm">
            <span className="text-[10px] text-slate-500 font-black block mb-1 uppercase tracking-widest">Global Saturation</span>
            <span className="text-3xl font-black text-white font-display italic">84.2%</span>
          </div>
          <div className="bg-black/80 border border-primary/40 p-4 backdrop-blur-sm">
            <span className="text-[10px] text-slate-500 font-black block mb-1 uppercase tracking-widest">Protected Assets</span>
            <span className="text-3xl font-black text-white font-display italic">142</span>
          </div>
        </div>
      </div>

      <div className="flex-1 relative map-grid overflow-hidden">
        <div className="absolute inset-0 scanline pointer-events-none opacity-30"></div>
        <div className="absolute inset-0 taint-overlay pointer-events-none"></div>
        
        {/* Mock Data Points */}
        <div className="absolute top-[35%] left-[25%] group cursor-pointer">
          <div className="w-4 h-4 bg-primary rounded-full relative animate-ping"></div>
          <div className="absolute top-0 left-0 w-4 h-4 bg-primary rounded-full"></div>
          <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-black border border-primary p-2 whitespace-nowrap hidden group-hover:block z-30">
            <p className="text-[9px] font-black text-primary uppercase">Asset: Backyard_Pool.jpg</p>
            <p className="text-[8px] text-white uppercase">Taint ID: 99x-BETA</p>
          </div>
        </div>

        <div className="absolute top-[50%] left-[60%] group cursor-pointer">
          <div className="w-3 h-3 bg-primary rounded-full relative"></div>
          <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-black border border-primary p-2 whitespace-nowrap hidden group-hover:block z-30">
            <p className="text-[9px] font-black text-primary uppercase">Asset: Paris_Selfie.png</p>
            <p className="text-[8px] text-white uppercase">Taint ID: 44z-GAMMA</p>
          </div>
        </div>

        <div className="absolute top-[20%] left-[80%] group cursor-pointer">
          <div className="w-5 h-5 bg-primary rounded-full relative animate-pulse"></div>
        </div>

        <div className="absolute bottom-6 left-10 flex gap-6 z-20">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Deployed Asset</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 border border-primary/50"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Neutral Zone</span>
          </div>
        </div>
      </div>

      {/* Active Zones Sidebar UI integrated for layout consistency */}
      <div className="h-24 bg-primary/10 border-t border-primary/30 flex items-center px-10 gap-8">
        <div className="flex items-center gap-4 border-r border-primary/20 pr-8">
          <span className="text-primary text-3xl">⚠️</span>
          <div>
            <p className="text-xs font-black uppercase text-primary italic">Permanent Taint Imprint Active</p>
            <p className="text-[10px] text-slate-400 uppercase leading-none">Subtle forensic markers embedded in all exported payloads.</p>
          </div>
        </div>
        <div className="flex-1 flex gap-12 items-center">
          {TERRITORIES.map((territory) => (
            <div key={territory.name} className="flex flex-col">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{territory.name}</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-sm font-black text-white italic">{territory.infiltratedPhotos} UNITS</span>
                <span className="text-[8px] text-primary font-bold uppercase">{territory.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeterrenceMap;
