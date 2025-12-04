import React from 'react';
import StudyTracker from './components/StudyTracker';
import SocialFeed from './components/SocialFeed';
import AdviceCard from './components/AdviceCard';
import { AdviceType } from './types';
import { Footprints } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8 flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Footprints size={32} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Hope Step</h1>
            <p className="text-slate-400 text-sm">작은 발걸음이 만드는 큰 변화</p>
          </div>
        </header>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Tracker (Study Stats) */}
          <div className="lg:col-span-4 space-y-6">
            <StudyTracker />
            {/* On Desktop, Social Feed might go below tracker or on right depending on height. 
                Based on image, it looks like a stacked left column. */}
            <SocialFeed />
          </div>

          {/* Right Column: Advice Sections */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Introduction / Welcome Banner (Optional enhancement) */}
            <div className="bg-gradient-to-r from-indigo-900 to-slate-800 rounded-2xl p-6 border-l-4 border-indigo-500">
              <h2 className="text-xl font-bold mb-2">오늘도 책상 앞에 앉은 당신을 응원합니다!</h2>
              <p className="text-slate-300">
                비록 어제는 힘들었을지라도, 오늘 내딛는 10분의 노력이 당신의 내일을 바꿉니다. 
                우리는 당신의 속도를 존중하며 언제나 곁에 있을 거예요.
              </p>
            </div>

            {/* Advice Area 1: For Recluses */}
            <section className="bg-slate-700/50 rounded-2xl p-6 lg:p-8 shadow-lg">
              <AdviceCard 
                type={AdviceType.RECLUSE} 
                title="은둔형 외톨이를 위한 사람들을 잘 만나는 법" 
              />
            </section>

            {/* Advice Area 2: For Rested Generation */}
            <section className="bg-slate-700/50 rounded-2xl p-6 lg:p-8 shadow-lg">
              <AdviceCard 
                type={AdviceType.RESTED} 
                title="쉬었음 세대를 위한 사회활동 잘 하는 법" 
              />
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default App;