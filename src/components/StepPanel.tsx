import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { StepData } from '../data/tutorialSteps';
import { cn } from '../lib/utils';

interface StepPanelProps {
  steps: StepData[];
  currentStep: number;
  onStepClick: (index: number) => void;
}

export const StepPanel: React.FC<StepPanelProps> = ({ steps, currentStep, onStepClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeStepRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to active step
  useEffect(() => {
    if (activeStepRef.current && containerRef.current) {
      const container = containerRef.current;
      const activeElement = activeStepRef.current;
      
      const scrollPos = activeElement.offsetTop - container.offsetTop - 20;
      container.scrollTo({
        top: scrollPos,
        behavior: 'smooth'
      });
    }
  }, [currentStep]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full bg-slate-50 overflow-y-auto p-6 rounded-r-2xl border-l border-slate-200 custom-scrollbar"
    >
      <div className="space-y-6 relative">
        {/* Vertical connecting line */}
        <div className="absolute left-[1.3rem] top-6 bottom-6 w-0.5 bg-slate-200 z-0" />

        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isPast = index < currentStep;

          return (
            <div 
              key={index} 
              ref={isActive ? activeStepRef : null}
              className="relative z-10 flex gap-4 cursor-pointer group"
              onClick={() => onStepClick(index)}
            >
              {/* Icon / Indicator */}
              <div className="flex-shrink-0 mt-1">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 bg-white",
                  isActive ? "border-blue-500 shadow-md shadow-blue-100" : 
                  isPast ? "border-slate-300 text-slate-400" : "border-slate-200 text-slate-300",
                  !isActive && "group-hover:border-blue-300"
                )}>
                  {isActive ? step.icon : <span className="text-sm font-semibold">{index}</span>}
                </div>
              </div>

              {/* Content */}
              <div className={cn(
                "flex-1 rounded-xl p-4 transition-all duration-300 border",
                isActive ? "bg-white border-blue-100 shadow-sm" : "bg-transparent border-transparent hover:bg-slate-100/50"
              )}>
                <h3 className={cn(
                  "text-base font-bold mb-1 transition-colors",
                  isActive ? "text-slate-900" : "text-slate-500"
                )}>
                  {step.title}
                </h3>
                
                <p className={cn(
                  "text-sm mb-3 transition-colors",
                  isActive ? "text-slate-700" : "text-slate-400"
                )}>
                  {step.desc}
                </p>

                {/* Detailed Proof (Expandable) */}
                <motion.div 
                  initial={false}
                  animate={{ 
                    height: isActive ? "auto" : 0,
                    opacity: isActive ? 1 : 0,
                    marginTop: isActive ? 12 : 0
                  }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 border-t border-slate-100">
                    {step.detail}
                  </div>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
