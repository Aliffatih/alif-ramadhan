import React, { useState } from 'react';
import { motion } from 'motion/react';
import { RotateCcw, Trophy } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function BlockBlast() {
  const [grid, setGrid] = useState<boolean[][]>(Array(6).fill(null).map(() => Array(6).fill(false)));
  const [score, setScore] = useState(0);

  const handleCellClick = (r: number, c: number) => {
    const newGrid = [...grid];
    newGrid[r][c] = !newGrid[r][c];
    setGrid(newGrid);
    setScore(s => s + 10);
    
    // Check for full rows/cols (simplified)
    checkLines(newGrid);
  };

  const checkLines = (currentGrid: boolean[][]) => {
    let linesCleared = 0;
    const newGrid = currentGrid.map(row => [...row]);

    // Check rows
    for (let r = 0; r < 6; r++) {
      if (newGrid[r].every(cell => cell)) {
        newGrid[r] = Array(6).fill(false);
        linesCleared++;
      }
    }

    if (linesCleared > 0) {
      setGrid(newGrid);
      setScore(s => s + (linesCleared * 100));
    }
  };

  const resetGame = () => {
    setGrid(Array(6).fill(null).map(() => Array(6).fill(false)));
    setScore(0);
  };

  return (
    <div className="space-y-8 py-4 flex flex-col items-center">
      <div className="flex justify-between w-full max-w-[300px] items-center">
        <div className="flex items-center gap-2 text-[#FFD700]">
          <Trophy className="w-5 h-5" />
          <span className="font-bold text-xl">{score}</span>
        </div>
        <button 
          onClick={resetGame}
          className="p-2 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-all"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-6 gap-1 bg-white/5 p-3 rounded-3xl border border-white/10 backdrop-blur-md">
        {grid.map((row, r) => (
          row.map((cell, c) => (
            <motion.button
              key={`${r}-${c}`}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleCellClick(r, c)}
              className={cn(
                "w-10 h-10 sm:w-12 sm:h-12 rounded-lg transition-all border",
                cell ? "bg-[#FFD700] border-[#FFD700] shadow-[0_0_10px_rgba(255,215,0,0.5)]" : "bg-white/5 border-white/10"
              )}
            />
          ))
        ))}
      </div>

      <div className="text-center space-y-2">
        <p className="text-white/40 text-sm font-medium">Ketuk kotak untuk mengisi</p>
        <p className="text-white/40 text-xs italic">Isi satu baris penuh untuk poin ekstra!</p>
      </div>
    </div>
  );
}
