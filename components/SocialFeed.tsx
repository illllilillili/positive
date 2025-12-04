import React, { useState } from 'react';
import { FriendMessage } from '../types';
import { MessageCircle, User, Send } from 'lucide-react';

const INITIAL_MESSAGES: FriendMessage[] = [
  { id: '1', user: '김철수', message: '오늘 수학 목표 달성! 다들 화이팅', timestamp: '10분 전', isGoalAchieved: true },
  { id: '2', user: '이영희', message: '조금 지치지만 끝까지 해볼게요.', timestamp: '30분 전', isGoalAchieved: false },
  { id: '3', user: '박민수', message: '산책하고 오니 머리가 맑아졌어요.', timestamp: '1시간 전', isGoalAchieved: false },
];

const SocialFeed: React.FC = () => {
  const [messages, setMessages] = useState<FriendMessage[]>(INITIAL_MESSAGES);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const msg: FriendMessage = {
      id: Date.now().toString(),
      user: '나',
      message: newMessage,
      timestamp: '방금',
      isGoalAchieved: false,
    };
    
    setMessages([msg, ...messages]);
    setNewMessage('');
  };

  return (
    <div className="bg-slate-700 rounded-2xl p-6 shadow-lg flex flex-col h-full">
      <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <MessageCircle className="text-emerald-400" />
        적극성 증가를 위한 친구들과의 소통
      </h2>

      <div className="flex-1 overflow-y-auto space-y-3 mb-4 max-h-[300px] pr-2 custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className="bg-slate-800 rounded-lg p-3 flex gap-3 items-start">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.user === '나' ? 'bg-blue-600' : 'bg-slate-600'}`}>
              <User size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-bold text-slate-200 text-sm">{msg.user}</span>
                <span className="text-xs text-slate-500">{msg.timestamp}</span>
              </div>
              <p className="text-slate-300 text-sm">{msg.message}</p>
              {msg.isGoalAchieved && (
                <span className="inline-block mt-2 px-2 py-0.5 bg-blue-900/50 text-blue-300 text-xs rounded border border-blue-700/50">
                  공부중
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 relative">
        <input 
          type="text" 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="친구들에게 한마디..."
          className="flex-1 bg-slate-800 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={handleSendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors flex items-center justify-center"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default SocialFeed;