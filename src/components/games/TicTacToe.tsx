import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { User, Cpu, RotateCcw } from 'lucide-react';
import { cn } from '../../lib/utils';

type Player = 'X' | 'O' | null;

export default function TicTacToe() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameMode, setGameMode] = useState<'pvp' | 'pve'>('pvp');
  const [winner, setWinner] = useState<Player | 'Draw'>(null);

  const calculateWinner = (squares: Player[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    if (squares.every(s => s !== null)) return 'Draw';
    return null;
  };

  const handleClick = (i: number) => {
    if (winner || board[i]) return;
    const newBoard = [...board];
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
    setWinner(calculateWinner(newBoard));
  };

  const makeBotMove = useCallback(() => {
    if (winner || isXNext) return;
    const emptyIndices = board.map((s, i) => s === null ? i : null).filter(i => i !== null) as number[];
    if (emptyIndices.length === 0) return;
    
    // Simple bot: random move
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    setTimeout(() => handleClick(randomIndex), 500);
  }, [board, isXNext, winner]);

  useEffect(() => {
    if (gameMode === 'pve' && !isXNext && !winner) {
      makeBotMove();
    }
  }, [isXNext, gameMode, winner, makeBotMove]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="space-y-8 py-4">
      <div className="flex justify-center gap-4">
        <button 
          onClick={() => { setGameMode('pvp'); resetGame(); }}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all",
            gameMode === 'pvp' ? "bg-[#FFD700] text-[#0a192f]" : "bg-white/5 text-white/40"
          )}
        >
          <User className="w-4 h-4" /> PvP
        </button>
        <button 
          onClick={() => { setGameMode('pve'); resetGame(); }}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all",
            gameMode === 'pve' ? "bg-[#FFD700] text-[#0a192f]" : "bg-white/5 text-white/40"
          )}
        >
          <Cpu className="w-4 h-4" /> vs Bot
        </button>
      </div>

      <div className="flex flex-col items-center gap-6">
        <div className="grid grid-cols-3 gap-3">
          {board.map((square, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleClick(i)}
              className="w-20 h-20 sm:w-24 sm:h-24 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-4xl font-bold text-[#FFD700] shadow-lg backdrop-blur-sm"
            >
              {square}
            </motion.button>
          ))}
        </div>

        <div className="text-center space-y-4">
          {winner ? (
            <h3 className="text-2xl font-bold text-[#FFD700]">
              {winner === 'Draw' ? 'Seri!' : `Pemenang: ${winner}`}
            </h3>
          ) : (
            <p className="text-white/60 font-medium">
              Giliran: <span className="text-[#FFD700] font-bold">{isXNext ? 'X' : 'O'}</span>
            </p>
          )}

          <button 
            onClick={resetGame}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-2xl font-bold text-white transition-all mx-auto"
          >
            <RotateCcw className="w-5 h-5" /> Reset Game
          </button>
        </div>
      </div>
    </div>
  );
}
