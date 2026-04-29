import React from 'react';
import { motion } from 'framer-motion';
import { useApi } from '../../hooks/useApi';
import { ProcessStep } from '../../types';

const WorkProcess = () => {
  const { data: stepsData } = useApi<ProcessStep>('process_steps', { publicOnly: true });

  const MOCK_STEPS = [
    { id: '1', number: 1, title: 'Understanding', description: 'Brand objective & requirement understanding.', icon: 'Lightbulb', order: 1 },
    { id: '2', number: 2, title: 'Insight', description: 'Market & audience insight (Odisha-focused).', icon: 'Eye', order: 2 },
    { id: '3', number: 3, title: 'Strategy', description: 'Creative strategy & concept development.', icon: 'Compass', order: 3 },
    { id: '4', number: 4, title: 'Pre-Production', description: 'Scriptwriting & pre-production planning.', icon: 'ClipboardList', order: 4 },
    { id: '5', number: 5, title: 'Production', description: 'Production via Lenstalk Production House.', icon: 'Film', order: 5 },
    { id: '6', number: 6, title: 'Quality Control', description: 'Editing & quality control.', icon: 'CheckCircle', order: 6 },
    { id: '7', number: 7, title: 'Deployment', description: 'Influencer / ad deployment via OIN & Meta.', icon: 'Share2', order: 7 },
    { id: '8', number: 8, title: 'Optimisation', description: 'Reporting & optimisation.', icon: 'TrendingUp', order: 8 }
  ];

  const steps = stepsData.length > 0 ? stepsData.sort((a, b) => a.order - b.order) : MOCK_STEPS;

  const PROCESS_COLORS = [
    'bg-warm-yellow', 'bg-[#00E676]', 'bg-red', 'bg-[#FF47B5]',
    'bg-[#FF47B5]', 'bg-orange', 'bg-[#00E676]', 'bg-warm-yellow',
  ];

  return (
    <section className="relative py-24 px-6 bg-[#1a0a3e] overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-4 opacity-[0.06] text-6xl md:text-8xl font-display font-bold uppercase leading-none tracking-tight whitespace-nowrap text-white">
          {Array.from({ length: 20 }).map((_, i) => <span key={i}>PROCESS</span>)}
        </div>
      </div>
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-display font-bold text-cyan-500 mb-4">HOW WE WORK</h2>
          <p className="text-lg text-white/60 max-w-2xl">
            Our workflow is designed to meet government-level and enterprise-level execution standards.
          </p>
        </motion.div>

        <div className="space-y-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`flex items-center gap-6 ${PROCESS_COLORS[i % PROCESS_COLORS.length]} rounded-2xl px-8 py-5 border-2 border-ink/10`}
            >
              <span className="text-3xl font-display font-bold text-ink/40 shrink-0">0{i + 1}</span>
              <div>
                <p className="text-ink font-bold text-lg leading-tight">{step.title}</p>
                <p className="text-ink/60 text-sm mt-0.5">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-2xl font-display font-bold text-warm-yellow">
            One partner. One timeline. One accountable team.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkProcess;
