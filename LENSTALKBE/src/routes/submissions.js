import ContactSubmission from '../models/ContactSubmission.js';
import { Router } from 'express';
import { protect } from '../middleware/auth.js';

const router = Router();

// ── GET all submissions (admin only) ──────────────────────────────────────
router.get('/', protect, async (req, res) => {
  try {
    const submissions = await ContactSubmission.find().sort({ createdAt: -1 });
    res.json({ success: true, count: submissions.length, data: submissions });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── POST new submission (public - from website contact form) ────────────────
router.post('/', async (req, res) => {
  try {
    const submission = await ContactSubmission.create(req.body);
    res.status(201).json({ success: true, data: submission, message: 'Message sent successfully!' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ── PUT update submission status (admin only) ───────────────────────────────
router.put('/:id', protect, async (req, res) => {
  try {
    const submission = await ContactSubmission.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!submission) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: submission });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ── DELETE submission (admin only) ──────────────────────────────────────────
router.delete('/:id', protect, async (req, res) => {
  try {
    const submission = await ContactSubmission.findByIdAndDelete(req.params.id);
    if (!submission) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
