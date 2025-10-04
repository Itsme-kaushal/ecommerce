const { sequelize, Cart, Product, Order, OrderItem } = require('../models');
const mockPaymentGateway = require('../util/payment');

exports.checkout = async (req, res) => {
  try {
    console.log('Checkout request received');
    console.log('Request body:', req.body);
    console.log('Request headers:', req.headers);
    
    const user_id = req.user.user_id;
    
    // More defensive handling of total
    let total;
    if (req.body) {
      total = req.body.total;
    }

    // Validate total
    if (!total || isNaN(total) || total <= 0) {
      return res.status(400).json({ message: 'Invalid total amount' });
    }

    // Create order with just the required fields
    const order = await Order.create({
      user_id,
      total_amount: total,
      status: 'PLACED',
      // order_date will be set automatically with the default value
    });

    // Clear cart
    await Cart.destroy({ where: { user_id } });

    // Return success response
    res.status(201).json({ 
      message: 'Order placed successfully', 
      order_id: order.order_id,
      total_amount: order.total_amount,
      status: order.status,
      order_date: order.order_date
    });
  } catch (err) {
    console.error('Checkout error:', err);
    res.status(500).json({ message: 'Error processing checkout', error: err.message });
  }
};

exports.orderHistory = async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { user_id: req.user.user_id } });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching order history', error: err.message });
  }
};

exports.orderDetails = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, { include: OrderItem });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.user_id !== req.user.user_id && req.user.role !== 'ADMIN')
      return res.status(403).json({ message: 'Forbidden' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching order details', error: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    order.status = req.body.status;
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Error updating order status', error: err.message });
  }
};