
import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import SelfDestruct from './components/SelfDestruct';
import { View, Asset } from './types';
import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [isSelfDestructActive, setIsSelfDestructActive] = useState(false);
  const [watermarkName, setWatermarkName] = useState<string>('MAT');
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);

  const toggleSelfDestruct = () => {
    setIsSelfDestructActive(!isSelfDestructActive);
  };

  const handleAnnihilate = () => {
    setAssets([]);
    setSelectedAssetId(null);
    setIsSelfDestructActive(false);
    setCurrentView(View.DASHBOARD);
  };

  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const newAsset: Asset = {
        id: Math.random().toString(36).substr(2, 9),
        filename: file.name,
        url: e.target?.result as string,
        isTainted: false,
        status: 'PENDING'
      };
      setAssets(prev => [newAsset, ...prev]);
      setSelectedAssetId(newAsset.id);
    };
    reader.readAsDataURL(file);
  };

  const downloadAsset = (asset: Asset) => {
    const link = document.createElement('a');
    link.href = asset.url;
    const baseName = asset.filename.split('.').slice(0, -1).join('.') || 'tainted_asset';
    link.download = `${baseName}_TAINTED.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const processAsset = async (id: string) => {
    const asset = assets.find(a => a.id === id);
    if (!asset || asset.status === 'PROCESSING') return;

    setAssets(prev => prev.map(a => a.id === id ? { ...a, status: 'PROCESSING' } : a));

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const base64Data = asset.url.split(',')[1];
      const mimeType = asset.url.split(';')[0].split(':')[1];

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { inlineData: { data: base64Data, mimeType: mimeType } },
            { text: `Apply satirical watermarking to this image with 50% LESS obtrusiveness than a full blackout.
            
            1. REPEATING NAME GRID: Overlay a diagonal grid of the text "PROPERTY OF ${watermarkName.toUpperCase()}". 
            2. CONSISTENCY: The name MUST be exactly "${watermarkName.toUpperCase()}". Do not use "CHAD" or any other name. 
            3. SEMI-TRANSPARENCY: Use a semi-transparent bright red (roughly 40-50% opacity). The background photo MUST still be visible through the watermark.
            4. SPACING: Space the text out so it's a medium-density grid, not a solid wall of letters. 
            5. STAMPS: Add two medium-sized red diagonal banners saying "UNUSABLE FOR DATING APPS" and "NOT FOR SWIPING" at 30% opacity.
            6. HEADER/FOOTER: Keep the red thin bars at the very top and bottom with "FORENSIC ID: ${Math.floor(Math.random() * 99999)}".
            7. STYLE: It should look like a low-budget security overlay, clearly marking 'ownership' without completely destroying the visibility of the original photo.
            8. OUTPUT: Standard JPEG/PNG format.` }
          ]
        }
      });

      let updatedUrl = asset.url;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            updatedUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            break;
          }
        }
      }

      setAssets(prev => prev.map(a => a.id === id ? { 
        ...a, 
        url: updatedUrl, 
        isTainted: true, 
        status: 'SECURED',
        taintId: Math.floor(Math.random() * 1000).toString() + '-EX'
      } : a));

      setSelectedAssetId(null);
    } catch (error) {
      console.error("Processing failed", error);
      setAssets(prev => prev.map(a => a.id === id ? { ...a, status: 'PENDING' } : a));
      alert("Encryption failed. Potential interference detected.");
    }
  };

  if (isSelfDestructActive) {
    return <SelfDestruct onAbort={() => setIsSelfDestructActive(false)} onAnnihilate={handleAnnihilate} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background-dark text-slate-100 overflow-x-hidden">
      <Header 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        onSelfDestructTrigger={toggleSelfDestruct} 
      />
      
      <main className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_center,_#111_0%,_#050505_100%)] relative">
          <Dashboard 
            assets={assets} 
            onUpload={handleUpload} 
            onSelect={setSelectedAssetId} 
            onDownload={downloadAsset}
            selectedId={selectedAssetId} 
          />
        </div>
        
        <Sidebar 
          onSelfDestructTrigger={toggleSelfDestruct} 
          selectedAsset={assets.find(a => a.id === selectedAssetId)}
          onProcess={() => selectedAssetId && processAsset(selectedAssetId)}
          onDownload={() => {
            const asset = assets.find(a => a.id === selectedAssetId);
            if (asset) downloadAsset(asset);
          }}
          assetCount={assets.length}
          watermarkName={watermarkName}
          setWatermarkName={setWatermarkName}
        />
      </main>
    </div>
  );
};

export default App;
