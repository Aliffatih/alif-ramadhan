import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Grid3X3, Hash, Box, ChevronRight, User, Cpu, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import TicTacToe from './games/TicTacToe';
import Sudoku from './games/Sudoku';
import BlockBlast from './games/BlockBlast';
import TTS from './games/TTS';

type GameType = 'menu' | 'tictactoe' | 'sudoku' | 'blockblast' | 'tts';

export default function Games({ onBack }: { onBack: () => void }) {
  const [activeGame, setActiveGame] = useState<GameType>('menu');

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-4">
        <button 
          onClick={activeGame === 'menu' ? onBack : () => setActiveGame('menu')} 
          className="p-2 rounded-full hover:bg-white/5 text-[#FFD700]"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-serif font-bold text-white">
          {activeGame === 'menu' ? 'Mini Games' : 
           activeGame === 'tictactoe' ? 'Tic Tac Toe' :
           activeGame === 'sudoku' ? 'Sudoku' : 
           activeGame === 'tts' ? 'TTS Islami' : 'Block Blast'}
        </h2>
      </div>

      <AnimatePresence mode="wait">
        {activeGame === 'menu' && (
          <motion.div
            key="game-menu"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 gap-4"
          >
            <GameCard 
              icon={<Grid3X3 className="w-8 h-8" />}
              title="Tic Tac Toe"
              description="Main berdua atau lawan Bot"
              onClick={() => setActiveGame('tictactoe')}
              color="from-blue-500/20 to-indigo-500/20"
            />
            <GameCard 
              icon={<Hash className="w-8 h-8" />}
              title="Sudoku"
              description="Asah otak dengan angka"
              onClick={() => setActiveGame('sudoku')}
              color="from-emerald-500/20 to-teal-500/20"
            />
            <GameCard 
              icon={<Box className="w-8 h-8" />}
              title="Block Blast"
              description="Susun balok dan hancurkan"
              onClick={() => setActiveGame('blockblast')}
              color="from-amber-500/20 to-orange-500/20"
            />
            <GameCard 
              icon={<Sparkles className="w-8 h-8" />}
              title="TTS Islami"
              description="Teka-teki silang 50 level"
              onClick={() => setActiveGame('tts')}
              color="from-purple-500/20 to-pink-500/20"
            />
          </motion.div>
        )}

        {activeGame === 'tictactoe' && <TicTacToe />}
        {activeGame === 'sudoku' && <Sudoku />}
        {activeGame === 'blockblast' && <BlockBlast />}
        {activeGame === 'tts' && <TTS />}
      </AnimatePresence>
    </motion.div>
  );
}

function GameCard({ icon, title, description, onClick, color }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string, 
  onClick: () => void,
  color: string
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "flex items-center gap-6 p-6 rounded-[32px] text-left transition-all border border-white/10 shadow-xl backdrop-blur-md bg-gradient-to-br",
        color
      )}
    >
      <div className="p-4 rounded-2xl bg-white/5 text-[#FFD700] shadow-inner">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-xl text-white">{title}</h3>
        <p className="text-sm text-white/40">{description}</p>
      </div>
      <ChevronRight className="w-6 h-6 text-white/20" />
    </motion.button>
  );
}
