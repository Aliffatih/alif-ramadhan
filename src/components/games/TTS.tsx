import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw, Trophy, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Question {
  id: number;
  clue: string;
  answer: string;
  direction: 'across' | 'down';
  row: number;
  col: number;
}

interface Level {
  id: number;
  title: string;
  questions: Question[];
  gridSize: number;
}

const LEVELS: Level[] = [
  {
    id: 1,
    title: "Dasar Islam",
    gridSize: 5,
    questions: [
      { id: 1, clue: "Kitab suci umat Islam", answer: "ALQURAN", direction: "across", row: 0, col: 0 },
      { id: 2, clue: "Tempat ibadah Muslim", answer: "MASJID", direction: "down", row: 0, col: 0 },
    ]
  },
  {
    id: 2,
    title: "Rukun Iman",
    gridSize: 6,
    questions: [
      { id: 1, clue: "Malaikat penyampai wahyu", answer: "JIBRIL", direction: "across", row: 1, col: 0 },
      { id: 2, clue: "Nabi terakhir", answer: "MUHAMMAD", direction: "down", row: 0, col: 2 },
    ]
  },
  // ... levels up to 50 would be defined here
];

// Generate dummy levels for demo up to 50
for (let i = 3; i <= 50; i++) {
  LEVELS.push({
    id: i,
    title: `Level ${i}`,
    gridSize: 5,
    questions: [
      { id: 1, clue: `Pertanyaan mendatar level ${i}`, answer: "ISLAM", direction: "across", row: 2, col: 0 },
      { id: 2, clue: `Pertanyaan menurun level ${i}`, answer: "IMAN", direction: "down", row: 1, col: 2 },
    ]
  });
}

export default function TTS() {
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[][]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);

  const currentLevel = LEVELS[currentLevelIdx];

  useEffect(() => {
    const newGrid = Array(currentLevel.gridSize).fill(null).map(() => Array(currentLevel.gridSize).fill(''));
    setUserAnswers(newGrid);
    setIsComplete(false);
    setSelectedCell(null);
  }, [currentLevelIdx, currentLevel.gridSize]);

  const handleCellChange = (r: number, c: number, val: string) => {
    if (isComplete) return;
    const newGrid = userAnswers.map(row => [...row]);
    newGrid[r][c] = val.toUpperCase().slice(-1);
    setUserAnswers(newGrid);
    checkCompletion(newGrid);
  };

  const checkCompletion = (grid: string[][]) => {
    const allCorrect = currentLevel.questions.every(q => {
      for (let i = 0; i < q.answer.length; i++) {
        const r = q.direction === 'across' ? q.row : q.row + i;
        const c = q.direction === 'across' ? q.col + i : q.col;
        if (grid[r][c] !== q.answer[i]) return false;
      }
      return true;
    });
    if (allCorrect) setIsComplete(true);
  };

  const isCellInQuestion = (r: number, c: number) => {
    return currentLevel.questions.some(q => {
      for (let i = 0; i < q.answer.length; i++) {
        const qr = q.direction === 'across' ? q.row : q.row + i;
        const qc = q.direction === 'across' ? q.col + i : q.col;
        if (qr === r && qc === c) return true;
      }
      return false;
    });
  };

  return (
    <div className="space-y-6 py-4 flex flex-col items-center">
      <div className="flex justify-between w-full items-center px-2">
        <button 
          disabled={currentLevelIdx === 0}
          onClick={() => setCurrentLevelIdx(prev => prev - 1)}
          className="p-2 bg-white/5 rounded-xl text-[#FFD700] disabled:opacity-20"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="text-center">
          <h3 className="text-[#FFD700] font-bold text-lg">{currentLevel.title}</h3>
          <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Level {currentLevel.id} / 50</p>
        </div>
        <button 
          disabled={currentLevelIdx === LEVELS.length - 1 || !isComplete}
          onClick={() => setCurrentLevelIdx(prev => prev + 1)}
          className="p-2 bg-[#FFD700]/10 rounded-xl text-[#FFD700] disabled:opacity-20"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div 
        className="grid gap-1 bg-white/5 p-4 rounded-3xl border border-white/10 backdrop-blur-md"
        style={{ gridTemplateColumns: `repeat(${currentLevel.gridSize}, minmax(0, 1fr))` }}
      >
        {Array(currentLevel.gridSize).fill(null).map((_, r) => (
          Array(currentLevel.gridSize).fill(null).map((_, c) => {
            const active = isCellInQuestion(r, c);
            return (
              <input
                key={`${r}-${c}`}
                type="text"
                disabled={!active || isComplete}
                value={userAnswers[r]?.[c] || ''}
                onChange={(e) => handleCellChange(r, c, e.target.value)}
                onFocus={() => setSelectedCell([r, c])}
                className={cn(
                  "w-10 h-10 sm:w-12 sm:h-12 rounded-lg text-center font-bold text-xl transition-all border uppercase",
                  !active ? "bg-transparent border-transparent" : 
                  isComplete ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" :
                  selectedCell?.[0] === r && selectedCell?.[1] === c ? "bg-[#FFD700] text-[#0a192f] border-[#FFD700]" : "bg-white/5 text-white border-white/10"
                )}
              />
            );
          })
        ))}
      </div>

      <div className="w-full space-y-4">
        <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#FFD700]/60">Petunjuk</p>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
            {currentLevel.questions.map(q => (
              <div key={q.id} className="flex gap-3 items-start">
                <span className="text-[10px] bg-[#FFD700]/10 text-[#FFD700] px-1.5 py-0.5 rounded font-bold">{q.direction === 'across' ? 'M' : 'D'}</span>
                <p className="text-xs text-white/70 leading-relaxed">{q.clue}</p>
              </div>
            ))}
          </div>
        </div>

        {isComplete && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl flex items-center justify-center gap-3 text-emerald-400 font-bold"
          >
            <CheckCircle2 className="w-5 h-5" />
            Level Selesai!
          </motion.div>
        )}
      </div>
    </div>
  );
}
