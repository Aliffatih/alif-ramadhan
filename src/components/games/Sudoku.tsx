import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { RotateCcw, Lightbulb } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Sudoku() {
  const [grid, setGrid] = useState<(number | null)[][]>([]);
  const [initialGrid, setInitialGrid] = useState<(number | null)[][]>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);

  // Simple 4x4 Sudoku for mobile/demo
  const generatePuzzle = () => {
    const puzzle = [
      [1, null, null, 4],
      [null, 4, 1, null],
      [null, 1, 4, null],
      [4, null, null, 1]
    ];
    setGrid(puzzle.map(row => [...row]));
    setInitialGrid(puzzle.map(row => [...row]));
  };

  useEffect(() => {
    generatePuzzle();
  }, []);

  const handleCellClick = (r: number, c: number) => {
    if (initialGrid[r][c] !== null) return;
    setSelectedCell([r, c]);
  };

  const handleNumberInput = (num: number) => {
    if (!selectedCell) return;
    const [r, c] = selectedCell;
    const newGrid = [...grid];
    newGrid[r][c] = num;
    setGrid(newGrid);
  };

  const resetGame = () => {
    setGrid(initialGrid.map(row => [...row]));
    setSelectedCell(null);
  };

  return (
    <div className="space-y-8 py-4 flex flex-col items-center">
      <div className="grid grid-cols-4 gap-2 bg-white/5 p-4 rounded-3xl border border-white/10 backdrop-blur-md">
        {grid.map((row, r) => (
          row.map((cell, c) => (
            <motion.button
              key={`${r}-${c}`}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCellClick(r, c)}
              className={cn(
                "w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold transition-all border",
                initialGrid[r][c] !== null ? "bg-white/10 text-[#FFD700] border-transparent" : 
                selectedCell?.[0] === r && selectedCell?.[1] === c ? "bg-[#FFD700] text-[#0a192f] border-[#FFD700]" : "bg-white/5 text-white/80 border-white/10"
              )}
            >
              {cell}
            </motion.button>
          ))
        ))}
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[1, 2, 3, 4].map(num => (
          <motion.button
            key={num}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleNumberInput(num)}
            className="w-14 h-14 bg-[#FFD700]/10 border border-[#FFD700]/20 rounded-2xl flex items-center justify-center text-xl font-bold text-[#FFD700]"
          >
            {num}
          </motion.button>
        ))}
      </div>

      <div className="flex gap-4">
        <button 
          onClick={resetGame}
          className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-2xl font-bold text-white transition-all"
        >
          <RotateCcw className="w-5 h-5" /> Reset
        </button>
        <button 
          className="flex items-center gap-2 px-6 py-3 bg-[#FFD700]/10 text-[#FFD700] rounded-2xl font-bold border border-[#FFD700]/20"
        >
          <Lightbulb className="w-5 h-5" /> Hint
        </button>
      </div>
    </div>
  );
}
