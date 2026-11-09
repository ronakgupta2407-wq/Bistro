const photo = (id, width = 720) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`

// Swap these Unsplash URLs for Bistro 57's own photography when available.
export const menuCategories = [
  'All',
  'Coffee & Shakes',
  'Mojitos & Coolers',
  'Pasta',
  'Pizza',
  'Sizzlers & Starters',
  'Snacks & Fries',
  'Desserts',
]

export const menuItems = [
  { name: 'Cold Coffee', category: 'Coffee & Shakes', description: 'Slow-sipped, frothy and finished just right.', price: '₹159', popular: true, image: photo('photo-1461023058943-07fcbe16d735') },
  { name: 'Chocolate Shake', category: 'Coffee & Shakes', description: 'A creamy, cocoa-rich little indulgence.', price: '₹189', image: photo('photo-1572490122747-3968b75cc699') },
  { name: 'Classic Mojito', category: 'Mojitos & Coolers', description: 'Mint, lime and sparkling refreshment.', price: '₹149', image: photo('photo-1513558161293-cdaf765edfd7') },
  { name: 'White Sauce Pasta', category: 'Pasta', description: 'Silky white sauce, herbs and a generous sprinkle of cheese.', price: '₹279', popular: true, image: photo('photo-1473093295043-cdd812d0e601') },
  { name: 'Red Sauce Pasta', category: 'Pasta', description: 'Tomato, garlic and herbs in a comforting classic.', price: '₹259', image: photo('photo-1551183053-bf91a1d81141') },
  { name: 'Lasagna', category: 'Pasta', description: 'Layers of pasta, rich sauce and golden cheese.', price: '₹329', image: photo('photo-1574894709920-11b28e7367e3') },
  { name: 'Farmhouse Pizza', category: 'Pizza', description: 'A crisp base topped with colorful garden veggies.', price: '₹299', image: photo('photo-1513104890138-7c749659a591') },
  { name: 'Veg Ratatouille Sizzler', category: 'Sizzlers & Starters', description: 'A sizzling medley of vegetables with warm, savory sauce.', price: '₹369', image: photo('photo-1547592180-85f173990554') },
  { name: 'Baked Nachos with Corn', category: 'Sizzlers & Starters', description: 'Crunchy nachos, sweet corn and bubbling cheese.', price: '₹249', image: photo('photo-1513456852971-30c0b8199d4d') },
  { name: 'Veg Manchurian', category: 'Sizzlers & Starters', description: 'Crispy veg bites tossed in a punchy Indo-Chinese sauce.', price: '₹239', image: photo('photo-1512058564366-18510be2db19') },
  { name: 'Pineapple Cheese Salad', category: 'Snacks & Fries', description: 'A sweet-and-savory, fresh-from-the-fridge favorite.', price: '₹199', image: photo('photo-1512621776951-a57141f2eefd') },
  { name: 'Noodles', category: 'Snacks & Fries', description: 'Wok-tossed noodles with crisp vegetables.', price: '₹229', image: photo('photo-1569718212165-3a8278d5f624') },
  { name: 'French Fries', category: 'Snacks & Fries', description: 'Golden, crunchy and best shared (or not).', price: '₹139', image: photo('photo-1573080496219-bb080dd4f877') },
  { name: 'Brownie & Ice Cream', category: 'Desserts', description: 'Warm chocolate brownie with a cool, creamy scoop.', price: '₹199', image: photo('photo-1564355808539-22fda35bed7e') },
]

export const signatureItems = [
  { name: 'The comforting classic', title: 'White Sauce Pasta', image: photo('photo-1473093295043-cdd812d0e601', 1000), note: 'Creamy, cozy, always a good idea.' },
  { name: 'A little golden moment', title: 'Baked Nachos', image: photo('photo-1513456852971-30c0b8199d4d', 1000), note: 'Made for passing around the table.' },
  { name: 'Your afternoon pick-me-up', title: 'Cold Coffee', image: photo('photo-1461023058943-07fcbe16d735', 1000), note: 'A familiar favorite, poured fresh.' },
  { name: 'A warm welcome', title: 'Fresh from our kitchen', image: photo('photo-1547592180-85f173990554', 1000), note: 'Colorful plates and generous flavors.' },
]

export const galleryItems = [
  { src: photo('photo-1554118811-1e0d58224f24', 1000), alt: 'Warm and welcoming cafe interior', tag: 'Vibe', size: 'tall' },
  { src: photo('photo-1473093295043-cdd812d0e601', 800), alt: 'Freshly served creamy pasta', tag: 'Food', size: 'wide' },
  { src: photo('photo-1461023058943-07fcbe16d735', 800), alt: 'Cold coffee ready to enjoy', tag: 'Drinks', size: 'normal' },
  { src: photo('photo-1513104890138-7c749659a591', 800), alt: 'A colorful cafe pizza', tag: 'Food', size: 'normal' },
  { src: photo('photo-1512621776951-a57141f2eefd', 800), alt: 'Fresh salad with seasonal ingredients', tag: 'Food', size: 'wide' },
  { src: photo('photo-1528605248644-14dd04022da1', 800), alt: 'Friends sharing a meal together', tag: 'Moments', size: 'normal' },
]
