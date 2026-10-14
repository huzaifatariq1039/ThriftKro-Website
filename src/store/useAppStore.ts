import { create } from "zustand";
import {
  Product, CartEntry, VerifyStatus, Role, SecurityFlow, Address, Card, Device, BuyerOrder, SellerListing, Message,
  SellerVerificationStatusResponse,
} from "../types/types";
import {
  mockProducts, mockMessages, mockAddresses, mockCards, mockDevices, mockBuyerOrders, DEFAULT_AVATAR
} from "../services/mockData";
import { productService, sellerService, buyerService, authService } from "../services/api/index";


type AppState = {
  // Browsing & Catalog
  selectedProduct: Product;
  activeCategory: string;
  searchQuery: string;
  likedProducts: Set<string>;
  cart: CartEntry[];
  activeVtoItem: number;

  // Modals & UI Controls
  showRoleSwitch: boolean;
  showSuccess: boolean;
  purchasedItems: Product[];
  securityFlow: SecurityFlow;

  // Seller State
  sellerStock: Record<string, number>;
  sellerListings: SellerListing[];
  sellerNotifs: { id: string; msg: string; type: "sold" | "low" | "oos" }[];
  sellerProfile: {
    name: string; email: string; phone: string; bio: string;
    shopName: string; location: string; shipping: string; avatar?: string;
    rating?: number; salesCount?: number; totalEarnings?: number; city?: string;
  };
  activeShopField: "shopName" | "location" | "shipping";
  sellerVerified: VerifyStatus;
  sellerKycApproved: boolean;
  sellerVerificationStatus: SellerVerificationStatusResponse | null;

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
  toggleLike: (id: string) => void;
  addToCart: (p: Product, quantity?: number) => Promise<boolean>;
  updateCartQty: (id: string, qty: number) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  syncCart: () => Promise<void>;
  setActiveVtoItem: (idx: number) => void;

  setShowRoleSwitch: (show: boolean) => void;
  setShowSuccess: (show: boolean) => void;
  setSecurityFlow: (flow: SecurityFlow) => void;

  setSellerStock: (stock: Record<string, number> | ((prev: Record<string, number>) => Record<string, number>)) => void;
  setSellerListings: (listings: SellerListing[] | ((prev: SellerListing[]) => SellerListing[])) => void;
  addSellerListing: (item: SellerListing) => void;
  setSellerNotifs: (notifs: { id: string; msg: string; type: "sold" | "low" | "oos" }[] | ((prev: { id: string; msg: string; type: "sold" | "low" | "oos" }[]) => { id: string; msg: string; type: "sold" | "low" | "oos" }[])) => void;
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
  fetchVerificationStatus: () => Promise<void>;
  checkoutAsync: (items: Product[]) => Promise<boolean>;
  syncProfile: () => Promise<void>;
};

let toastTimeout: any = null;

export const useAppStore = create<AppState>((set, get) => ({
  selectedProduct: mockProducts[0],
  activeCategory: "All",
  searchQuery: "",
  likedProducts: new Set(["2", "6"]),
  cart: [],
  activeVtoItem: 0,

  showRoleSwitch: false,
  showSuccess: false,
  purchasedItems: [],
  securityFlow: null,

  sellerStock: {},
  sellerListings: [],
  sellerNotifs: [],
  sellerProfile: {
    name: "",
    email: "",
    phone: "",
    bio: "",
    shopName: "My Shop",
    location: "",
    shipping: "Standard · 2-3 days",
    city: "",
    rating: 0,
    salesCount: 0,
    totalEarnings: 0,
    avatar: DEFAULT_AVATAR,
  },
  activeShopField: "shopName",
  sellerVerified: "unverified",
  sellerKycApproved: false,
  sellerVerificationStatus: null,

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

  toggleLike: (id) => {
    // Optimistic local update
    set(state => {
      const next = new Set(state.likedProducts);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { likedProducts: next };
    });
    // Sync with backend
    buyerService.toggleWishlist(id).catch(err => {
      console.warn("Wishlist toggle API failed:", err);
    });
  },

  syncCart: async () => {
    const response = await buyerService.getCart();
    const cart: CartEntry[] = response.data.items.flatMap(cartItem => {
      if (!cartItem.product || !cartItem.variant) return [];
      const attributes = Object.fromEntries(
        Object.entries(cartItem.variant.attributes || {}).map(([key, value]) => [key, String(value)]),
      );
      const unitPrice = Number(cartItem.product.price) + Number(cartItem.variant.price_adjustment || 0);
      return [{
        cartItemId: cartItem.id,
        qty: cartItem.quantity,
        item: {
          id: cartItem.product.id,
          variantId: cartItem.product_variant_id,
          name: cartItem.product.name,
          brand: cartItem.product.brand || "Thrifted",
          price: unitPrice,
          originalPrice: unitPrice,
          condition: "Not specified",
          size: attributes.size || attributes.Size || "One Size",
          seller: cartItem.product.seller_name || "Seller",
          sellerRating: 0,
          img: cartItem.product.primary_image_url || "",
          category: "Uncategorized",
          variants: [{
            id: cartItem.variant.id,
            sku: cartItem.variant.sku,
            attributes,
            priceAdjustment: Number(cartItem.variant.price_adjustment || 0),
            quantityInStock: Number(cartItem.variant.quantity_in_stock || 0),
          }],
        },
      }];
    });
    set({ cart });
  },

  addToCart: async (p, quantity = 1) => {
    if (!p.variantId) {
      get().showToast("This product has no purchasable variant.");
      return false;
    }

    try {
      await buyerService.addToCart(p.variantId, quantity);
      await get().syncCart();
      get().showToast("Added to cart ✓");
      return true;
    } catch (err: any) {
      get().showToast(err?.message || "Could not add this item to your cart.");
      return false;
    }
  },

  updateCartQty: async (id, qty) => {
    const cartEntry = get().cart.find(entry => entry.item.id === id);
    if (!cartEntry) return;
    try {
      await buyerService.updateCartItem(cartEntry.cartItemId, qty);
      await get().syncCart();
    } catch (err: any) {
      get().showToast(err?.message || "Could not update the cart quantity.");
    }
  },

  removeFromCart: async (id) => {
    const cartEntry = get().cart.find(entry => entry.item.id === id);
    if (!cartEntry) return;
    try {
      await buyerService.removeFromCart(cartEntry.cartItemId);
      await get().syncCart();
    } catch (err: any) {
      get().showToast(err?.message || "Could not remove this cart item.");
    }
  },

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
      cart: [],
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
      if (remaining === 0) return { id: String(Date.now()) + it.id, msg: `"${it.name}" sold out! Remove or restock it.`, type: "oos" as const };
      if (remaining === 1) return { id: String(Date.now()) + it.id, msg: `"${it.name}" — only 1 left! Consider restocking.`, type: "low" as const };
      return { id: String(Date.now()) + it.id, msg: `"${it.name}" sold. ${remaining} remaining in stock.`, type: "sold" as const };
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
    try {
      await sellerService.submitVerification(payload);
      set({ sellerVerified: "pending", sellerKycApproved: false });
      get().showToast("Verification submitted — under review ✓");
      // Re-fetch the status to get accurate server state
      get().fetchVerificationStatus();
    } catch (err: any) {
      const msg = err?.message || "";
      if (msg.includes("429") || msg.includes("maximum")) {
        set({ sellerVerified: "frozen" });
        get().showToast("Maximum attempts reached. Please wait before retrying.");
      } else if (msg.includes("pending")) {
        set({ sellerVerified: "pending" });
        get().showToast("You already have a pending request.");
      } else {
        // Offline / network error — still show pending locally
        set({ sellerVerified: "pending", sellerKycApproved: false });
        get().showToast("Verification submitted — under review ✓");
      }
    }
  },

  fetchVerificationStatus: async () => {
    try {
      const res = await sellerService.getVerificationStatus();
      const data = res.data;
      set({ sellerVerificationStatus: data });

      // Sync local verify state from server
      if (data.is_verified || data.verification_status === "APPROVED") {
        set({ sellerVerified: "verified", sellerKycApproved: true });
      } else if (data.verification_status === "PENDING") {
        set({ sellerVerified: "pending", sellerKycApproved: false });
      } else if (data.verification_status === "REJECTED") {
        if (!data.can_submit && data.freeze_until) {
          set({ sellerVerified: "frozen", sellerKycApproved: false });
        } else {
          set({ sellerVerified: "rejected", sellerKycApproved: false });
        }
      } else {
        set({ sellerVerified: "unverified", sellerKycApproved: false });
      }
    } catch {
      // Can't reach server, keep local state as-is
    }
  },

  checkoutAsync: async (items: Product[]) => {
    const response = await buyerService.checkoutCart();
    if (!response.data.order_id) {
      throw new Error("Checkout failed: the server did not create an order");
    }

    get().handlePurchaseComplete(items);
    return true;
  },

  syncProfile: async () => {
    const user = await authService.getCurrentUser();
    if (user) {
      set((state) => ({
        buyerProfile: {
          ...state.buyerProfile,
          name: user.name,
          email: user.email,
          avatar: user.avatar || state.buyerProfile.avatar,
        },
        sellerProfile: {
          ...state.sellerProfile,
          name: user.name,
          email: user.email,
          avatar: user.avatar || state.sellerProfile.avatar,
          shopName: user.name + "'s Shop",
        }
      }));
    }
  },
}));
