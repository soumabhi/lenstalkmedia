/**
 * Generic CRUD controller factory.
 * Creates standardised list / getOne / create / update / remove handlers
 * for any Mongoose model that has an `order` field and optionally a `published` flag.
 */

export const createCRUD = (Model) => {
  // ── GET all (public) ─────────────────────────────────────────────────────
  const getAll = async (req, res) => {
    try {
      const { 
        published, 
        status, 
        search, 
        page = 1, 
        limit = 50, 
        sort = '-createdAt' // Default to newest first
      } = req.query;

      const filter = {};
      
      // Basic Filters
      if (published === 'true') filter.published = true;
      if (status && status !== 'all') filter.status = status;

      // Search (case-insensitive)
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { title: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ];
      }

      // Pagination setup
      const skip = (parseInt(page) - 1) * parseInt(limit);
      const limitVal = parseInt(limit);

      // Execute query with pagination
      const itemsQuery = Model.find(filter)
        .sort(sort === 'order' ? { order: 1, createdAt: -1 } : sort)
        .skip(skip)
        .limit(limitVal);

      const [items, total] = await Promise.all([
        itemsQuery,
        Model.countDocuments(filter)
      ]);

      res.json({ 
        success: true, 
        count: items.length, 
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limitVal),
        data: items 
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };

  // ── GET one by ID ─────────────────────────────────────────────────────────
  const getOne = async (req, res) => {
    try {
      const item = await Model.findById(req.params.id);
      if (!item) return res.status(404).json({ success: false, message: 'Not found' });
      res.json({ success: true, data: item });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };

  // ── CREATE (admin) ────────────────────────────────────────────────────────
  const create = async (req, res) => {
    try {
      const item = await Model.create(req.body);
      res.status(201).json({ success: true, data: item });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  };

  // ── UPDATE (admin) ────────────────────────────────────────────────────────
  const update = async (req, res) => {
    try {
      const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!item) return res.status(404).json({ success: false, message: 'Not found' });
      res.json({ success: true, data: item });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  };

  // ── DELETE (admin) ────────────────────────────────────────────────────────
  const remove = async (req, res) => {
    try {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) return res.status(404).json({ success: false, message: 'Not found' });
      res.json({ success: true, message: 'Deleted successfully' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };

  return { getAll, getOne, create, update, remove };
};
