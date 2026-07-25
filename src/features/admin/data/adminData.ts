export const C = {
  bg: "#F5F5F5",
  surface: "#FFFFFF",
  surfaceAlt: "#F0EFED",
  border: "rgba(0,0,0,0.08)",
  borderStrong: "rgba(255,87,34,0.3)",
  orange: "#FF5722",
  yellow: "#E6AC00",
  green: "#2E9E4F",
  red: "#D93025",
  teal: "#008C7A",
  text: "#1A1108",
  textMuted: "#5C4A35",
  textDim: "#9E8A74",
};

export const FONT = "'Plus Jakarta Sans', sans-serif";
export const MONO = "'DM Mono', monospace";

export const revenueWeek = [
  { day: "Mon", revenue: 8200, gmv: 410000 },
  { day: "Tue", revenue: 11400, gmv: 570000 },
  { day: "Wed", revenue: 9800, gmv: 490000 },
  { day: "Thu", revenue: 14200, gmv: 710000 },
  { day: "Fri", revenue: 18600, gmv: 930000 },
  { day: "Sat", revenue: 22100, gmv: 1105000 },
  { day: "Sun", revenue: 16400, gmv: 820000 },
];

export const revenueMonth = [
  { day: "Jan", revenue: 92000, gmv: 4600000 },
  { day: "Feb", revenue: 108000, gmv: 5400000 },
  { day: "Mar", revenue: 124000, gmv: 6200000 },
  { day: "Apr", revenue: 98000, gmv: 4900000 },
  { day: "May", revenue: 137000, gmv: 6850000 },
  { day: "Jun", revenue: 142500, gmv: 7125000 },
];

export const escrowData = [
  { name: "In Escrow", value: 38, color: "#FF5722" },
  { name: "Shipped", value: 22, color: "#FFD600" },
  { name: "Delivered", value: 18, color: "#4CAF50" },
  { name: "Completed", value: 16, color: "#00BFA5" },
  { name: "Disputed", value: 6, color: "#EF4444" },
];

export const kycRequests = [
  { id: "KYC-2841", shop: "ZafranCloset Studio", type: "Shop", cnic: "35202-1234567-1", phone: "+92 321 4567890", submitted: "2 hrs ago", status: "PENDING", city: "Lahore", revenue: "PKR 0" },
  { id: "KYC-2840", shop: "Lahore Vintage Co.", type: "Warehouse", cnic: "35201-9876543-3", phone: "+92 300 9876543", submitted: "5 hrs ago", status: "PENDING", city: "Lahore", revenue: "PKR 0" },
  { id: "KYC-2839", shop: "Karachi Kicks", type: "Individual", cnic: "42201-5551234-7", phone: "+92 333 1112223", submitted: "1 day ago", status: "PENDING", city: "Karachi", revenue: "PKR 0" },
  { id: "KYC-2838", shop: "RetroRawalpindi", type: "Shop", cnic: "37405-7778889-5", phone: "+92 345 7778899", submitted: "2 days ago", status: "UNDER_REVIEW", city: "RWP", revenue: "PKR 0" },
  { id: "KYC-2835", shop: "VintageLahore", type: "Warehouse", cnic: "35202-4445556-2", phone: "+92 312 4445566", submitted: "3 days ago", status: "APPROVED", city: "Lahore", revenue: "PKR 142,800" },
];
export type KycReq = typeof kycRequests[0];

export const allProducts = [
  { id: "P-1001", name: "Air Jordan 1 Retro High", seller: "KarachiKicks", price: 2499, category: "Shoes", condition: "Excellent", status: "LIVE", aiScore: 97, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=80&fit=crop" },
  { id: "P-1002", name: "Levi's 501 Denim Jacket", seller: "VintageLahore", price: 1199, category: "Jackets", condition: "Good", status: "LIVE", aiScore: 92, img: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=80&h=80&fit=crop" },
  { id: "P-1003", name: "Supreme Box Logo Hoodie", seller: "StreetPKStore", price: 4999, category: "Tops", condition: "Excellent", status: "FLAGGED", aiScore: 41, img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=80&h=80&fit=crop" },
  { id: "P-1004", name: "New Balance 550 Cream", seller: "SneakerHeadKHI", price: 3299, category: "Shoes", condition: "Excellent", status: "LIVE", aiScore: 88, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=80&fit=crop" },
  { id: "P-1005", name: "Gucci GG Canvas Tote", seller: "LuxeArchivePK", price: 8500, category: "Bags", condition: "Good", status: "FLAGGED", aiScore: 29, img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=80&h=80&fit=crop" },
  { id: "P-1006", name: "Adidas Samba OG Black", seller: "KarachiKicks", price: 2799, category: "Shoes", condition: "Excellent", status: "LIVE", aiScore: 95, img: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=80&h=80&fit=crop" },
  { id: "P-1007", name: "Y2K Cargo Pants — Beige", seller: "RetroRWP", price: 699, category: "Bottoms", condition: "Good", status: "PENDING", aiScore: 76, img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=80&h=80&fit=crop" },
  { id: "P-1008", name: "Vintage Band Tee Metallica", seller: "VintageLahore", price: 799, category: "Tops", condition: "Good", status: "LIVE", aiScore: 78, img: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=80&h=80&fit=crop" },
];

export const allOrders = [
  { id: "TK-30291", buyer: "Aryan Kapoor", seller: "KarachiKicks", item: "Air Jordan 1", amount: 2499, escrow: "LOCKED", status: "IN_TRANSIT", date: "24 Jun 2026" },
  { id: "TK-30290", buyer: "Sara Malik", seller: "VintageLahore", item: "Levi's Jacket", amount: 1199, escrow: "LOCKED", status: "DELIVERED", date: "23 Jun 2026" },
  { id: "TK-30289", buyer: "Omer Farooq", seller: "SneakerHeadKHI", item: "NB 550 Cream", amount: 3299, escrow: "RELEASED", status: "COMPLETED", date: "22 Jun 2026" },
  { id: "TK-30288", buyer: "Zara Hussain", seller: "RetroRWP", item: "Y2K Cargo Pants", amount: 699, escrow: "LOCKED", status: "PROCESSING", date: "24 Jun 2026" },
  { id: "TK-30287", buyer: "Ali Raza", seller: "LuxeArchivePK", item: "Gucci GG Tote", amount: 8500, escrow: "DISPUTED", status: "DISPUTED", date: "21 Jun 2026" },
  { id: "TK-30286", buyer: "Hina Shah", seller: "VintageLahore", item: "Vintage Band Tee", amount: 799, escrow: "RELEASED", status: "COMPLETED", date: "20 Jun 2026" },
  { id: "TK-30285", buyer: "Danish Ahmed", seller: "KarachiKicks", item: "Adidas Samba OG", amount: 2799, escrow: "LOCKED", status: "SHIPPED", date: "24 Jun 2026" },
];

export const disputes = [
  { id: "DSP-441", order: "TK-30287", buyer: "Ali Raza", seller: "LuxeArchivePK", item: "Gucci GG Canvas Tote", amount: 8500, reason: "Item not as described", status: "OPEN", opened: "2 days ago" },
  { id: "DSP-438", order: "TK-30271", buyer: "Hina Shah", seller: "StreetPKStore", item: "Supreme Hoodie", amount: 4999, reason: "Counterfeit suspected", status: "OPEN", opened: "4 days ago" },
  { id: "DSP-435", order: "TK-30265", buyer: "Sara Malik", seller: "RetroRWP", item: "Cargo Trousers", amount: 899, reason: "Never received", status: "RESOLVED", opened: "1 week ago" },
  { id: "DSP-430", order: "TK-30251", buyer: "Omer Farooq", seller: "VintageLahore", item: "Vintage Jacket", amount: 2199, reason: "Wrong item sent", status: "RESOLVED", opened: "2 weeks ago" },
];

export const aiLogs0 = [
  { id: 1, item: "Levi's 501 Denim Jacket", score: 92, hash: "a3f8…c92d", time: "2s ago", status: "PASS" },
  { id: 2, item: "Air Jordan 1 Retro High OG", score: 97, hash: "b7e1…4a3c", time: "18s ago", status: "PASS" },
  { id: 3, item: "Supreme Box Logo Hoodie", score: 41, hash: "d2c9…8f1e", time: "44s ago", status: "FAIL" },
  { id: 4, item: "New Balance 550 Cream", score: 88, hash: "f5a3…9b7d", time: "1m ago", status: "PASS" },
  { id: 5, item: "Gucci GG Canvas Tote", score: 29, hash: "e1b7…2c4a", time: "2m ago", status: "FAIL" },
  { id: 6, item: "Adidas Samba OG Black", score: 95, hash: "c4d8…6e2f", time: "3m ago", status: "PASS" },
  { id: 7, item: "Vintage Band Tee — Metallica", score: 78, hash: "a9f2…1d5b", time: "4m ago", status: "PASS" },
];
