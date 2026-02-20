import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Sparkles, Heart, Share2 } from 'lucide-react';

export default function IdulFitri({ onBack }: { onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="space-y-8 text-center py-12"
    >
      <div className="flex items-center justify-start mb-4">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-white/5 text-[#FFD700]">
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="relative inline-block">
        <motion.div
          animate={{ 
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="p-10 rounded-full bg-[#FFD700]/10 border-2 border-[#FFD700]/30 shadow-[0_0_50px_rgba(255,215,0,0.2)]"
        >
          <Sparkles className="w-24 h-24 text-[#FFD700]" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-4 -right-4 bg-[#D32F2F] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg"
        >
          1 SYAWAL
        </motion.div>
      </div>

      <div className="space-y-4">
        <h2 className="text-5xl font-serif font-bold text-[#FFD700] leading-tight">
          Selamat Hari Raya<br />Idul Fitri 1447 H
        </h2>
        <p className="text-2xl font-serif italic text-white/80">
          Taqabbalallahu Minna Wa Minkum
        </p>
        <div className="h-px bg-[#FFD700]/20 w-24 mx-auto my-6" />
        <p className="text-white/60 max-w-md mx-auto leading-relaxed">
          "Semoga Allah menerima amal ibadah kami dan amal ibadah kalian. Mohon maaf lahir dan batin atas segala khilaf dan salah."
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 pt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-3 p-5 bg-[#FFD700] text-[#0a192f] rounded-2xl font-bold shadow-xl shadow-[#FFD700]/20"
        >
          <Share2 className="w-5 h-5" />
          Bagikan Ucapan
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center justify-center gap-3 p-5 bg-white/5 text-white/60 rounded-2xl font-bold border border-white/10"
        >
          <Heart className="w-5 h-5" />
          Kembali ke Beranda
        </motion.button>
      </div>

      <footer className="pt-12">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
          Keluarga Besar Alif Fatih
        </p>
      </footer>
    </motion.div>
  );
}
