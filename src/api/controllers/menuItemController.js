const MenuItem = require('../../models/menuItemModel');
const Restaurant = require('../../models/restaurantModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.getMenuItemsByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    console.log(restaurantId)
    const menuItems = await MenuItem.find({ restaurant: restaurantId });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// let addDishes = async() =>{
//     const restaurants = await Restaurant.find({});
  
//   const sampleDishes = [
//     { name: 'Pizza Margherita', description: 'Classic Margherita with fresh mozzarella and basil', price: 12 },
//     { name: 'Spaghetti Carbonara', description: 'Traditional Italian pasta with eggs, cheese, and bacon', price: 15 },
//     { name: 'Veggie Burger', description: 'A delicious vegetarian burger with all the fixings', price: 10 },
//     { name: 'Grilled Salmon', description: 'Freshly grilled salmon with a lemon butter sauce', price: 18 },
//     { name: 'Caesar Salad', description: 'Crispy romaine lettuce with Caesar dressing and croutons', price: 9 },
//     { name: 'Chicken Tacos', description: 'Soft tacos filled with grilled chicken, salsa, and guacamole', price: 12 },
//     { name: 'Beef Stew', description: 'Hearty stew with tender beef, potatoes, and carrots', price: 16 },
//     { name: 'Sushi Platter', description: 'Assorted sushi rolls with fresh fish and vegetables', price: 22 },
//     { name: 'Pad Thai', description: 'Stir-fried rice noodles with shrimp, peanuts, and lime', price: 14 },
//     { name: 'Lamb Gyro', description: 'Lamb slices in pita bread with tzatziki sauce', price: 11 },
//     { name: 'Chicken Parmesan', description: 'Breaded chicken breast topped with marinara sauce and mozzarella', price: 17 },
//     { name: 'Pulled Pork Sandwich', description: 'Slow-cooked pork shoulder with BBQ sauce on a brioche bun', price: 13 },
//     { name: 'Mushroom Risotto', description: 'Creamy risotto with wild mushrooms and Parmesan cheese', price: 14 },
//     { name: 'Falafel Wrap', description: 'Falafel balls in a wrap with tahini sauce and fresh veggies', price: 9 },
//     { name: 'Tom Yum Soup', description: 'Spicy Thai soup with shrimp, mushrooms, and lemongrass', price: 12 },
//     { name: 'Ramen Bowl', description: 'Japanese noodle soup with pork, egg, and green onions', price: 16 },
//     { name: 'Fish and Chips', description: 'Beer-battered fish served with fries and tartar sauce', price: 15 },
//     { name: 'Tofu Stir Fry', description: 'Stir-fried tofu with vegetables in a savory sauce', price: 11 },
//     { name: 'Quinoa Salad', description: 'Healthy quinoa salad with mixed greens, nuts, and vinaigrette', price: 10 },
//     { name: 'BBQ Ribs', description: 'Slow-cooked ribs with a smoky BBQ glaze', price: 20 },
//     { name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with a gooey center, served with vanilla ice cream', price: 8 },
//     { name: 'Cheesecake', description: 'Classic New York-style cheesecake with a graham cracker crust', price: 7 },
//     { name: 'Burrata Salad', description: 'Fresh burrata cheese with tomatoes, basil, and balsamic glaze', price: 13 },
//     { name: 'Duck Confit', description: 'Slow-cooked duck leg with crispy skin, served with mashed potatoes', price: 22 },
//     { name: 'Shrimp Scampi', description: 'Sautéed shrimp in a garlic butter sauce, served over linguine', price: 18 },
//     { name: 'Baked Ziti', description: 'Ziti pasta baked with cheese and tomato sauce', price: 14 },
//     { name: 'Coconut Curry Chicken', description: 'Spicy coconut curry with tender chicken pieces', price: 16 },
//     { name: 'Lobster Bisque', description: 'Rich and creamy lobster soup with a hint of sherry', price: 19 },
//     { name: 'Eggplant Parmesan', description: 'Breaded eggplant slices layered with cheese and marinara sauce', price: 13 },
//     { name: 'Tiramisu', description: 'Classic Italian coffee-flavored dessert', price: 9 },
//     { name: 'Greek Salad', description: 'Traditional salad with feta cheese, olives, and fresh vegetables', price: 12 },
//     { name: 'Peking Duck', description: 'Roasted duck served with pancakes and hoisin sauce', price: 25 },
//     { name: 'Miso Soup', description: 'Japanese soup with miso paste, tofu, and seaweed', price: 7 },
//     { name: 'Chili con Carne', description: 'Hearty chili with ground beef, beans, and spices', price: 12 },
//     { name: 'Cobb Salad', description: 'American garden salad with chicken, egg, avocado, and blue cheese', price: 13 },
//     { name: 'Moussaka', description: 'Layered Greek dish with eggplant, minced meat, and béchamel sauce', price: 15 },
//     { name: 'Banh Mi', description: 'Vietnamese sandwich with pork, vegetables, and cilantro', price: 10 },
//     { name: 'Ratatouille', description: 'French vegetable stew with eggplant, zucchini, and bell pepper', price: 14 },
//     { name: 'Maple Glazed Salmon', description: 'Salmon fillet with a sweet maple syrup glaze', price: 20 },
//     { name: 'Chicken Alfredo Pasta', description: 'Pasta in a creamy Alfredo sauce with grilled chicken', price: 15 },
//     { name: 'French Onion Soup', description: 'Caramelized onion soup topped with cheese and croutons', price: 11 },
//     { name: 'Kung Pao Chicken', description: 'Spicy stir-fried chicken with peanuts and vegetables', price: 14 },
//     { name: 'Croque Monsieur', description: 'Grilled ham and cheese sandwich, French style', price: 10 },
//     { name: 'Clam Chowder', description: 'Creamy New England clam chowder with potatoes and bacon', price: 13 },
//     { name: 'Steak Frites', description: 'Grilled steak served with French fries', price: 22 },
//     { name: 'Raspberry Cheesecake', description: 'Cheesecake with raspberry sauce and fresh raspberries', price: 8 },
//     { name: 'Vegetable Lasagna', description: 'Lasagna with layers of vegetables and cheese', price: 14 },
//     { name: 'Shepherd’s Pie', description: 'British pie with minced meat and mashed potato crust', price: 16 },
//     { name: 'Gazpacho', description: 'Chilled Spanish tomato soup with cucumber and bell pepper', price: 9 },
//     { name: 'Carnitas Tacos', description: 'Mexican slow-cooked pork tacos with salsa and guacamole', price: 12 }  
//   ];
  
  
//   function getRandomDish() {
//     const randomIndex = Math.floor(Math.random() * sampleDishes.length);
//     return sampleDishes[randomIndex];
//   }
  
//   const menuItems = [];
  
//   restaurants.forEach(restaurant => {
//     const numberOfDishes = Math.floor(Math.random() * 5) + 3; // Random number of dishes between 3 and 7
  
//     for (let i = 0; i < numberOfDishes; i++) {
//       const dish = getRandomDish();
//       menuItems.push({
//         ...dish,
//         restaurant: restaurant._id // Link to the restaurant ID
//       });
//     }
//   });
  
//   // Output the JSON to the console (you can write it to a file if needed)
//   console.log(menuItems);

//   for (const item of menuItems) {
//     const menuItem = await MenuItem.create({
//         name: item.name,
//         description: item.description,
//         price: item.price,
//         restaurant: new ObjectId(item.restaurant)
//     })
//     console.log('Menitem inserted', MenuItem)
//   }
//   console.log('All menu items have been successfully inserted.');
// }

// setTimeout(() => addDishes(), 5000 )





  
