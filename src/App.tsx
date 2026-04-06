import React, { useState, useEffect } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { GeometrySVG } from './components/GeometrySVG';
import { StepPanel } from './components/StepPanel';
import { SubtitleOverlay } from './components/SubtitleOverlay';
import { tutorialSteps } from './data/tutorialSteps';
import { ttsService } from './services/ttsService';

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const unsubscribe = ttsService.subscribe((state) => {
      setIsPlaying(state.isPlaying);
    });
    return () => unsubscribe();
  }, []);

  // Play TTS when step changes
  useEffect(() => {
    ttsService.play(tutorialSteps[currentStep].tts);
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      ttsService.stop();
    } else {
      ttsService.play(tutorialSteps[currentStep].tts);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200">
        
        {/* Header */}
        <header className="h-16 border-b border-slate-100 flex items-center justify-between px-6 bg-white shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-inner">
              <span className="text-white font-serif font-bold text-xl">G</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800 leading-tight">四边形面积差求解</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-semibold rounded-md">几何综合</span>
                <span className="text-xs text-slate-400">初中数学</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex flex-col md:flex-row h-[570px] relative">
          
          {/* Left: Visual/SVG Area (55%) */}
          <section className="w-full md:w-[55%] h-full relative bg-white">
            <GeometrySVG currentStep={currentStep} />
            <SubtitleOverlay />
          </section>

          {/* Right: Logic/Steps Area (45%) */}
          <section className="w-full md:w-[45%] h-full">
            <StepPanel 
              steps={tutorialSteps} 
              currentStep={currentStep} 
              onStepClick={(index) => setCurrentStep(index)} 
            />
          </section>

        </main>

        {/* Footer Controls */}
        <footer className="h-16 border-t border-slate-200 bg-white flex items-center justify-between px-6 shrink-0">
          <button 
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors text-sm font-medium"
          >
            <RotateCcw className="w-4 h-4" />
            重新开始
          </button>

          <div className="flex items-center gap-3">
            <button 
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="flex items-center gap-1 px-4 py-2 text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:hover:bg-transparent rounded-lg transition-colors text-sm font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              上一步
            </button>

            <button 
              onClick={togglePlayPause}
              className="w-10 h-10 flex items-center justify-center bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>

            <button 
              onClick={handleNext}
              disabled={currentStep === tutorialSteps.length - 1}
              className="flex items-center gap-1 px-5 py-2 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 rounded-lg transition-colors text-sm font-medium shadow-sm"
            >
              下一步
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </footer>

      </div>
    </div>
  );
}
