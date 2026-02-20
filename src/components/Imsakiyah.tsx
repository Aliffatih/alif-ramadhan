import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, MapPin, Clock, Calendar as CalendarIcon, Download, Volume2 } from 'lucide-react';
import { format, parse, isAfter, differenceInSeconds } from 'date-fns';
import { id } from 'date-fns/locale';
import { cn } from '../lib/utils';

interface JadwalRow {
  tanggal: string;
  imsak: string;
  subuh: string;
  zuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
}

const JADWAL_BANDUNG: JadwalRow[] = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  return {
    tanggal: `${day} Ramadhan`,
    imsak: day <= 6 ? '04.28' : '04.29',
    subuh: day <= 6 ? '04.38' : '04.39',
    zuhur: day <= 4 ? '12.07' : day <= 10 ? '12.06' : day <= 15 ? '12.05' : day <= 23 ? '12.04' : day <= 25 ? '12.02' : '12.01',
    ashar: day <= 1 ? '15.16' : day <= 3 ? '15.15' : day <= 4 ? '15.14' : day <= 5 ? '15.13' : day <= 6 ? '15.12' : day <= 7 ? '15.11' : day <= 8 ? '15.10' : day <= 9 ? '15.09' : day <= 10 ? '15.08' : day <= 11 ? '15.07' : day <= 12 ? '15.06' : day <= 13 ? '15.05' : day <= 15 ? '15.06' : day <= 17 ? '15.07' : day <= 20 ? '15.08' : day <= 23 ? '15.09' : day <= 27 ? '15.10' : '15.11',
    maghrib: day <= 1 ? '18.20' : day <= 3 ? '18.19' : day <= 5 ? '18.18' : day <= 7 ? '18.17' : day <= 12 ? '18.16' : day <= 14 ? '18.15' : day <= 17 ? '18.14' : day <= 19 ? '18.13' : day <= 21 ? '18.12' : day <= 23 ? '18.11' : day <= 26 ? '18.10' : day <= 28 ? '18.09' : '18.08',
    isya: day <= 1 ? '19.26' : day <= 2 ? '19.25' : day <= 4 ? '19.24' : day <= 7 ? '19.23' : day <= 9 ? '19.22' : day <= 12 ? '19.21' : day <= 15 ? '19.20' : day <= 18 ? '19.19' : day <= 20 ? '19.18' : day <= 22 ? '19.17' : day <= 24 ? '19.16' : day <= 26 ? '19.15' : day <= 28 ? '19.14' : day <= 29 ? '19.13' : '19.12',
  };
});

export default function Imsakiyah({ onBack }: { onBack: () => void }) {
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [countdown, setCountdown] = useState({ label: '', time: '', progress: 0 });
  const adzanAudioRef = useRef<HTMLAudioElement | null>(null);
  const city = 'Bandung';
  
  // For demo purposes, we assume today is 2 Ramadhan
  const currentRamadhanDay = 2;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      updateCountdown(now);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const updateCountdown = (now: Date) => {
    const todayJadwal = JADWAL_BANDUNG[currentRamadhanDay - 1];
    const imsakTime = parse(todayJadwal.imsak.replace('.', ':'), 'HH:mm', now);
    const maghribTime = parse(todayJadwal.maghrib.replace('.', ':'), 'HH:mm', now);

    let target: Date;
    let label: string;
    let start: Date;

    if (isAfter(imsakTime, now)) {
      target = imsakTime;
      label = 'Imsak';
      // Start from previous day isya or midnight
      start = new Date(now);
      start.setHours(0, 0, 0, 0);
    } else if (isAfter(maghribTime, now)) {
      target = maghribTime;
      label = 'Buka Puasa';
      start = imsakTime;
    } else {
      // Next day imsak
      target = new Date(imsakTime);
      target.setDate(target.getDate() + 1);
      label = 'Imsak Besok';
      start = maghribTime;
    }

    const diff = differenceInSeconds(target, now);
    const total = differenceInSeconds(target, start);
    const progress = Math.max(0, Math.min(100, ((total - diff) / total) * 100));

    if (diff === 0) {
      playAdzan();
    }

    const h = Math.floor(diff / 3600);
    const m = Math.floor((diff % 3600) / 60);
    const s = diff % 60;
    
    setCountdown({
      label,
      time: `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`,
      progress
    });
  };

  const playAdzan = () => {
    if (adzanAudioRef.current) {
      adzanAudioRef.current.play().catch(e => console.log("Adzan play failed:", e));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6 pb-24"
    >
      <audio ref={adzanAudioRef} src="https://www.islamcan.com/audio/adzan/azan1.mp3" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 rounded-full hover:bg-black/5">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-serif font-bold">Jadwal Imsakiyah</h2>
        </div>
        <div className="flex items-center gap-2">
           <button onClick={playAdzan} className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
            <Volume2 className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Elegant Countdown Card */}
      <div className="relative overflow-hidden bg-[#1E3A5F] rounded-[32px] p-8 text-white shadow-2xl">
        {/* Atmospheric Background Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-16 -mt-16 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-500/10 rounded-full -ml-12 -mb-12 blur-2xl" />
        
        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">Menuju Waktu {countdown.label}</p>
            <h3 className="text-6xl font-mono font-bold tracking-tighter text-white drop-shadow-sm">
              {countdown.time}
            </h3>
          </div>

          {/* Progress Bar */}
          <div className="w-full space-y-2">
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${countdown.progress}%` }}
                className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
              />
            </div>
            <div className="flex justify-between text-[10px] font-bold text-white/40 uppercase tracking-widest">
              <span>Sekarang</span>
              <span>{countdown.label}</span>
            </div>
          </div>

          <div className="flex items-center gap-6 pt-2">
            <div className="text-left">
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Jam Sekarang</p>
              <p className="text-lg font-mono font-bold">{format(currentTime, 'HH:mm:ss')}</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-left">
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Hari Ini</p>
              <p className="text-lg font-serif italic">{format(currentTime, 'd MMMM', { locale: id })}</p>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-3xl p-12 text-center space-y-4 shadow-sm border border-black/5">
          <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-black/40 animate-pulse">Menyiapkan jadwal...</p>
        </div>
      ) : (
        <div className="bg-[#FFB800] rounded-[40px] p-1 shadow-xl overflow-hidden">
          <div className="bg-[#FFB800] pt-8 pb-6 px-6 text-center">
            <div className="flex justify-center mb-2">
              <div className="bg-white rounded-full p-2 shadow-sm">
                <img src="https://picsum.photos/seed/logo/40/40" alt="Logo" className="w-8 h-8 rounded-full" referrerPolicy="no-referrer" />
              </div>
            </div>
            <h3 className="text-[#1E3A5F] text-2xl font-bold tracking-tight">Jadwal Imsakiyah {city}</h3>
            <p className="text-[#1E3A5F] text-lg font-medium opacity-80">Ramadhan 1447 Hijriah</p>
          </div>

          <div className="bg-[#1E3A5F] rounded-t-[32px] overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-[#D32F2F] text-white">
                  <th className="py-4 px-4 font-bold border-r border-white/10">Tanggal</th>
                  <th className="py-4 px-4 font-bold border-r border-white/10 text-center bg-[#7B1F1F]">Imsak</th>
                  <th className="py-4 px-4 font-bold border-r border-white/10 text-center">Subuh</th>
                  <th className="py-4 px-4 font-bold border-r border-white/10 text-center">Zuhur</th>
                  <th className="py-4 px-4 font-bold border-r border-white/10 text-center">Ashar</th>
                  <th className="py-4 px-4 font-bold border-r border-white/10 text-center bg-[#2E7D32]">Maghrib</th>
                  <th className="py-4 px-4 font-bold text-center">Isya</th>
                </tr>
              </thead>
              <tbody className="text-white/90">
                {JADWAL_BANDUNG.map((row, idx) => {
                  const isToday = idx + 1 === currentRamadhanDay;
                  return (
                    <tr 
                      key={idx} 
                      className={cn(
                        "border-b border-white/5 hover:bg-white/10 transition-colors relative",
                        isToday ? "bg-emerald-500/20 ring-2 ring-emerald-400 ring-inset" : (idx % 2 === 0 ? "bg-white/5" : "bg-transparent")
                      )}
                    >
                      <td className="py-3 px-4 font-medium border-r border-white/10 flex items-center gap-2">
                        {isToday && <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />}
                        {row.tanggal}
                      </td>
                      <td className="py-3 px-4 text-center font-bold border-r border-white/10 bg-[#7B1F1F]/30">{row.imsak}</td>
                      <td className="py-3 px-4 text-center border-r border-white/10">{row.subuh}</td>
                      <td className="py-3 px-4 text-center border-r border-white/10">{row.zuhur}</td>
                      <td className="py-3 px-4 text-center border-r border-white/10">{row.ashar}</td>
                      <td className="py-3 px-4 text-center font-bold border-r border-white/10 bg-[#2E7D32]/30">{row.maghrib}</td>
                      <td className="py-3 px-4 text-center">{row.isya}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <div className="bg-[#1E3A5F] py-6 px-6 flex justify-between items-end">
            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white/40" />
            </div>
            <div className="text-right">
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Sumber Data</p>
              <p className="text-white text-xs font-bold">Kementerian Agama RI</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-amber-500/10 p-4 rounded-2xl border border-amber-500/20 flex gap-3 items-start backdrop-blur-sm">
        <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-200/60 leading-relaxed italic">
          Jadwal ini khusus untuk wilayah <strong>{city}</strong> dan sekitarnya. Waktu dapat berubah sewaktu-waktu mengikuti ketetapan pemerintah.
        </p>
      </div>

      <footer className="text-center py-8 space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">© 2026 Alif Fatih</p>
        <p className="text-[9px] text-white/10">Diciptakan pada 20 Februari 2026</p>
      </footer>
    </motion.div>
  );
}
