import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Search, Book, Star, Volume2 } from 'lucide-react';
import { cn } from '../lib/utils';

const DOAS = [
  {
    id: 1,
    title: "Doa Berbuka Puasa",
    arabic: "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ",
    latin: "Dzahabaz zhama'u wabtallatil 'uruqu wa tsabatal ajru in sya Allah",
    translation: "Telah hilang rasa haus dan urat-urat telah basah serta pahala telah tetap, insya Allah.",
    audio: "https://www.islamcan.com/audio/dua/dua-breaking-fast.mp3"
  },
  {
    id: 2,
    title: "Niat Puasa Ramadhan",
    arabic: "نَوَيْتُ صَوْمَ غَدٍ عَنْ أَدَاءِ فَرْضِ شَهْرِ رَمَضَانَ هَذِهِ السَّنَةِ لِلَّهِ تَعَالَى",
    latin: "Nawaitu shauma ghadin 'an ada'i fardhi syahri ramadhana hadzihis sanati lillahi ta'ala",
    translation: "Aku niat berpuasa esok hari untuk menunaikan kewajiban puasa bulan Ramadhan tahun ini karena Allah Ta'ala.",
    audio: "https://www.islamcan.com/audio/dua/dua-fasting-intention.mp3"
  },
  {
    id: 3,
    title: "Dzikir Pagi (Tasbih)",
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
    latin: "Subhanallahi wa bihamdihi",
    translation: "Maha Suci Allah dan segala puji bagi-Nya.",
    audio: "https://www.islamcan.com/audio/dua/subhanallah.mp3"
  },
  {
    id: 4,
    title: "Doa Lailatul Qadar",
    arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
    latin: "Allahumma innaka 'afuwwun tuhibbul 'afwa fa'fu 'anni",
    translation: "Ya Allah, sesungguhnya Engkau Maha Pengampun dan menyukai ampunan, maka ampunilah aku.",
    audio: "https://www.islamcan.com/audio/dua/lailatul-qadar.mp3"
  }
];

export default function DzikirDoa({ onBack }: { onBack: () => void }) {
  const [search, setSearch] = useState('');
  const [selectedDoa, setSelectedDoa] = useState<typeof DOAS[0] | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const filteredDoas = DOAS.filter(doa => 
    doa.title.toLowerCase().includes(search.toLowerCase())
  );

  const playAudio = (url: string) => {
    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <audio ref={audioRef} />
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-black/5">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-serif font-bold">Dzikir & Doa</h2>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
        <input 
          type="text"
          placeholder="Cari doa atau dzikir..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20 transition-all text-white placeholder:text-white/20"
        />
      </div>

      <div className="space-y-3">
        {filteredDoas.map((doa) => (
          <motion.div
            key={doa.id}
            layoutId={`doa-${doa.id}`}
            onClick={() => setSelectedDoa(doa)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedDoa(doa); }}
            className="w-full flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 text-left hover:border-[#FFD700]/40 transition-colors group cursor-pointer backdrop-blur-sm"
          >
            <div className="p-2 rounded-xl bg-[#FFD700]/10 text-[#FFD700] group-hover:bg-[#FFD700] group-hover:text-[#0a192f] transition-colors">
              <Book className="w-5 h-5" />
            </div>
            <span className="font-medium flex-1 text-white/80 group-hover:text-white transition-colors">{doa.title}</span>
            <div className="flex items-center gap-2">
               <button 
                onClick={(e) => { e.stopPropagation(); playAudio(doa.audio); }}
                className="p-2 rounded-full hover:bg-white/10 text-[#FFD700]"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <Star className="w-4 h-4 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedDoa && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDoa(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              layoutId={`doa-${selectedDoa.id}`}
              className="relative w-full max-w-md bg-[#0a192f] rounded-3xl p-8 shadow-2xl space-y-6 overflow-hidden border border-[#FFD700]/20"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-[#FFD700]" />
              
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h3 className="text-2xl font-serif font-bold text-[#FFD700]">{selectedDoa.title}</h3>
                  <div className="h-0.5 bg-[#FFD700]/20 w-12" />
                </div>
                <button 
                  onClick={() => playAudio(selectedDoa.audio)}
                  className="p-3 rounded-full bg-[#FFD700]/10 text-[#FFD700] hover:bg-[#FFD700]/20 transition-colors"
                >
                  <Volume2 className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-8">
                <p className="text-4xl font-serif text-right leading-loose text-white" dir="rtl">
                  {selectedDoa.arabic}
                </p>
                
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFD700]/60">Latin</p>
                    <p className="text-sm italic text-white/70 leading-relaxed font-serif">{selectedDoa.latin}</p>
                  </div>
                  
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFD700]/60">Artinya</p>
                    <p className="text-sm text-white/80 leading-relaxed">{selectedDoa.translation}</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setSelectedDoa(null)}
                className="w-full py-4 bg-[#FFD700] text-[#0a192f] rounded-2xl font-bold hover:bg-[#FFD700]/90 transition-all shadow-lg shadow-[#FFD700]/20"
              >
                Tutup
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
