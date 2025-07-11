import type { MenuItemType } from '@/types';

export const menuData: MenuItemType[] = [
  // --- INDIAN CUISINE ---
  // Breakfast
  { id: 'indian-breakfast-1', name: 'Idli', description: 'Steamed rice cakes, a South Indian breakfast staple.', price: 120, imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop', category: 'Indian', subcategory: 'Breakfast' },
  { id: 'indian-breakfast-2', name: 'Dosa', description: 'Crispy fermented rice and lentil crepe, served with chutney and sambar.', price: 140, imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&h=400&fit=crop', category: 'Indian', subcategory: 'Breakfast' },
  // Main Course
  { id: 'indian-main-1', name: 'Butter Chicken', description: 'Creamy tomato gravy with tandoori chicken.', price: 250, imageUrl: 'https://images.unsplash.com/photo-1600628422019-6c1a1b1b1b1b?w=600&h=400&fit=crop', category: 'Indian', subcategory: 'Main Course' },
  { id: 'indian-main-2', name: 'Paneer Butter Masala', description: 'Paneer cubes in a rich, creamy tomato sauce.', price: 220, imageUrl: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=600&h=400&fit=crop', category: 'Indian', subcategory: 'Main Course' },
  { id: 'indian-main-4', name: 'Hyderabadi Biryani', description: 'Aromatic basmati rice with marinated meat and spices.', price: 240, imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop', category: 'Indian', subcategory: 'Main Course' },
  { id: 'indian-main-7', name: 'Palak Paneer', description: 'Paneer cubes in a creamy spinach gravy.', price: 200, imageUrl: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=600&h=400&fit=crop', category: 'Indian', subcategory: 'Main Course' },
  { id: 'indian-main-8', name: 'Fish Curry', description: 'Spicy and tangy fish curry.', price: 260, imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop', category: 'Indian', subcategory: 'Main Course' },
  { id: 'indian-main-9', name: 'Chicken Chettinad', description: 'Fiery coconut-pepper chicken curry.', price: 250, imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=400&fit=crop', category: 'Indian', subcategory: 'Main Course' },
  // Desserts
  { id: 'indian-dessert-1', name: 'Gulab Jamun', description: 'Deep-fried milk balls soaked in sugar syrup.', price: 80, imageUrl: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=600&h=400&fit=crop', category: 'Indian', subcategory: 'Desserts' },
  { id: 'indian-dessert-2', name: 'Jalebi', description: 'Crispy, coiled sweets soaked in sugar syrup.', price: 70, imageUrl: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=600&h=400&fit=crop', category: 'Indian', subcategory: 'Desserts' },
  { id: 'indian-dessert-3', name: 'Rasgulla', description: 'Soft, spongy cheese balls in light syrup.', price: 90, imageUrl: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=600&h=400&fit=crop', category: 'Indian', subcategory: 'Desserts' },
  // Italian
  { id: 'italian-1', name: 'Margherita Pizza', description: 'Classic pizza with tomato, mozzarella, and basil.', price: 220, imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop', category: 'International', subcategory: 'Italian' },
  { id: 'italian-2', name: 'Pasta Alfredo', description: 'Creamy pasta with parmesan and butter.', price: 200, imageUrl: 'https://images.unsplash.com/photo-1523987355523-c7b5b0723c6a?w=600&h=400&fit=crop', category: 'International', subcategory: 'Italian' },
  { id: 'italian-3', name: 'Lasagna', description: 'Layered pasta with meat, cheese, and tomato sauce.', price: 250, imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop', category: 'International', subcategory: 'Italian' },
  { id: 'italian-7', name: 'Tiramisu', description: 'Coffee-flavored Italian dessert.', price: 150, imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop', category: 'International', subcategory: 'Italian' },
  // American
  { id: 'american-1', name: 'Cheeseburger', description: 'Grilled beef patty with cheese in a bun.', price: 180, imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&h=400&fit=crop', category: 'International', subcategory: 'American' },
  { id: 'american-2', name: 'Hot Dog', description: 'Sausage in a soft bun with condiments.', price: 120, imageUrl: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?w=600&h=400&fit=crop', category: 'International', subcategory: 'American' },
  { id: 'american-3', name: 'BBQ Ribs', description: 'Slow-cooked pork ribs with barbecue sauce.', price: 250, imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop', category: 'International', subcategory: 'American' },
  { id: 'american-5', name: 'Mac and Cheese', description: 'Creamy macaroni pasta with cheese sauce.', price: 130, imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop', category: 'International', subcategory: 'American' },
  { id: 'american-6', name: 'Apple Pie', description: 'Classic American dessert with spiced apples.', price: 100, imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop', category: 'International', subcategory: 'American' },
  // Thai
  { id: 'thai-1', name: 'Pad Thai', description: 'Stir-fried rice noodles with shrimp, tofu, and peanuts.', price: 160, imageUrl: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=600&h=400&fit=crop', category: 'International', subcategory: 'Thai' },
  { id: 'thai-2', name: 'Green Curry', description: 'Spicy Thai curry with coconut milk and vegetables.', price: 170, imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop', category: 'International', subcategory: 'Thai' },
  { id: 'thai-3', name: 'Tom Yum Soup', description: 'Hot and sour Thai soup with shrimp.', price: 120, imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop', category: 'International', subcategory: 'Thai' },
  { id: 'thai-4', name: 'Thai Fried Rice', description: 'Fried rice with Thai herbs and vegetables.', price: 110, imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop', category: 'International', subcategory: 'Thai' },
  { id: 'thai-5', name: 'Mango Sticky Rice', description: 'Sweet sticky rice with fresh mango.', price: 130, imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop', category: 'International', subcategory: 'Thai' },

  // --- BEVERAGES ---
  // Indian Beverages (limit to 4)
  { id: 'indian-bev-1', name: 'Masala Chai', description: 'Spiced Indian tea with milk.', price: 40, imageUrl: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=600&h=400&fit=crop', category: 'Beverages', subcategory: 'Indian Beverages' },
  { id: 'indian-bev-3', name: 'Lassi (Sweet/Salted/Mango)', description: 'Yogurt-based refreshing drink.', price: 60, imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=400&fit=crop', category: 'Beverages', subcategory: 'Indian Beverages' },
  { id: 'indian-bev-4', name: 'Nimbu Pani', description: 'Indian-style lemonade with spices.', price: 30, imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=400&fit=crop', category: 'Beverages', subcategory: 'Indian Beverages' },
  // Global Beverages (limit to 4)
  { id: 'global-bev-4', name: 'Lemonade', description: 'Refreshing lemon drink.', price: 40, imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=400&fit=crop', category: 'Beverages', subcategory: 'Global Beverages' },
];