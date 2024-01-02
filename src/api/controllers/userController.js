const User = require('../../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d', // Token expires in 1 day
  });
};

exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, agreeTerms } = req.body;

    const user = await User.findOne({ email });

    if(user){
      return res.status(401).json({ message: `Account with the email ${email} already exists` });
    }
    // Create the user object to match the schema
    const userObj = {
      name: {
        first: firstName,
        last: lastName
      },
      email,
      password,
      // include other fields as necessary
    };

    const newUser = new User(userObj);

    // Hash password before saving in database
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    const savedUser = await newUser.save();

    // Exclude password from response
    savedUser.password = undefined;

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        firstName: user.name.first,
        lastName: user.name.last,
        email: user.email,
        token: generateToken(user),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}




exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if (deletedUser) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.addAddress = async (req, res) => {
  const userId = req.user._id; // Assuming user ID is available from JWT token
  const { street, city, state, zipCode, country } = req.body;

  const newAddress = { street, city, state, zipCode, country };

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.address.push(newAddress);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.removeAddress = async (req, res) => {
  const userId = req.user._id; // Assuming user ID is available from JWT token
  const { addressId } = req.body; // Assuming each address has a unique identifier (id)

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.address = user.address.filter(address => address.id !== addressId);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 exports.updateAddress = async (req, res) => {
  const userId = req.user._id; // Assuming user ID is available from JWT token
  const { addressId, updatedAddress } = req.body;
  
  try {
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Find the address to be updated
      const addressIndex = user.address.findIndex(addr => addr.id === addressId);
      if (addressIndex === -1) {
          return res.status(404).json({ message: 'Address not found' });
      }

      // Update the address
      user.address[addressIndex] = updatedAddress;

      await user.save();
      res.status(200).json(user);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


exports.fetchAddresses = async (req, res) => {
  const userId = req.user._id; // Assuming user ID is available from JWT token

  try {
    // Ensure the user ID is a valid ObjectId
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await User.findById(userId).select('address');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.address );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

