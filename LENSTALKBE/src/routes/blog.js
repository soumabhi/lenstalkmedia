import BlogPost from '../models/BlogPost.js';
import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { createCRUD } from '../controllers/crudFactory.js';

const router = Router();
const { getAll, getOne, create, update, remove } = createCRUD(BlogPost);

// Specialized get by slug for public blog posts
router.get('/slug/:slug', async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug, published: true });
    if (!post) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', protect, create);
router.put('/:id', protect, update);
router.delete('/:id', protect, remove);

export default router;
