import { create } from "zustand";
import {
  Product, VerifyStatus, Role, SecurityFlow, Address, Card, Device, BuyerOrder, SellerListing, Message
} from "../types/types";
import {
  mockProducts, mockSellerListings, mockMessages, mockAddresses, mockCards, mockDevices, mockBuyerOrders, DEFAULT_AVATAR
} from "../services/mockData";
import { productService, sellerService, buyerService } from "../services/api/index";


type AppState = {
  // Browsing & Catalog
  selectedProduct: Product;
  activeCategory: string;
  searchQuery: string;
  likedProducts: Set<number>;
  cartItems: Product[];
  activeVtoItem: number;

  // Modals & UI Controls
  showRoleSwitch: boolean;
  showSuccess: boolean;
  purchasedItems: Product[];
  securityFlow: SecurityFlow;

  // Seller State
  sellerStock: Record<number, number>;
  sellerListings: SellerListing[];
  sellerNotifs: { id: number; msg: string; type: "sold" | "low" | "oos" }[];
  sellerProfile: {
    name: string; email: string; phone: string; bio: string;
    shopName: string; location: string; shipping: string; avatar?: string;
    rating?: number; salesCount?: number; totalEarnings?: number; city?: string;
  };
  activeShopField: "shopName" | "location" | "shipping";
  sellerVerified: VerifyStatus;
  sellerKycApproved: boolean;

  // Buyer Profile State
  buyerProfile: { name: string; email: string; phone: string; gender: string; avatar: string | null };
  addresses: Address[];
  cards: Card[];

  // Preferences & Devices
  notifPrefs: Record<string, boolean>;
  privacyPrefs: Record<string, boolean>;
  buyerNotifPrefs: Record<string, boolean>;
  buyerPrivacyPrefs: Record<string, boolean>;
  sellerNotifPrefs: Record<string, boolean>;
  sellerPrivacyPrefs: Record<string, boolean>;
  devices: Device[];
  buyerOrders: BuyerOrder[];

  // Toast
  toastMsg: string | null;

  // Actions
  setSelectedProduct: (p: Product) => void;
  setActiveCategory: (cat: string) => void;
  setSearchQuery: (q: string) => void;
  toggleLike: (id: number) => void;
  addToCart: (p: Product) => void;
  removeFromCart: (id: number) => void;
  setCartItems: (items: Product[] | ((prev: Product[]) => Product[])) => void;
  setActiveVtoItem: (idx: number) => void;

  setShowRoleSwitch: (show: boolean) => void;
  setShowSuccess: (show: boolean) => void;
  setSecurityFlow: (flow: SecurityFlow) => void;

  setSellerStock: (stock: Record<number, number> | ((prev: Record<number, number>) => Record<number, number>)) => void;
  setSellerListings: (listings: SellerListing[] | ((prev: SellerListing[]) => SellerListing[])) => void;
  addSellerListing: (item: SellerListing) => void;
  setSellerNotifs: (notifs: { id: number; msg: string; type: "sold" | "low" | "oos" }[] | ((prev: { id: number; msg: string; type: "sold" | "low" | "oos" }[]) => { id: number; msg: string; type: "sold" | "low" | "oos" }[])) => void;
  setSellerProfile: (profile: any | ((prev: any) => any)) => void;
  setActiveShopField: (field: "shopName" | "location" | "shipping") => void;
  setSellerVerified: (v: VerifyStatus) => void;

  setBuyerProfile: (profile: any | ((prev: any) => any)) => void;
  setAddresses: (addrs: Address[] | ((prev: Address[]) => Address[])) => void;
  setCards: (cards: Card[] | ((prev: Card[]) => Card[])) => void;

  setNotifPrefs: (fn: any) => void;
  setPrivacyPrefs: (fn: any) => void;
  setBuyerNotifPrefs: (fn: any) => void;
  setBuyerPrivacyPrefs: (fn: any) => void;
  setSellerNotifPrefs: (fn: any) => void;
  setSellerPrivacyPrefs: (fn: any) => void;

  setDevices: (devs: Device[] | ((prev: Device[]) => Device[])) => void;
  showToast: (msg: string) => void;
  handlePurchaseComplete: (items: Product[]) => void;
  submitSellerVerification: () => void;
  fetchProducts: (category?: string) => Promise<void>;
  submitSellerVerificationAsync: (payload: any) => Promise<void>;
  checkoutAsync: (items: Product[]) => Promise<boolean>;
};

let toastTimeout: any = null;

export const useAppStore = create<AppState>((set, get) => ({
  selectedProduct: mockProducts[0],
  activeCategory: "All",
  searchQuery: "",
  likedProducts: new Set([2, 6]),
  cartItems: [],
  activeVtoItem: 0,

  showRoleSwitch: false,
  showSuccess: false,
  purchasedItems: [],
  securityFlow: null,

  sellerStock: { 1: 3, 2: 1, 3: 2, 4: 5, 5: 2, 6: 3 },
  sellerListings: mockSellerListings,
  sellerNotifs: [],
  sellerProfile: {
    name: "Priya Sharma",
    email: "priya.sharma@gmail.com",
    phone: "+92 300 1234567",
    bio: "Curating the best pre-loved kicks & vintage finds in Lahore ✨",
    shopName: "Priya's Closet",
    location: "Lahore, Punjab",
    shipping: "Standard · 2-3 days",
    city: "Lahore",
    rating: 4.9,
    salesCount: 142,
    totalEarnings: 184200,
    avatar: DEFAULT_AVATAR,
  },
  activeShopField: "shopName",
  sellerVerified: "verified",
  sellerKycApproved: true,

  buyerProfile: {
    name: "Aryan Kapoor",
    email: "aryan.kapoor@gmail.com",
    phone: "+92 301 2345678",
    gender: "Prefer not to say",
    avatar: DEFAULT_AVATAR,
  },
  addresses: mockAddresses,
  cards: mockCards,

  notifPrefs: { newOrders: true, messages: true, lowStock: true, priceOffers: true, promotions: false, weeklyReport: true },
  privacyPrefs: { twoFactor: false, showOnlineStatus: true, publicProfile: true, dataSharing: false },
  buyerNotifPrefs: { orderUpdates: true, priceDrops: true, newArrivals: true, messages: true, promotions: false },
  buyerPrivacyPrefs: { twoFactor: false, biometric: true, hideActivity: false, dataSharing: false, savePayment: true },
  sellerNotifPrefs: { newOrders: true, newMessages: true, payoutAlerts: true, promotions: false },
  sellerPrivacyPrefs: { twoFactor: false, biometric: true, showSalesCount: true, allowDirectMsgs: true },

  devices: mockDevices,
  buyerOrders: mockBuyerOrders,

  toastMsg: null,

  setSelectedProduct: (p) => set({ selectedProduct: p }),
  setActiveCategory: (cat) => set({ activeCategory: cat }),
  setSearchQuery: (q) => set({ searchQuery: q }),

  toggleLike: (id) => set(state => {
    const next = new Set(state.likedProducts);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    return { likedProducts: next };
  }),

  addToCart: (p) => {
    set(state => {
      if (state.cartItems.find(i => i.id === p.id)) return state;
      return { cartItems: [...state.cartItems, p] };
    });
    get().showToast("Added to cart ✓");
  },

  removeFromCart: (id) => set(state => ({ cartItems: state.cartItems.filter(i => i.id !== id) })),

  setCartItems: (updater) => set(state => ({
    cartItems: typeof updater === "function" ? updater(state.cartItems) : updater
  })),

  setActiveVtoItem: (idx) => set({ activeVtoItem: idx }),

  setShowRoleSwitch: (show) => set({ showRoleSwitch: show }),
  setShowSuccess: (show) => set({ showSuccess: show }),
  setSecurityFlow: (flow) => set({ securityFlow: flow }),

  setSellerStock: (updater) => set(state => ({
    sellerStock: typeof updater === "function" ? updater(state.sellerStock) : updater
  })),

  setSellerListings: (updater) => set(state => ({
    sellerListings: typeof updater === "function" ? updater(state.sellerListings) : updater
  })),

  addSellerListing: (item) => set(state => ({
    sellerListings: [item, ...state.sellerListings]
  })),

  setSellerNotifs: (updater) => set(state => ({
    sellerNotifs: typeof updater === "function" ? updater(state.sellerNotifs) : updater
  })),

  setSellerProfile: (updater) => set(state => ({
    sellerProfile: typeof updater === "function" ? updater(state.sellerProfile) : updater
  })),

  setActiveShopField: (field) => set({ activeShopField: field }),
  setSellerVerified: (v) => set({ sellerVerified: v }),

  setBuyerProfile: (updater) => set(state => ({
    buyerProfile: typeof updater === "function" ? updater(state.buyerProfile) : updater
  })),

  setAddresses: (updater) => set(state => ({
    addresses: typeof updater === "function" ? updater(state.addresses) : updater
  })),

  setCards: (updater) => set(state => ({
    cards: typeof updater === "function" ? updater(state.cards) : updater
  })),

  setNotifPrefs: (fn) => set(state => ({ notifPrefs: typeof fn === "function" ? fn(state.notifPrefs) : fn })),
  setPrivacyPrefs: (fn) => set(state => ({ privacyPrefs: typeof fn === "function" ? fn(state.privacyPrefs) : fn })),
  setBuyerNotifPrefs: (fn) => set(state => ({ buyerNotifPrefs: typeof fn === "function" ? fn(state.buyerNotifPrefs) : fn })),
  setBuyerPrivacyPrefs: (fn) => set(state => ({ buyerPrivacyPrefs: typeof fn === "function" ? fn(state.buyerPrivacyPrefs) : fn })),
  setSellerNotifPrefs: (fn) => set(state => ({ sellerNotifPrefs: typeof fn === "function" ? fn(state.sellerNotifPrefs) : fn })),
  setSellerPrivacyPrefs: (fn) => set(state => ({ sellerPrivacyPrefs: typeof fn === "function" ? fn(state.sellerPrivacyPrefs) : fn })),

  setDevices: (updater) => set(state => ({
    devices: typeof updater === "function" ? updater(state.devices) : updater
  })),

  showToast: (msg) => {
    if (toastTimeout) clearTimeout(toastTimeout);
    set({ toastMsg: msg });
    toastTimeout = setTimeout(() => set({ toastMsg: null }), 2200);
  },

  handlePurchaseComplete: (items) => {
    if (items.length === 0) return;
    const currentStock = get().sellerStock;

    set({
      purchasedItems: items,
      showSuccess: true,
      cartItems: [],
    });

    // Update stock
    set(state => {
      const next = { ...state.sellerStock };
      items.forEach(it => {
        if (next[it.id] !== undefined) next[it.id] = Math.max(0, next[it.id] - 1);
      });
      return { sellerStock: next };
    });

    // Generate notifications
    const newNotifs = items.map(it => {
      const remaining = Math.max(0, (currentStock[it.id] ?? 1) - 1);
      if (remaining === 0) return { id: Date.now() + it.id, msg: `"${it.name}" sold out! Remove or restock it.`, type: "oos" as const };
      if (remaining === 1) return { id: Date.now() + it.id, msg: `"${it.name}" — only 1 left! Consider restocking.`, type: "low" as const };
      return { id: Date.now() + it.id, msg: `"${it.name}" sold. ${remaining} remaining in stock.`, type: "sold" as const };
    });

    get().setSellerNotifs(prev => [...newNotifs, ...prev].slice(0, 10));
  },

  submitSellerVerification: () => {
    set({ sellerVerified: "pending", sellerKycApproved: true });
    get().showToast("Verification submitted — under review ✓");
  },

  fetchProducts: async (category?: string) => {
    try {
      const res = await productService.getProducts({ category });
      if (res.data && res.data.length > 0) {
        set({ selectedProduct: res.data[0] });
      }
    } catch (err) {
      console.warn("fetchProducts error:", err);
    }
  },

  submitSellerVerificationAsync: async (payload: any) => {
    set({ sellerVerified: "pending", sellerKycApproved: true });
    try {
      await sellerService.submitVerification(payload);
      get().showToast("Verification submitted to backend ✓");
    } catch {
      get().showToast("Verification submitted — under review ✓");
    }
  },

  checkoutAsync: async (items: Product[]) => {
    try {
      const res = await buyerService.checkout(items);
      if (res.data?.success) {
        get().handlePurchaseComplete(items);
        return true;
      }
    } catch (err) {
      console.warn("Checkout API call failed, completing locally:", err);
    }
    get().handlePurchaseComplete(items);
    return true;
  },
}));

