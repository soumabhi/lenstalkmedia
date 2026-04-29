import React, { useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { ProcessStep } from '../../types';
import { Plus, Trash2, Edit2, X } from 'lucide-react';

const ProcessManager = () => {
  const { data: steps, add, update, remove } = useApi<ProcessStep>('process_steps');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<ProcessStep, 'id'>>({
    number: 0,
    title: '',
    description: '',
    icon: '',
    order: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await update(editingId, formData);
      setEditingId(null);
    } else {
      await add({ ...formData, order: steps.length + 1, number: steps.length + 1 });
      setIsAdding(false);
    }
    setFormData({ number: 0, title: '', description: '', icon: '', order: 0 });
  };

  const startEdit = (step: ProcessStep) => {
    setEditingId(step.id!);
    setFormData({
      number: step.number,
      title: step.title,
      description: step.description,
      icon: step.icon,
      order: step.order
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-ink mb-2">Work Process</h1>
          <p className="text-ink/40 font-medium">Manage your work process steps.</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-cyan-800 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-ink transition-all"
        >
          <Plus size={20} /> Add Step
        </button>
      </div>

      {/* Form Modal */}
      {(isAdding || editingId) && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-ink/60 backdrop-blur-md p-4 md:p-6">
          <div className="bg-parchment w-full max-w-2xl rounded-[2rem] p-10 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-display font-bold text-ink">{editingId ? 'Edit Step' : 'Add Step'}</h2>
              <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="text-ink/20 hover:text-ink">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-ink">Step Number</label>
                  <input
                    required
                    type="number"
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: parseInt(e.target.value) })}
                    className="w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-800"
                    placeholder="1"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-ink">Icon (Lucide Icon)</label>
                  <input
                    required
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-800"
                    placeholder="e.g., Lightbulb, Pencil, CheckCircle"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-ink">Step Title</label>
                <input
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-800"
                  placeholder="e.g., Consultation & Discovery"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-ink">Description</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-800 resize-none"
                  placeholder="Step description"
                  rows={4}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-cyan-800 text-white rounded-full py-5 font-bold text-lg hover:bg-ink transition-all"
              >
                {editingId ? 'Save Changes' : 'Create Step'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Steps Timeline */}
      <div className="space-y-4">
        {steps.sort((a, b) => a.order - b.order).map((step, idx) => (
          <div key={step.id} className="bg-white p-8 rounded-3xl shadow-sm border border-ink/5 group relative overflow-hidden">
            <div className="flex items-start gap-8">
              <div className="w-20 h-20 rounded-full bg-yellow-300 flex items-center justify-center font-display font-black text-3xl text-ink flex-shrink-0">
                {step.number}
              </div>
              <div className="flex-1 py-2">
                <h3 className="font-display font-bold text-2xl text-ink mb-2">{step.title}</h3>
                <p className="text-ink/60 text-base">{step.description}</p>
                <span className="text-cyan-800 font-bold text-xs uppercase tracking-widest mt-2 block">{step.icon}</span>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => startEdit(step)} className="p-2 bg-ink/5 rounded-full text-ink hover:text-cyan-800 hover:bg-cyan-100">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => remove(step.id!)} className="p-2 bg-ink/5 rounded-full text-ink hover:text-red-500 hover:bg-red-50">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessManager;
