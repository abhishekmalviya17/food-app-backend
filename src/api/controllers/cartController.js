const Cart = require('../../models/cartModel');

exports.addToCart = async (req, res) => {
    const { menuItemId, quantity } = req.body;
    const userId = req.user._id; // Assuming the user ID is available from the passport authentication

    try {
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            // Create a new cart if not exist
            cart = new Cart({
                user: userId,
                items: [{ menuItem: menuItemId, quantity }]
            });
        } else {
            // Check if item is already in cart
            const itemIndex = cart.items.findIndex(item => item.menuItem.toString() === menuItemId);

            if (itemIndex > -1) {
                // Update the quantity if item exists
                let item = cart.items[itemIndex];
                item.quantity += quantity;
                cart.items[itemIndex] = item;
            } else {
                // Add new item if not exists
                cart.items.push({ menuItem: menuItemId, quantity });
            }
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCart = async (req, res) => {
    const userId = req.user._id;

    try {
        const cart = await Cart.findOne({ user: userId }).populate('items.menuItem');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.removeFromCart = async (req, res) => {
    const { menuItemId } = req.body;
    const userId = req.user._id;

    try {
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Remove item from cart
        cart.items = cart.items.filter(item => item.menuItem.toString() !== menuItemId);

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.increaseQuantity = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is available from JWT token
        const { menuItemId } = req.body;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            // Create a new cart if it doesn't exist
            const newCart = new Cart({
                user: userId,
                items: [{ menuItem: menuItemId, quantity: 1 }]
            });
            await newCart.save();
            return res.json(newCart);
        }

        const itemIndex = cart.items.findIndex(item => item.menuItem.toString() === menuItemId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += 1; // Increase quantity
        } else {
            // Add the item to the cart if it's not already there
            cart.items.push({ menuItem: menuItemId, quantity: 1 });
        }

        await cart.save();
        return res.json(cart);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


exports.decreaseQuantity = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is available from JWT token
        const { menuItemId } = req.body;

        const cart = await Cart.findOne({ user: userId });
        const itemIndex = cart.items.findIndex(item => item.menuItem.toString() === menuItemId);

        if (itemIndex > -1 && cart.items[itemIndex].quantity > 1) {
            cart.items[itemIndex].quantity -= 1; // Decrease quantity
            await cart.save();
            return res.json(cart);
        } else if (cart.items[itemIndex].quantity === 1) {
            // If quantity is 1, remove the item from the cart
            cart.items.splice(itemIndex, 1);
            await cart.save();
            return res.json(cart);
        } else {
            return res.status(404).json({ message: 'Item not found in cart' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

