import { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
}

export function Confetti({ active, onComplete }: { active: boolean; onComplete?: () => void }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (!active) return;

    const colors = ['#f59e0b', '#ec4899', '#38bdf8', '#22c55e', '#a855f7', '#fbbf24', '#ef4444'];
    const newPieces: ConfettiPiece[] = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 - Math.random() * 20,
      size: 6 + Math.random() * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
    }));

    setPieces(newPieces);

    const timer = setTimeout(() => {
      setPieces([]);
      if (onComplete) onComplete();
    }, 3500);

    return () => clearTimeout(timer);
  }, [active, onComplete]);

  if (!active || pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-sm animate-bounce"
          style={{
            left: `${p.x}%`,
            top: `${p.y + 40}%`,
            width: `${p.size}px`,
            height: `${p.size * 0.6}px`,
            backgroundColor: p.color,
            transform: `rotate(${p.rotation}deg)`,
            transition: 'top 3s cubic-bezier(0.25, 1, 0.5, 1), transform 3s ease',
          }}
        />
      ))}
    </div>
  );
}
