const Product = require('./Product');

const normalizeProduct = (body) => ({
  name: body.name,
  category: body.category,
  price: Number(body.price),
  stock: Math.max(0, Number(body.stock)),
  available: body.available !== false && Number(body.stock) > 0,
  image: body.image,
  description: body.description,
  published: body.published !== false
});

exports.listProducts = async (req, res) => {
  try {
    const filter = req.query.admin === 'true' ? {} : { published: true };
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load products' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(normalizeProduct(req.body));
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: 'Product could not be created', details: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, normalizeProduct(req.body), { new: true, runValidators: true });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: 'Product could not be updated', details: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Product could not be deleted' });
  }
};
