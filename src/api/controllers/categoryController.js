const Category = require('../../models/categoryModel');

exports.createCategory = async (req, res) => {
  try {
    const { name, imageUrl } = req.body;
    const newCategory = new Category({ name, imageUrl });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
