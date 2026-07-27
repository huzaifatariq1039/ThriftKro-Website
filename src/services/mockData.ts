import { Product, VtoShoe, SellerListing, Message, Address, Card, Device, BuyerOrder } from "../types/types";

export const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&auto=format";

export const mockProducts: Product[] = [
  { id: "1", name: "Men's Casual Shirt", brand: "Zara", price: 1500, originalPrice: 3000, condition: "Good", size: "L", seller: "Style Hub", sellerRating: 4.5, img: "https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?w=800", category: "Shirts" },
  { id: "2", name: "Men's Leather Jacket", brand: "AllSaints", price: 12000, originalPrice: 25000, condition: "Like New", size: "M", seller: "Retro Vibes", sellerRating: 4.8, img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800", category: "Jackets" },
  { id: "3", name: "Men's Denim Pants", brand: "Levi's", price: 2500, originalPrice: 6000, condition: "Good", size: "32x32", seller: "Denim Co.", sellerRating: 4.2, img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800", category: "Pants" },
  { id: "4", name: "Men's Formal Trousers", brand: "Marks & Spencer", price: 1800, originalPrice: 4000, condition: "Very Good", size: "34", seller: "Classic Wear", sellerRating: 4.6, img: "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=800", category: "Trousers" },
  { id: "5", name: "Men's Sneakers", brand: "New Balance", price: 8000, originalPrice: 15000, condition: "Like New", size: "US 10", seller: "Sneakerhead", sellerRating: 4.9, img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800", category: "Shoes" },
  { id: "6", name: "Women's Silk Shirt", brand: "Mango", price: 2000, originalPrice: 4500, condition: "Very Good", size: "S", seller: "Chic Finds", sellerRating: 4.7, img: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=800", category: "Shirts" },
  { id: "7", name: "Women's Denim Jacket", brand: "Gap", price: 3000, originalPrice: 7000, condition: "Good", size: "M", seller: "Vintage Finds", sellerRating: 4.4, img: "https://images.unsplash.com/photo-1559551408-df86a769c0d8?w=800", category: "Jackets" },
  { id: "8", name: "Women's Wide Leg Pants", brand: "H&M", price: 1500, originalPrice: 3500, condition: "Fair", size: "S", seller: "Eco Thrift", sellerRating: 4.1, img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800", category: "Pants" },
  { id: "9", name: "Women's Tailored Trousers", brand: "Zara", price: 2200, originalPrice: 5000, condition: "Like New", size: "M", seller: "Style Hub", sellerRating: 4.5, img: "https://images.unsplash.com/photo-1509631179647-0c37cb509ece?w=800", category: "Trousers" },
  { id: "10", name: "Women's Heels", brand: "Steve Madden", price: 4000, originalPrice: 9000, condition: "Good", size: "US 7", seller: "Luxe Resale", sellerRating: 4.8, img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800", category: "Shoes" },
];

export const mockCategories = ["All", "Shoes", "Shirts", "Jackets", "Pants", "Trousers"];

export const mockVtoShoes: VtoShoe[] = [
  { id: 1, name: "Jordan 1", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop&auto=format" },
  { id: 2, name: "NB 550", img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=200&h=200&fit=crop&auto=format" },
  { id: 3, name: "Samba OG", img: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=200&h=200&fit=crop&auto=format" },
];

export const mockSellerListings: SellerListing[] = [
  { id: 1, name: "Air Force 1 '07 White", price: 1899, views: 234, status: "Active", img: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=200&h=200&fit=crop&auto=format" },
  { id: 2, name: "Vintage Band Tee – Metallica", price: 799, views: 118, status: "Active", img: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=200&h=200&fit=crop&auto=format" },
  { id: 3, name: "Puma Suede Classic", price: 1299, views: 67, status: "Pending", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop&auto=format" },
  { id: 4, name: "Corduroy Blazer – Brown", price: 1750, views: 43, status: "Active", img: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=200&h=200&fit=crop&auto=format" },
  { id: 5, name: "Converse Chuck 70 – Off White", price: 2100, views: 91, status: "Pending", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop&auto=format" },
];

export const mockMessages: Message[] = [
  { id: 1, name: "Bilal Chaudhry", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format", last: "Is the Jordan 1 still available?", time: "2m ago", unread: 2, item: "Air Jordan 1 Retro High" },
  { id: 2, name: "Sana Mirza", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format", last: "Can you do PKR 1,800?", time: "18m ago", unread: 1, item: "Air Force 1 '07 White" },
  { id: 3, name: "Hamza Iqbal", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&auto=format", last: "Thanks! I'll place the order now 🙌", time: "1h ago", unread: 0, item: "Vintage Band Tee" },
  { id: 4, name: "Aisha Khan", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format", last: "What's the condition of the sole?", time: "3h ago", unread: 0, item: "Puma Suede Classic" },
];

export const mockAddresses: Address[] = [
  { id: 1, label: "Home", kind: "permanent", line: "House 4B, DHA Phase 6, Lahore, Punjab – 54000", isDefault: true },
  { id: 2, label: "Office", kind: "temporary", line: "Plot 12, Gulberg III, Lahore, Punjab – 54660", isDefault: false },
];

export const mockCards: Card[] = [
  { id: 1, brand: "Visa", last4: "4291", exp: "08/27", isDefault: true },
  { id: 2, brand: "Mastercard", last4: "7733", exp: "11/26", isDefault: false },
];

export const mockDevices: Device[] = [
  { id: 1, name: "MacBook Pro · Chrome", info: "Lahore, PK · This device", current: true, time: "Active now", os: "desktop" },
  { id: 2, name: "iPhone 15 Pro", info: "Karachi, PK", current: false, time: "2 days ago", os: "ios" },
  { id: 3, name: "iPad Air", info: "Islamabad, PK", current: false, time: "1 week ago", os: "ios" },
];

export const mockBuyerOrders: BuyerOrder[] = [
  { id: "TK-10293", name: "Air Jordan 1 Retro High", img: mockProducts[0].img, price: 2499, status: "Delivered", date: "12 Jun 2026" },
  { id: "TK-10288", name: "New Balance 550 White", img: mockProducts[2].img, price: 3299, status: "In Transit", date: "24 Jun 2026" },
  { id: "TK-10271", name: "Floral Oversized Shirt", img: mockProducts[3].img, price: 549, status: "Processing", date: "26 Jun 2026" },
];
