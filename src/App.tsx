/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Moon, 
  Sun, 
  BookOpen, 
  Heart, 
  Info, 
  LogOut, 
  Volume2, 
  VolumeX, 
  Calendar,
  Clock,
  MapPin,
  Gamepad2,
  ChevronRight,
  ChevronLeft,
  Sparkles
} from 'lucide-react';
import { cn } from './lib/utils';

// Components (to be created)
import Imsakiyah from './components/Imsakiyah';
import DzikirDoa from './components/DzikirDoa';
import Sedekah from './components/Sedekah';
import About from './components/About';
import IdulFitri from './components/IdulFitri';
import Games from './components/Games';

type Menu = 'home' | 'imsakiyah' | 'dzikir' | 'sedekah' | 'about' | 'idulfitri' | 'games';

export default function App() {
  const [activeMenu, setActiveMenu] = useState<Menu>('home');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      setIsAudioPlaying(!isAudioPlaying);
    }
  };

  const handleExit = () => {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
      window.close();
      // Fallback if window.close() is blocked
      alert('Terima kasih telah menggunakan aplikasi ini. Silakan tutup tab ini.');
    }
  };

  return (
    <div className="min-h-screen ramadhan-bg text-white font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      {/* Decorative Pattern & Border */}
      <div className="fixed inset-0 ramadhan-pattern pointer-events-none z-0" />
      <div className="fixed inset-4 gold-border rounded-[40px] pointer-events-none z-40 opacity-50" />
      
      {/* Hanging Lanterns (Decorative) */}
      <div className="fixed top-0 left-12 z-10 pointer-events-none hidden md:block">
        <div className="w-0.5 h-24 bg-[#FFD700]/40 mx-auto" />
        <div className="w-6 h-8 bg-[#FFD700] rounded-b-full shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
      </div>
      <div className="fixed top-0 right-12 z-10 pointer-events-none hidden md:block">
        <div className="w-0.5 h-32 bg-[#FFD700]/40 mx-auto" />
        <div className="w-6 h-8 bg-[#FFD700] rounded-b-full shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
      </div>

      {/* Background Audio */}
      <audio 
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
        loop
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a192f]/60 backdrop-blur-md border-b border-white/5 px-8 py-4 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setActiveMenu('home')}
        >
          <Moon className="w-6 h-6 text-[#FFD700] fill-[#FFD700]" />
          <h1 className="text-xl font-serif font-bold tracking-tight text-[#FFD700]">Ramadhan Kareem</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleAudio}
            className="p-2 rounded-full hover:bg-white/5 transition-colors text-[#FFD700]"
          >
            {isAudioPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-28 pb-32 px-10 max-w-2xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {activeMenu === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center space-y-4 py-12">
                <motion.div 
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="inline-block p-8 rounded-full bg-[#FFD700]/10 mb-4 border border-[#FFD700]/20"
                >
                  <Moon className="w-20 h-20 text-[#FFD700] drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]" />
                </motion.div>
                <h2 className="text-5xl font-serif font-bold text-[#FFD700]">Marhaban Ya Ramadhan</h2>
                <p className="text-white/60 max-w-md mx-auto italic text-lg">
                  "Bulan Ramadhan adalah bulan yang di dalamnya diturunkan Al-Quran sebagai petunjuk bagi manusia."
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <MenuCard 
                  icon={<Calendar className="w-6 h-6" />}
                  title="Jadwal Imsakiyah"
                  description="Lihat jadwal imsak dan buka puasa harian"
                  onClick={() => setActiveMenu('imsakiyah')}
                  color="bg-white/5 text-[#FFD700] border-white/10"
                />
                <MenuCard 
                  icon={<BookOpen className="w-6 h-6" />}
                  title="Dzikir & Doa"
                  description="Kumpulan doa harian dan dzikir ramadhan"
                  onClick={() => setActiveMenu('dzikir')}
                  color="bg-white/5 text-[#FFD700] border-white/10"
                />
                <MenuCard 
                  icon={<Heart className="w-6 h-6" />}
                  title="Sedekah"
                  description="Salurkan kebaikan di bulan suci"
                  onClick={() => setActiveMenu('sedekah')}
                  color="bg-white/5 text-[#FFD700] border-white/10"
                />
                <MenuCard 
                  icon={<Info className="w-6 h-6" />}
                  title="Tentang Aplikasi"
                  description="Informasi mengenai aplikasi ini"
                  onClick={() => setActiveMenu('about')}
                  color="bg-white/5 text-[#FFD700] border-white/10"
                />
                <MenuCard 
                  icon={<Gamepad2 className="w-6 h-6" />}
                  title="Mini Games"
                  description="Main game seru biar gak gabut"
                  onClick={() => setActiveMenu('games')}
                  color="bg-white/5 text-[#FFD700] border-white/10"
                />
                <MenuCard 
                  icon={<Sparkles className="w-6 h-6" />}
                  title="Ucapan Idul Fitri"
                  description="Selamat Hari Raya Idul Fitri"
                  onClick={() => setActiveMenu('idulfitri')}
                  color="bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/20"
                />
                <MenuCard 
                  icon={<LogOut className="w-6 h-6" />}
                  title="Keluar"
                  description="Tutup aplikasi"
                  onClick={handleExit}
                  color="bg-white/5 text-white/40 border-white/10"
                />
              </div>
            </motion.div>
          )}

          {activeMenu === 'imsakiyah' && <Imsakiyah onBack={() => setActiveMenu('home')} />}
          {activeMenu === 'dzikir' && <DzikirDoa onBack={() => setActiveMenu('home')} />}
          {activeMenu === 'sedekah' && <Sedekah onBack={() => setActiveMenu('home')} />}
          {activeMenu === 'about' && <About onBack={() => setActiveMenu('home')} />}
          {activeMenu === 'idulfitri' && <IdulFitri onBack={() => setActiveMenu('home')} />}
          {activeMenu === 'games' && <Games onBack={() => setActiveMenu('home')} />}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation (Mobile Style) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0a192f]/80 backdrop-blur-lg border-t border-white/5 px-8 py-5 flex justify-around items-center z-50">
        <NavButton active={activeMenu === 'home'} onClick={() => setActiveMenu('home')} icon={<Moon className="w-5 h-5" />} label="Home" />
        <NavButton active={activeMenu === 'imsakiyah'} onClick={() => setActiveMenu('imsakiyah')} icon={<Calendar className="w-5 h-5" />} label="Jadwal" />
        <NavButton active={activeMenu === 'dzikir'} onClick={() => setActiveMenu('dzikir')} icon={<BookOpen className="w-5 h-5" />} label="Doa" />
        <NavButton active={activeMenu === 'sedekah'} onClick={() => setActiveMenu('sedekah')} icon={<Heart className="w-5 h-5" />} label="Sedekah" />
      </nav>
    </div>
  );
}

function MenuCard({ icon, title, description, onClick, color }: { 
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
        "flex items-center gap-4 p-6 rounded-3xl text-left transition-all border shadow-lg backdrop-blur-sm",
        color
      )}
    >
      <div className="p-4 rounded-2xl bg-white/5 shadow-inner text-[#FFD700]">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-xl">{title}</h3>
        <p className="text-sm opacity-60">{description}</p>
      </div>
      <ChevronRight className="w-5 h-5 opacity-40" />
    </motion.button>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 transition-all",
        active ? "text-[#FFD700] scale-110" : "text-white/30 hover:text-white/50"
      )}
    >
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
      {active && <motion.div layoutId="nav-dot" className="w-1.5 h-1.5 rounded-full bg-[#FFD700] mt-1 shadow-[0_0_10px_#FFD700]" />}
    </button>
  );
}
