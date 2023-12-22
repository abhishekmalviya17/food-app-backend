const Order = require('../../models/orderModel');

exports.createOrder = async (req, res) => {
    try {
      const newOrder = new Order(req.body);
      await newOrder.save();
      res.status(201).json({ success: true, order: newOrder });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  

  exports.getOrder = async (req, res) => {
    try {
      const order = await Order.findById(req.params.orderId);
      if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }
      res.status(200).json({ success: true, order });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  exports.updateOrder = async (req, res) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(req.params.orderId, req.body, {
        new: true, // Returns the updated object
        runValidators: true
      });
      if (!updatedOrder) {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }
      res.status(200).json({ success: true, order: updatedOrder });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  

  exports.deleteOrder = async (req, res) => {
    try {
      const deletedOrder = await Order.findByIdAndDelete(req.params.orderId);
      if (!deletedOrder) {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }
      res.status(200).json({ success: true, message: 'Order deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
