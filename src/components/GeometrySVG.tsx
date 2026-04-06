import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface GeometrySVGProps {
  currentStep: number;
}

export const GeometrySVG: React.FC<GeometrySVGProps> = ({ currentStep }) => {
  // Base coordinates for the visually perfect irregular cyclic quadrilateral
  const A = { x: 204, y: 105 };
  const B = { x: 159, y: 271 };
  const C = { x: 406, y: 326 };
  const D = { x: 396, y: 105 };
  const P = { x: 279, y: 187 }; // Intersection of AC and BD
  const O = { x: 300, y: 220 }; // Circumcenter
  const R = 150; // Circumradius

  // Helper to get projection of point p onto line segment A-B
  const getProjection = (p: {x: number, y: number}, lineA: {x: number, y: number}, lineB: {x: number, y: number}) => {
    const v = { x: lineB.x - lineA.x, y: lineB.y - lineA.y };
    const u = { x: p.x - lineA.x, y: p.y - lineA.y };
    const t = (u.x * v.x + u.y * v.y) / (v.x * v.x + v.y * v.y);
    return { x: lineA.x + t * v.x, y: lineA.y + t * v.y };
  };

  const H_C = getProjection(C, B, D); // Projection of C onto BD
  const H_B = getProjection(B, A, C); // Projection of B onto AC

  // Helper to draw right angle symbol
  const getRightAnglePoints = (from: {x: number, y: number}, to: {x: number, y: number}, linePoint: {x: number, y: number}) => {
    const s = 10;
    const dx1 = from.x - to.x;
    const dy1 = from.y - to.y;
    const len1 = Math.hypot(dx1, dy1);
    const v1 = { x: dx1 / len1, y: dy1 / len1 };

    const dx2 = linePoint.x - to.x;
    const dy2 = linePoint.y - to.y;
    const len2 = Math.hypot(dx2, dy2);
    const v2 = { x: dx2 / len2, y: dy2 / len2 };

    const p1 = { x: to.x + s * v1.x, y: to.y + s * v1.y };
    const p2 = { x: to.x + s * v1.x + s * v2.x, y: to.y + s * v1.y + s * v2.y };
    const p3 = { x: to.x + s * v2.x, y: to.y + s * v2.y };

    return `${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`;
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-slate-50/50 rounded-xl overflow-hidden relative">
      <svg viewBox="0 0 600 450" className="w-full h-full max-w-2xl max-h-full drop-shadow-sm">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
          </marker>
        </defs>

        {/* Step 1: Circumcircle */}
        <AnimatePresence>
          {currentStep >= 1 && (
            <motion.circle
              cx={O.x}
              cy={O.y}
              r={R}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeDasharray="6 6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          )}
        </AnimatePresence>

        {/* Base Quadrilateral and Diagonals (Always visible) */}
        <g stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <motion.polygon
            points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y} ${D.x},${D.y}`}
            fill="none"
          />
          <motion.line x1={A.x} y1={A.y} x2={C.x} y2={C.y} />
          <motion.line x1={B.x} y1={B.y} x2={D.x} y2={D.y} />
        </g>

        {/* Step 2: Highlight ABC and BCD to show area difference */}
        <AnimatePresence>
          {currentStep === 2 && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              {/* Triangle ABC */}
              <motion.polygon
                points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`}
                fill="rgba(59, 130, 246, 0.15)"
                stroke="#3b82f6"
                strokeWidth="2"
              />
              {/* Triangle BCD */}
              <motion.polygon
                points={`${B.x},${B.y} ${C.x},${C.y} ${D.x},${D.y}`}
                fill="rgba(16, 185, 129, 0.15)"
                stroke="#10b981"
                strokeWidth="2"
              />
              {/* Highlight shared part BPC */}
              <motion.polygon
                points={`${B.x},${B.y} ${P.x},${P.y} ${C.x},${C.y}`}
                fill="rgba(245, 158, 11, 0.3)"
              />
            </motion.g>
          )}
        </AnimatePresence>

        {/* Step 3: Highlight Similar Triangles APB and DPC */}
        <AnimatePresence>
          {currentStep === 3 && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <motion.polygon
                points={`${A.x},${A.y} ${P.x},${P.y} ${B.x},${B.y}`}
                fill="rgba(139, 92, 246, 0.2)"
                stroke="#8b5cf6"
                strokeWidth="2"
              />
              <motion.polygon
                points={`${D.x},${D.y} ${P.x},${P.y} ${C.x},${C.y}`}
                fill="rgba(139, 92, 246, 0.2)"
                stroke="#8b5cf6"
                strokeWidth="2"
              />
              {/* Ratio Labels */}
              <motion.text x={(A.x + B.x) / 2 - 25} y={(A.y + B.y) / 2 - 5} className="font-serif text-base fill-purple-700 font-bold">6x</motion.text>
              <motion.text x={(C.x + D.x) / 2 + 10} y={(C.y + D.y) / 2 + 15} className="font-serif text-base fill-purple-700 font-bold">5x</motion.text>
              
              {/* Highlight equal angles */}
              <path d={`M ${A.x + 20} ${A.y + 10} Q ${A.x + 25} ${A.y + 25} ${A.x + 10} ${A.y + 30}`} fill="none" stroke="#8b5cf6" strokeWidth="2" />
              <path d={`M ${D.x - 20} ${D.y + 10} Q ${D.x - 25} ${D.y + 25} ${D.x - 10} ${D.y + 30}`} fill="none" stroke="#8b5cf6" strokeWidth="2" />
            </motion.g>
          )}
        </AnimatePresence>

        {/* Step 4 & 5 & 6: Draw Heights h_B and h_C */}
        <AnimatePresence>
          {currentStep >= 4 && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
              {/* Height h_C */}
              <motion.line x1={C.x} y1={C.y} x2={H_C.x} y2={H_C.y} stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />
              <motion.polyline points={getRightAnglePoints(C, H_C, P)} fill="none" stroke="#f59e0b" strokeWidth="1.5" />
              <text x={(C.x + H_C.x) / 2 + 15} y={(C.y + H_C.y) / 2 + 5} className="font-serif text-base fill-amber-600 font-bold">h_C=5</text>

              {/* Height h_B */}
              <motion.line x1={B.x} y1={B.y} x2={H_B.x} y2={H_B.y} stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" />
              <motion.polyline points={getRightAnglePoints(B, H_B, P)} fill="none" stroke="#10b981" strokeWidth="1.5" />
              <text x={(B.x + H_B.x) / 2 - 45} y={(B.y + H_B.y) / 2 - 5} className="font-serif text-base fill-emerald-600 font-bold">h_B=6</text>
            </motion.g>
          )}
        </AnimatePresence>

        {/* Step 5 & 6: Show Areas */}
        <AnimatePresence>
          {currentStep >= 5 && (
            <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
              {/* Area ABC */}
              <rect x={200} y={150} width={60} height={30} rx={4} fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="1" />
              <text x={230} y={170} textAnchor="middle" className="font-serif text-lg fill-blue-700 font-bold">S=27</text>
              
              {/* Area BCD */}
              <rect x={320} y={230} width={60} height={30} rx={4} fill="rgba(16, 185, 129, 0.1)" stroke="#10b981" strokeWidth="1" />
              <text x={350} y={250} textAnchor="middle" className="font-serif text-lg fill-emerald-700 font-bold">S=25</text>
            </motion.g>
          )}
        </AnimatePresence>

        {/* Step 6: Final Result Highlight */}
        <AnimatePresence>
          {currentStep === 6 && (
            <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 1 }}>
              <rect x={240} y={380} width={120} height={40} rx={8} fill="#ffe4e6" stroke="#e11d48" strokeWidth="2" />
              <text x={300} y={406} textAnchor="middle" className="font-serif text-xl fill-rose-600 font-bold">ΔS = 2</text>
            </motion.g>
          )}
        </AnimatePresence>

        {/* Labels for Vertices and Intersection */}
        <g className="font-serif text-lg font-bold fill-slate-700">
          <text x={A.x - 20} y={A.y - 10}>A</text>
          <text x={B.x - 25} y={B.y + 10}>B</text>
          <text x={C.x + 15} y={C.y + 15}>C</text>
          <text x={D.x + 15} y={D.y - 10}>D</text>
          <text x={P.x - 10} y={P.y - 15}>P</text>
        </g>

        {/* Points */}
        <g fill="#0f172a">
          <circle cx={A.x} cy={A.y} r="4" />
          <circle cx={B.x} cy={B.y} r="4" />
          <circle cx={C.x} cy={C.y} r="4" />
          <circle cx={D.x} cy={D.y} r="4" />
          <circle cx={P.x} cy={P.y} r="4" fill="#ef4444" />
        </g>
      </svg>
    </div>
  );
};
