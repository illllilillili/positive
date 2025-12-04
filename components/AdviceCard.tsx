import React, { useState, useEffect, useCallback } from 'react';
import { AdviceType } from '../types';
import { generateAdvice } from '../services/geminiService';
import { RefreshCw, Sparkles } from 'lucide-react';

interface AdviceCardProps {
  type: AdviceType;
  title: string;
}

const AdviceCard: React.FC<AdviceCardProps> = ({ type, title }) => {
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchAdvice = useCallback(async () => {
    setIsLoading(true);
    const text = await generateAdvice(type);
    setContent(text);
    setIsLoading(false);
  }, [type]);

  useEffect(() => {
    fetchAdvice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-slate-100 font-bold text-lg flex items-center gap-2">
          {title}
        </h3>
        <button 
          onClick={fetchAdvice}
          disabled={isLoading}
          className="text-slate-400 hover:text-white transition-colors p-1 rounded-full hover:bg-slate-700 disabled:opacity-50"
          title="새로운 조언 받기"
        >
          <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
        </button>
      </div>
      
      <div className="relative p-6 rounded-xl border-2 border-dashed border-yellow-500/50 bg-slate-800/50">
        {/* Decorative corner icon */}
        <div className="absolute top-2 right-2 text-yellow-500/20">
          <Sparkles size={24} />
        </div>

        {isLoading ? (
          <div className="h-24 flex items-center justify-center text-slate-400 text-sm animate-pulse">
            따뜻한 조언을 생각하고 있어요...
          </div>
        ) : (
          <p className="text-yellow-100/90 leading-relaxed font-medium text-sm md:text-base break-keep">
            {content}
          </p>
        )}
      </div>
    </div>
  );
};

export default AdviceCard;