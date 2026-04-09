import React, { ReactNode } from 'react';
import { BookOpen, Edit3, Triangle, Calculator, CheckCircle } from 'lucide-react';

export interface StepData {
  title: string;
  icon: ReactNode;
  desc: string;
  detail: ReactNode;
  tts: string;
}

export const tutorialSteps: StepData[] = [
  {
    title: "第一步：解题思路总览",
    icon: <BookOpen className="w-5 h-5" />,
    desc: "寻找‘隐藏的圆’，利用面积差转换思想。",
    detail: (
      <div className="space-y-2 text-sm text-slate-600">
        <p>题目给出 <span className="font-serif italic">∠CAD = ∠CBD</span>，这意味着 <span className="font-serif italic">A, B, C, D</span> 四点共圆。</p>
        <p>要求 <span className="font-serif italic">S<sub>△APB</sub> - S<sub>△CDP</sub></span>，我们可以巧妙地给它们都加上 <span className="font-serif italic">S<sub>△BPC</sub></span>，</p>
        <p>转换为求 <span className="font-serif italic">S<sub>△ABC</sub> - S<sub>△BCD</sub></span>，这样就能直接利用已知的底和高来求解了！</p>
      </div>
    ),
    tts: "同学们好！这道题要求两个小三角形的面积差，直接求非常困难。但如果我们给它们同时加上下面这个三角形 BPC 的面积，神奇的事情就发生了！面积差就转换成了大三角形 ABC 和 BCD 的面积差。接下来我们就用这个思路来解题。"
  },
  {
    title: "第二步：发现四点共圆",
    icon: <BookOpen className="w-5 h-5" />,
    desc: "关键：识别 ∠CAD = ∠CBD 构成的共圆模型",
    detail: (
      <div className="space-y-2 text-sm text-slate-600">
        <p>∵ <span className="font-serif italic">∠CAD = ∠CBD</span>，且它们同底 <span className="font-serif italic">CD</span> 并在同侧，</p>
        <p>∴ <span className="font-serif italic">A, B, C, D</span> 四点共圆。</p>
        <p className="text-blue-600 font-medium">作辅助线：画出这个隐藏的外接圆。</p>
      </div>
    ),
    tts: "首先，因为角 CAD 和角 CBD 相等，根据圆周角定理的逆定理，点 A、B、C、D 这四个点一定在同一个圆上。我们把这个隐形的圆画出来。"
  },
  {
    title: "第三步：面积差转换",
    icon: <Edit3 className="w-5 h-5" />,
    desc: "核心技巧：通过补全图形，将未知转化为已知",
    detail: (
      <div className="space-y-2 text-sm text-slate-600">
        <p>观察图形可知：</p>
        <p><span className="font-serif italic">S<sub>△ABC</sub> = S<sub>△APB</sub> + S<sub>△BPC</sub></span></p>
        <p><span className="font-serif italic">S<sub>△BCD</sub> = S<sub>△CDP</sub> + S<sub>△BPC</sub></span></p>
        <p>两式相减得到：</p>
        <p className="font-medium text-indigo-600"><span className="font-serif italic">S<sub>△ABC</sub> - S<sub>△BCD</sub> = S<sub>△APB</sub> - S<sub>△CDP</sub></span></p>
      </div>
    ),
    tts: "看图形，三角形 ABC 的面积等于 APB 加上 BPC。三角形 BCD 的面积等于 CDP 加上 BPC。把这两个式子相减，BPC 的面积就抵消了！所以，我们只需要求出三角形 ABC 和 BCD 的面积就可以了。"
  },
  {
    title: "第四步：寻找相似三角形",
    icon: <Triangle className="w-5 h-5" />,
    desc: "利用圆的性质，锁定相似比",
    detail: (
      <div className="space-y-2 text-sm text-slate-600">
        <p>∵ <span className="font-serif italic">A, B, C, D</span> 四点共圆，</p>
        <p>∴ <span className="font-serif italic">∠PAB = ∠PDC</span>，<span className="font-serif italic">∠PBA = ∠PCD</span>。</p>
        <p>∴ <span className="font-serif italic">△APB ∽ △DPC</span>。</p>
        <p>已知 <span className="font-serif italic">AB:CD = 6:5</span>，所以相似比为 <span className="font-serif italic">6:5</span>。</p>
        <p>即 <span className="font-serif italic">BP : CP = 6 : 5</span>。</p>
      </div>
    ),
    tts: "因为四点共圆，同弧所对的圆周角相等，所以上方的三角形 APB 和下方的三角形 DPC 是相似的。题目说 AB 比 CD 是 6 比 5，所以它们的相似比就是 6 比 5。这就意味着，边 BP 和 CP 的比也是 6 比 5。"
  },
  {
    title: "第五步：利用相似比求高",
    icon: <Calculator className="w-5 h-5" />,
    desc: "将‘边长比’转化为‘高度比’",
    detail: (
      <div className="space-y-2 text-sm text-slate-600">
        <p>作 <span className="font-serif italic">B ⊥ AC</span> 于 <span className="font-serif italic">H<sub>B</sub></span>，作 <span className="font-serif italic">C ⊥ BD</span> 于 <span className="font-serif italic">H<sub>C</sub></span>。</p>
        <p>在 <span className="font-serif italic">Rt△BPH<sub>B</sub></span> 和 <span className="font-serif italic">Rt△CPH<sub>C</sub></span> 中，<span className="font-serif italic">∠BPH<sub>B</sub> = ∠CPH<sub>C</sub></span>（对顶角）。</p>
        <p>∴ <span className="font-serif italic">h<sub>B</sub> : h<sub>C</sub> = BP : CP = 6 : 5</span>。</p>
        <p>已知 <span className="font-serif italic">h<sub>C</sub> = 5</span>（点 C 到 BD 的距离），</p>
        <p className="font-serif italic text-emerald-600 font-medium">∴ h<sub>B</sub> = 6/5 × 5 = 6。</p>
      </div>
    ),
    tts: "接下来是关键！我们在两个大三角形里分别作高。因为对顶角相等，这两个高 h_B 和 h_C 的比，刚好等于斜边 BP 和 CP 的比，也就是 6 比 5。题目已知 C 到 BD 的距离是 5，也就是 h_C 等于 5，所以 h_B 就等于 6！"
  },
  {
    title: "第六步：计算大三角形面积",
    icon: <Edit3 className="w-5 h-5" />,
    desc: "代入数据，完成最后的数学计算",
    detail: (
      <div className="space-y-2 text-sm text-slate-600">
        <p>对于 <span className="font-serif italic">△ABC</span>，底 <span className="font-serif italic">AC = 9</span>，高 <span className="font-serif italic">h<sub>B</sub> = 6</span>：</p>
        <p className="font-serif italic">S<sub>△ABC</sub> = 1/2 × 9 × 6 = 27</p>
        <div className="my-2 border-b border-slate-100"></div>
        <p>对于 <span className="font-serif italic">△BCD</span>，底 <span className="font-serif italic">BD = 10</span>，高 <span className="font-serif italic">h<sub>C</sub> = 5</span>：</p>
        <p className="font-serif italic">S<sub>△BCD</sub> = 1/2 × 10 × 5 = 25</p>
      </div>
    ),
    tts: "底和高都有了，算面积就太简单了。三角形 ABC 的面积是底 9 乘高 6 除以 2，等于 27。三角形 BCD 的面积是底 10 乘高 5 除以 2，等于 25。"
  },
  {
    title: "第七步：得出最终结果",
    icon: <CheckCircle className="w-5 h-5" />,
    desc: "由面积转换的思想得出最终结论",
    detail: (
      <div className="space-y-2 text-sm text-slate-600">
        <p>根据第二步的转换结论：</p>
        <p className="font-serif italic">S<sub>△APB</sub> - S<sub>△CDP</sub> = S<sub>△ABC</sub> - S<sub>△BCD</sub></p>
        <p className="font-serif italic">= 27 - 25</p>
        <p className="font-serif italic text-rose-600 font-bold text-lg">= 2</p>
      </div>
    ),
    tts: "最后，把这两个大三角形的面积相减，27 减去 25，最终答案就是 2！是不是比解方程简单多了？这种面积转换的思维在几何题里非常实用，大家一定要掌握哦！"
  }
];
