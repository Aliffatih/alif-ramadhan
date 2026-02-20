import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Info, Github, Globe, Mail, Moon, MessageCircle, Instagram, Music2 } from 'lucide-react';

export default function About({ onBack }: { onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-black/5">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-serif font-bold">Tentang Aplikasi</h2>
      </div>

      <div className="bg-white/5 rounded-3xl p-10 shadow-2xl border border-white/10 space-y-10 text-center backdrop-blur-md">
        <div className="space-y-4">
          <div className="inline-flex p-8 rounded-full bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/20">
            <Moon className="w-16 h-16 fill-[#FFD700]" />
          </div>
          <div>
            <h3 className="text-3xl font-serif font-bold text-[#FFD700]">Ramadhan Kareem</h3>
            <p className="text-white/40 text-xs uppercase tracking-widest font-bold mt-1">Versi 1.0.0</p>
          </div>
        </div>

        <div className="space-y-6 text-left">
          <p className="text-white/70 leading-relaxed text-lg italic font-serif">
            Aplikasi <strong>Ramadhan Kareem</strong> dirancang untuk membantu umat Muslim dalam menjalankan ibadah di bulan suci Ramadhan dengan lebih terorganisir dan khusyuk.
          </p>
          <p className="text-white/60 leading-relaxed">
            Fitur utama meliputi jadwal imsakiyah yang akurat, kumpulan doa dan dzikir harian, serta kemudahan untuk berbagi melalui fitur sedekah digital.
          </p>
        </div>

        <div className="space-y-6">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFD700]/60">Layanan Pelanggan (CS)</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <SocialLink 
              icon={<MessageCircle className="w-6 h-6" />} 
              label="WhatsApp" 
              href="https://wa.me/6285871430307"
            />
            <SocialLink 
              icon={<Instagram className="w-6 h-6" />} 
              label="Instagram" 
              href="https://instagram.com/alfatihhhh27"
            />
            <SocialLink 
              icon={<Music2 className="w-6 h-6" />} 
              label="TikTok" 
              href="https://tiktok.com/@aliffatih535"
            />
            <SocialLink 
              icon={<Mail className="w-6 h-6" />} 
              label="Email" 
              href="mailto:aliffatih092@gmail.com"
            />
          </div>
        </div>

        <div className="h-px bg-white/10" />

        <div className="space-y-6">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFD700]/60">Media Sosial Lainnya</h4>
          <div className="flex justify-center gap-8">
            <SocialLink icon={<Globe className="w-6 h-6" />} label="Website" />
            <SocialLink icon={<Github className="w-6 h-6" />} label="Github" />
          </div>
        </div>

        <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-bold">
          Dibuat dengan ❤️ untuk Umat
        </p>
      </div>
    </motion.div>
  );
}

function SocialLink({ icon, label, href }: { icon: React.ReactNode, label: string, href?: string }) {
  const content = (
    <>
      <div className="p-4 rounded-2xl bg-white/5 text-white/40 group-hover:bg-[#FFD700] group-hover:text-[#0a192f] group-hover:shadow-lg group-hover:shadow-[#FFD700]/20 transition-all border border-white/5">
        {icon}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-widest text-white/20 group-hover:text-[#FFD700] transition-colors">{label}</span>
    </>
  );

  if (href) {
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-3 group transition-all"
      >
        {content}
      </a>
    );
  }

  return (
    <button className="flex flex-col items-center gap-3 group transition-all">
      {content}
    </button>
  );
}
