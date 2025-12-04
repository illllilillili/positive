import React, { useState } from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { SubjectStudyTime } from '../types';
import { Timer, Target } from 'lucide-react';

const INITIAL_SUBJECTS: SubjectStudyTime[] = [
  { name: '국어', time: 45, color: '#60a5fa' }, // blue
  { name: '수학', time: 90, color: '#34d399' }, // emerald
  { name: '영어', time: 30, color: '#f87171' }, // red
  { name: '탐구', time: 60, color: '#a78bfa' }, // purple
];

const StudyTracker: React.FC = () => {
  const [goalHours, setGoalHours] = useState<number>(6);
  const [subjects] = useState<SubjectStudyTime[]>(INITIAL_SUBJECTS);
  
  const totalStudiedMinutes = subjects.reduce((acc, curr) => acc + curr.time, 0);
  const totalStudiedHours = totalStudiedMinutes / 60;
  const progressPercentage = Math.min(Math.round((totalStudiedHours / goalHours) * 100), 100);

  return (
    <div className="bg-slate-700 rounded-2xl p-6 shadow-lg flex flex-col gap-6">
      <div className="flex justify-between items-center border-b border-slate-600 pb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Target className="text-blue-400" />
          목표 공부시간
        </h2>
        <div className="flex items-center gap-2 bg-slate-800 rounded-lg px-3 py-1">
          <span className="text-xs text-slate-400">목표(시간)</span>
          <input 
            type="number" 
            min="1" 
            max="24"
            value={goalHours}
            onChange={(e) => setGoalHours(Number(e.target.value))}
            className="w-12 bg-transparent text-white text-right font-mono focus:outline-none focus:ring-1 focus:ring-blue-500 rounded"
          />
        </div>
      </div>

      {/* Goal Progress - Custom Circular-ish Visualization */}
      <div className="flex flex-col items-center justify-center py-4">
        <div className="relative w-48 h-48 bg-blue-600 rounded-3xl flex items-center justify-center shadow-inner overflow-hidden">
          {/* Background fill based on inverse progress to simulate filling up? 
              Actually, let's do a simple overlay or SVG. 
              Let's mimic the design: Blue Square with a Circle inside showing %.
           */}
           
           <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute">
             <circle cx="50" cy="50" r="40" stroke="#1e3a8a" strokeWidth="10" fill="transparent" />
             <circle 
                cx="50" 
                cy="50" 
                r="40" 
                stroke="#93c5fd" 
                strokeWidth="10" 
                fill="transparent"
                strokeDasharray={251.2}
                strokeDashoffset={251.2 - (251.2 * progressPercentage) / 100}
                transform="rotate(-90 50 50)"
                style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
             />
           </svg>
           
           <div className="absolute inset-0 flex items-center justify-center bg-slate-800/20 backdrop-blur-sm m-4 rounded-full">
              <span className="text-3xl font-bold text-white drop-shadow-md">
                {progressPercentage}%
              </span>
           </div>
        </div>
        <div className="mt-4 text-slate-300 text-sm flex gap-4">
          <span>진행: {totalStudiedHours.toFixed(1)}h</span>
          <span className="text-slate-500">/</span>
          <span>목표: {goalHours}h</span>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="flex-1 min-h-[200px] bg-slate-800/50 rounded-xl p-4">
        <h3 className="text-sm font-medium text-slate-400 mb-4">과목별 공부시간 (분)</h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={subjects}>
            <XAxis 
              dataKey="name" 
              stroke="#94a3b8" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
            />
            <Tooltip 
              cursor={{fill: 'transparent'}}
              contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
            />
            <Bar dataKey="time" radius={[6, 6, 0, 0]} barSize={40}>
              {subjects.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StudyTracker;