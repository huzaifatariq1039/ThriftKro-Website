import { Product, VtoShoe, SellerListing, Message, Address, Card, Device, BuyerOrder } from "../types/types";

export const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&auto=format";

export const mockProducts: Product[] = [
  { id: 1, name: "Air Jordan 1 Retro High", brand: "Nike", price: 2499, originalPrice: 8500, condition: "Excellent", size: "UK 9", seller: "SneakerHeadKarachi", sellerRating: 4.9, img: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&h=600&fit=crop&auto=format", category: "Shoes" },
  { id: 2, name: "Vintage Levi's 501 Jacket", brand: "Levi's", price: 1199, originalPrice: 4000, condition: "Good", size: "M", seller: "VintageLahore", sellerRating: 4.7, img: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=600&h=600&fit=crop&auto=format", category: "Vintage" },
  { id: 3, name: "New Balance 550 White", brand: "New Balance", price: 3299, originalPrice: 9000, condition: "Excellent", size: "UK 8", seller: "KicksIslamabad", sellerRating: 5.0, img: "https://images.unsplash.com/photo-1621315271772-28b1f3a5df87?w=600&h=600&fit=crop&auto=format", category: "Shoes" },
  { id: 4, name: "Floral Oversized Shirt", brand: "Vintage", price: 549, originalPrice: 2200, condition: "Good", size: "L", seller: "RetroRawalpindi", sellerRating: 4.6, img: "https://images.unsplash.com/photo-1511039912745-8bfa0bc56aeb?w=600&h=600&fit=crop&auto=format", category: "Shirts" },
  { id: 5, name: "Adidas Samba OG Black", brand: "Adidas", price: 2799, originalPrice: 7500, condition: "Excellent", size: "UK 10", seller: "SneakerHeadKarachi", sellerRating: 4.9, img: "https://images.unsplash.com/photo-1718220130188-428c7dc27fd2?w=600&h=600&fit=crop&auto=format", category: "Shoes" },
  { id: 6, name: "Y2K Denim Mini Skirt", brand: "Archive", price: 699, originalPrice: 2800, condition: "Good", size: "S", seller: "VintageLahore", sellerRating: 4.7, img: "https://images.unsplash.com/photo-1780566758461-8a2e9287abb2?w=600&h=600&fit=crop&auto=format", category: "Vintage" },
];

export const mockCategories = ["All", "Shoes", "Vintage", "Shirts", "Jackets", "Bags", "Accessories"];

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
