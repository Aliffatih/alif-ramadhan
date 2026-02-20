import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Heart, Gift, Coffee, Home, Sparkles, CreditCard, Smartphone, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

type PaymentMethod = 'bank' | 'ewallet' | null;

export default function Sedekah({ onBack }: { onBack: () => void }) {
  const [amount, setAmount] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [step, setStep] = useState<'method' | 'form'>('method');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setAmount('');
      setStep('method');
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-4">
        <button onClick={step === 'form' ? () => setStep('method') : onBack} className="p-2 rounded-full hover:bg-black/5">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-serif font-bold">Sedekah Digital</h2>
      </div>

      <div className="bg-white/5 rounded-3xl p-8 shadow-2xl border border-white/10 space-y-8 backdrop-blur-md">
        <AnimatePresence mode="wait">
          {step === 'method' ? (
            <motion.div 
              key="method"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="text-center space-y-3">
                <div className="inline-flex p-5 rounded-full bg-[#FFD700]/10 text-[#FFD700] mb-2 border border-[#FFD700]/20">
                  <Heart className="w-10 h-10 fill-[#FFD700]" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#FFD700]">Pilih Metode Pembayaran</h3>
                <p className="text-sm text-white/40">Silakan pilih metode sedekah Anda</p>
              </div>

              <div className="space-y-4">
                <MethodButton 
                  icon={<CreditCard className="w-6 h-6" />} 
                  label="Transfer Bank" 
                  description="BCA, Mandiri, BNI, BRI"
                  onClick={() => { setSelectedMethod('bank'); setStep('form'); }}
                />
                <MethodButton 
                  icon={<Smartphone className="w-6 h-6" />} 
                  label="E-Wallet" 
                  description="DANA, OVO, GoPay, LinkAja"
                  onClick={() => { setSelectedMethod('ewallet'); setStep('form'); }}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="bg-[#FFD700]/10 p-6 rounded-2xl border border-[#FFD700]/20 flex items-center gap-5">
                <div className="p-4 rounded-xl bg-[#FFD700] text-[#0a192f] shadow-lg shadow-[#FFD700]/20">
                  {selectedMethod === 'bank' ? <CreditCard className="w-7 h-7" /> : <Smartphone className="w-7 h-7" />}
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFD700]/60">Tujuan Transfer</p>
                  <p className="text-xl font-bold text-[#FFD700]">DANA: 085871430307</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <QuickAmount amount="10.000" icon={<Coffee className="w-4 h-4" />} onClick={() => setAmount('10000')} />
                <QuickAmount amount="50.000" icon={<Gift className="w-4 h-4" />} onClick={() => setAmount('50000')} />
                <QuickAmount amount="100.000" icon={<Home className="w-4 h-4" />} onClick={() => setAmount('100000')} />
                <QuickAmount amount="Lainnya" icon={<Sparkles className="w-4 h-4" />} onClick={() => setAmount('')} />
              </div>

              <form onSubmit={handleDonate} className="space-y-6">
                <div className="space-y-2.5">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 ml-1">Nominal (Rp)</label>
                  <input 
                    type="number"
                    placeholder="Masukkan nominal..."
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-3xl font-bold focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20 transition-all text-white placeholder:text-white/10"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={!amount || isSuccess}
                  className={cn(
                    "w-full py-5 rounded-2xl font-bold text-xl transition-all shadow-xl",
                    isSuccess 
                      ? "bg-emerald-500 text-white shadow-emerald-500/20" 
                      : "bg-[#FFD700] text-[#0a192f] hover:bg-[#FFD700]/90 shadow-[#FFD700]/20"
                  )}
                >
                  {isSuccess ? "Terima Kasih! ✨" : "Sedekah Sekarang"}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
          <p className="text-[10px] text-white/40 leading-relaxed text-center uppercase tracking-widest font-bold">
            * Ini adalah simulasi fitur sedekah. Silakan transfer ke nomor DANA <strong>085871430307</strong> untuk sedekah nyata.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function MethodButton({ icon, label, description, onClick }: { icon: React.ReactNode, label: string, description: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center gap-5 p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-[#FFD700]/10 hover:border-[#FFD700]/40 transition-all group text-left backdrop-blur-sm"
    >
      <div className="p-4 rounded-xl bg-white/5 text-[#FFD700] shadow-inner group-hover:bg-[#FFD700] group-hover:text-[#0a192f] transition-colors">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-lg font-bold text-white group-hover:text-[#FFD700] transition-colors">{label}</p>
        <p className="text-xs text-white/40 group-hover:text-white/60 transition-colors">{description}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-[#FFD700] transition-colors" />
    </button>
  );
}

function QuickAmount({ amount, icon, onClick }: { amount: string, icon: React.ReactNode, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center justify-center gap-2.5 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-[#FFD700]/10 hover:border-[#FFD700]/40 transition-all group backdrop-blur-sm"
    >
      <span className="text-[#FFD700]/60 group-hover:text-[#FFD700] transition-colors">{icon}</span>
      <span className="text-sm font-bold text-white/60 group-hover:text-white transition-colors">{amount}</span>
    </button>
  );
}
