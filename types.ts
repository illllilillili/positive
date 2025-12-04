export interface SubjectStudyTime {
  name: string;
  time: number; // in minutes
  color: string;
}

export interface FriendMessage {
  id: string;
  user: string;
  message: string;
  timestamp: string;
  isGoalAchieved?: boolean;
}

export enum AdviceType {
  RECLUSE = 'RECLUSE', // 은둔형 외톨이
  RESTED = 'RESTED',   // 쉬었음 세대
}

export interface AdviceContent {
  title: string;
  content: string;
}