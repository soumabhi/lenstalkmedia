import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Mail, Phone, MapPin } from 'lucide-react';
import { useForm } from 'react-hook-form';
import InfiniteWavySeparator from '../components/common/InfiniteWavySeparator';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch(`${API_URL}/submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to submit');
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="bg-[#FCFBE4] min-h-screen overflow-x-hidden">

      {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[30vh] md:min-h-[45vh] bg-red flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-16 pb-8">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 -translate-y-4 md:-translate-y-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-white leading-tight tracking-[0.15em] sm:tracking-[0.25em] uppercase"
            style={{ fontFamily: "'Titillium Web', sans-serif" }}
          >
            LET'S BUILD
          </motion.h1>
        </div>

        {/* Wavy Separator */}
        <div className="absolute bottom-0 left-0 w-full">
          <InfiniteWavySeparator waveColor="#FCFBE4" direction={-1} speed={25} />
        </div>
      </section>

      {/* ── MAIN CONTENT SECTION ─────────────────────────────────────────── */}
      <section className="relative z-10 py-12 md:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">

          {/* Quick Contact Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4"
          >
            <a href="tel:+917656880081" className="flex items-center gap-3 p-4 md:p-6 bg-white rounded-2xl md:rounded-3xl border border-ink/5 shadow-sm hover:shadow-md transition-all group">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-red/5 text-red flex items-center justify-center group-hover:bg-red group-hover:text-white transition-all">
                <Phone size={18} className="md:w-5 md:h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-ink/30 block">Call</span>
                <span className="text-xs md:text-sm font-black text-ink truncate block">+91 76568 80081</span>
              </div>
            </a>
            <a href="mailto:lenstalkmediahouse@gmail.com" className="flex items-center gap-3 p-4 md:p-6 bg-white rounded-2xl md:rounded-3xl border border-ink/5 shadow-sm hover:shadow-md transition-all group">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-red/5 text-red flex items-center justify-center group-hover:bg-red group-hover:text-white transition-all">
                <Mail size={18} className="md:w-5 md:h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-ink/30 block">Email</span>
                <span className="text-xs md:text-sm font-black text-ink truncate block">lenstalkmediahouse@gmail.com</span>
              </div>
            </a>
            <div className="flex items-center gap-3 p-4 md:p-6 bg-white rounded-2xl md:rounded-3xl border border-ink/5 shadow-sm transition-all group">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-red/5 text-red flex items-center justify-center">
                <MapPin size={18} className="md:w-5 md:h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-ink/30 block">Studio</span>
                <span className="text-xs md:text-sm font-black text-ink truncate block">Baramunda, BBSR, Odisha</span>
              </div>
            </div>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 lg:p-16 shadow-xl shadow-ink/5 border border-ink/5"
          >
            {isSubmitted ? (
              <div className="text-center py-12 md:py-20 animate-in zoom-in duration-500">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-[#00ff66]/10 text-[#00ff66] rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8">
                  <CheckCircle2 size={32} className="md:w-12 md:h-12" />
                </div>
                <h3 className="text-2xl md:text-4xl font-display font-black text-ink uppercase tracking-tight mb-3 md:mb-4">Message Sent!</h3>
                <p className="text-ink/60 text-sm md:text-lg mb-8 md:mb-10 font-medium">We'll be in touch within 4 hours.</p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-red font-black uppercase tracking-widest text-[10px] md:text-xs hover:underline"
                >
                  → Send another message
                </button>
              </div>
            ) : (
              <>
                <div className="mb-8 md:mb-12 text-center">
                  <span className="text-red font-black uppercase tracking-[0.2em] text-[8px] md:text-[10px] block mb-2">Project Enquiry</span>
                  <h2 className="text-2xl md:text-4xl font-display font-black text-ink uppercase tracking-tight leading-none">Drop your brief.</h2>
                  <div className="h-1 w-12 md:h-1.5 md:w-20 bg-red mt-3 md:mt-4 rounded-full mx-auto" />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-ink/40 ml-3 md:ml-4">Your Name</label>
                      <input
                        {...register('name', { required: 'Required' })}
                        className="w-full bg-[#FCFBE4]/30 border border-ink/5 rounded-2xl md:rounded-3xl px-4 md:px-6 py-3 md:py-4 focus:outline-none focus:border-red font-bold text-sm md:text-base text-ink transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-ink/40 ml-3 md:ml-4">Email Address</label>
                      <input
                        {...register('email', { required: 'Required', pattern: /^\S+@\S+$/i })}
                        className="w-full bg-[#FCFBE4]/30 border border-ink/5 rounded-2xl md:rounded-3xl px-4 md:px-6 py-3 md:py-4 focus:outline-none focus:border-red font-bold text-sm md:text-base text-ink transition-all"
                        placeholder="john@brand.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-ink/40 ml-3 md:ml-4">Phone Number</label>
                      <input
                        {...register('phone', { required: 'Required' })}
                        className="w-full bg-[#FCFBE4]/30 border border-ink/5 rounded-2xl md:rounded-3xl px-4 md:px-6 py-3 md:py-4 focus:outline-none focus:border-red font-bold text-sm md:text-base text-ink transition-all"
                        placeholder="+91 00000 00000"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-ink/40 ml-3 md:ml-4">Service</label>
                      <select
                        {...register('service', { required: 'Required' })}
                        className="w-full bg-[#FCFBE4]/30 border border-ink/5 rounded-2xl md:rounded-3xl px-4 md:px-6 py-3 md:py-4 focus:outline-none focus:border-red font-bold text-sm md:text-base text-ink transition-all appearance-none"
                      >
                        <option value="">— Pick a service —</option>
                        <option value="Creative Production">Creative Production</option>
                        <option value="Social Media">Social Media Marketing</option>
                        <option value="Influencer">Influencer Marketing</option>
                        <option value="Branding">Branding & PR</option>
                        <option value="Photography">Commercial Photography</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-ink/40 ml-3 md:ml-4">Project Brief</label>
                    <textarea
                      {...register('message', { required: 'Required' })}
                      rows={4}
                      className="w-full bg-[#FCFBE4]/30 border border-ink/5 rounded-2xl md:rounded-[2rem] px-4 md:px-6 py-4 md:py-5 focus:outline-none focus:border-red font-bold text-sm md:text-base text-ink transition-all resize-none"
                      placeholder="Tell us about your goals..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-red text-white rounded-full py-4 md:py-5 font-black text-xs md:text-lg uppercase tracking-widest md:tracking-[0.2em] hover:bg-ink transition-all shadow-lg shadow-red/10 flex items-center justify-center gap-2 md:gap-3 group overflow-hidden"
                  >
                    {isSubmitting ? 'Sending...' : (
                      <>
                        <span>Initiate Blast Off</span>
                        <Send size={16} className="md:w-5 md:h-5 flex-shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
