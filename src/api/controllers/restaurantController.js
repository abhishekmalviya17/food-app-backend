const Restaurant = require('../../models/restaurantModel');
const Categories = require('../../models/categoryModel')
// const restaurantsData = [
//   {
//       "name": "Seaside Delights",
//       "image": "https://ibb.co/SRBjyjq",
//       "categories": ["Seafood", "Italian"],
//       "featured": true,
//       "menuItems": []
//   },
//   {
//       "name": "Mountain View Bistro",
//       "image": "https://ibb.co/DQZDCX5",
//       "categories": ["French", "Cafe"],
//       "featured": false,
//       "menuItems": []
//   },
//   {
//       "name": "Green Garden Eatery",
//       "image": "https://ibb.co/Fs6qb6n",
//       "categories": ["Vegan", "Organic"],
//       "featured": true,
//       "menuItems": []
//   },
//   {
//       "name": "Urban Fusion",
//       "image": "https://ibb.co/SRBjyjq",
//       "categories": ["Asian", "Fusion"],
//       "featured": false,
//       "menuItems": []
//   },
//   {
//       "name": "The Classic Diner",
//       "image": "https://ibb.co/DQZDCX5",
//       "categories": ["American", "Diner"],
//       "featured": false,
//       "menuItems": []
//   },
//   {
//       "name": "Countryside Kitchen",
//       "image": "https://ibb.co/Fs6qb6n",
//       "categories": ["Country", "Traditional"],
//       "featured": true,
//       "menuItems": []
//   },
//   {
//       "name": "Skyline Heights",
//       "image": "https://ibb.co/SRBjyjq",
//       "categories": ["Contemporary", "Fine Dining"],
//       "featured": true,
//       "menuItems": []
//   },
//   {
//       "name": "Riverside Cafe",
//       "image": "https://ibb.co/DQZDCX5",
//       "categories": ["Cafe", "Pastries"],
//       "featured": false,
//       "menuItems": []
//   },
//   {
//       "name": "Sunset Boulevard",
//       "image": "https://ibb.co/Fs6qb6n",
//       "categories": ["Grill", "Barbecue"],
//       "featured": false,
//       "menuItems": []
//   },
//   {
//       "name": "City Corner Bistro",
//       "image": "https://ibb.co/SRBjyjq",
//       "categories": ["Bistro", "Coffee"],
//       "featured": true,
//       "menuItems": []
//   }
// ]





const restaurants = [
  // ... (your existing restaurant objects)
];



// Output the updated restaurants
console.log(JSON.stringify(restaurants, null, 2));

exports.createRestaurant = async (req, res) => {
  try {
    const newRestaurant = new Restaurant(req.body);
    const savedRestaurant = await newRestaurant.save();
    res.status(201).json(savedRestaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(404).json({ message: 'Restaurant not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRestaurant = async (req, res) => {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.restaurantId, req.body, { new: true });
    if (updatedRestaurant) {
      res.json(updatedRestaurant);
    } else {
      res.status(404).json({ message: 'Restaurant not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteRestaurant = async (req, res) => {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.restaurantId);
    if (deletedRestaurant) {
      res.json({ message: 'Restaurant deleted successfully' });
    } else {
      res.status(404).json({ message: 'Restaurant not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    // Categories to be added
      const categoriesToAdd = ["Pizza", "Burger", "BBQ", "Sushi", "Vegan", "Desserts"];

      // Function to add a random category to each restaurant
      restaurants.forEach(restaurant => {
        const randomCategory = categoriesToAdd[Math.floor(Math.random() * categoriesToAdd.length)];
       delete restaurant._id;
        restaurant.categories.push(randomCategory);
      });

      let resta = [
        {
            "name": "Garden Fresh",
            "image": "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "categories": ["Pizza", "Burger"],
            "featured": false,
            "menuItems": []
        },
        {
            "name": "Valley View",
            "image": "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "categories": ["Sushi"],
            "featured": true,
            "menuItems": []
        },
        {
            "name": "City Diner",
            "image": "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "categories": ["BBQ"],
            "featured": true,
            "menuItems": []
        },
        {
            "name": "Ocean's Breeze",
            "image": "https://images.pexels.com/photos/761854/pexels-photo-761854.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "categories": ["Vegan"],
            "featured": false,
            "menuItems": []
        },
        {
            "name": "Lakeside Inn",
            "image": "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "categories": ["Sushi", "Desserts"],
            "featured": true,
            "menuItems": []
        },
        {
            "name": "Forest Retreat",
            "image": "https://images.pexels.com/photos/761854/pexels-photo-761854.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "categories": ["BBQ"],
            "featured": false,
            "menuItems": []
        },
        {
            "name": "Harbor House",
            "image": "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "categories": ["BBQ"],
            "featured": true,
            "menuItems": []
        },
        {
            "name": "Ocean's Breeze",
            "image": "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "categories": ["Sushi", "Desserts"],
            "featured": true,
            "menuItems": []
        }
      ]
    
    if(restaurants.length === 0){
      Restaurant.insertMany(resta)
      .then(res => {
        console.log('Data inserted successfully:', res);
      
      })
      .catch(err => {
        console.error('Error inserting data:', err);
      });
    }

    const categories = await Categories.find({});

    let cat = [
      {
        "name": "Pizza",
        "imageUrl": "https://file.rendit.io/n/jNEBXYBbAycU9bKndyc5.png"
      },
      {
        "name": "Burger",
        "imageUrl": "https://file.rendit.io/n/KcmcmymNriajQlBiDlK9.png"
      },
      {
        "name": "BBQ",
        "imageUrl": "https://file.rendit.io/n/CQMPzyMzQ6VJApYOCnC8.png"
      },
      {
        "name": "Sushi",
        "imageUrl": "https://file.rendit.io/n/uOogzIdc86H5l20vZGJN.png"
      },
      {
        "name": "Vegan",
        "imageUrl": "https://file.rendit.io/n/FoKNkqQSv8wq4vesywwb.png"
      },
      {
        "name": "Desserts",
        "imageUrl": "https://file.rendit.io/n/n5f8U3Np60nMA8TV9bzH.png"
      }
    ]
    
    if(categories.length === 0){
      Categories.insertMany(cat).then( res => { console.log('Categories inserted successfully:', res);} ).catch(err => {
        console.error('Error inserting data:', err);
      });
    }

    res.json(restaurants);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getRestaurantsByCategory = async (req, res) => {
  try {
    const { categories } = req.query;
  
    const categoryFilter = categories ? categories.split(',') : [];
    
    const restaurants = await Restaurant.find({
      categories: { $in: categoryFilter },
    });

    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

