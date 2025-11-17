import Cart from '../models/Cart.js';
import Service from '../models/Service.js';

// Get user's cart
export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id })
      .populate('items.service');
    
    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: []
      });
    }
    
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { serviceId, quantity = 1 } = req.body;

    // Validate service exists
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Find or create cart
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: []
      });
    }

    // Check if service already in cart
    const existingItem = cart.items.find(item => 
      item.service.toString() === serviceId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ service: serviceId, quantity });
    }

    cart.lastUpdated = new Date();
    await cart.save();

    // Return populated cart
    cart = await Cart.findById(cart._id).populate('items.service');
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update cart item quantity
export const updateCartItem = async (req, res) => {
  try {
    const { serviceId, quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ message: 'Quantity must be at least 1' });
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => 
      item.service.toString() === serviceId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Service not found in cart' });
    }

    cart.items[itemIndex].quantity = quantity;
    cart.lastUpdated = new Date();
    await cart.save();

    // Return populated cart
    cart = await Cart.findById(cart._id).populate('items.service');
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { serviceId } = req.params;

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => 
      item.service.toString() !== serviceId
    );

    cart.lastUpdated = new Date();
    await cart.save();

    // Return populated cart
    cart = await Cart.findById(cart._id).populate('items.service');
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = [];
    cart.lastUpdated = new Date();
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};