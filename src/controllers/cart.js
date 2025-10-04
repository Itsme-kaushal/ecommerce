const { Cart, Product } = require('../models');

exports.viewCart = async (req, res) => {
  try {
    const items = await Cart.findAll({
      where: { user_id: req.user.user_id },
      // include: Product,
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cart', error: err.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    if (!product_id || !quantity) return res.status(400).json({ message: 'Missing fields' });
    let item = await Cart.findOne({ where: { user_id: req.user.user_id, product_id } });
    if (item) {
      item.quantity += quantity;
      await item.save();
    } else {
      item = await Cart.create({ user_id: req.user.user_id, product_id, quantity });
    }
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: 'Error adding to cart', error: err.message });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const item = await Cart.findOne({ where: { user_id: req.user.user_id, product_id: req.params.productId } });
    if (!item) return res.status(404).json({ message: 'Cart item not found' });
    item.quantity = quantity;
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Error updating cart item', error: err.message });
  }
};

exports.removeCartItem = async (req, res) => {
  try {
    const item = await Cart.findOne({ where: { user_id: req.user.user_id, product_id: req.params.productId } });
    if (!item) return res.status(404).json({ message: 'Cart item not found' });
    await item.destroy();
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ message: 'Error removing cart item', error: err.message });
  }
};