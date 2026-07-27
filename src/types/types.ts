/* ─────────────────────────  Types & Schemas  ───────────────────────── */

export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  condition: string;
  size: string;
  seller: string;
  sellerRating: number;
  img: string;
  category: string;
};

export type VtoShoe = {
  id: number;
  name: string;
  img: string;
};

export type SellerListing = {
  id: number;
  name: string;
  price: number;
  views: number;
  likes?: number;
  category?: string;
  status: "Active" | "Pending";
  img: string;
};

export type Message = {
  id: number;
  name: string;
  avatar: string;
  last: string;
  time: string;
  unread: number;
  item: string;
};

export type Route =
  | "landing" | "role-select" | "buyer-auth" | "seller-auth"
  | "buyer-home" | "buyer-product" | "buyer-vto" | "buyer-cart"
  | "buyer-profile" | "buyer-edit-profile" | "buyer-orders" | "buyer-wishlist"
  | "buyer-addresses" | "buyer-payments" | "buyer-notifications" | "buyer-privacy" | "buyer-search"
  | "seller-verify"
  | "seller-dashboard" | "seller-listings" | "seller-add" | "seller-messages"
  | "seller-profile" | "seller-edit-profile" | "seller-notifications" | "seller-privacy" | "seller-shop-setting" | "seller-shop-settings"
  | "careers" | "press" | "seller-guide" | "blog";

export type VerifyStatus = "unverified" | "pending" | "verified" | "rejected" | "frozen";

export type Role = "buyer" | "seller" | "admin" | null;

/* ── Seller Verification Wizard Types ────────────────────────────── */

export type StoreType = "INDIVIDUAL" | "SHOP" | "WAREHOUSE";

export type VerificationProductProof = {
  name: string;
  proofFile: File | null;
  proofPreview: string | null;
};

export type SellerVerificationFormData = {
  // Step 1 — Store details
  shopName: string;
  ownerFullName: string;
  cnicNumber: string;
  storeType: StoreType;
  phone: string;
  streetAddress: string;
  city: string;
  postalCode: string;

  // Step 2 — Products & proof
  products: VerificationProductProof[];

  // Step 3 — Import (optional)
  csvFile: File | null;
  csvFileName: string | null;

  // Step 4 generated at render time from above
};

export type SellerVerificationStatusResponse = {
  verification_status: "UNVERIFIED" | "PENDING" | "APPROVED" | "REJECTED";
  is_verified: boolean;
  submissions_today: number;
  max_submissions_per_day: number;
  can_submit: boolean;
  freeze_until: string | null;
  latest_request: {
    id: string;
    status: string;
    rejection_reason: string | null;
    created_at: string;
  } | null;
};

export type SecurityFlow = {
  type: "change-password" | "manage-devices" | "login-activity" | "biometric" | "2fa";
  onDone?: () => void;
} | null;

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string | null;
  phone?: string;
};

export type Address = {
  id: number;
  label: string;
  kind: "permanent" | "temporary";
  line: string;
  isDefault: boolean;
};

export type Card = {
  id: number;
  brand: string;
  last4: string;
  exp: string;
  isDefault: boolean;
};

export type Device = {
  id: number;
  name: string;
  info: string;
  current: boolean;
  time: string;
  os: "desktop" | "ios" | "android";
};

export type BuyerOrder = {
  id: string;
  orderNo?: string;
  name?: string;
  img?: string;
  price?: number;
  total?: string;
  itemsCount?: number;
  items?: any[];
  status: "Delivered" | "In Transit" | "Processing";
  date: string;
};

export type JobPost = {
  id: number;
  title: string;
  type: "Full-time" | "Internship" | "Part-time";
  department: string;
  location: string;
  posted: string;
  description: string;
  active: boolean;
};
