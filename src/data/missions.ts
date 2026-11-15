import type { Mission } from '../types/adventure';

export const DEFAULT_MISSIONS: Mission[] = [
  // Morning
  { id: 'm1', title: 'צחצוח שיניים קפדני (2 דק\')', category: 'morning', stars: 2, completed: false, icon: '🪥' },
  { id: 'm2', title: 'סידור המיטה היפה שלי', category: 'morning', stars: 1, completed: false, icon: '🛏️' },
  { id: 'm3', title: 'התלבשות עצמאית בבגדים נקיים', category: 'morning', stars: 2, completed: false, icon: '👕' },
  { id: 'm4', title: 'שתיית כוס מים וארוחת בוקר בריאה', category: 'morning', stars: 1, completed: false, icon: '🥣' },

  // Day & Afternoon
  { id: 'm5', title: 'הכנת שיעורים או קריאת 10 דקות', category: 'day', stars: 3, completed: false, icon: '📖' },
  { id: 'm6', title: 'סידור הילקוט והקלמר ליום הבא', category: 'day', stars: 2, completed: false, icon: '🎒' },
  { id: 'm7', title: 'איסוף משחקים ונעליים למקום', category: 'day', stars: 2, completed: false, icon: '🧸' },

  // Evening
  { id: 'm8', title: 'מקלחת מרעננת והכנת בגדים לבוקר', category: 'evening', stars: 2, completed: false, icon: '🛁' },
];

